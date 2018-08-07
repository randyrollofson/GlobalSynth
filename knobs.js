/*  Copyright © 2017 Randy Rollofson
*   ALL RIGHTS RESERVED
*   [This program is licensed under the "MIT License"]
*   Please see the file COPYING in the source
*   distribution of this software for license terms.
*/

//  Knob functionality used from this github repo (MIT license):
//  https://github.com/aterrien/jQuery-Knob/blob/master/js/jquery.knob.js
$(document).ready(function(){
    $('#osc1Knob').knob(
        {
            'min': 0,
            'max': 100,
            'width': 50,
            'height': 50,
            'displayInput': true,
            'fgColor': "#00CED1",
            'inputColor': "white",
            'angleArc': 350,
            'angleOffset': 5,
            'stopper': true,
            'release': function (v) {
                //alert(v);
                setOsc1Volume(v);
            }
        });

    $('#osc2Knob').knob(
        {
            'min': 0,
            'max': 100,
            'width': 50,
            'height': 50,
            'displayInput': true,
            'fgColor': "#00CED1",
            'inputColor': "white",
            'angleArc': 350,
            'angleOffset': 5,
            'stopper': true,
            'release': function (v) {
                //alert(v);
                setOsc2Volume(v);
            }
        });

    $('#noiseKnob').knob(
        {
            'min': 0,
            'max': 100,
            'width': 50,
            'height': 50,
            'displayInput': true,
            'fgColor': "#00CED1",
            'inputColor': "white",
            'angleArc': 350,
            'angleOffset': 5,
            'stopper': true,
            'release': function (v) {
                //alert(v);
                setNoiseVolume(v);
            }
        });

    $('#masterKnob').knob(
        {
            'min': 0,
            'max': 100,
            'width': 75,
            'height': 75,
            'displayInput': true,
            'fgColor': "#00CED1",
            'inputColor': "white",
            'angleArc': 350,
            'angleOffset': 5,
            'stopper': true,
            'release': function (v) {
                //alert(v);
                setMasterVolume(v);
            }
        });

    $('#cutoff').knob(
        {
            'min': 0,
            'max': 10000,
            'width': 75,
            'height': 75,
            'displayInput': true,
            'fgColor': "#00CED1",
            'inputColor': "white",
            'angleArc': 350,
            'angleOffset': 5,
            'stopper': true,
            'release': function (v) {
                //alert(v);
                setCutoff(v);
            }
        });

    $('#resonance').knob(
        {
            'min': 0,
            'max': 50,
            'width': 75,
            'height': 75,
            'displayInput': true,
            'fgColor': "#00CED1",
            'inputColor': "white",
            'angleArc': 350,
            'angleOffset': 5,
            'stopper': true,
            'release': function (v) {
                //alert(v);
                setResonance(v);
            }
        });

    $('#lfoFreq').knob(
        {
            'min': 0,
            'max': 25,
            'width': 50,
            'height': 50,
            'displayInput': true,
            'fgColor': "#00CED1",
            'inputColor': "white",
            'angleArc': 350,
            'angleOffset': 5,
            'step':0.1,
            'stopper': true,
            'release': function (v) {
                //alert(v);
                setLfoFreq(v);
            }
        });

    $('#lfoDepth').knob(
        {
            'min': 0,
            'max': 1000,
            'width': 50,
            'height': 50,
            'displayInput': true,
            'fgColor': "#00CED1",
            'inputColor': "white",
            'angleArc': 350,
            'angleOffset': 5,
            'step':1,
            'stopper': true,
            'release': function (v) {
                //alert(v);
                setLfoDepth(v);
            }
        });

    $('#osc1Detune').knob(
        {
            'min': -50,
            'max': 50,
            'width': 50,
            'height': 50,
            'displayInput': true,
            'fgColor': "#00CED1",
            'inputColor': "white",
            'angleArc': 350,
            'angleOffset': 5,
            'step':1,
            'stopper': true,
            'release': function (v) {
                //alert(v);
                setOsc1Detune(v);
            }
        });

    $('#osc2Detune').knob(
        {
            'min': -50,
            'max': 50,
            'width': 50,
            'height': 50,
            'displayInput': true,
            'fgColor': "#00CED1",
            'inputColor': "white",
            'angleArc': 350,
            'angleOffset': 5,
            'step':1,
            'stopper': true,
            'release': function (v) {
                //alert(v);
                setOsc2Detune(v);
            }
        });

    $('#attackKnob').knob(
        {
            'min': 0.0,
            'max': 5.0,
            'width': 50,
            'height': 50,
            'displayInput': true,
            'fgColor': "#00CED1",
            'inputColor': "white",
            'angleArc': 350,
            'angleOffset': 5,
            'step':0.1,
            'stopper': true,
            'release': function (v) {
                //alert(v);
                setAttack(v);
            }
        });

    $('#decayKnob').knob(
        {
            'min': 0.0,
            'max': 5.0,
            'width': 50,
            'height': 50,
            'displayInput': true,
            'fgColor': "#00CED1",
            'inputColor': "white",
            'angleArc': 350,
            'angleOffset': 5,
            'step':0.1,
            'stopper': true,
            'release': function (v) {
                //alert(v);
                setDecay(v);
            }
        });

    $('#sustainKnob').knob(
        {
            'min': 0.0,
            'max': 5.0,
            'width': 50,
            'height': 50,
            'displayInput': true,
            'fgColor': "#00CED1",
            'inputColor': "white",
            'angleArc': 350,
            'angleOffset': 5,
            'step':0.1,
            'stopper': true,
            'release': function (v) {
                //alert(v);
                setSustain(v);
            }
        });

    $('#releaseKnob').knob(
        {
            'min': 0.0,
            'max': 5.0,
            'width': 50,
            'height': 50,
            'displayInput': true,
            'fgColor': "#00CED1",
            'inputColor': "white",
            'angleArc': 350,
            'angleOffset': 5,
            'step':0.1,
            'stopper': true,
            'release': function (v) {
                //alert(v);
                setRelease(v);
            }
        });

    $('#delayKnob').knob(
        {
            'min': 0.0,
            'max': 5.0,
            'width': 50,
            'height': 50,
            'displayInput': true,
            'fgColor': "#00CED1",
            'inputColor': "white",
            'angleArc': 350,
            'angleOffset': 5,
            'step':0.01,
            'stopper': true,
            'release': function (v) {
                //alert(v);
                setDelay(v);
            }
        });

    $('#distortionKnob').knob(
        {
            'min': 0.0,
            'max': 500.0,
            'width': 50,
            'height': 50,
            'displayInput': true,
            'fgColor': "#00CED1",
            'inputColor': "white",
            'angleArc': 350,
            'angleOffset': 5,
            'step':1.0,
            'stopper': true,
            'release': function (v) {
                //alert(v);
                setDistortion(v);
            }
        });
});

