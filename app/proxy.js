const HttpsProxyAgent = require('https-proxy-agent');
const httpProxy = new HttpsProxyAgent('http://mutpoit:8085');
export { httpProxy };