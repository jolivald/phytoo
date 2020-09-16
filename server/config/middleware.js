const { name, version } = require('../package.json');
const { capitalize } = require('lodash');

module.exports = {
  settings: {

    // core
    public: {
      defaultIndex: true
    },
    gzip: {
      enabled: true    
    },
    responseTime: {
      enabled: false
    } ,
    poweredBy: {
      enabled: true,
      value: `${capitalize(name)} - ${version}`
    },

    // security
    csp: {
      enabled: true
    },
    hsts: {
      enabled: false // TODO: SSL?
    },
    xframe: {
      enabled: true,
      value: 'DENY'
    },
    cors: {
      enabled: true,
      origin: '*'
    }
  }
};
