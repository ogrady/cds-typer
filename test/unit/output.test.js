'use strict'

const fs = require('fs/promises')
const path = require('path')
const cds2ts = require('../../lib/compile')
const { ASTWrapper, JSASTWrapper, check } = require('../ast')
const { locations } = require('../util')

const dir = locations.testOutput('output_test')

// compilation produces semantically complete Typescript
describe('Compilation', () => {
    //console.log('INFO', `Unable to unlink '${dir}' (${err}). This may not be an issue.`)
    beforeEach(() => fs.unlink(dir).catch(() => {}))

    let paths
    let ast

    describe('Bookshoplet', () => {

        beforeAll(async () => {
            paths = await cds2ts
                .compileFromFile(locations.unit.files('bookshoplet/model.cds'), { outputDirectory: dir })
            ast = new ASTWrapper(path.join(paths[1], 'index.ts'))
        })

        test('index.js', async () => {
            const jsw = await JSASTWrapper.initialise(path.join(paths[1], 'index.js'))
            jsw.exportsAre([
                ['Book', 'Books'],
                ['Books', 'Books'],
                ['Author', 'Authors'],
                ['Authors', 'Authors'],
                ['Genre', 'Genres'],
                ['Genres', 'Genres'],
                ['A_', 'A'],
                ['A', 'A'],
                ['B_', 'B'],
                ['B', 'B'],
                ['C_', 'C'],
                ['C', 'C'],
                ['D_', 'D'],
                ['D', 'D'],
                ['E_', 'E'],
                ['E', 'E'],
                ['QueryEntity_', 'QueryEntity'],
                ['QueryEntity', 'QueryEntity']
            ])
        })

        test('Generated Paths', () => expect(paths).toHaveLength(2)) // the one module [1] + baseDefinitions [0]
        
        test('Aspects', () => {
            const aspects = ast.getAspects()
            const expected = [
                '_BookAspect',
                '_AuthorAspect',
                '_GenreAspect',
                '_AAspect',
                '_BAspect',
                '_CAspect',
                '_DAspect',
                '_EAspect',
                '_QueryEntityAspect',
            ]
            expect(aspects.length).toBe(expected.length)
            expect(aspects.map(({name}) => name)).toEqual(expect.arrayContaining(expected))
        })

        test('Aspect Functions', () => {
            const fns = ast.getAspectFunctions()
            const expected = [
                '_BookAspect',
                '_AuthorAspect',
                '_GenreAspect',
                '_AAspect',
                '_BAspect',
                '_CAspect',
                '_DAspect',
                '_EAspect',
                '_QueryEntityAspect',
            ]
            expect(fns.length).toBe(expected.length)
            expect(fns.map(({name}) => name)).toEqual(expect.arrayContaining(expected))
        })

        test('Classes', () => {
            const fns = ast.getTopLevelClassDeclarations()
            const expected = [
                'Book',
                'Books',
                'Author',
                'Authors',
                'Genre',
                'Genres',
                'A',
                'A_',
                'B',
                'B_',
                'C',
                'C_',
                'D',
                'D_',
                'E',
                'E_',
                'QueryEntity',
                'QueryEntity_',
            ]
            expect(fns.length).toBe(expected.length)
            expect(fns.map(({name}) => name)).toEqual(expect.arrayContaining(expected))
        })
    })

    describe('Builtin Types', () => {
        let paths
        let ast

        beforeAll(async () => {
            paths = await cds2ts
                .compileFromFile(locations.unit.files('builtins/model.cds'), {
                    outputDirectory: dir,
                })
                // eslint-disable-next-line no-console
                .catch((err) => console.error(err))
                ast = new ASTWrapper(path.join(paths[1], 'index.ts'))
        })

        test('Primitives', () => {
            expect(ast.exists('_EAspect', 'uuid', m => check.isNullable(m.type, [check.isString]))).toBeTruthy()
            expect(ast.exists('_EAspect', 'str', m => check.isNullable(m.type, [check.isString]))).toBeTruthy()
            expect(ast.exists('_EAspect', 'bin', m => check.isNullable(m.type, [check.isString]))).toBeTruthy()
            expect(ast.exists('_EAspect', 'lstr', m => check.isNullable(m.type, [check.isString]))).toBeTruthy()
            expect(ast.exists('_EAspect', 'lbin', m => check.isUnionType(m.type, [
                st => st.full === 'Buffer',
                check.isString
            ]))).toBeTruthy()
            expect(ast.exists('_EAspect', 'integ', m => check.isNullable(m.type, [check.isNumber]))).toBeTruthy()
            expect(ast.exists('_EAspect', 'uint8', m => check.isNullable(m.type, [check.isNumber]))).toBeTruthy()
            expect(ast.exists('_EAspect', 'int16', m => check.isNullable(m.type, [check.isNumber]))).toBeTruthy()
            expect(ast.exists('_EAspect', 'int32', m => check.isNullable(m.type, [check.isNumber]))).toBeTruthy()
            expect(ast.exists('_EAspect', 'int64', m => check.isNullable(m.type, [check.isNumber]))).toBeTruthy()
            expect(ast.exists('_EAspect', 'integer64', m => check.isNullable(m.type, [check.isNumber]))).toBeTruthy()
            expect(ast.exists('_EAspect', 'dec', m => check.isNullable(m.type, [check.isNumber]))).toBeTruthy()
            expect(ast.exists('_EAspect', 'doub', m => check.isNullable(m.type, [check.isNumber]))).toBeTruthy()
            expect(ast.exists('_EAspect', 'd', m => check.isNullable(m.type, [check.isString]))).toBeTruthy()
            expect(ast.exists('_EAspect', 'dt', m => check.isNullable(m.type, [check.isString]))).toBeTruthy()
            expect(ast.exists('_EAspect', 'ts', m => check.isNullable(m.type, [check.isString]))).toBeTruthy()
        })
    })

    describe('Inflection', () => {
        let paths
        let ast

        beforeAll(async () => {
            paths = await cds2ts
                .compileFromFile(locations.unit.files('inflection/model.cds'), {
                    outputDirectory: dir,
                })
                // eslint-disable-next-line no-console
                .catch((err) => console.error(err))
                ast = new ASTWrapper(path.join(paths[1], 'index.ts'))
        })

        test('Generated Paths', () => expect(paths).toHaveLength(2)) // the one module [1] + baseDefinitions [0]

        test('index.js', async () => {
            const jsw = await JSASTWrapper.initialise(path.join(paths[1], 'index.js'))
            jsw.exportsAre([
                ['Gizmo', 'Gizmos'],
                ['Gizmos', 'Gizmos'],
                ['FooSingular', 'Foos'],
                ['Foos', 'Foos'],
                ['Bar', 'Bars'],  // this one...
                ['BarPlural', 'Bars'],
                ['Bars', 'Bars'],
                ['BazSingular', 'Bazes'],
                ['BazPlural', 'Bazes'],
                ['Bazes', 'Bazes'],  // ...and this one...
                ['A_', 'A'],
                ['A', 'A'],
                ['C', 'C'],
                ['LotsOfCs', 'C'],
                ['OneSingleD', 'D'],
                ['D', 'D'],
                ['Referer', 'Referer'],
                ['Referer_', 'Referer']
            ])
            // ...are currently exceptions where both singular _and_ plural
            // are annotated and the original name is used as an export on top of that.
            // So _three_ exports per entity. If we ever choose to remove this third one,
            // then this test has to reflect that.
        })
        
        test('Aspects', () => {
            const aspects = ast.getAspects()
            const expected = [
                '_GizmoAspect',
                '_FooSingularAspect',
                '_BarAspect',
                '_BazSingularAspect',
                '_AAspect',
                '_CAspect',
                '_OneSingleDAspect',
                '_RefererAspect',
            ]
            expect(aspects.length).toBe(expected.length)
            expect(aspects.map(({name}) => name)).toEqual(expect.arrayContaining(expected))
        })

        test('Classes', () => {
            const fns = ast.getTopLevelClassDeclarations()
            const expected = [
                'Gizmo',
                'Gizmos',
                'FooSingular',
                'Foos',
                'Bar',
                'BarPlural',
                'BazSingular',
                'BazPlural',
                'A',
                'A_',
                'C',
                'LotsOfCs',
                'D',
                'D',
                'Referer',
                'Referer_'
            ]
            expect(fns.map(({name}) => name)).toEqual(expect.arrayContaining(expected))
            expect(fns.length).toBe(expected.length)
        })

        test('Annotated Assoc/ Comp', () => {
            expect(ast.exists('_RefererAspect', 'a', m => check.isNullable(m.type, [
                    ({name, args}) => name === 'to' && args[0].name === 'BazSingular'
            ]))).toBeTruthy()
            expect(ast.exists('_RefererAspect', 'b', m => true
                    && m.type.name === 'many'
                    && m.type.args[0].name === 'BazPlural'
            )).toBeTruthy()
            expect(ast.exists('_RefererAspect', 'c', m => check.isNullable(m.type, [
                ({name, args}) => name === 'of' && args[0].name === 'BazSingular'
        ]))).toBeTruthy()
            expect(ast.exists('_RefererAspect', 'd', m => true
                    && m.type.name === 'many'
                    && m.type.args[0].name === 'BazPlural'
            )).toBeTruthy()
        })

        test('Inferred Assoc/ Comp', () => {
            expect(ast.exists('_RefererAspect', 'e', m => check.isNullable(m.type, [
                ({name, args}) => name === 'to' && args[0].name === 'Gizmo'
        ]))).toBeTruthy()
            expect(ast.exists('_RefererAspect', 'f', m => true
                    && m.type.name === 'many'
                    && m.type.args[0].name === 'Gizmos'
            )).toBeTruthy()
            expect(ast.exists('_RefererAspect', 'g', m => check.isNullable(m.type, [
                ({name, args}) => name === 'of' && args[0].name === 'Gizmo'
        ]))).toBeTruthy()
            expect(ast.exists('_RefererAspect', 'h', m => true
                    && m.type.name === 'many'
                    && m.type.args[0].name === 'Gizmos'
            )).toBeTruthy()
        })
    })
})
