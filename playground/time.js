const moment = require('moment');

let date = moment();
date.add(1, 'month').subtract(1, 'year');
console.log(date.format('MMM Do, YYYY'));

let timestamp = moment().valueOf();
console.log(timestamp);
let createdAt = 1234;
let time = moment(createdAt);
console.log(time.format('h:mm a'));