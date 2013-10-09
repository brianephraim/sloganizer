require.config({
    paths: {
        'jQuery': 'http://ajax.googleapis.com/ajax/libs/jquery/2.0.2/jquery.min',
        'mousewheel':'jquery.mousewheel',
        'underscore': 'underscore-min',
        'BrowserDetect':'browser-detect',
        'sloganizer' : 'sloganizer',
        'app':'app'
    },
    shim: {
        'jQuery': {
            exports: '$'
        },
        'underscore': {
            exports: '_'
        },
        'app': {
            exports: 'app'
        }
    }
});
require(['Tools','sloganizer','app','module2','Tools','jQuery','underscore','mousewheel','BrowserDetect'], function(Tools,sloganizer,app,module2ref,$,_,mousewheel,BrowserDetect){
	console.log('zxcvzxcv')
	var myApp = app;
	
    // do something with the loaded modules
    //var module1 = new module1ref(),
          //module2 = new module2ref();
    //console.log(module1.getName() === module2.getModule1Name()); // true
});