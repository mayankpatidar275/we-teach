var press_key = document.getElementById("press_key");

function play_drum(event){
    var boom = document.getElementById("boom");
    console.log("done");
    var x = event.keyCode;
    if(x==97){
        boom.pause();
        boom.currentTime = 0;
        document.getElementById("A").classList.add("shadow");
        boom.play();
        setTimeout(function() {
            document.getElementById("A").classList.remove("shadow");
        }, 250);
    }
    var x = event.keyCode;
    if(x==115){
        clap.pause();
        clap.currentTime = 0;
        document.getElementById("S").classList.add("shadow");
        clap.play();
        setTimeout(function() {
            document.getElementById("S").classList.remove("shadow");
        }, 250);
    }
    var x = event.keyCode;
    if(x==100){
        hihat.pause();
        hihat.currentTime = 0;
        document.getElementById("D").classList.add("shadow");
        hihat.play();
        setTimeout(function() {
            document.getElementById("D").classList.remove("shadow");
        }, 250);
    }
    var x = event.keyCode;
    if(x==102){
        kick.pause();
        kick.currentTime = 0;
        document.getElementById("F").classList.add("shadow");
        kick.play();
        setTimeout(function() {
            document.getElementById("F").classList.remove("shadow");
        }, 250);
    }
    var x = event.keyCode;
    if(x==103){
        openhat.pause();
        openhat.currentTime = 0;
        document.getElementById("G").classList.add("shadow");
        openhat.play();
        setTimeout(function() {
            document.getElementById("G").classList.remove("shadow");
        }, 250);
    }
    var x = event.keyCode;
    if(x==104){
        ride.pause();
        ride.currentTime = 0;
        document.getElementById("H").classList.add("shadow2");
        ride.play();
        setTimeout(function() {
            document.getElementById("H").classList.remove("shadow2");
        }, 250);
    }
    var x = event.keyCode;
    if(x==106){
        snare.pause();
        snare.currentTime = 0;
        document.getElementById("J").classList.add("shadow2");
        snare.play();
        setTimeout(function() {
            document.getElementById("J").classList.remove("shadow2");
        }, 250);
    }
    var x = event.keyCode;
    if(x==107){
        tink.pause();
        tink.currentTime = 0;
        document.getElementById("K").classList.add("shadow2");
        tink.play();
        setTimeout(function() {
            document.getElementById("K").classList.remove("shadow2");
        }, 250);
    }
    var x = event.keyCode;
    if(x==108){
        tom.pause();
        tom.currentTime = 0;
        document.getElementById("L").classList.add("shadow2");
        tom.play();
        setTimeout(function() {
            document.getElementById("L").classList.remove("shadow2");
        }, 250);
    }
}