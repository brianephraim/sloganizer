require.config({
	//THESE ARE LIBRARIES THAT AREN'T AMD COMPLIANT.
    paths: {
    	//'PATH-NICKNAME : LIBRARY-URL'
        'jQuery': 'http://ajax.googleapis.com/ajax/libs/jquery/2.0.2/jquery.min',
        'mousewheel':'jquery.mousewheel'
    },
    //THIS IS WHERE YOU TELL REQUIRE WHAT VARIABLE EACH LIBRARY TRIES TO ADD THE GLOBAL SO IT KNOWS WHAT TO LISTEN FOR
    shim: {
        'jQuery': {
            exports: '$'
        }
    }
});
require(['module2'], function(){
	console.log('asdf')
	require(['module2'], function(x){//THIS IS THE SECOND TIME module2 HAS BEEN REQUIRED, BUT ITS BOILERPLATE ONLY FIRE'S ONCE.  IT'S EFFICIENT.
		console.log(new x().getModule1Name())
	});
});