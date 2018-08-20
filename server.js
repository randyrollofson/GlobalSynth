'use strict';

var express = require('express');
var socket = require('socket.io');
var sqlite3 = require('sqlite3').verbose();

var app = express();

app.use('/', express.static(__dirname + '/'));


var io = socket(app.listen(process.env.PORT || 8080));

console.log('Open "http://localhost:8080/index.html" in your browser');

var db = new sqlite3.Database('./globalsynth_presets.db');

// db.run("CREATE TABLE IF NOT EXISTS globalsynth_presets (preset_name TEXT PRIMARY KEY , lfo_wave TEXT, lfo_speed REAL, lfo_depth INTEGER, noise_type TEXT, osc1_wave TEXT, osc1_detune INTEGER, osc2_wave TEXT, osc2_detune INTEGER, mixer_osc1 INTEGER, mixer_osc2 INTEGER, mixer_noise INTEGER, cutoff INTEGER, resonance INTEGER, attack REAL, decay REAL, sustain REAL, release REAL, distortion REAL, delay REAL, master_volume INTEGER)");

// db.run("INSERT into globalsynth_presets VALUES ('Default', 'sine', 0.0, 500, 'brown', 'sawtooth', 0, 'sawtooth', -10, 50, 50, 0, 2500, 0, 0.2, 0.6, 0.6, 0.5, 0.0, 0.0, 75)");
// db.run("INSERT into globalsynth_presets VALUES ('Phat Lead', 'sine', 1.8, 113, 'brown', 'sawtooth', 0, 'sawtooth', -19, 50, 50, 35, 2500, 6, 0.0, 0.0, 0.0, 0.0, 83.0, 0.0, 75)");
// db.run("UPDATE globalsynth_presets SET master_volume = 0.75");
// db.run("DELETE FROM globalsynth_presets WHERE preset_name like '%Test%'");
// db.run("DELETE FROM globalsynth_presets WHERE preset_name = 'null'");

db.all("SELECT * FROM globalsynth_presets", function(err, rows) {
    if(err) {
        console.log(err);
    } else {
        console.log(rows);
    }
});

db.close();

io.on('connection', function(objectSocket) {

    objectSocket.on('loadPreset', function(presetName) {
        var db = new sqlite3.Database('./globalsynth_presets.db');

        var query = "SELECT * FROM globalsynth_presets WHERE preset_name = " + '"' + presetName + '"';

        db.all(query, function(err, rows) {
            if(err) {
                console.log(err);
            }
            io.emit('loadPreset', rows);
        });

        db.close();
    });

    objectSocket.on('savePreset', function(presetData) {
        var db = new sqlite3.Database('./globalsynth_presets.db');

        var query = "INSERT INTO globalsynth_presets VALUES (" + "'" + presetData.preset_name + "'" + ", " + "'" + presetData.lfo_wave + "'" + ", " + presetData.lfo_speed + ", " + presetData.lfo_depth + ", " + "'" + presetData.noise_type + "'" + ", " + "'" + presetData.osc1_wave + "'" + ", " + presetData.osc1_detune + ", " + "'" + presetData.osc2_wave + "'" + ", " + presetData.osc2_detune + ", " + presetData.mixer_osc1 + ", " + presetData.mixer_osc2 + ", " + presetData.mixer_noise + ", " + presetData.cutoff + ", " + presetData.resonance + ", " + presetData.attack + ", " + presetData.decay + ", " + presetData.sustain + ", " + presetData.release + ", " + presetData.distortion + ", " + presetData.delay + ", " + presetData.master_volume + ")";

        db.all(query, function(err, rows) {
            if(err) {
                console.log(err);
            }
        });

        db.close();
    });

    objectSocket.on('loadAllPresets', function() {
        var db = new sqlite3.Database('./globalsynth_presets.db');

        var query = "SELECT * FROM globalsynth_presets";

        db.all(query, function(err, rows) {
            if(err) {
                console.log(err);
            }
            io.emit('loadAllPresets', rows);
        });

        db.close();
    });
});
