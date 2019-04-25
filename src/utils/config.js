const urls = {
    dev: 'http://192.168.1.8:3005',
    prod: 'http://18.225.32.223:3005'
};
const env = "dev";
module.exports = {
    baseUrl: urls[env]
};