'use strict';

var express = require('express');
var socket = require('socket.io');
var sqlite3 = require('sqlite3').verbose();

var app = express();

app.use('/', express.static(__dirname + '/'));


var io = socket(app.listen(process.env.PORT || 8080));

console.log('go ahead and open "http://localhost:8080/index.html" in your browser');

var db = new sqlite3.Database('./globalsynth_presets.db');

// db.run("CREATE TABLE IF NOT EXISTS globalsynth_presets (preset_name TEXT PRIMARY KEY , lfo_wave TEXT, lfo_speed REAL, lfo_depth INTEGER, noise_type TEXT, osc1_wave TEXT, osc1_detune INTEGER, osc2_wave TEXT, osc2_detune INTEGER, mixer_osc1 INTEGER, mixer_osc2 INTEGER, mixer_noise INTEGER, cutoff INTEGER, resonance INTEGER, attack REAL, decay REAL, sustain REAL, release REAL, distortion REAL, delay REAL, master_volume INTEGER)");

// db.run("INSERT into globalsynth_presets VALUES ('Default', 'sine', 0.0, 500, 'brown', 'sawtooth', 0, 'sawtooth', -10, 50, 50, 0, 2500, 0, 0.2, 0.6, 0.6, 0.5, 0.0, 0.0, 75)");
// db.run("INSERT into globalsynth_presets VALUES ('Phat Lead', 'sine', 1.8, 113, 'brown', 'sawtooth', 0, 'sawtooth', -19, 50, 50, 35, 2500, 6, 0.0, 0.0, 0.0, 0.0, 83.0, 0.0, 75)");

db.all("SELECT * from globalsynth_presets", function(err, rows) {
    if(err) {
        console.log(err);
    } else {
        console.log(rows);
    }
});

db.close();

io.on('connection', function(objectSocket) {
        //console.log('client connected');

        objectSocket.on('loadPreset', function(presetName) {
            console.log(presetName);
            var db = new sqlite3.Database('./globalsynth_presets.db');

            var query = "SELECT * FROM globalsynth_presets WHERE preset_name = " + '"' + presetName + '"';

            db.all(query, function(err, rows) {
                if(err) {
                    console.log(err);
                }
                //console.log(rows);
                io.emit('loadPreset', rows);
            });

            db.close();
        });

    // objectSocket.on('disconnect', function() {
    //     console.log('client disconnected');
    // });
});