// Grab NODE_ENV and REACT_APP_* environment variables and prepare them to be
// injected into the application via DefinePlugin in Webpack configuration.

var REACT_APP = /^REACT_APP_/i;

// set API hosts from env file
var apiHost;
switch (process.env.NODE_ENV) {
  case 'development':
    apiHost = process.env.REACT_APP_API_HOST_LOCAL;
    break;
  case 'production':
    apiHost = process.env.REACT_APP_API_HOST_PRODUCTION;
    break;
  default:
    apiHost = '/';
}

function getClientEnvironment(publicUrl) {
  return Object
    .keys(process.env)
    .filter(key => REACT_APP.test(key))
    .reduce((env, key) => {
      env['process.env.' + key] = JSON.stringify(process.env[key]);
      return env;
    }, {
      // Useful for determining whether we’re running in production mode.
      // Most importantly, it switches React into the correct mode.
      'process.env.NODE_ENV': JSON.stringify(
        process.env.NODE_ENV || 'development'
      ),
      // Useful for resolving the correct path to static assets in `public`.
      // For example, <img src={process.env.PUBLIC_URL + '/img/logo.png'} />.
      // This should only be used as an escape hatch. Normally you would put
      // images into the `src` and `import` them in code to get their paths.
      'process.env.PUBLIC_URL': JSON.stringify(publicUrl),
      'process.env.API_HOST': JSON.stringify(apiHost),
    });
}

module.exports = getClientEnvironment;
