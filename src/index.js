#!/usr/bin/env node

const CWLogsWritable = require('cwlogs-writable')

const [groupName, baseName, accessKey, secretKey] = process.argv.slice(2)

if (!groupName || !baseName || !accessKey || !secretKey) {
    console.log('All flags are required.')
    process.exit(1)
}

const streamName = baseName + '-' + Date.now() + '/' + Math.round(Math.random() * 4026531839 + 268435456).toString(16)

const cwstream = new CWLogsWritable({
    logGroupName: groupName,
    logStreamName: streamName,

    cloudWatchLogsOptions: {
        region: 'eu-west-3',

        accessKeyId: accessKey,
        secretAccessKey: secretKey,
    },
})

process.stdin.setEncoding('utf8')

process.stdin.pipe(cwstream)
process.stdin.pipe(process.stdout)
process.once('SIGINT', () => {})
process.once('SIGTERM', () => {})

console.log(process.argv)
