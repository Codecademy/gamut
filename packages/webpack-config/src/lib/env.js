const DEV = process.env.NODE_ENV !== 'production';
const ENV = DEV ? 'development' : 'production';

module.exports = ENV;
