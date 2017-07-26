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
            'width': 75,
            'height': 75,
            'displayInput': true,
            'fgColor': "#00CED1",
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
            'width': 75,
            'height': 75,
            'displayInput': true,
            'fgColor': "#00CED1",
            'angleArc': 350,
            'angleOffset': 5,
            'stopper': true,
            'release': function (v) {
                //alert(v);
                setOsc2Volume(v);
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
            'angleArc': 350,
            'angleOffset': 5,
            'stopper': true,
            'release': function (v) {
                //alert(v);
                setMasterVolume(v);
            }
        });

    $('#osc1Cutoff').knob(
        {
            'min': 0,
            'max': 10000,
            'width': 75,
            'height': 75,
            'displayInput': true,
            'fgColor': "#00CED1",
            'angleArc': 350,
            'angleOffset': 5,
            'stopper': true,
            'release': function (v) {
                //alert(v);
                setOsc1Cutoff(v);
            }
        });

    $('#osc2Cutoff').knob(
        {
            'min': 0,
            'max': 10000,
            'width': 75,
            'height': 75,
            'displayInput': true,
            'fgColor': "#00CED1",
            'angleArc': 350,
            'angleOffset': 5,
            'stopper': true,
            'release': function (v) {
                //alert(v);
                setOsc2Cutoff(v);
            }
        });

    $('#lfoFreq').knob(
        {
            'min': 0,
            'max': 100,
            'width': 75,
            'height': 75,
            'displayInput': true,
            'fgColor': "#00CED1",
            'angleArc': 350,
            'angleOffset': 5,
            'step':0.1,
            'stopper': true,
            'release': function (v) {
                //alert(v);
                setLfoFreq(v);
            }
        });
});

