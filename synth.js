var context = new (window.AudioContext || window.webkitAudioContext)();
console.log("Test");
//var source = context.createMediaStreamSource(stream);
var osc;

var filter = context.createBiquadFilter();
filter.type = "lowpass";
filter.frequency.value = 500;
filter.Q.value = 0;
filter.gain.value = 0;

var gain = context.createGain();
gain.gain.value = 0.5;
gain.connect(context.destination);


//Equal temperament pitches
var C3 = 130.81;
var CSharp3 = 138.59;
var D3 = 146.83;
var DSharp3 = 155.56;
var E3 = 164.81;
var F3 = 174.61;
var FSharp3 = 185.00;
var G3 = 196.00;
var GSharp3 = 207.65;
var A3 = 220.00;
var ASharp3 = 233.08;
var B3 = 246.94;
var C4 = 261.63;
var CSharp4 = 277.18;
var D4 = 293.66;
var DSharp4 = 311.13;
var E4 = 329.63;
var F4 = 349.23;
var FSharp4 = 369.99;
var G4 = 392.00;
var GSharp4 = 415.30;
var A4 = 440.00;
var ASharp4 = 466.16;
var B4 = 493.88;
//var C5 = 523.25;

function playPitch(pitch) {
    //var pitch = id;

    //pitch = value;
    //var c = document.getElementsByClassName("keyboard");
    osc = context.createOscillator();
    osc.connect(context.destination);
    osc.type = "triangle";
    osc.frequency.value = pitch;
    //osc.connect(context.destination);
    osc.start();
    //osc.stop(context.currentTime + 1);

    //return osc;
}

function stopPitch() {
    osc.stop(0);
    //osc.disconnect();
}

var spans = document.getElementsByTagName('span');
for (var i = 0; i < spans.length; i++) {
    console.log(spans[i].id);
    //spans[i].onclick = playPitch(this.id);
}

/*
function notePressed(event) {
    if (event.buttons & 1) {
        var dataset = event.target.dataset;
    }

    if (!dataset["pressed"]) {
        playPitch(dataset["frequency"]);
        dataset["pressed"] = "yes";
    }
}
*/

var c = document.getElementById("C4");

//object.onmousedown = 
//window.addEventListener("mousedown", playPitch, false);
//c.addEventListener("moudeup", noteReleased, false);

//playPitch();



//var analyser = context.createAnalyser();

