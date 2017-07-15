/*  Copyright © 2017 Randy Rollofson
*   ALL RIGHTS RESERVED
*   [This program is licensed under the "MIT License"]
*   Please see the file COPYING in the source
*   distribution of this software for license terms.
*/

var context = new (window.AudioContext || window.webkitAudioContext)();
window.addEventListener('keydown', keyDownHandler, false);
window.addEventListener('keyup', keyUpHandler, false);

var osc = new Array(32);
//window.addEventListener('mousedown', mouseDownHandler, false);
//window.addEventListener('mouseup', mouseUpHandler, false);

var filter = context.createBiquadFilter();
filter.type = "lowpass";
filter.frequency.value = 500;
filter.Q.value = 0;
filter.gain.value = 0;

var gain = context.createGain();
gain.gain.value = 0.5;


//Key objects
var C3 = {
    id:"C3",
    freq:130.81,
    oscIdx:0
};
var CSharp3 = {
    id:"CSharp3",
    freq:138.59,
    oscIdx:1
};
var D3 = {
    id:"D3",
    freq:146.83,
    oscIdx:2
};
var DSharp3 = {
    id:"DSharp3",
    freq:155.56,
    oscIdx:3
};
var E3 = {
    id:"E3",
    freq:164.81,
    oscIdx:4
};
var F3 = {
    id:"F3",
    freq:174.61,
    oscIdx:5
};
var FSharp3 = {
    id:"FSharp3",
    freq:185.00,
    oscIdx:6
};
var G3 = {
    id:"G3",
    freq:196.00,
    oscIdx:7
};
var GSharp3 = {
    id:"GSharp3",
    freq:207.65,
    oscIdx:8
};
var A3 = {
    id:"A3",
    freq:220.00,
    oscIdx:9
};
var ASharp3 = {
    id:"ASharp3",
    freq:233.08,
    oscIdx:10
};
var B3 = {
    id:"B3",
    freq:246.94,
    oscIdx:11
};
var C4 = {
    id:"C4",
    freq:261.63,
    oscIdx:12
};
var CSharp4 = {
    id:"CSharp4",
    freq:277.18,
    oscIdx:13
};
var D4 = {
    id:"D4",
    freq:293.66,
    oscIdx:14
};
var DSharp4 = {
    id:"DSharp4",
    freq:311.13,
    oscIdx:15
};
var E4 = {
    id:"E4",
    freq:329.63,
    oscIdx:16
};
var F4 = {
    id:"F4",
    freq:349.23,
    oscIdx:17
};
/*
var FSharp4 = {
    id:"FSharp4",
    freq:369.99
};
var G4 = {
    id:"G4",
    freq:392.00
};
var GSharp4 = {
    id:"GSharp4",
    freq:415.30
};
var A4 = {
    id:"A4",
    freq:440.00;
};
var ASharp4 = {
    id:"ASharp4",
    freq:466.16
};
var B4 = {
    id:"B4",
    freq:493.88
};
var C5 = {
    id:"C5",
    freq:523.25
};
*/

var keys = new Array(256);
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
keys[79] = CSharp4;
keys[76] = D4;
keys[80] = DSharp4;
keys[186] = E4;
keys[222] = F4;
//keys[221] = FSharp4;
//keys[13] = G4;
//keys[220] = GSharp4;

function keyDownHandler(ev) {
    var keyDown = document.getElementById(keys[ev.keyCode].id);
    keyDown.style.backgroundColor='lightgrey';
    if (keyDown.classList.contains("down"))
        return;
    keyDown.classList.remove("up");
    keyDown.classList.add("down");
    playPitch(keys[ev.keyCode]);
}

function keyUpHandler(ev) {
    var keyUp = document.getElementById(keys[ev.keyCode].id);
    if (keyUp.classList.contains("up"))
        return;
    stopPitch(keys[ev.keyCode]);
    keyUp.classList.remove("down");
    keyUp.classList.add("up");
    if (keyUp.classList.contains('whiteKey')) {
        color = 'white';
    } else if (keyUp.classList.contains('blackKey')) {
        color = 'black';
    }
    keyUp.style.backgroundColor = color;
}
/*
function mouseDownHandler(ev) {
    mouse = document.getElementById(ev.target.id);
    playPitch(mouse.freq);
}
*/

function playPitch(key) {
    osc[key.oscIdx] = context.createOscillator();
    osc[key.oscIdx].type = "sawtooth";
    osc[key.oscIdx].frequency.value = key.freq;
    osc[key.oscIdx].connect(filter);
    filter.connect(gain);
    gain.connect(context.destination);
    osc[key.oscIdx].start();
}

function stopPitch(key) {
    osc[key.oscIdx].stop(0);
}

//var analyser = context.createAnalyser();

