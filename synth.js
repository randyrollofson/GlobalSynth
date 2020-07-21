/*  Copyright © 2017 Randy Rollofson
*   ALL RIGHTS RESERVED
*   [This program is licensed under the "MIT License"]
*   Please see the file COPYING in the source
*   distribution of this software for license terms.
*/

var context = new (window.AudioContext || window.webkitAudioContext)();
window.addEventListener('keydown', keyDownHandler, false);
window.addEventListener('keyup', keyUpHandler, false);

var osc1 = new Array(32);
var osc2 = new Array(32);
var noise = new Array(32);
var envelope = new Array(32);
var distortion = context.createWaveShaper();
var delay = context.createDelay();

//LFO
var lfo = new Array(32);
var lfoVol = context.createGain();
var lfoWaveform = "sine";
var lfoFreq = 0;
var lfoDepth = 500;

//Lowpass Filter
var lowpass = context.createBiquadFilter();
var cutoffFreq = 2500;
var resonanceQ = 0;
lowpass.type = "lowpass";
lowpass.Q.value = resonanceQ;
lowpass.gain.value = 0;

//OSC 1 Volume
var osc1Vol = context.createGain();
var osc1Gain = 0.5;
var osc1DetuneValue = 0;
var osc1Waveform = "sawtooth";

//OSC 2 Volume
var osc2Vol = context.createGain();
var osc2Gain = 0.5;
var osc2DetuneValue = -10;
var osc2Waveform = "sawtooth";

//Mixer
var osc1Knob = 50;
var osc2Knob = 50;
var noiseKnob = 0;

//Noise
var noiseVol = context.createGain();
var noiseGain = 0.0;
var noiseType = "brown";
noiseVol.gain.value = noiseGain;

//Envelope
var envelope = context.createGain();
//envelope.connect(delay);
//var attack = 0.0;
//var decay = 0.0;
//var sustain = 0.0;
//var release = 0.0;

//Effects
//var distortionVal = 0.0;
//var delayVal = 0.0;

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
    context.resume();
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

var currentEv;
var currentId;
function mouseDownHandler(ev, id) {
    //console.log(ev);
    currentEv = ev;
    currentId = id;
    var keyDown = document.getElementById(id);
    keyDown.style.backgroundColor='lightgrey';
    playPitch(keys[ev]);
}

function mouseUpHandler() {
    var ev = currentEv;
    var id = currentId;
    var keyUp = document.getElementById(id);
    stopPitch(keys[ev]);
    if (keyUp.classList.contains('whiteKey')) {
        color = 'white';
    } else if (keyUp.classList.contains('blackKey')) {
        color = 'black';
    }
    keyUp.style.backgroundColor = color;
}

function setOsc1Volume(value) {
    osc1Gain = value / 100;
}

function setOsc2Volume(value) {
    osc2Gain = value / 100;
}

function setNoiseVolume(value) {
    noiseGain = value / 100;
}

function setMasterVolume(value) {
    masterGain = value / 100;
}

function setCutoff(value) {
    cutoffFreq = value;
}

function setResonance(value) {
    resonanceQ = value;
}

function setLfoFreq(value) {
    lfoFreq = value;
}

function setLfoDepth(value) {
    lfoDepth = value;
}

function setOsc1Detune(value) {
    osc1DetuneValue = value;
}

function setOsc2Detune(value) {
    osc2DetuneValue = value;
}

function setAttack(value) {
    attack = value;
}

function setDecay(value) {
    decay = value;
}

function setSustain(value) {
    sustain = value;
}

function setRelease(value) {
    release = value;
}

//function setDistortion(value) {
//    if(value == 0.0) {
//        envelope.connect(delay);
//    } else {
//        envelope.connect(distortion);
//    }
//    distortion.curve = makeDistortionCurve(value);
//    distortion.oversample = '4x';
//}
//
//function setDelay(value) {
//    delay.delayTime.value = value;
//}

//https://noisehack.com/generate-noise-web-audio-api/
//MIT license
//Creates white noise loop
var bufferSize;
var noiseBuffer;
var output;
function createWhiteNoise() {
    bufferSize = 2 * context.sampleRate;
    noiseBuffer = context.createBuffer(1, bufferSize, context.sampleRate);
    output = noiseBuffer.getChannelData(0);
    for (var i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
    }
}

