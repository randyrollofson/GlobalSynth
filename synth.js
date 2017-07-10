/*  Copyright © 2017 Randy Rollofson
    ALL RIGHTS RESERVED
    [This program is licensed under the "MIT License"]
    Please see the file COPYING in the source
    distribution of this software for license terms.
*/

var context = new (window.AudioContext || window.webkitAudioContext)();
window.addEventListener('keydown', keyDownHandler, false);
window.addEventListener('keyup', keyUpHandler, false);
//var source = context.createMediaStreamSource(stream);
var osc;
var key;
var down = false;

var filter = context.createBiquadFilter();
filter.type = "lowpass";
filter.frequency.value = 500;
filter.Q.value = 0;
filter.gain.value = 0;

var gain = context.createGain();
gain.gain.value = 0.5;
gain.connect(context.destination);

//Key objects
var C3 = {
    id:"C3",
    freq:130.81
};
var CSharp3 = {
    id:"CSharp3",
    freq:138.59
};
var D3 = {
    id:"D3",
    freq:146.83
};
var DSharp3 = {
    id:"DSharp3",
    freq:155.56
};
var E3 = {
    id:"E3",
    freq:164.81
};
var F3 = {
    id:"F3",
    freq:174.61
};
var FSharp3 = {
    id:"FSharp3",
    freq:185.00
};
var G3 = {
    id:"G3",
    freq:196.00
};
var GSharp3 = {
    id:"GSharp3",
    freq:207.65
};
var A3 = {
    id:"A3",
    freq:220.00
};
var ASharp3 = {
    id:"ASharp3",
    freq:233.08
};
var B3 = {
    id:"B3",
    freq:246.94
};
var C4 = {
    id:"C4",
    freq:261.63
};
var CSharp4 = {
    id:"CSharp4",
    freq:277.18
};
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
var C5 = 523.25;

var keys = new Array(128);
keys[65] = C3;
keys[87] = CSharp3;
keys[83] = D3;
keys[69] = DSharp3;
keys[68] = E3;
keys[70] = F3;
keys[84] = FSharp3;
keys[71] = G3;
keys[89] = GSharp3;
keys[72] = A3;
keys[85] = ASharp3;
keys[74] = B3;
keys[75] = C4;
//keys[79] = CSharp4;
//keys[76] = D4;
//keys[80] = DSharp4;
//keys[186] = E4;
//keys[222] = F4;
//keys[221] = FSharp4;
//keys[13] = G4;
//keys[220] = GSharp4;

function keyDownHandler (ev) {
    key = document.getElementById(keys[ev.keyCode].id);
    key.style.backgroundColor='lightgrey';
    if(down)
        return;
    down = true;
    key.classList.add("pressed");

    playPitch(keys[ev.keyCode].freq);
}

function keyUpHandler (ev) {
    stopPitch();
    down = false;
    key = document.getElementById(keys[ev.keyCode].id);
    if (key.className == 'whiteKey') {
            color = 'white';
    } else {
            color = 'black';
    }
    key.style.backgroundColor = color;
}

function playPitch(pitch) {
    osc = context.createOscillator();
    osc.connect(context.destination);
    osc.type = "sawtooth";
    osc.frequency.value = pitch;
    osc.start();
}

function stopPitch() {
    osc.stop(0);
    osc.disconnect();
}

function changeColor(newColor) {
    var keyDown = document.getElementById("D3");
    keyDown.color = newColor;
}


//var analyser = context.createAnalyser();

