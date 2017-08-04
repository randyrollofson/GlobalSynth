/*  Copyright © 2017 Randy Rollofson
*   ALL RIGHTS RESERVED
*   [This program is licensed under the "MIT License"]
*   Please see the file COPYING in the source
*   distribution of this software for license terms.
*/

var context = new (window.AudioContext || window.webkitAudioContext)();
window.addEventListener('keydown', keyDownHandler, false);
window.addEventListener('keyup', keyUpHandler, false);
//window.addEventListener('mousedown', mouseDownHandler, false);
//window.addEventListener('mouseup', mouseUpHandler, false);

var osc1 = new Array(32);
var osc2 = new Array(32);

//LFO
var lfo = new Array(32);
var lfoFreq = 0;
var lfoVol = context.createGain();
var lfoGain = 0.5;

//OSC 1 Lowpass Filter
var lowpass1 = context.createBiquadFilter();
var osc1CutoffFreq = 10000;
lowpass1.type = "lowpass";
lowpass1.Q.value = 0;
lowpass1.gain.value = 0;

//OSC 2 Lowpass Filter
var lowpass2 = context.createBiquadFilter();
var osc2CutoffFreq = 10000;
lowpass2.type = "lowpass";
lowpass2.Q.value = 0;
lowpass2.gain.value = 0;

//OSC 1 Volume
var osc1Vol = context.createGain();
var osc1Gain = 0.5;

//OSC 2 Volume
var osc2Vol = context.createGain();
var osc2Gain = 0.5;

//Master Volume
var masterVol = context.createGain();
var masterGain = 0.75;

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

var FSharp4 = {
    id:"FSharp4",
    freq:369.99,
    oscIdx:18
};
var G4 = {
    id:"G4",
    freq:392.00,
    oscIdx:19
};
var GSharp4 = {
    id:"GSharp4",
    freq:415.30,
    oscIdx:20
};
var A4 = {
    id:"A4",
    freq:440.00,
    oscIdx:21
};
var ASharp4 = {
    id:"ASharp4",
    freq:466.16,
    oscIdx:22
};
var B4 = {
    id:"B4",
    freq:493.88,
    oscIdx:23
};
var C5 = {
    id:"C5",
    freq:523.25,
    oscIdx:24
};

var keys = new Array(128);

//Lower octave
keys[90] = C3;
keys[83] = CSharp3;
keys[88] = D3;
keys[68] = DSharp3;
keys[67] = E3;
keys[86] = F3;
keys[71] = FSharp3;
keys[66] = G3;
keys[72] = GSharp3;
keys[78] = A3;
keys[74] = ASharp3;
keys[77] = B3;

//Upper octave
keys[81] = C4;
keys[50] = CSharp4;
keys[87] = D4;
keys[51] = DSharp4;
keys[69] = E4;
keys[82] = F4;
keys[53] = FSharp4;
keys[84] = G4;
keys[54] = GSharp4;
keys[89] = A4;
keys[55] = ASharp4;
keys[85] = B4;
keys[73] = C5;

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

function setOsc1Volume(value) {
    osc1Gain = value * 0.01;
}

function setOsc2Volume(value) {
    osc2Gain = value * 0.01;
}

function setMasterVolume(value) {
    masterGain = value * 0.01;
}

function setOsc1Cutoff(value) {
    osc1CutoffFreq = value;
}

function setOsc2Cutoff(value) {
    osc2CutoffFreq = value;
}

function setLfoFreq(value) {
    lfoFreq = value;
}

function makeDistortionCurve(amount) {
    var k = typeof amount === 'number' ? amount : 0,
        n_samples = 44100,
        curve = new Float32Array(n_samples),
        deg = Math.PI / 180,
        i = 0,
        x;
    for ( ; i < n_samples; ++i ) {
        x = i * 2 / n_samples - 1;
        curve[i] = ( 3 + k ) * x * 20 * deg / ( Math.PI + k * Math.abs(x) );
    }
    return curve;
};
var distortion1 = context.createWaveShaper();
distortion1.curve = makeDistortionCurve(400);
distortion1.oversample = '4x';

var distortion2 = context.createWaveShaper();
distortion2.curve = makeDistortionCurve(10);
distortion2.oversample = '4x';

function playPitch(key) {
    var osc1Waveform = document.getElementById('osc1Waveform');
    var osc2Waveform = document.getElementById('osc2Waveform');
    var lfoWaveform = document.getElementById('lfoWaveform');
    var lfoWave = lfoWaveform.options[lfoWaveform.selectedIndex].value;
    var wave1 = osc1Waveform.options[osc1Waveform.selectedIndex].value;
    var wave2 = osc2Waveform.options[osc2Waveform.selectedIndex].value;

    //LFO
    lfo[key.oscIdx] = context.createOscillator();
    lfo[key.oscIdx].type = lfoWave;
    lfo[key.oscIdx].frequency.value = lfoFreq;
    lfo[key.oscIdx].connect(lfoVol.gain);
    lfoVol.gain.value = lfoGain;
    lfoVol.connect(masterVol);

    //OSC 1
    osc1[key.oscIdx] = context.createOscillator();
    osc1[key.oscIdx].type = wave1;
    osc1[key.oscIdx].frequency.value = key.freq;
    //osc1[key.oscIdx].detune.value = 10;
    osc1Vol.gain.value = osc1Gain;
    osc1[key.oscIdx].connect(osc1Vol);
    distortion1.connect(lfoVol);
    osc1Vol.connect(lowpass1);

    //OSC 2
    osc2[key.oscIdx] = context.createOscillator();
    osc2[key.oscIdx].type = wave2;
    osc2[key.oscIdx].frequency.value = key.freq;
    osc2Vol.gain.value = osc2Gain;
    osc2[key.oscIdx].connect(osc2Vol);
    distortion2.connect(lfoVol);
    osc2[key.oscIdx].connect(osc2Vol);
    osc2Vol.connect(lowpass2);

    //Lowpass Filters
    lowpass1.frequency.value = osc1CutoffFreq;
    lowpass1.connect(distortion1);
    lowpass2.frequency.value = osc2CutoffFreq;
    lowpass2.connect(distortion1);

    //Master
    masterVol.gain.value = masterGain;
    masterVol.connect(context.destination);

    lfo[key.oscIdx].start();
    osc1[key.oscIdx].start();
    osc2[key.oscIdx].start();
}

function stopPitch(key) {
    lfo[key.oscIdx].stop(0);
    osc1[key.oscIdx].stop(0);
    osc2[key.oscIdx].stop(0);
}

//var analyser = context.createAnalyser();

