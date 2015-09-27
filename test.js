var assert = require( "assert" );
var qsstream = require( "./index" )

it( "parses a single inline querystring", function ( done ) {
    var results = [];
    qsstream()
        .on( "data", results.push.bind( results ) )
        .on( "end", function () {
            assert.deepEqual( results, [
                { hello: "world" }
            ]);
            done();
        })
        .end( "?hello=world" )
})

it( "parses multi-line query strings", function ( done ) {
    var results = [];
    qsstream()
        .on( "data", results.push.bind( results ) )
        .on( "end", function () {
            assert.deepEqual( results, [
                { hello: "world" },
                { foo: "bar" },
            ]);
            done();
        })
        .end( "hello=world\nfoo=bar" )
})

it( "disregards excessive whitespaces", function ( done ) {
    var results = [];
    qsstream()
        .on( "data", results.push.bind( results ) )
        .on( "end", function () {
            assert.deepEqual( results, [
                { hello: "world" },
                { foo: "bar" }
            ]);
            done();
        })
        .end( "\n\n\thello=world  \n\n   foo=bar\n\n" )
})

it( "streams partial data", function ( done ) {
    var results = [], initial, partial;
    var stream = qsstream()
        .on( "data", results.push.bind( results ) )
        .on( "end", function () {
            assert.deepEqual( initial, [] );
            assert.deepEqual( partial, [
                { hello: "world", foo: "bar" }
            ]);
            assert.deepEqual( results, [
                { hello: "world", foo: "bar" },
                { cookie: "monster" }
            ])
            done();
        });
        
    stream.write( "hello=world&foo" );
    initial = results.slice(); // copy the results at this point

    stream.write( "=bar\ncookie=monster" );
    partial = results.slice(); // copy the results at this point

    stream.end();
})

