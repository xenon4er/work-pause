	var audio = new Audio('alarm.mp3');
	var isTimer = false;

	function start(timer_time, audio){
		isTimer = true;

		var interval_id;
		var time = 0;

        var min_str = "00";
        var sec_str = "00";

	    interval_id = setInterval(function(){
	    	if(time >= timer_time*60){
	        	audio.play();
	        }
	        time++;
	        
	        var min = Math.floor(time / 60);
	        if(min < 10){
	        	min_str = "0"+min;
	        }else{
	        	min_str = min;
	        }

	        var sec = time % 60;;
	        if(sec < 10){
	        	sec_str = "0"+sec;
	        }else{
	        	sec_str = sec;
	        }

	        var time_str = min_str + ' : ' + sec_str;
	        document.title = time_str;
	        document.getElementById('time').innerHTML = time_str;
	        console.log(time)
	    }, 1000);

	    console.log('start', interval_id);

	    return interval_id;
	}

	function stop(interval_id, audio){
	    console.log('stop', interval_id);
	    clearInterval(interval_id);
		audio.pause();
		audio.currentTime = 0;
		time = 0;
	    isTimer = false
	}


	document.getElementById('start').addEventListener('click', function(){
		if (!isTimer){
			var timer_time = document.getElementById('timer_time').value;
			var interval_id = start(timer_time, audio);
			document.getElementById('stop').addEventListener('click',function(e){
			    e.target.removeEventListener(e.type, arguments.callee);
				stop(interval_id, audio);
			});		
		}
	}, false);




// request permission on page load
document.addEventListener('DOMContentLoaded', function () {
  if (Notification.permission !== "granted")
    Notification.requestPermission();
});

function notifyMe() {
  if (!Notification) {
    alert('Desktop notifications not available in your browser. Try Chromium.'); 
    return;
  }

  if (Notification.permission !== "granted")
    Notification.requestPermission();
  else {
    var notification = new Notification('Notification title', {
      icon: 'http://cdn.sstatic.net/stackexchange/img/logos/so/so-icon.png',
      body: "Hey there! You've been notified!",
    });

    notification.onclick = function () {
      window.open("http://stackoverflow.com/a/13328397/1269037");      
    };

  }

}