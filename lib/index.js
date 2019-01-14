#!/usr/bin/env node
"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var CWLogsWritable = require('cwlogs-writable');

var _process$argv$slice = process.argv.slice(2),
    _process$argv$slice2 = _slicedToArray(_process$argv$slice, 4),
    groupName = _process$argv$slice2[0],
    baseName = _process$argv$slice2[1],
    accessKey = _process$argv$slice2[2],
    secretKey = _process$argv$slice2[3];

if (!groupName || !baseName || !accessKey || !secretKey) {
  console.log('All flags are required.');
  process.exit(1);
}

var streamName = baseName + '-' + Date.now() + '/' + Math.round(Math.random() * 4026531839 + 268435456).toString(16);
var cwstream = new CWLogsWritable({
  logGroupName: groupName,
  logStreamName: streamName,
  cloudWatchLogsOptions: {
    region: 'eu-west-3',
    accessKeyId: accessKey,
    secretAccessKey: secretKey
  }
});
process.stdin.setEncoding('utf8');
process.stdin.pipe(cwstream);
process.stdin.pipe(process.stdout);
process.once('SIGINT', function () {});
process.once('SIGTERM', function () {});
console.log(process.argv);