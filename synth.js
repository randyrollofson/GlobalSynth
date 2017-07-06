var context = new (window.AudioContext || window.webkitAudioContext)();

//var source = context.createMediaStreamSource(stream);

/*
var osc1 = context.createOscillator();
osc1.type = "sawtooth";
osc1.frequency.value = 220;
osc1.start(0); 

var osc2 = context.createOscillator();
osc2.type = "sine";
osc2.frequency.value = 277.183;
osc2.start(1); 

var filter = context.createBiquadFilter();
filter.type = "lowpass";
filter.frequency.value = 500;
filter.Q.value = 0;
filter.gain.value = 0;
*/
var gain = context.createGain();
gain.gain.value = 0.5;

//osc1.connect(filter);
//filter.connect(context.destination);
//osc2.connect(gain);
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
    var osc = context.createOscillator();
    osc.connect(context.destination);
    osc.type = "sine";
    osc.frequency.value = pitch;
    //osc.connect(context.destination);
    osc.start(0);

    //return osc;
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
c.addEventListener("mousedown", playPitch(C4));
//c.addEventListener("moudeup", noteReleased, false);

//playPitch(C4);



//var analyser = context.createAnalyser();

