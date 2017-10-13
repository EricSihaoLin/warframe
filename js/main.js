function getCurrentTitle () {
    if(getCurrentCycleSeconds() < 3000)
	{
		return "Time until day: ";
	}
	return "Time until night: ";
}

function getCurrentCycleSeconds() {
	var cycleSeconds = Math.floor((new Date()).getTime() / 1000 + 300) % 9000; // One cycle = 2.5 hours = 9000 seconds
	return cycleSeconds;
}

function getSecondsLeft() {
	var seconds = getCurrentCycleSeconds();
	if(seconds < 3000)
	{
		return 3000 - seconds;
	}
	return 9000 - seconds;
}


setInterval(function(){
	var duration = moment.duration(getSecondsLeft()*1000, 'milliseconds');
    duration = moment.duration(duration.asMilliseconds() - 1000, 'milliseconds');
	document.getElementById('title').innerText = getCurrentTitle();
	var timeText = "";
	if(duration.hours())
	{
		if(duration.hours() > 1) {timeText += duration.hours() + " Hours ";} else {timeText += duration.hours() + " Hour ";}
	}
	if(duration.minutes())
	{
		if(duration.minutes() > 1) {timeText += duration.minutes() + " Minutes ";} else {timeText += duration.minutes() + " Minute ";}
	}
	if(duration.seconds())
	{
		if(duration.seconds() > 1) {timeText += duration.seconds() + " Seconds";} else {timeText += duration.seconds() + " Seconds";}
	}
	document.getElementById('time').innerText = timeText;
}, 1000);