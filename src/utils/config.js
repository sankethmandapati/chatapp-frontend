const urls = {
    dev: 'http://127.0.0.1:3005',
    prod: 'http://3.16.10.225:3005'
};
const env = "dev";
module.exports = {
    baseUrl: urls[env]
};