;(function(global){
	// UglifyJS define hack.  Used for unit testing.
	if (typeof SLOGANIZER_NOW === 'undefined') {
	  SLOGANIZER_NOW = function () {
	    return +new Date();
	  };
	}

	if (typeof SLOGANIZER === 'undefined') {
	  var global = (function(){return this;})();
	}


	//************
	//LOGIC HERE
	var sloganizer= function(options){
		var defaults = {
			$el: '',
			wheelWordCount:6,
			wordBanks:''
		};
		this.settings = $.extend({}, defaults, options);
		this.wordHeight = 0;
		this.currentSentence = '';
		this.wordBankObjs = [];


		this.initialize()
		this.randomizeCurrentWordObjs();
		
	};
	sloganizer.prototype.summonWheels = function(wheelLength){
		var self = this;
		var clones = [];
		var animationArray = [];
		var callbackCount = 0;
		for(var i = 0; i<wheelLength; i++){
			this.randomizeCurrentWordObjs()
			for(var j = 0; j<this.wordBankObjs.length; j++){
				this.wordBankObjs[j].wheelLengthXXX = (wheelLength-(Math.round(wheelLength/6)*(this.wordBankObjs.length - j)));
				console.log(this.wordBankObjs[j].wheelLengthXXX)
				if(i === this.wordBankObjs[j].wheelLengthXXX - 1){
					this.wordBankObjs[j].$el.append(this.wordBankObjs[j].currentWordObj.$el)
				} else {
					if(i < this.wordBankObjs[j].wheelLengthXXX - 1){
						var $clone = this.wordBankObjs[j].currentWordObj.$el.clone()
						this.wordBankObjs[j].$el.append($clone)
						clones.push($clone);
					}
				}
			}			
		}

		for(var j = 0; j<this.wordBankObjs.length; j++){
			self.settings.$el.append(self.wordBankObjs[j].$el)
			Tools.dom.cssTransitioner2({
				target: self.wordBankObjs[j].$el,
				cssProperty: Tools.dom.translate3dKey,
				cssValue: {
					type:'translate3d',
					values:[0,-(this.wordBankObjs[j].wheelLengthXXX - 1)*this.wordHeight,0]
				},
				duration: 500,
				ease: 'ease-out',
				duration:this.wordBankObjs[j].wheelLengthXXX * 110,
				callback: function($that){
					console.log('original callback')
					if(callbackCount === self.wordBankObjs.length - 1){
						console.log('done!!!',clones.length)

					} else {
						console.log('not',callbackCount)
					}
					callbackCount ++;
				}
			});
		}
	};
	sloganizer.prototype.initialize = function(){
		var wordHeight = 0;
		
		for(var i = 0, l = this.settings.wordBanks.length; i<l; i++){
			var isEndOfSentence = l - i === 1 ? true : false;
			var $wheel = $('<div class="sloganizerWheel" style="float:left;position:relative;"></div>');
			this.settings.$el.append($wheel);
			var widestWord = 0;
			var wordObjs =[]
			for(var j = 0, m = this.settings.wordBanks[i].length; j<m; j++){
				var word = (this.settings.wordBanks[i][j]);
				var wordClean = word;
				if(!isEndOfSentence){
					word += '&nbsp;';
				}
				var $word = $('<div class="sloganizerWord" style="float:left;clear:both;margin:0 auto;opacity:0;">'+word+'</div>');
				$wheel.append($word)
				if(wordHeight === 0){
					wordHeight = $word.outerHeight();
				}
				if(wordHeight === 0){
					wordHeight = $word.outerHeight();
				}
				this.wordHeight = wordHeight;
				var wordWidth = $word.outerWidth();
				if(wordWidth > widestWord){
					widestWord = wordWidth;
				}
				$word.remove();
				$word.css({
					'float':'none',
					'width':wordWidth+'px',
					'opacity':''
				})
				wordObjs.push({
					$el:$word,
					word:wordClean,
					width:wordWidth
				})
			}
			$wheel.css({
				'width':widestWord+'px'
				//'height':(this.settings.wordBanks[i].length * wordHeight)+'px',
			});
			//console.log(widestWord)
			this.wordBankObjs.push({
				$el:$wheel,
				wordObjs:wordObjs,
				wordBank:this.settings.wordBanks[i],
				currentWordObj:null,
				dyingWordObj:null,
				currentSentence:null,
				currentIndex:0,
				currentWord:this.settings.wordBanks[i][0],
				dyingIndex:null,
				dyingWord:null
			})
			$wheel.remove()
			
			this.settings.$el.css({
				'height':this.wordHeight + 'px',
				'overflow':'hidden'
			});
			
		}
	}
	sloganizer.prototype.randomizeCurrentWordObjs = function(){
		var sentence = ''
		for(var i = 0, l = this.wordBankObjs.length; i<l; i++){
			this.wordBankObjs[i].dyingWordObj = this.wordBankObjs[i].currentWordObj
			var wordObjs = this.wordBankObjs[i].wordObjs;
			this.wordBankObjs[i].dyingIndex = this.wordBankObjs[i].currentIndex;
			this.wordBankObjs[i].dyingWord = this.wordBankObjs[i].currentWord;
			if(wordObjs.length === 1){

			} else 
			if(wordObjs.length <= 2){
				if(this.wordBankObjs[i].currentIndex === 0){
					this.wordBankObjs[i].currentIndex = 1;
				} else {
					this.wordBankObjs[i].currentIndex = 0;
				}
			} else {
				var randomIndex = Tools.math.returnRandomInt(0,wordObjs.length - 1);
				if(randomIndex === this.wordBankObjs[i].currentIndex){
					randomIndex += 1;
					if(randomIndex > wordObjs.length - 1){
						randomIndex += -2;
					}
				}
				
				this.wordBankObjs[i].currentIndex = randomIndex;
			}
			var indexedWordObj = wordObjs[this.wordBankObjs[i].currentIndex]

			sentence += indexedWordObj.word;

			this.wordBankObjs[i].currentWordObj = indexedWordObj;
			
		}
		//console.log(sentence)
	}





	var sloganizerInitializer = function(){};
	sloganizerInitializer.prototype.createSloganizer = function(arguments){
		return new sloganizer(arguments)
	}

	var Sloganizer = new sloganizerInitializer();
	//return objInstance;

	if (typeof exports === 'object') {
		// nodejs
		module.exports = Sloganizer;
	} else if (typeof define === 'function' && define.amd) {
		// AMD
		define(function () { return Sloganizer; });
	} else if (typeof global.Sloganizer === 'undefined') {
		// Browser: Make `Tweenable` globally accessible.
		global.Sloganizer = Sloganizer;
	}

	return Sloganizer;


})(this);