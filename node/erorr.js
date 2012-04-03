var app = require( "express" ).createServer();

app.get( "/", function( req, res ) {
	var errorCode = parseInt( req.query.error, 10 );

	if ( !errorCode ) {
		// no code, return a splash page
		res.send( "Use thisserver.com/?error=XYZ, where XYZ is any valid server reponse code, and it will be returned\n" );
		return;
	}

	res.writeHead( errorCode, {} );
	res.end( "dummy content\n" );
});

app.listen( 8080 );