//https://noisehack.com/generate-noise-web-audio-api/
//MIT license
//Creates pink noise loop
function createPinkNoise() {
    bufferSize = 2 * context.sampleRate;
    var b0, b1, b2, b3, b4, b5, b6;
    b0 = b1 = b2 = b3 = b4 = b5 = b6 = 0.0;
    noiseBuffer = context.createBuffer(1, bufferSize, context.sampleRate);
    output = noiseBuffer.getChannelData(0);
    for (var i = 0; i < bufferSize; i++) {
        var white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        output[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
        output[i] *= 0.11; // (roughly) compensate for gain
        b6 = white * 0.115926;
    }
}

//https://noisehack.com/generate-noise-web-audio-api/
//MIT license
//Creates brown noise loop
function createBrownNoise() {
    bufferSize = 2 * context.sampleRate;
    var lastOut = 0.0;
    noiseBuffer = context.createBuffer(1, bufferSize, context.sampleRate);
    output = noiseBuffer.getChannelData(0);
    for  (var i = 0; i < bufferSize; i++) {
        var white = Math.random() * 2 - 1;
        output[i] = (lastOut + (0.02 * white)) / 1.02;
        lastOut = output[i];
        output[i] *= 3.5; // (roughly) compensate for gain
    }
}

//https://stackoverflow.com/questions/22312841/waveshaper-node-in-webaudio-how-to-emulate-distortion
//Creative Commons license
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

//var startAt;
//var releaseAt;

function playPitch(key) {
    var osc1Waveform = document.getElementById('osc1Waveform');
    var osc2Waveform = document.getElementById('osc2Waveform');
    var lfoWaveform = document.getElementById('lfoWaveform');
    var noiseType = document.getElementById('noiseType');
    var lfoWave = lfoWaveform.options[lfoWaveform.selectedIndex].value;
    var wave1 = osc1Waveform.options[osc1Waveform.selectedIndex].value;
    var wave2 = osc2Waveform.options[osc2Waveform.selectedIndex].value;
    var noiseValue = noiseType.options[noiseType.selectedIndex].value;

    if(noiseValue == "white") {
        createWhiteNoise();
    } else if(noiseValue == "pink") {
        createPinkNoise();
    } else {
        createBrownNoise();
    }

    //LFO
    lfo[key.oscIdx] = context.createOscillator();
    lfo[key.oscIdx].type = lfoWave;
    lfo[key.oscIdx].frequency.value = lfoFreq;
    lfoVol.gain.value = lfoDepth;

    //OSC 1
    osc1[key.oscIdx] = context.createOscillator();
    osc1[key.oscIdx].type = wave1;
    osc1[key.oscIdx].frequency.value = key.freq;
    osc1[key.oscIdx].detune.value = osc1DetuneValue;
    osc1Vol.gain.value = osc1Gain;

    //OSC 2
    osc2[key.oscIdx] = context.createOscillator();
    osc2[key.oscIdx].type = wave2;
    osc2[key.oscIdx].frequency.value = key.freq;
    osc2[key.oscIdx].detune.value = osc2DetuneValue;
    osc2Vol.gain.value = osc2Gain;

    //Noise
    noise[key.oscIdx] = context.createBufferSource();
    noise[key.oscIdx].buffer = noiseBuffer;
    noise[key.oscIdx].loop = true;
    noiseVol.gain.value = noiseGain;

    //Lowpass Filter
    lowpass.frequency.value = cutoffFreq;
    lowpass.Q.value = resonanceQ;

    //Envelope
//    envelope = context.createGain();
//    var envelope = context.createGain();
//    envelope.connect(delay);
//    startAt = context.currentTime;
//    envelope.gain.cancelScheduledValues(startAt);
//    envelope.gain.setValueAtTime(envelope.gain.value, startAt);
//    envelope.linearRampToValueAtTime(1, now + 0.2);
//    envelope.linearRampToValueAtTime(1, now + 0.3);

    //Master
    masterVol.gain.value = masterGain;

    //Connections
    lfo[key.oscIdx].connect(lfoVol);
    lfoVol.connect(lowpass.frequency);

    osc1[key.oscIdx].connect(osc1Vol);
    osc1Vol.connect(lowpass);

    osc2[key.oscIdx].connect(osc2Vol);
    osc2Vol.connect(lowpass);

    noise[key.oscIdx].connect(noiseVol);
    noiseVol.connect(lowpass);

    lowpass.connect(envelope);
    envelope.connect(masterVol);

//    distortion.connect(delay);
//    delay.connect(masterVol);
    masterVol.connect(context.destination);

    //Start
    var now = context.currentTime;
    var attackEnd = now + attack;
    envelope.gain.value = 0;
//    envelope.gain.cancelScheduledValues(now);
//    envelope.gain.setValueAtTime(0.0, now);
//    envelope.gain.linearRampToValueAtTime(masterGain, attackEnd);
//    envelope.gain.setTargetAtTime(sustain, attackEnd, decay);
    envelope.gain.setTargetAtTime(1, context.currentTime, attack);
    noise[key.oscIdx].start(0);
    lfo[key.oscIdx].start(0);
    osc1[key.oscIdx].start(0);
    osc2[key.oscIdx].start(0);
}

function stopPitch(key) {
//    var now = context.currentTime;
//    var releaseEnd = now;
//    envelope.gain.cancelScheduledValues(now);
//    envelope.gain.setValueAtTime(envelope.gain.value, now);
//    envelope.gain.linearRampToValueAtTime(0.0, releaseEnd);
//    envelope.gain.setTargetAtTime(0, context.currentTime, release);
    noise[key.oscIdx].stop(context.currentTime);
    lfo[key.oscIdx].stop(context.currentTime);
    osc1[key.oscIdx].stop(context.currentTime);
    osc2[key.oscIdx].stop(context.currentTime);
//    envelope[key.oscIdx].stop(now);
}

function loadPreset(value) {
    $.ajax({
        url: 'https://p4ypxjini3.execute-api.us-west-2.amazonaws.com/dev/getpresetbyname',
        cache: false,
        type: "GET",
        data: {
            "PresetName": value
        },
        success: function (data) {
            $('#lfoWaveform').val(data.Item.LfoWave);
            $('#noiseType').val(data.Item.NoiseType);
            $('#osc1Waveform').val(data.Item.Osc1Wave);
            $('#osc2Waveform').val(data.Item.Osc2Wave);
            $('#osc1Knob')
                .val(data.Item.Osc1Mixer)
                .trigger('change');
            $('#osc2Knob')
                .val(data.Item.Osc2Mixer)
                .trigger('change');
            $('#noiseKnob')
                .val(data.Item.MixerNoise)
                .trigger('change');
            $('#masterKnob')
                .val(data.Item.MasterVolume)
                .trigger('change');
            $('#cutoff')
                .val(data.Item.Cutoff)
                .trigger('change');
            $('#resonance')
                .val(data.Item.Resonance)
                .trigger('change');
            $('#lfoFreq')
                .val(data.Item.LfoSpeed)
                .trigger('change');
            $('#lfoDepth')
                .val(data.Item.LfoDepth)
                .trigger('change');
            $('#osc1Detune')
                .val(data.Item.Osc1Detune)
                .trigger('change');
            $('#osc2Detune')
                .val(data.Item.Osc2Detune)
                .trigger('change');
            $('#attackKnob')
                .val(data.Item.Attack)
                .trigger('change');
            $('#decayKnob')
                .val(data.Item.Decay)
                .trigger('change');
            $('#sustainKnob')
                .val(data.Item.Sustain)
                .trigger('change');
            $('#releaseKnob')
                .val(data.Item.Release)
                .trigger('change');
            $('#delayKnob')
                .val(data.Item.Delay)
                .trigger('change');
            $('#distortionKnob')
                .val(data.Item.Distortion)
                .trigger('change');
        }
    });
}

function savePreset() {
    var preset = prompt("Please enter preset name:", "Preset Name");
    var presetMenu = document.getElementById("preBox");

    for (var i = 0; i < presetMenu.length; i++) {
        if (presetMenu[i].value === preset) {
            alert("Preset name already used");
            return;
        }
    }

    if (preset === "Preset Name") {
        alert("Please enter a different preset name");
        return;
    }

    if (preset === null) {
        return;
    }

    var option = document.createElement("option");
    if (preset != null) {
        option.text = preset;
        presetMenu.add(option);
    }

    var osc1Waveform = document.getElementById('osc1Waveform');
    var osc2Waveform = document.getElementById('osc2Waveform');
    var lfoWaveform = document.getElementById('lfoWaveform');
    var noiseType = document.getElementById('noiseType');
    var lfoWave = lfoWaveform.options[lfoWaveform.selectedIndex].value;
    var wave1 = osc1Waveform.options[osc1Waveform.selectedIndex].value;
    var wave2 = osc2Waveform.options[osc2Waveform.selectedIndex].value;
    var noiseValue = noiseType.options[noiseType.selectedIndex].value;

    var data = {
        PresetName: preset,
        LfoWave: lfoWave,
        LfoSpeed: lfoFreq,
        LfoDepth: lfoDepth,
        NoiseType: noiseValue,
        Osc1Wave: wave1,
        Osc1Detune: osc1DetuneValue,
        Osc2Wave: wave2,
        Osc2Detune: osc2DetuneValue,
        Osc1Mixer: osc1Knob,
        Osc2Mixer: osc2Knob,
        MixerNoise: noiseKnob,
        Cutoff: cutoffFreq,
        Resonance: resonanceQ,
        Attack: attack,
        Decay: decay,
        Sustain: sustain,
        Release: release,
        Distortion: distortionVal,
        Delay: delayVal,
        MasterVolume: masterGain * 100,
    };

    $.ajax({
        url: 'https://t40zzwlkf8.execute-api.us-west-2.amazonaws.com/dev/insertpreset',
        cache: false,
        type: "POST",
        data: JSON.stringify(data),
        success: function (data) {
            $('#preBox').val(preset);
        }
    });
}

function loadAllPresets() {
    $.ajax({
        url: 'https://b347d3ott3.execute-api.us-west-2.amazonaws.com/dev/listpresets',
        cache: false,
        type: "GET",
        success: function (data) {
            if ($('#preBox option').length === 1) {
                for (var i = 0; i < data.Items.length; i++) {
                    if (data.Items[i].PresetName !== "Default") {
                        $('#preBox').append(new Option(data.Items[i].PresetName));
                    }
                }
            }
        }
    });
}