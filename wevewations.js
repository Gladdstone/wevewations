'use strict';

const twit = require('twit');
const fs = require('fs');
const config = require('./config.js');
const errorReport = require('./errorReport');

const t = new twit(config);

let cursor = 0;

// parses verses out of revelation.json
const rawdata = fs.readFileSync('revelations.json');
const revelations = JSON.parse(rawdata);

// parses starter sayings out of starters.json
const rawstarters = fs.readFileSync('starters.json');
const startersJson = JSON.parse(rawstarters);
const starters = startersJson['starters'];

// sets function call interval in millisecond * second * minute etc.
setInterval(tweet, 1000*1);

function tweet() {
    const vewse = getVewse();
    const tweet = {
        status: vewse
    };

    // t.post('statuses/update', tweet, tweeted);

    function tweeted(err, data, response) {
        if(err) {
            errorReport.errorReport();
        } else {
            console.log('success uwu');
        }
    }
}

function getVewse() {
    let vewse = revelations['book'][cursor]
    let text = vewse['text'].split('');
    for(let i = 0; i < text.length; i++) {
        text[i] = text[i] === 'r' || text[i] === 'l' ? 'w' : text[i];
        text[i] = text[i] === 'R' || text[i] === 'L' ? 'w' : text[i];
    }

    const starter = starters[Math.floor(Math.random() * starters.length)]['text'];
    cursor++;
    return `${vewse['chapter']} : ${vewse['verse']} ${starter + text.join('')}`;
}
