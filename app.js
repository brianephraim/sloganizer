var mySloganizer;
$(function() {
	var $sloganizerWrapper = $('.mySloganizerWrapper');
	mySloganizer = Sloganizer.createSloganizer({
		$el: $sloganizerWrapper.find('.sloganizer'),
		wordBanks: [
			['Boomer','Behemoth','Kriksis'],
			['is','isn\'t'],
			['very','extremely','persistantly'],
			['good.']
			/*
			['Hangout with','Join','Form','Summon','Interact with','Participate in','Make','Create','Keep','Release','Detect','Help','Share','Team up with','Build','Improve','Embrace','Improve','Power','Bestow','Invest in','Play with','Become','Change','Talk about','Understand','Learn about','Grow','Blab about','Have','Develop','Enjoy','Socialize'],
			['friends','a friend','friendship','new people','blaboid','the mystery','the fun','some fun','others','another','robots','mobs','me','yourself','them','us','robots','activism','others','truck wine','myself','happiness','gatherings','togetherness','groups','individuality','robots','your interests','power','community','books','movies','shows','conversations','new friends','your cat','something new','new things','philsophy','culture','a sasquatcht','nanotubes','revolution','evolution','progress','politics','science','reddit','twitter','facebook','meetups','4square','cuttlefish','magic','numbers','sophistication','X-men','your cat','experiences','neighbors','articles','small groups'],
			['with others.','mathmatically','metaphysically.','in reality.','with happiness.','robotically.','technologically.','radically.','greener.','substantially.','potentially.','and another.','randomly.','nearby.','locally.','powerfully.','communally.','with precision.','wholeheartidly.','with interest.','anonymously.','and friends.','faster.','entirely.','underfoot.','somewhere.','immediately.','today.']
			*/
		]
	})
	console.log(mySloganizer)

	mySloganizer.summonWheels(25);
	$sloganizerWrapper.find('.randomizeButton').on('click',function(){
		mySloganizer.summonWheels(25);
	})
		
});