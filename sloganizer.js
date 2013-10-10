;(function(global){
	// UglifyJS define hack.  Used for unit testing..
	if (typeof SLOGANIZER_NOW === 'undefined') {
	  SLOGANIZER_NOW = function () {
	    return +new Date();
	  };
	}

	if (typeof SLOGANIZER === 'undefined') {
	  var global = (function(){return this;})();
	}


	var makeSloganizerObject = function($,tools){

		//************
		//LOGIC HERE
		var obj= function(options){ 
			var defaults = {
				$el: '',
				wordBanks:[],
				forcedSentenceArray: ['Make','random','slogans','now.'],
				initializeCallback:function(){}
			};
			this.settings = $.extend({}, defaults, options);

			this.initializeCallback = this.settings.initializeCallback;
			this.wordBanks = this.settings.wordBanks;
			this.$el = this.settings.$el;
			this.forcedSentenceArray = this.settings.forcedSentenceArray;

			this.initialize()
			
		};
		obj.prototype.formulateWheelsAndSentence = function(wheelLength){
			var self = this;
			this.$wheels.children().remove();
			var sentenceArray = [];
			for(var j = 0; j<this.wheelObjs.length; j++){

				var wheelObj = self.wheelObjs[j];
				wheelObj.wheelLengthXXX = (wheelLength-(Math.round(wheelLength/6)*(this.wheelObjs.length - j)));
				for(var i = 0; i<wheelObj.wheelLengthXXX; i++){
					if(i !== wheelObj.wheelLengthXXX - 1){//For the non-last iteration...
						if(i === 0){//For the first insert the current
							var $clone = wheelObj.currentSentenceAssignedWordObj.$el.clone();
						} else { //for all others, insert a random
							var randomWordObj = self.returnRandomWordObj(wheelObj)
							var $clone = randomWordObj.$el.clone()
						}
						wheelObj.$el.append($clone)
						this.clones.push($clone);
					} else { //for the last iteration
						if(wheelObj.forcedWord !== null){//if there's a forced word on deck... use it;
							wheelObj.currentBankAssignedWordObj = wheelObj.forcedWord;
							wheelObj.forcedWord = null;
						} else {
							var randomWordObj = self.returnRandomWordObj(wheelObj);
							if(randomWordObj.word === wheelObj.currentSentenceAssignedWordObj.word){
								randomWordObj = self.returnRandomWordObj(wheelObj);
							}

							wheelObj.currentSentenceAssignedWordObj
						}
						wheelObj.currentSentenceAssignedWordObj = wheelObj.currentBankAssignedWordObj;
						wheelObj.$el.append(wheelObj.currentSentenceAssignedWordObj.$el)
						sentenceArray[j] = wheelObj.currentBankAssignedWordObj.word;
					}
				}
			}

			var sentenceX = sentenceArray.join('');
			this.currentSentenceObj.sentence = sentenceX;
		}
		obj.prototype.returnRandomWordObj = function(wheelObj){
			var self = this;
			var newIndex = 0;
			var wordObjs = wheelObj.wordObjs;
			for(var i = 0, l = wheelObj.wordObjs.length; i < l; i++){
			}
			var currentWordObjIndex = wheelObj.wordObjs.indexOf(wheelObj.currentBankAssignedWordObj)
			if(wordObjs.length === 1){
			} else 
			if(wordObjs.length === 2){
				newIndex = currentWordObjIndex ===0 ? 1 : 0;
			} else {
				var randomIndex = tools.math.returnRandomInt(0,wordObjs.length - 1);
				if(wheelObj.currentBankAssignedWordObj.word === wordObjs[randomIndex].word){
					randomIndex += 1;
					if(randomIndex > wordObjs.length - 1){
						randomIndex += -2;
					}
				}
				newIndex = randomIndex;
			}
			var indexedWordObj = wordObjs[newIndex]
			wheelObj.currentBankAssignedWordObj = indexedWordObj;
			return indexedWordObj;
		}
		obj.prototype.animateSlots = function(){
			var self = this;
			//priming lateral animation
			tools.dom.cssTransitioner({
				target: self.$wheels,
				cssProperty: tools.dom.translate3dKey,
				cssValue: 'translate3d(0,0,0)',
				duration: 500,
				ease: 'ease-in-out',
				callback: function($that){
					slotAnimation();
				}
			});
			
			function slotAnimation(){
				var callbackCount = 0;
				for(var j = 0; j<self.wheelObjs.length; j++){
					tools.dom.cssTransitioner2({
						target: self.wheelObjs[j].$el,
						cssProperty: tools.dom.translate3dKey,
						cssValue: {
							type:'translate3d',
							values:[0,-(self.wheelObjs[j].wheelLengthXXX - 1)*self.wordHeight,0]
						},
						duration: 500,
						ease: 'ease-out',
						duration:self.wheelObjs[j].wheelLengthXXX * 110,
						callback: function($that){
							if(callbackCount === self.wheelObjs.length - 1){
								for(var k = 0, n = self.clones.length; k < n; k++){
									self.clones[k].remove()
								}
								self.lateralAnimation()
							} else {

							}
							callbackCount ++;
						}//end slot animation callback
					});
				}
			}
		}

		obj.prototype.shiftMiddleAdjustValuesAndHorizontalShifts = function(){
			var self = this;
			var $tempWheelContainer = $('<div style="position:absolute;opacity:1;width:'+self.fullWidth+'px"></div>');
			self.$el.append($tempWheelContainer);
			var compactSentenceWidth = 0;
			self.$wheels.css({'top':'0'})
			for(var k = 0, n = self.wheelObjs.length; k < n; k++){			
				compactSentenceWidth += self.wheelObjs[k].currentSentenceAssignedWordObj.width;
				var $tempWheel = self.wheelObjs[k].$el.clone();
				$tempWheel.css('width','')
				$tempWheelContainer.append($tempWheel)
				self.wheelObjs[k].horizontalShift = $tempWheel.offset().left - self.wheelObjs[k].currentSentenceAssignedWordObj.$el.offset().left;
			}
			self.$el.css('width',(self.fullWidth)+'px')
			self.shiftMiddleAdjustValue = (self.fullWidth - compactSentenceWidth)/2;
			$tempWheelContainer.remove();
		}
		obj.prototype.lateralAnimation = function(){
			var self = this;
			self.shiftMiddleAdjustValuesAndHorizontalShifts()
			var callbackCount2 = 0;
			for(var k = 0, n = self.wheelObjs.length; k < n; k++){
				self.wheelObjs[k].shiftAmount = self.wheelObjs[k].horizontalShift + self.shiftMiddleAdjustValue;

				var appendSentenceAndPrimeForMore = function(){
					self.currentSentenceObj.$el = $('<div style="position:absolute;top:0;z-index:9999;width:'+self.fullWidth+'px;text-align:center;">'+self.currentSentenceObj.sentence+'</div>');
					self.$el.prepend(self.currentSentenceObj.$el)
					for(var a = 0, z = self.wheelObjs.length; a < z; a++){
						self.wheelObjs[a].$el.remove();
						// self.wheelObjs[a].$el.css({
						// 	'left':'0'
						// });

						reprimeWordObjsArrayForCurrent(self.wheelObjs[a])
						function reprimeWordObjsArrayForCurrent(wordBankObj){
							var index = wordBankObj.wordObjs.indexOf(wordBankObj.currentSentenceAssignedWordObj)
							var currentTempRemoved = self.wheelObjs[a].wordObjs.splice(index, 1);
							wordBankObj.wordObjs.unshift(currentTempRemoved[0])
							wordBankObj.$el.css({
								'left':'0',
								'-webkit-transform':'translate3d('+(self.wheelObjs[a].shiftAmount)+'px,0,0)'
							})
							
						}
					}
					self.isInstantly = false;
					self.isLocked = false;
					//END OF THE SEQUENCE
					//END OF THE SEQUENCE
					//END OF THE SEQUENCE
					//END OF THE SEQUENCE
				}
				if(self.isInstantly){
					if(callbackCount2 === n - 1){
						appendSentenceAndPrimeForMore()
					}
					callbackCount2++;	
				} else {

					tools.dom.cssTransitioner2({
						target: self.wheelObjs[k].$el,
						cssProperty: tools.dom.translate3dKey,
						cssValue: {
							type:'translate3d',
							values:[self.wheelObjs[k].shiftAmount,0,1]
						},
						duration: 500,
						ease: 'ease-out',
						duration:1000,
						callback: function($that){
							if(callbackCount2 === n - 1){
								appendSentenceAndPrimeForMore()
							}
							callbackCount2++;
						}
					});
				}
			}
		}
		
		obj.prototype.summonWheels = function(wheelLength){
			var self = this;
			if(!self.isLocked){
				self.isLocked = true;
				this.currentSentenceObj.$el.remove()
				
				self.formulateWheelsAndSentence(wheelLength)
				if(self.isInstantly){
					for(var k = 0, n = self.clones.length; k < n; k++){
						self.clones[k].remove()
					}
					self.$el.append(self.$wheels)
					self.lateralAnimation()
				} else {
					self.$el.append(self.$wheels)
					self.animateSlots()
				}
			}
			
		};
		obj.prototype.returnWordObj = function(word,isEndOfSentence,$wheel){
			var self = this;
			var wordClean = word;
			if(!isEndOfSentence || word === ''){
				word += '&nbsp;';
			}
			var $word = $('<div class="sloganizerWord" style="float:left;clear:both;margin:0 auto;opacity:0;">'+word+'</div>');
			$wheel.append($word)
			if(self.wordHeight === 0){
				self.wordHeight = $word.outerHeight();
			}
			if(self.wordHeight === 0){
				self.wordHeight = $word.outerHeight();
			}
			var wordWidth = $word.outerWidth();
			$word.remove();
			$word.css({
				'float':'none',
				'width':wordWidth+'px',
				'opacity':''
			})
			return {
				$el:$word,
				word:word,
				unmodifiedWord:wordClean,
				width:wordWidth
			}

		}
		obj.prototype.reinitialize = function(){
			var self = this;
			var forcedSentenceArray = this.forcedSentenceArray;
			for(var i = 0, l = forcedSentenceArray.length; i < l; i++){
				this.forcedSentenceArray[i] = this.wheelObjs[i].currentSentenceAssignedWordObj.word.replace('&nbsp;','');
			}
			this.currentSentenceObj.$el.remove();
			this.initialize();
			this.summonWheels(1);
			
		}
		obj.prototype.forceASentence = function(forcedArray){
			var self = this;
			if(forcedArray.length !== this.wheelObjs.length){
				throw 'forced sentence array length must match number of wheels';
			}


			//If a bank doesn't have a forced word, push it.
			for(var i=0,l=this.wordBanks.length; i<l; i++){
				var indexOfForcedInWordBank = this.wordBanks[i].indexOf(forcedArray[i]);
				if(indexOfForcedInWordBank === -1){
					this.wordBanks[i].push(forcedArray[i])
				}
			}

			//Make new pushed words into objects
			this.reinitialize();

			//Make the this.forcedSentenceArray the argued array value.
			this.forcedSentenceArray = forcedArray;
			//Set the forced word property for each wheel.
			for(var i=0,l=this.wheelObjs.length; i<l; i++){
				for(var j=0, m=this.wheelObjs[i].wordObjs.length; j<m; j++){
					if(this.wheelObjs[i].wordObjs[j].unmodifiedWord===this.forcedSentenceArray[i]){
						this.wheelObjs[i].forcedWord = this.wheelObjs[i].wordObjs[j]
					}
				}
			}

			this.summonWheels(25);
			
		}
		obj.prototype.initialize = function(){
			
			this.wordHeight = 0;
			this.currentSentenceObj = {
				sentence: '',
				$el: $()
			};
			this.wheelObjs = [];
			this.clones=$();
			this.$wheels = $();
			this.shiftMiddleAdjustValue = 0;

			var self = this;
			this.isLocked = false;
			self.isInstantly = true;

			self.wordHeight = 0;
			for(var i = 0, l = this.wordBanks.length; i<l; i++){
				var isEndOfSentence = l - i === 1 ? true : false;
				var $wheel = $('<div class="sloganizerWheel" style="float:left;position:relative;"></div>');
				self.$wheels = self.$wheels.add($wheel);

				this.$el.append($wheel);
				var widestWord = 0;
				var wordObjs =[];
				var intitialWordObj = self.returnWordObj(self.forcedSentenceArray[i],isEndOfSentence,$wheel);
				widestWord = intitialWordObj.width;
				wordObjs.push(intitialWordObj)


				
				
				
				//Create a wordObj for each word in the wordbank, push to array, and update widest
				for(var j = 0, m = this.wordBanks[i].length; j<m; j++){
					if(this.forcedSentenceArray.indexOf(this.wordBanks[i]) === -1){//prevent forced words from pushing again
						var word = (this.wordBanks[i][j]);
						var wordObj = self.returnWordObj(word,isEndOfSentence,$wheel);
						wordObjs.push(wordObj)
						if(wordObj.width > widestWord){
							widestWord = wordObj.width;
						}
					}
				}

				//If the forced word isn't already in the word bank, add it there.
				if(this.wordBanks[i].indexOf(this.forcedSentenceArray[i]) === -1){
					this.wordBanks[i].push(this.forcedSentenceArray[i])
				}
				$wheel.css({
					'width':widestWord+'px'
				});
				this.wheelObjs.push({
					$el:$wheel,
					widestWordWidth: widestWord,
					wordObjs:wordObjs,
					wordBank:this.wordBanks[i],
					currentSentenceAssignedWordObj:intitialWordObj,
					currentBankAssignedWordObj:intitialWordObj,
					dyingWordObj:null,
					forcedWord:intitialWordObj,
					shiftAmount:0
				})
				$wheel.remove()	
			}

			self.fullWidth = 0;
			for(var i = 0, l = this.wheelObjs.length; i<l; i++){
				self.fullWidth += this.wheelObjs[i].widestWordWidth;
			}
			this.$el.css({
				'height':this.wordHeight + 'px',
				'overflow':'hidden',
				'width':self.fullWidth+'px'
			});
			this.initializeCallback(this);
		}
		

		




		var sloganizerBootstraper = function(){};
		sloganizerBootstraper.prototype.createSloganizer = function(arguments){
			return new obj(arguments)
		}

		var sloganizer = new sloganizerBootstraper();

		return sloganizer;
	}
	//return objInstance;

	if (typeof exports === 'object') {
		// nodejs
		module.exports = makeSloganizerObject($,tools);
	} else if (typeof define === 'function' && define.amd) {
		// AMD
		define(['jQuery','tools'],function(){
			return makeSloganizerObject.apply(null,arguments);
		});
	} else if (typeof global.sloganizer === 'undefined') {
		// Browser: Make `Tweenable` globally accessible.
		global.sloganizer = makeSloganizerObject($,tools);
	}



})(this);