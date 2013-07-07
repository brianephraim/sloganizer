var mySloganizer;
$(function() {
	var $wordBankTextAreas = $('.wordBanks textarea');
	var $forcedWordsInputs = $('.forcedWords input');

	var $sloganizerWrapper = $('.mySloganizerWrapper');
	mySloganizer = Sloganizer.createSloganizer({
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