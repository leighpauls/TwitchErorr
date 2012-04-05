var express = require( "express" );
var fs = require("fs");

exports.runServer = function ( portNum ) {
	var app = express.createServer();

	app.use( express.bodyParser() );

	// makes a handler, tailor-made for get or post queries
	function handlerMaker( type ) {
		var input;
		if ("post" === type ) {
			input = "body";
		} else if ( "get" === type ) {
			input = "query";
		}

		return function ( req, res ) {
			// get the error code
			var errorCode = parseInt( req[input].error, 10 );
			if ( !errorCode ) {
				// no code, return a splash page
				fs.readFile( __dirname + '/splash.html', function( err, data ) {
					if ( err ) {
						res.writeHead( 500, { "content-type": "text/html" });
						res.end( err + "Lol, I couldn't load the splash page" );
					}
					res.writeHead( 200, { "content-type": "text/html" });
					res.end( data );
				});


				return;
			}

			// get the optional content
			var content = req[input].content;
			if ( !content ) {
				content = '';
			}

			// see if there's a request for a delay
			var delay = parseInt( req[input].delay, 10 );
			if ( delay ) {
				setTimeout( sendData, delay );
			} else {
				sendData();
			}


			function sendData() {
				res.writeHead( errorCode, {} );
				res.end( content );
			}
		}
	}

	app.get( "/", handlerMaker("get") );
	app.post( "/", handlerMaker("post") );

	app.listen( portNum );
}

if ( module === require.main ) {
	// look at the first parameter for the port num
	var portNum = parseInt( process.argv[2], 10 ) || 8080;

	exports.runServer( portNum );
}
