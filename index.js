/* eslint-env node */
'use strict';

const path = require('path');
const Funnel = require('broccoli-funnel');
const Merge = require('broccoli-merge-trees');
const fastbootTransform = require('fastboot-transform');
const existsSync = require('exists-sync');

module.exports = {
  name: 'ember-materialize-shim',
  included(appOrAddon) {
    this._super.included(appOrAddon);
    let app = appOrAddon;
    if (typeof appOrAddon.import !== 'function' && appOrAddon.app) {
      app = appOrAddon.app;
    }
    this.app = app;

    if (!(app.options['materialize-shim'] || {}).omitJS) {
      app.import('vendor/materialize/materialize.js');
      app.import('vendor/materialize-shim.js', {
        exports: {
          materialize: ['default']
        }
      });
    }
  },

  treeForVendor(tree) {
    let trees = [];

    if (tree) {
      trees.push(tree);
    }

    let materializePath = path.join(this.project.root, 'node_modules', 'materialize-css', 'dist', 'js');
    if (existsSync(materializePath)) {
      let materializeTree = fastbootTransform(new Funnel(materializePath, {
        files: ['materialize.js'],
        destDir: 'materialize'
      }));

      trees.push(materializeTree);
    }

    return new Merge(trees);
  }
};
