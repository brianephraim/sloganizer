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
			wordBanks:[],
			initialSentenceArray: ['Sharkypoo','will be','boringly','lame.']
		};
		this.settings = $.extend({}, defaults, options);
		this.wordHeight = 0;
		this.currentSentenceObj = {
			sentence: '',
			$el: $(),
			wordObjs: []
		};
		this.wheelObjs = [];
		this.clones=$();
		this.$wheels = $();
		this.shiftMiddleAdjustValue = 0;
		this.initialize()
		
	};
	sloganizer.prototype.formulateWheelsAndSentence = function(wheelLength){
		var self = this;
		this.$wheels.children().remove();
		var sentenceArray = [];
		for(var i = 0; i<wheelLength; i++){//need to swap this loop with the one below somehow, and integrate the loop above into the mess.
			for(var j = 0; j<this.wheelObjs.length; j++){
				var wheelObj = self.wheelObjs[j];
				this.wheelObjs[j].wheelLengthXXX = (wheelLength-(Math.round(wheelLength/6)*(this.wheelObjs.length - j)));
				if(i === this.wheelObjs[j].wheelLengthXXX - 1){//For the last iteration, make sure it's not a repeat, and update sentence object
					if(wheelObj.currentWord !== null){
						wheelObj.currentSentenceAssignedWordObj = wheelObj.wordObjs[0];
						wheelObj.currentWord = null;
					} else {
						if(this.currentSentenceObj.wordObjs[j] === wheelObj.currentSentenceAssignedWordObj){
							wheelObj.currentSentenceAssignedWordObj = self.returnRandomWordObj(self.wheelObjs[j])
						}
					}
					var $nonClone = this.wheelObjs[j].currentSentenceAssignedWordObj.$el
					this.wheelObjs[j].$el.append($nonClone)
					sentenceArray[j] = this.wheelObjs[j].currentSentenceAssignedWordObj.word;
					this.currentSentenceObj.wordObjs[j] = this.wheelObjs[j].currentSentenceAssignedWordObj;
				} else {
					if(i < this.wheelObjs[j].wheelLengthXXX - 1){
						var $clone = this.wheelObjs[j].currentSentenceAssignedWordObj.$el.clone()
						this.wheelObjs[j].$el.append($clone)
						this.clones.push($clone);
						wheelObj.currentSentenceAssignedWordObj = self.returnRandomWordObj(self.wheelObjs[j])
					}
				}
			}			
		}
		var sentenceX = sentenceArray.join('');
		this.currentSentenceObj.sentence = sentenceX;
	}
	sloganizer.prototype.returnRandomWordObj = function(wordBankObj){
		var self = this;
		var newIndex = 0;
		var wordObjs = wordBankObj.wordObjs;
		var currentWordObjIndex = wordBankObj.wordObjs.indexOf(wordBankObj.currentBankAssignedWordObj)
		if(wordObjs.length === 1){

		} else 
		if(wordObjs.length === 2){
			newIndex = currentWordObjIndex ===0 ? 1 : 0;
		} else {
			var randomIndex = Tools.math.returnRandomInt(0,wordObjs.length - 1);
			if(randomIndex === currentWordObjIndex){
				randomIndex += 1;
				if(randomIndex > wordObjs.length - 1){
					randomIndex += -2;
				}
			}
			
			newIndex = randomIndex;
		}
		var indexedWordObj = wordObjs[newIndex]
		wordBankObj.currentBankAssignedWordObj = indexedWordObj;
		return indexedWordObj;
	}
	sloganizer.prototype.animateSlots = function(){
		var self = this;
		//priming lateral animation
		Tools.dom.cssTransitioner({
			target: self.$wheels,
			cssProperty: Tools.dom.translate3dKey,
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
				Tools.dom.cssTransitioner2({
					target: self.wheelObjs[j].$el,
					cssProperty: Tools.dom.translate3dKey,
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

	sloganizer.prototype.shiftMiddleAdjustValuesAndHorizontalShifts = function(){
		var self = this;
		var $tempWheelContainer = $('<div style="position:absolute;opacity:1;width:'+self.fullWidth+'px"></div>');
		self.settings.$el.append($tempWheelContainer);
		var compactSentenceWidth = 0;
		self.$wheels.css({'top':'0'})
		for(var k = 0, n = self.wheelObjs.length; k < n; k++){			
			compactSentenceWidth += self.wheelObjs[k].currentSentenceAssignedWordObj.width;
			var $tempWheel = self.wheelObjs[k].$el.clone();
			$tempWheel.css('width','')
			$tempWheelContainer.append($tempWheel)
			self.wheelObjs[k].horizontalShift = $tempWheel.offset().left - self.wheelObjs[k].currentSentenceAssignedWordObj.$el.offset().left;
		}
		self.settings.$el.css('width',(self.fullWidth)+'px')
		self.shiftMiddleAdjustValue = (self.fullWidth - compactSentenceWidth)/2;
		$tempWheelContainer.remove();
	}
	sloganizer.prototype.lateralAnimation = function(){
		var self = this;
		self.shiftMiddleAdjustValuesAndHorizontalShifts()
		var callbackCount2 = 0;
		for(var k = 0, n = self.wheelObjs.length; k < n; k++){
			self.wheelObjs[k].shiftAmount = self.wheelObjs[k].horizontalShift + self.shiftMiddleAdjustValue;
			console.log(self.wheelObjs[k].horizontalShift,self.shiftMiddleAdjustValue)

			var appendSentenceAndPrimeForMore = function(){
				console.log('e')
				self.currentSentenceObj.$el = $('<div style="position:absolute;top:0;z-index:9999;width:'+self.fullWidth+'px;text-align:center;">'+self.currentSentenceObj.sentence+'</div>');
				self.settings.$el.prepend(self.currentSentenceObj.$el)
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

				Tools.dom.cssTransitioner2({
					target: self.wheelObjs[k].$el,
					cssProperty: Tools.dom.translate3dKey,
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
	
	sloganizer.prototype.summonWheels = function(wheelLength){
		var self = this;
		if(!self.isLocked){
			self.isLocked = true;
			console.log('d')
			this.currentSentenceObj.$el.remove()
			
			self.formulateWheelsAndSentence(wheelLength)
			if(self.isInstantly){
				for(var k = 0, n = self.clones.length; k < n; k++){
					self.clones[k].remove()
				}
				self.settings.$el.append(self.$wheels)
				self.lateralAnimation()
			} else {
				self.settings.$el.append(self.$wheels)
				self.animateSlots()
			}
		}
		
	};
	sloganizer.prototype.returnWordObj = function(word,isEndOfSentence,$wheel){
		var self = this;
		var wordClean = word;
		if(!isEndOfSentence){
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
			width:wordWidth
		}

	}
	sloganizer.prototype.initialize = function(){
		var self = this;
		this.isLocked = false;
		self.isInstantly = true;

		
		
		self.wordHeight = 0;
		for(var i = 0, l = this.settings.wordBanks.length; i<l; i++){
			var isEndOfSentence = l - i === 1 ? true : false;
			var $wheel = $('<div class="sloganizerWheel" style="float:left;position:relative;"></div>');
			self.$wheels = self.$wheels.add($wheel);

			this.settings.$el.append($wheel);
			var widestWord = 0;
			var wordObjs =[];
			var intitialWordObj = self.returnWordObj(self.settings.initialSentenceArray[i],isEndOfSentence,$wheel);
			widestWord = intitialWordObj.width;
			wordObjs.push(intitialWordObj)

			this.currentSentenceObj.wordObjs[i] = intitialWordObj;

			for(var j = 0, m = this.settings.wordBanks[i].length; j<m; j++){
				var word = (this.settings.wordBanks[i][j]);
				var wordObj = self.returnWordObj(word,isEndOfSentence,$wheel);
				wordObjs.push(wordObj)
				if(wordObj.width > widestWord){
					widestWord = wordObj.width;
				}
			}
			$wheel.css({
				'width':widestWord+'px'
			});
			this.wheelObjs.push({
				$el:$wheel,
				widestWordWidth: widestWord,
				wordObjs:wordObjs,
				wordBank:this.settings.wordBanks[i],
				currentSentenceAssignedWordObj:intitialWordObj,
				currentBankAssignedWordObj:intitialWordObj,
				dyingWordObj:null,
				currentWord:intitialWordObj.word,
				shiftAmount:0
			})
			$wheel.remove()			
		}

		self.fullWidth = 0;
		for(var i = 0, l = this.wheelObjs.length; i<l; i++){
			self.fullWidth += this.wheelObjs[i].widestWordWidth;
		}
		this.settings.$el.css({
			'height':this.wordHeight + 'px',
			'overflow':'hidden',
			'width':self.fullWidth+'px'
		});
	}
	

	





	var sloganizerBootstraper = function(){};
	sloganizerBootstraper.prototype.createSloganizer = function(arguments){
		return new sloganizer(arguments)
	}

	var Sloganizer = new sloganizerBootstraper();
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