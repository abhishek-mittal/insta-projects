
const fs = require('fs');
const join = require('path').join;

// Bootstrap mongoDb models
const models = join(__dirname, './../mongoDB');
fs.readdirSync(models)
    .filter(file => ~file.search(/^[^\.].*\.js$/))
    .forEach(file => require(join(models, file)));