'use strict';

const getChannelURL = require('ember-source-channel-url');

module.exports = function() {
  return Promise.all([
    getChannelURL('release'),
    getChannelURL('beta'),
    getChannelURL('canary'),
  ]).then((urls) => {
    const releaseUrl = urls[0];
    const betaUrl = urls[1];
    const canaryUrl = urls[2];
    return {
      useYarn: true,
      scenarios: [
        {
          name: 'ember-lts-2.12',
          npm: {
            devDependencies: {
              'ember-source': '~2.12.0'
            }
          }
        },
        {
          name: 'ember-lts-2.16',
          npm: {
            devDependencies: {
              'ember-source': '~2.16.0'
            }
          }
        },
        {
          name: 'ember-release',
          npm: {
            devDependencies: {
              'ember-source': releaseUrl
            }
          }
        },
        {
          name: 'ember-beta',
          npm: {
            devDependencies: {
              'ember-source': betaUrl
            }
          }
        },
        {
          name: 'ember-canary',
          npm: {
            devDependencies: {
              'ember-source': canaryUrl
            }
          }
        },
        {
          name: 'ember-default',
          npm: {
            devDependencies: {}
          }
        }
      ]
    };
  });
};
