namespace views_test;

entity Foo {
    id: Integer;
    code: String;
    flag: Boolean;
}

entity FooView as
    select from Foo {
        id,
        code,
        code as alias
    };
