# Change Log

All notable changes to this project will be documented in this file.
This project adheres to [Semantic Versioning](http://semver.org/).
The format is based on [Keep a Changelog](http://keepachangelog.com/).

## Version 0.16.0 - TBD
### Fixed
- Externally defined enums can now be used as parameter types in actions

## Version 0.15.0 - 2023-12-21
### Added
- Support for [scoped entities](https://cap.cloud.sap/docs/cds/cdl#scoped-names)
- Support for [delimited identifiers](https://cap.cloud.sap/docs/cds/cdl#delimited-identifiers)

### Fixed
- Inline enums are now available during runtime as well
- Inline enums can now be used as action parameter types as well. These enums will not have a runtime representation, but will only assert type safety!
- Arrays of inline enum values can now be used as action parameters too. But they will only be represented by their enclosing type for now, i.e. `string`, `number`, etc.
- Foreign keys of projection entities are now propagated as well

## Version 0.14.0 - 2023-12-13
### Added
- Entities that are database views now also receive typings

## Version 0.13.0 - 2023-12-06
### Changed
- Enums are now generated ecplicitly in the respective _index.js_ files and don't have to extract their values from the model at runtime anymore

### Added
- The `excluding` clause in projections now actually excludes the specified properties in the generated types

## Version 0.12.0 - 2023-11-23

### Changed
- Generate `cds.LargeBinary` as string, buffer, _or readable_ in the case of media content

### Added
- Added support for the `not null` modifier

### Fixed
- Now using names of enum values in generated _index.js_ files if no explicit value is present

## Version 0.11.1 - 2023-10-12

### Changed

### Added
### Fixed
- Fixed how service names are exported as default export

## Version 0.11.0 - 2023-10-10

### Changed

### Added
- Autoexposed entities in services are now also generated
- Each generated class now contains their original fully qualified name in a static `.name` property
- Inline enums that are defined as literal type of properties are now supported as well (note: this feature is experimental. The location to which enums are generated might change in the future!)

### Fixed
- Fixed an error when an entity uses `type of` on a property they have inherited from another entity
- Fixed an error during draftability propagation when defining compositions on types that are declared inline

### Removed
- `compileFromCSN` is no longer part of the package's API

## Version 0.10.0 - 2023-09-21

### Changed
- Actions and functions are now attached to a static `.actions` property of each generated class. This reflects the runtime behaviour better than the former way of generating instance methods

### Added

### Fixed

## Version 0.9.0 - 2023-09-08

### Changed

### Added
- Support for drafts via `@odata.draft.enabled` annotation

### Fixed
- Foreign keys are now propagated more than one level (think: `x_ID_ID_ID`)


## Version 0.8.0 - 2023-09-05

### Changed

### Added

### Fixed
- Foreign keys that are inherited via aspects are now also generated in addition to the resolved property (see 0.7.0)
- Explicitly annotated `@singular` and `@plural` names are now properly used in generated _index.js_ files


## Version 0.7.0 - 2023-08-22

### Changed

### Added
- Support for `[many] $self` syntax in bound action parameters
- Foreign keys are now present in the generated types in addition to the resolved property

### Fixed
## Version 0.6.1 - 2023-08-10

### Changed

### Added

### Fixed
- Removed a warning about circular imports

## Version 0.6.0 - 2023-08-07

### Added
- Support for `event` syntax

### Fixed
- Initialise bound actions with stubs to support `"strict":true` in _tsconfig.json_
- Add leading underscore to appease `noUnusedParameters` in strict tsconfigs
- No longer inflect `type` definitions when they are referenced within entities or other type definitions

## Version 0.5.0 - 2023-07-25

### Changed
- Facilitate strict property checks. Note: `checkJs: true` must be present in the project's _jsconfig.json_ or _tsconfig.json_ respectively for this feature to become effective

### Added
- Support for `array of` syntax

### Fixed
- Generate `string` type for date-related types in CDS definitions
- Generate `Buffer | string` type for the CDS type `LargeBinary`


## Version 0.4.0 - 2023-07-06
### Added
- Support for enums when they are defined separately (not inline in the property type of an entity)

## Version 0.3.0 - 2023-06-26
### Added
- Support `function` definitions (apart from `action`s)
### Changed
- Bump version to next minor

### Fixed
- Properly import CDS `type` definitions when they are referenced elsewhere

## Version 0.2.5-beta.1 - 2023-06-13

### Changed
- Bump version

## Version 0.2.4 - 2023-06-12
- Enable use of annotated singular/ plural names in associations/ compositions
- Rename package from `@sap/cds-dts-generator` to `@cap-js/cds-typer`

## Version 0.2.3 - 2023-05-17
- Add missing library files

## Version 0.2.2 - 2023-05-17
- Make class hierarchy flatter

## Version 0.2.1 - 2023-05-16
- Add missing files

## Version 0.2.0 - 2023-05-15
- use native Typescript AST in unit tests
- add `propertiesOptional` flag
- support flat, as well as nested inline declarations
- support `typeof` syntax
- read rudimentary configuration from cds.env
- export bound and unbound actions
- allow inline type definitions within compositions
- enable use of additional type libraries (HANA types available as first library)
- provide proper JSDoc for all modules
- export entity types for singular variants alongside plural types
## Version 0.1.1 - 2023-01-26
- add TL;DR section to README
- allow multiple positional arguments

## Version 0.1.0
- initial code base
