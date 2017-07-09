/*  Copyright © 2017 Randy Rollofson
    ALL RIGHTS RESERVED
    [This program is licensed under the "MIT License"]
    Please see the file COPYING in the source
    distribution of this software for license terms.
*/

var context = new (window.AudioContext || window.webkitAudioContext)();
console.log("Test");
//var source = context.createMediaStreamSource(stream);
var osc;
var key;

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

function playPitch(pitch, id) {
    key = document.getElementById(id);
    key.style.backgroundColor='lightgrey';
    osc = context.createOscillator();
    osc.connect(context.destination);
    osc.type = "triangle";
    osc.frequency.value = pitch;
    osc.start();
}

function stopPitch(className) {
    osc.stop(0);
    if (className == 'whiteKey') {
            color = 'white';
    } else {
            color = 'black';
    }
    key.style.backgroundColor = color;
    //osc.disconnect();
}

function changeColor(newColor) {
    var keyDown = document.getElementById("D3");
    keyDown.color = newColor;
}


//var analyser = context.createAnalyser();

