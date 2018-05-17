# Quasar App

> WIP

## Configuration :

### Proxy :
If you need to use a proxy, add a proxy file in app/proxy.js that exports an HttpsProxyAgent named httpProxy.

exemple :
````const HttpsProxyAgent = require('https-proxy-agent');
  const httpProxy = new HttpsProxyAgent('http://MON-PROXY');
  export { httpProxy };
  ```` 

