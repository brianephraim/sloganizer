;(function(global){
	// UglifyJS define hack.  Used for unit testing.
	if (typeof TOOLS_NOW === 'undefined') {
	  TOOLS_NOW = function () {
	    return +new Date();
	  };
	}

	if (typeof TOOLS === 'undefined') {
	  var global = (function(){return this;})();
	}
	var makeTools = function($){
		//---------
		//Monkey Patches
		//----------
		
		//Fix ios6 safari ajax cacheing
		//http://stackoverflow.com/questions/12506897/is-safari-on-ios-6-caching-ajax-results
		$.ajaxPrefilter(function (options, originalOptions, jqXHR) {
			if (typeof originalOptions.data == 'string'){
				options.data = originalOptions.data + '&random='+ Math.floor(Math.random() *10000);
			} else {
				 options.data = jQuery.param(originalOptions.data) + '&random='+ Math.floor(Math.random() *10000);
			}
			// you can use originalOptions.type || options.type to restrict specific type of requests
		});
		
		//-------
		//MONKEY PATCHES
		//------
		//http://paulirish.com/2011/requestanimationframe-for-smart-animating/
		//http://jsfiddle.net/jTZCy/
		// requestAnim shim layer by Paul Irish
		window.requestAnimFrame = (function(){
		  return  window.requestAnimationFrame       || 
				  window.webkitRequestAnimationFrame || 
				  window.mozRequestAnimationFrame    || 
				  window.oRequestAnimationFrame      || 
				  window.msRequestAnimationFrame     || 
				  function(/* function */ callback, /* DOMElement */ element){
					window.setTimeout(callback, 1000 / 60);
				  };
		})();

		// Add ECMA262-5 Array methods if not supported natively
		// http://stackoverflow.com/a/2790686/1242000
		if (!('indexOf' in Array.prototype)) {
		    Array.prototype.indexOf= function(find, i /*opt*/) {
		        if (i===undefined) i= 0;
		        if (i<0) i+= this.length;
		        if (i<0) i= 0;
		        for (var n= this.length; i<n; i++)
		            if (i in this && this[i]===find)
		                return i;
		        return -1;
		    };
		}


		

		//************************* 
		//COOKIES--------------------
		//*********************
		var cookies = function(){}
		cookies.prototype.createCookie = function(name,value,days){
			if (days) {
				var date = new Date();
				date.setTime(date.getTime()+(days*24*60*60*1000));
				var expires = "; expires="+date.toGMTString();
			}
			else var expires = "";
			console.log(name+"="+value+expires+"; path=/")
			document.cookie = name+"="+value+expires+"; path=/"; 
		}
		
		cookies.prototype.readCookie = function(name){
			var nameEQ = name + "=";
			var ca = document.cookie.split(';');
			for(var i=0;i < ca.length;i++) {
				var c = ca[i];
				while (c.charAt(0)==' ') c = c.substring(1,c.length);
				if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
			}
			return null;
		}
		
		cookies.prototype.eraseCookie = function(name){
			objInstance.createCookie(name,"",-1);
		}


		//************************* 
		//MATH--------------------
		//*********************
		var math = function(){}
		math.prototype.returnRandomInt = function(min,max){
			return Math.floor(Math.random() * (max - min + 1)) + min;
		}


		math.prototype.returnDistance = function(lat1,lon1,lat2,lon2){
			function toRad(Value) {
				return Value * Math.PI / 180;/* Converts numeric degrees to radians */
			}	
			var distance = Math.round(100*(( 3959 * Math.acos( Math.cos( toRad( lat1 ) ) * Math.cos( toRad( lat2 ) ) * Math.cos( toRad( lon2 ) - toRad( lon1 ) ) + Math.sin( toRad( lat1 ) ) * Math.sin( toRad( lat2 ) ) ) )))/100;
			return distance;
		}

		//**********************
		//GET PAGEYOFFSET BECAUSE IE IS STUPID
		//**********************
		var dom = function(){
			this.translate3dKey = (function(x,y,z){
				var modernizrPrefixedTransform = Modernizr.prefixed('transform')
				if(modernizrPrefixedTransform == false){modernizrPrefixedTransform='ie7or8'}
				modernizrPrefixedTransform = modernizrPrefixedTransform.replace(/([A-Z])/g, function(modernizrPrefixedTransform,m1){ return '-' + m1.toLowerCase(); }).replace(/^ms-/,'-ms-');
				return modernizrPrefixedTransform;
			})()

			//http://stackoverflow.com/questions/5661671/detecting-transform-translate3d-support
			this.hasTranslate3d = (function(){var e=document.createElement("p"),t,n={webkitTransform:"-webkit-transform",OTransform:"-o-transform",msTransform:"-ms-transform",MozTransform:"-moz-transform",transform:"transform"};document.body.insertBefore(e,null);for(var r in n){if(e.style[r]!==undefined){e.style[r]="translate3d(1px,1px,1px)";t=window.getComputedStyle(e).getPropertyValue(n[r])}}document.body.removeChild(e);return t!==undefined&&t.length>0&&t!=="none"})()
		}
		
		dom.prototype.getYOffset = function(){
			var pageY;
			if(typeof(window.pageYOffset)=='number') {
			   pageY=window.pageYOffset;
			}
			else {
			   pageY=document.documentElement.scrollTop;
			}
			return pageY;
		}
		
		dom.prototype.translate3dKey = function(x,y,z){
			var modernizrPrefixedTransform = Modernizr.prefixed('transform')
			if(modernizrPrefixedTransform == false){modernizrPrefixedTransform='ie7or8'}
			modernizrPrefixedTransform = modernizrPrefixedTransform.replace(/([A-Z])/g, function(modernizrPrefixedTransform,m1){ return '-' + m1.toLowerCase(); }).replace(/^ms-/,'-ms-');
			return modernizrPrefixedTransform;
		}
		dom.prototype.translate3dValue = function(x,y,z){
			return 'translate3d('+x+'px,'+y+'px,'+z+'px)'
		}

		// Tools.cssTransitioner({
		// 	target: $('someDiv),
		// 	cssProperty: tools.dom.translate3dKey(),
		// 	cssValue: tools.dom.translate3dValue(0,0,0),
		// 	duration: 500,
		// 	ease: 'ease-out',
		// 	callback: function($that){

		// 	}
		// });

		dom.prototype.cssTransitioner2 = function(cssTransObj){
			var self = this;
			if(typeof cssTransObj.cssValue === 'object'){
				if(cssTransObj.cssValue.type ==='translate3d'){
					var cssData = {
						'position':'relative',
						'left':cssTransObj.cssValue.values[0]+'px',
						'top':cssTransObj.cssValue.values[1]+'px'
					}
					cssData[cssTransObj.cssProperty] = cssTransObj.cssValue.type + '('+-cssTransObj.cssValue.values[0]+'px,'+-cssTransObj.cssValue.values[1]+'px,'+-cssTransObj.cssValue.values[2]+'px)';
					cssTransObj.target.css(cssData)
					setTimeout(function(){
						cssTransObj.cssValue = 'translate3d(0px, 0px, 0px)';
						var cssTransObjClone = $.extend({},cssTransObj,{})
						cssTransObj.callback = function(){
							cssTransObjClone.callback();
						}
						//var asdf = $.extend({},cssTransObj,{})
						self.cssTransitioner(cssTransObj)
						//cssTransObj.target.css(cssTransObj.cssProperty,'translate3d(0px 0px 0px)');	
					},0)
					
					
					//

				}
			}
				

		}

		dom.prototype.cssTransitioner = function(cssTransObj){
			if(typeof cssTransObj.duration === 'undefined'){
				cssTransObj.duration = 1200;
			}
			if(typeof cssTransObj.ease === 'undefined'){
				cssTransObj.ease = 'ease-out';
			}
			cssTransObj.target.css({
				'-webkit-transition': cssTransObj.cssProperty+' '+cssTransObj.duration+'ms '+cssTransObj.ease
			})
			cssTransObj.target.bind("transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd",function(event){
				if(cssTransObj.target.is($(event.target))){//a selector of more than one jqueryObject might be passed.  Also, there could be transitions on child element (like buttons) and child element transitions trigger the callback.  So this conditional confirms that it's the targeted element itself that gets listened to and this works for a selector of multiple elements.
				//if(event.target == cssTransObj.target[0]){
					//(event.originalEvent.propertyName + ' - - - ping')
					if(event.originalEvent.propertyName.indexOf(cssTransObj.cssProperty) !=-1){//unintended css events leaked through, messing up sequence.  COnditional here fixes it.  Might use property name as argument so this is customizable.
						cssTransObj.target.unbind('transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd');
						cssTransObj.target.css({'-webkit-transition': ''})
						cssTransObj.callback(cssTransObj.target);	
					}
				}
			})
			setTimeout(function(){
				//requestAnimFrame(function(){
				cssTransObj.target.css(cssTransObj.cssProperty,cssTransObj.cssValue)
				//});
			},0)
		}
		
		//If an $el doesn't exist, create it.  If it does, select it.
		dom.prototype.selectAndMaybeCreate = function($parent,className){
			var $myel = 
				$('> .'+className, $parent).length ? 
				$('> .'+className, $parent) : 
				$('<div class="'+className+'"></div>').appendTo($parent);
			return $myel;
		}

		

		//EVENT STUFF
		dom.prototype.fullEventCancel = function(event){
			event.preventDefault(); 
			event.stopPropagation();
			return false;
		};

		//If you want to use a prefix-classname DOM variable pattern.  Find a classname with a specified prefix from an $element.
		dom.prototype.returnClassNameWithSomePrefix = function($el,prefixString){
			var foundClass = '';
			$.each($el.attr('class').split(/\s/), function( _, cn ) {
				if( cn.indexOf(prefixString) === 0 ) { foundClass = cn; return false; }//hulk
			});
			return foundClass;
		}

		//------
		//ANIMATION STUFF
		//------
		
		//Animate a filling out of the value of an $input.
		dom.prototype.autoType = function($input,aTextString){
			var from = {property: 0};
			var to = {property: (aTextString.length + 1)};
			$(from).animate(to, {
				duration: aTextString.length * 80,
				easing: 'swing',
				step: function() {
					$input.val(aTextString.slice(0,this.property))
				},
				complete: function() {
				}
			});
		}



		

		



			
		//---------
		//DEVICE INFO
		//----------
		
		
		
		
		
		//------
		//DATA STUFF
		//------
		var data = function(){}
		data.prototype.filterFromObject = function(anObject, anArrayOfKeys){
			var anObjectCopy = anObject;
			for(var i=0;i < anArrayOfKeys.length;i++) {
				delete anObject[(anArrayOfKeys[i])];
			}
			return anObjectCopy;
		}
		
		//------
		//DOM STUFF
		//------
		
		
		var obj = function(){
			this.clickLockRegistry = new Object();
			this.cookies = new cookies()
			this.dom = new dom()
			this.data = new data()
			this.math = new math()
		}
		
		
		//Different devices use different CSS to do jaw movement.  CSS properties and value are abstracted and assigned below.
		var Tools = new obj();
		

		return Tools;
	};


	if (typeof exports === 'object') {
		// nodejs
		module.exports = makeTools($);
	} else if (typeof define === 'function' && define.amd) {
		// AMD
		define(['jQuery'],function (jQuery) { return makeTools(jQuery); });
	} else if (typeof global.Tools === 'undefined') {
		// Browser: Make `Tweenable` globally accessible.
		global.Tools = makeTools($);
	}



})(this);