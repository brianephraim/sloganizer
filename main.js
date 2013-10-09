require.config({
	//THESE ARE LIBRARIES THAT AREN'T AMD COMPLIANT.
    paths: {
    	//'LIBRARY-NAME : LIBRARY-URL'
        'jQuery': 'http://ajax.googleapis.com/ajax/libs/jquery/2.0.2/jquery.min',
        'mousewheel':'jquery.mousewheel',
        'underscore': 'underscore-min'
    },
    //THIS IS WHERE YOU MAP THE FROM THE LIBRARY-NAME ABOVE TO THE GLOBAL VARIABLE THEY RETURN
    shim: {
        'jQuery': {
            exports: '$'
        },
        'underscore': {
            exports: '_'
        }
    }
});
require(['BrowserDetect','app','module2'], function(jQueryReference,BrowserDetect,etc,whatev,names,you,want){
	console.log(jQueryReference)
	console.log('BrowserDetect',BrowserDetect)
	
});