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


	//!!!!!!!!!!!!!!!!!!!!!!!!!!!
	//EXPECTS <whatev class="sloganizerAppWrapper"></whatev> in the DOM
	var app = function($,tools, sloganizer){
		$(function() {//DOCUMENT READY

			//**************************
			//DEFINING THE INITIAL WORD BANKS
			var wordBanks = [
				['Accomplish', 'Adjust', 'Arrange', 'Assemble', 'Beget'],
				['adorable', 'adventurous', 'aggressive'],
				['appeals','cans'],
				['carefully.']
			];

			//**************************
			//APP PAGE TEMPLATING.  THIS IS JUST A BUNCH OF JQUERY OBJECT CREATION AND APPENDING.
			//THE GENERATED HTML COULD JUST AS WELL HAVE BEEN WRITTEN IN THE HTML FILE AND THEN $SELECTED IN THE JS AS NEEDED
			//HTML WRITTER HERE INSTEAD FOR CONVENIENCE INSTANTIATING THE DEMO APP WITH REQUIRE JS

			var $appWrap = $('.sloganizerAppWrapper');

			var $header = $('<h2>Sloganizer.js</h2>');
			$appWrap.append($header);

			var $demoSloganizer = $('<div class="demoSloganizer"></div>');
			$appWrap.append($demoSloganizer);

			var $mainButtonWrapper = $('<div></div>');
			$appWrap.append($mainButtonWrapper);

			var $randomizeButton = $('<button>Sloganize</button>');
			var $resizeButton = $('<button>Resize</button>');
			$mainButtonWrapper.append($randomizeButton).append($resizeButton);

			$appWrap.append(
				'<h4>Word banks</h4>'+
				'<p>Each word slot in the slogan has a word bank.</p>'+
				'<p>Edit the word banks below.  Use commas to seperate each of the entries.</p>'+
				'<p>Note: Whatever word is part of the current sentence will be added to that words input field below when you click "apply".</p>'
			);
			
			var $wordBankContainer = $('<div></div>');
			$appWrap.append($wordBankContainer);

			var $wordBankTextAreas = $();
			for(var i=0,l=wordBanks.length;i<l;i++){
				$wordBankTextAreas = $wordBankTextAreas.add($('<textarea></textarea>'));
			};
			$wordBankContainer.append($wordBankTextAreas);
			var $wordBankButton = $('<button>Apply Wordbank</button>');
			$appWrap.append($wordBankButton);

			$appWrap.append(
				'<h4>Force a sentence</h4>'+
				'<p>Make a sloganizer say something specific</p>'+
				'<p>This will add each of these words to each of the word banks respectively.</p>'
			);

			var $forcedSentenceInputContainer = $('<div></div>');
			$appWrap.append($forcedSentenceInputContainer);
			var $forcedWordsInputs = $();
			for(var i=0,l=wordBanks.length;i<l;i++){
				$forcedWordsInputs = $forcedWordsInputs.add($('<input />'));
			};
			$forcedSentenceInputContainer.append($forcedWordsInputs);

			var $forcedSentenceButton = $('<button>Apply Forced Sentence</button>');
			$forcedSentenceInputContainer.append($forcedSentenceButton)
			
			//END TEMPLATING
			//****************

			var mySloganizer = sloganizer.createSloganizer({
				$el: $demoSloganizer,
				wordBanks: wordBanks,
				forcedSentenceArray: ['Do','fun','things','sometime.'],
				initializeCallback: function(that){
					for(var i=0, l=that.wordBanks.length; i<l; i++){
						//that.wordBanks[i]
						$wordBankTextAreas.eq(i).val(that.wordBanks[i])
					}

				}

			})
			mySloganizer.summonWheels(25);


			$wordBankButton.on('click',function(){
				$wordBankTextAreas.each(function(i){
					var $this =  $(this);
					mySloganizer.wordBanks[i] = $this.val().split(',')

				})
				mySloganizer.reinitialize()
			})

			$forcedSentenceButton.on('click',function(){
				var forcedArray = [];
				$forcedWordsInputs.each(function(i){
					var $this =  $(this);
					forcedArray.push($this.val())
				})
				mySloganizer.forceASentence(forcedArray)
			})

			
			$randomizeButton.on('click',function(){
				mySloganizer.summonWheels(25);
			})

			$resizeButton.on('click',function(){
				mySloganizer.$el.css('font-size','20px')
				mySloganizer.reinitialize()
			})	
		});
		return 'Hi i am return app';
	};


	if (typeof exports === 'object') {
		// nodejs
		module.exports = app($,tools, sloganizer);
	} else if (typeof define === 'function' && define.amd) {
		// AMD
		define(['jQuery','tools','sloganizer'],function(){ 
			return app.apply(null,arguments);
		});
	} else if (typeof global.app === 'undefined') {
		// Browser: Make `Tweenable` globally accessible.
		global.app = app($,tools, sloganizer);
	}



})(this);


