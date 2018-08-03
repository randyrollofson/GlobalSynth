'use strict';

var express = require('express');
var socket = require('socket.io');
var sqlite3 = require('sqlite3').verbose();

var server = express();

server.use('/', express.static(__dirname + '/'));

var io = socket(server.listen(8080));

console.log('go ahead and open "http://localhost:8080/index.html" in your browser');

var db = new sqlite3.Database('./globalsynth_presets.db');

db.run('CREATE TABLE IF NOT EXISTS globalsynth_presets (preset_name TEXT PRIMARY KEY , lfo_wave TEXT, lfo_speed REAL, lfo_depth INTEGER, noise_type TEXT, osc1_wave TEXT, osc1_detune INTEGER, osc2_wave TEXT, osc2_detune INTEGER, mixer_osc1 INTEGER, mixer_osc2 INTEGER, mixer_noise INTEGER, cutoff INTEGER, resonance INTEGER, attack REAL, decay REAL, sustain REAL, release REAL, distortion INTEGER, delay REAL, master_volume INTEGER)');


db.close();