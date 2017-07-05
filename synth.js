var context = new (window.AudioContext || window.webkitAudioContext)();

//var source = context.createMediaStreamSource(stream);

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

var gain = context.createGain();
gain.gain.value = 0.5;

osc1.connect(filter);
filter.connect(context.destination);
osc2.connect(gain);
gain.connect(context.destination);

//var analyser = context.createAnalyser();

