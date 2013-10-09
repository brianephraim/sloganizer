;(function(global){
	// UglifyJS define hack.  Used for unit testing.
	if (typeof APP_NOW === 'undefined') {
	  APP_NOW = function () {
	    return +new Date();
	  };
	}

	if (typeof APPS === 'undefined') {
	  var global = (function(){return this;})();
	}



	var app = function(Tools, sloganizer){
		$(function() {
			console.log(sloganizer)
			var $wordBankTextAreas = $('.wordBanks textarea');
			var $forcedWordsInputs = $('.forcedWords input');

			var $sloganizerWrapper = $('.mySloganizerWrapper');
			console.log(sloganizer)
			var mySloganizer = sloganizer.createSloganizer({
				$el: $sloganizerWrapper.find('.sloganizer'),
				wordBanks: [
					['Accomplish', 'Adjust', 'Arrange', 'Assemble', 'Beget'],
					['adorable', 'adventurous', 'aggressive'],
					['appeals','cans'],
					['carefully.']
				],
				forcedSentenceArray: ['Do','fun','things','sometime.'],
				initializeCallback: function(that){
					console.log('initializeCallback',that.wordBanks)
					$wordBankTextAreas
					for(var i=0, l=that.wordBanks.length; i<l; i++){
						//that.wordBanks[i]
						$wordBankTextAreas.eq(i).val(that.wordBanks[i])
					}

				}

			})
			mySloganizer.summonWheels(25);


			$('.applyButton').on('click',function(){
				$wordBankTextAreas.each(function(i){
					var $this =  $(this);
					mySloganizer.wordBanks[i] = $this.val().split(',')

				})
				mySloganizer.reinitialize()
			})

			$('.forcedButton').on('click',function(){
				var forcedArray = [];
				$forcedWordsInputs.each(function(i){
					var $this =  $(this);
					forcedArray.push($this.val())
				})
				mySloganizer.forceASentence(forcedArray)
				//mySloganizer.summonWheels(25);
			})

			
			$sloganizerWrapper.find('.randomizeButton').on('click',function(){
				mySloganizer.summonWheels(25);
			})

			$sloganizerWrapper.find('.resizeButton').on('click',function(){
				mySloganizer.$el.css('font-size','20px')
				mySloganizer.reinitialize()
			})

			

				
		});
		return 'Hi i am return app';
	};


	if (typeof exports === 'object') {
	// nodejs
		module.exports = app(Tools, sloganizer);
	} else if (typeof define === 'function' && define.amd) {
	// AMD
		define(['Tools','sloganizer'],function (Tools, sloganizer) { return app(Tools, sloganizer); });
	} else if (typeof global.app === 'undefined') {
	// Browser: Make `Tweenable` globally accessible.
	global.app = app(Tools, sloganizer);
	}



})(this);


