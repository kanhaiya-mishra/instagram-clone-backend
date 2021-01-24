const env = process.env.NODE_ENV;
if (env === 'production') {
   module.exports = require('./prod');
} else {
   module.exports = require('./dev');
}