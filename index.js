/* eslint-env node */
'use strict';

const path = require('path');
const Funnel = require('broccoli-funnel');
const mergeTrees = require('broccoli-merge-trees');
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
    }
    if (!(app.options['materialize-shim'] || {}).omitRoboto) {
      app.import('vendor/roboto/roboto-fontface.css', { destDir: 'dummyDir/css' });
    }
  },

  treeForPublic: function(tree) {
    var trees = [];

    const robotoFontPath = path.join(this.project.root, 'node_modules', 'roboto-fontface');
    trees.push(new Funnel(robotoFontPath, {
      destDir: 'fonts',
      srcDir: 'fonts/roboto'
    }));


    if (tree) {
      trees.push(tree);
    }

    return mergeTrees(trees, { overwrite: true });
  },

  treeForVendor(tree) {
    let trees = [];

    if (tree) {
      trees.push(tree);
    }

    const robotoFontPath = path.join(this.project.root, 'node_modules', 'roboto-fontface');
    if (existsSync(robotoFontPath)) {
      trees.push(new Funnel(robotoFontPath, {
        srcDir: 'css/roboto',
        include: ['**/*'],
        destDir: 'roboto'
      }));
    }

    const materializePath = path.join(this.project.root, 'node_modules', 'materialize-css', 'dist', 'js');
    if (existsSync(materializePath)) {
      const materializeTree = fastbootTransform(new Funnel(materializePath, {
        files: ['materialize.js'],
        destDir: 'materialize'
      }));

      trees.push(materializeTree);
    }

    return mergeTrees(trees);
  }
};
