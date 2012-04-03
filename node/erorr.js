var app = require( "express" ).createServer();

app.get( "/", function( req, res ) {

	// get the error code
	var errorCode = parseInt( req.query.error, 10 );
	if ( !errorCode ) {
		// no code, return a splash page
		// TODO: make this not a piece of crap
		res.send( "Use thisserver.com/?error=XYZ, where XYZ is any valid server reponse code, and it will be returned\n" );
		return;
	}

	// get the optional content
	var content = req.query.content;
	if ( !content ) {
		content = '';
	}

	// see if there's a request for a delay
	var delay = parseInt( req.query.delay, 10 );
	if ( delay ) {
		setTimeout( sendData, delay );
	} else {
		sendData();
	}


	function sendData() {
		res.writeHead( errorCode, {} );
		res.end( content );
	}
});

// look at the first parameter for the port num
var portNum = parseInt( process.argv[2], 10 ) || 8080;
app.listen( portNum );


