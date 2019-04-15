const urls = {
    local: 'http://127.0.0.1:3005',
    prod: 'http://18.225.32.223:3005'
};
const env = "prod";
module.exports = {
    baseUrl: urls[env]
};