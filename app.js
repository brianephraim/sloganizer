var mySloganizer;
$(function() {
	var $sloganizerWrapper = $('.mySloganizerWrapper');
	mySloganizer = Sloganizer.createSloganizer({
		$el: $sloganizerWrapper.find('.sloganizer'),
		wordBanks: [
			/*
			['Accomplish', 'Adjust', 'Arrange', 'Assemble', 'Beget', 'Brew', 'Bring About', 'Cause', 'Compose', 'Conceive', 'Constitute', 'Construct', 'Cook', 'Cook Up', 'Dash Off', 'Draw On', 'Dream Up', 'Effect', 'Engender', 'Fabricate', 'Fashion', 'Forge', 'Form', 'Frame', 'Generate', 'Get Ready', 'Give Rise To', 'Hatch', 'Initiate', 'Invent', 'Knock Off', 'Lead To', 'Manufacture', 'Mold', 'Occasion', 'Originate', 'Parent', 'Prepare', 'Procreate', 'Produce', 'Put Together', 'Secure', 'Shape', 'Spawn', 'Synthesize', 'Tear Off', 'Throw Together', 'Whip', 'Whip Out'],
			['adorable', 'adventurous', 'aggressive', 'agreeable', 'alert', 'alive', 'amused', 'angry', 'annoyed', 'annoying', 'anxious', 'arrogant', 'ashamed', 'attractive', 'average', 'awful', 'bad', 'beautiful', 'better', 'bewildered', 'black', 'bloody', 'blue', 'blue-eyed', 'blushing', 'bored', 'brainy', 'brave', 'breakable', 'bright', 'busy', 'calm', 'careful', 'cautious', 'charming', 'cheerful', 'clean', 'clear', 'clever', 'cloudy', 'clumsy', 'colorful', 'combative', 'comfortable', 'concerned', 'condemned', 'confused', 'cooperative', 'courageous', 'crazy', 'creepy', 'crowded', 'cruel', 'curious', 'cute', 'dangerous', 'dark', 'dead', 'defeated', 'defiant', 'delightful', 'depressed', 'determined', 'different', 'difficult', 'disgusted', 'distinct', 'disturbed', 'dizzy', 'doubtful', 'drab', 'dull', 'eager', 'easy', 'elated', 'elegant', 'embarrassed', 'enchanting', 'encouraging', 'energetic', 'enthusiastic', 'envious', 'evil', 'excited', 'expensive', 'exuberant', 'fair', 'faithful', 'famous', 'fancy', 'fantastic', 'fierce', 'filthy', 'fine', 'foolish', 'fragile', 'frail', 'frantic', 'friendly', 'frightened', 'funny', 'gentle', 'gifted', 'glamorous', 'gleaming', 'glorious', 'good', 'gorgeous', 'graceful', 'grieving', 'grotesque', 'grumpy', 'handsome', 'happy', 'healthy', 'helpful', 'helpless', 'hilarious', 'homeless', 'homely', 'horrible', 'hungry', 'hurt', 'ill', 'important', 'impossible', 'inexpensive', 'innocent', 'inquisitive', 'itchy', 'jealous', 'jittery', 'jolly', 'joyous', 'kind', 'lazy', 'light', 'lively', 'lonely', 'long', 'lovely', 'lucky', 'magnificent', 'misty', 'modern', 'motionless', 'muddy', 'mushy', 'mysterious', 'nasty', 'naughty', 'nervous', 'nice', 'nutty', 'obedient', 'obnoxious', 'odd', 'old-fashioned', 'open', 'outrageous', 'outstanding', 'panicky', 'perfect', 'plain', 'pleasant', 'poised', 'poor', 'powerful', 'precious', 'prickly', 'proud', 'puzzled', 'quaint', 'real', 'relieved', 'repulsive', 'rich', 'scary', 'selfish', 'shiny', 'shy', 'silly', 'sleepy', 'smiling', 'smoggy', 'sore', 'sparkling', 'splendid', 'spotless', 'stormy', 'strange', 'stupid', 'successful', 'super', 'talented', 'tame', 'tender', 'tense', 'terrible', 'testy', 'thankful', 'thoughtful', 'thoughtless', 'tired', 'tough', 'troubled', 'ugliest', 'ugly', 'uninterested', 'unsightly', 'unusual', 'upset', 'uptight', 'vast', 'victorious', 'vivacious', 'wandering', 'weary', 'wicked', 'wide-eyed', 'wild', 'witty', 'worrisome', 'worried', 'wrong', 'zany', 'zealous'],
			['appeals','cans','drops','ears','examinations','hedges','interests','periodicals','structures','turtles','bones','celerys','fiberglasss','gladioluss','great-grandfathers','interests','jails','religions','umbrellas','willows','bathrooms','cauliflowers','cribs','inventorys','jails','llamas','perus','representatives','thomass','ties','balances','beautys','creams','fridays','hexagons','nodes','peens','prints','salts','swan'],
			['carefully.','correctly.','eagerly.','easily.','fast.','loudly.','patiently.','quickly.','quietly.','well.','abroad.','anywhere.','downstairs.','here.','home.','in.','nowhere.','out.','outside.','somewhere.','there.','underground.','upstairs.','because.','accidentally.','intentionally.','purposely.','always.','every.','never.','often.','rarely.','seldom.','sometimes.','usually.','after.','already.','during.','finally.','just.','last.','later.','next.','now.','recently.','soon.','then.','tomorrow.','yesterday']
			*/
			
			['Accomplish', 'Adjust', 'Arrange', 'Assemble', 'Beget'],
			['adorable', 'adventurous', 'aggressive'],
			['appeals','cans'],
			['carefully.']
		]

	})

	mySloganizer.summonWheels(25);
	$sloganizerWrapper.find('.randomizeButton').on('click',function(){
		mySloganizer.summonWheels(25);
	})

	$sloganizerWrapper.find('.resizeButton').on('click',function(){
		mySloganizer.settings.$el.css('font-size','20px')
		mySloganizer.reinitialize()
	})
		
});