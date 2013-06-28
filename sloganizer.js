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
		this.currentSentenceObj = {
			sentence: '',
			$el: $(),
			wordBankObjs: []
		};
		this.wordBankObjs = [];
		this.clones=$();

		this.initialize()
		//this.randomizeCurrentWordObjs();
		
		
	};
	sloganizer.prototype.formulateWheelsAndSentence = function(wheelLength){
		var self = this;
		var sentenceArray = [];
		for(var i = 0; i<wheelLength; i++){
			//this.randomizeCurrentWordObjs()
			for(var j = 0; j<this.wordBankObjs.length; j++){
				this.wordBankObjs[j].wheelLengthXXX = (wheelLength-(Math.round(wheelLength/6)*(this.wordBankObjs.length - j)));
				if(i === this.wordBankObjs[j].wheelLengthXXX - 1){
					var $nonClone = this.wordBankObjs[j].currentWordObj.$el
					this.wordBankObjs[j].$el.append($nonClone)
					this.wordBankObjs[j].actualCurrentWordObj = this.wordBankObjs[j].currentWordObj;
					sentenceArray[j] = this.wordBankObjs[j].currentWordObj.word;
					this.currentSentenceObj.wordBankObjs[j] = this.wordBankObjs[j].currentWordObj.word;
				} else {
					if(i < this.wordBankObjs[j].wheelLengthXXX - 1){
						var $clone = this.wordBankObjs[j].currentWordObj.$el.clone()
						this.wordBankObjs[j].$el.append($clone)
						this.clones.push($clone);
						self.randomizeWordBankObj(self.wordBankObjs[j])
					}
				}
			}			
		}
		var sentenceX = sentenceArray.join('');
		this.currentSentence = sentenceX;
		this.currentSentenceObj.sentence = sentenceX;
	}
	sloganizer.prototype.insertWheelsAnimateAndResolveSentence = function(){
		var self = this;
		var callbackCount = 0;
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
					if(callbackCount === self.wordBankObjs.length - 1){
						for(var k = 0, n = self.clones.length; k < n; k++){
							self.clones[k].remove()
						}
						var $tempWheelContainer = $('<div style="position:absolute;opacity:0;"></div>');
						self.settings.$el.append($tempWheelContainer);
						var compactSentenceWidth = 0;
						var fullWidth = 0;
						var sentence = '';
						for(var k = 0, n = self.wordBankObjs.length; k < n; k++){
							
							sentence += self.wordBankObjs[k].currentWord;
							fullWidth += (self.wordBankObjs[k].widestWordWidth);
							compactSentenceWidth += self.wordBankObjs[k].actualCurrentWordObj.width;
							self.wordBankObjs[k].$el.css({'top':'0'})
							var $tempWheel = self.wordBankObjs[k].$el.clone();
							$tempWheel.css('width','')
							$tempWheelContainer.append($tempWheel)
							self.wordBankObjs[k].horizontalShift = $tempWheel.offset().left - self.wordBankObjs[k].actualCurrentWordObj.$el.offset().left;
						}
						var shiftMiddleAdjustValue = (fullWidth - compactSentenceWidth)/2;
						$tempWheelContainer.remove();

						var callbackCount2 = 0;
						for(var k = 0, n = self.wordBankObjs.length; k < n; k++){
							Tools.dom.cssTransitioner2({
								target: self.wordBankObjs[k].$el,
								cssProperty: Tools.dom.translate3dKey,
								cssValue: {
									type:'translate3d',
									values:[self.wordBankObjs[k].horizontalShift + shiftMiddleAdjustValue,0,1]
								},
								duration: 500,
								ease: 'ease-out',
								duration:1000,
								callback: function($that){
									console.log('TTTTTTERTRTRT')
									if(callbackCount2 === n - 1){
										self.currentSentenceObj.$el = $('<div style="position:absolute;top:0;z-index:9999;width:'+fullWidth+'px;text-align:center;">'+self.currentSentence+'</div>');
										self.settings.$el.prepend(self.currentSentenceObj.$el)
										for(var a = 0, z = self.wordBankObjs.length; a < z; a++){
											self.wordBankObjs[a].$el.remove();
										}
									}
									callbackCount2++;
								}
							});
						}


						

					} else {

						console.log('not',callbackCount)
					}
					callbackCount ++;
				}
			});
		}

	}
	sloganizer.prototype.summonWheels = function(wheelLength){
		var self = this;
		this.currentSentenceObj.$el.remove()
		
		self.formulateWheelsAndSentence(wheelLength)
		self.insertWheelsAnimateAndResolveSentence()

		
	};
	sloganizer.prototype.initialize = function(){
		var self = this;
		
		console.log(self.currentSentenceObj.$el.length)
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
					word:word,
					width:wordWidth
				})
			}
			$wheel.css({
				'width':widestWord+'px'
				//'height':(this.settings.wordBanks[i].length * wordHeight)+'px',
			});
			console.log(this.settings.wordBanks[0])
			this.wordBankObjs.push({
				$el:$wheel,
				widestWordWidth: widestWord,
				wordObjs:wordObjs,
				wordBank:this.settings.wordBanks[i],
				currentWordObj:wordObjs[0],
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
		var self = this;
		self.currentSentence = ''
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

			self.currentSentence += indexedWordObj.word;
			//console.log(self.currentSentence)
			this.wordBankObjs[i].currentWordObj = indexedWordObj;
			
		}
	}

	sloganizer.prototype.randomizeWordBankObj = function(wordBankObj){
		var self = this;
		wordBankObj.dyingWordObj = wordBankObj.currentWordObj
		var wordObjs = wordBankObj.wordObjs;
		wordBankObj.dyingIndex = wordBankObj.currentIndex;
		wordBankObj.dyingWord = wordBankObj.currentWord;
		if(wordObjs.length === 1){

		} else 
		if(wordObjs.length <= 2){
			if(wordBankObj.currentIndex === 0){
				wordBankObj.currentIndex = 1;
			} else {
				wordBankObj.currentIndex = 0;
			}
		} else {
			var randomIndex = Tools.math.returnRandomInt(0,wordObjs.length - 1);
			if(randomIndex === wordBankObj.currentIndex){
				randomIndex += 1;
				if(randomIndex > wordObjs.length - 1){
					randomIndex += -2;
				}
			}
			
			wordBankObj.currentIndex = randomIndex;
		}
		var indexedWordObj = wordObjs[wordBankObj.currentIndex]
		wordBankObj.currentWordObj = indexedWordObj;
		console.log(indexedWordObj.word)
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