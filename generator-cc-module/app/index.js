'use strict';
var generators = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var mkdirp = require('mkdirp');
var _ = require('lodash');
var Promise = require('bluebird');
var exec = Promise.promisify(require('child_process').exec);
var gitConfig = require('git-config');

module.exports = generators.Base.extend({
  initializing: function() {
    this.pkg = require('../package.json');
  },

  prompting: function() {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the ' + chalk.red('Babel Library Boilerplate') + ' generator!'
    ));

    Promise.all([exec('npm whoami').catch(function(e) {
      console.error('Error getting npm user name: run `npm login`');
      console.error(e);
    })])
    .then(function(result) {
      result = result ? result : {};
      this.username = _.trim(result[0]);
      this._showPrompts(done);
    }.bind(this));
  },

  _showPrompts: function(done) {
    var config = gitConfig.sync();
    config.user = config.user ? config.user : {};
    var prompts = [{
      type: 'input',
      name: 'user',
      message: 'What is the Github username/organization for this project?',
      default: this.username,
      store: true
    }, {
      type: 'input',
      name: 'repo',
      message: 'What is the repository/project name?',
      default: _.kebabcase(this.appname)
    }, {
      type: 'input',
      name: 'description',
      message: 'What is a short description for this project?'
    }, {
      type: 'input',
      name: 'author',
      message: 'Who is the author of this project?',
      default: config.user.name + ' <' + config.user.email + '>',
      store: true
    }, {
      type: 'input',
      name: 'license',
      message: 'What license should this module have?',
      default: 'MIT',
      store: true
    }];

    this.prompt(prompts, function (props) {
      this.user = props.user;
      this.repo = props.repo;
      this.variable = _.camelcase(props.repo);
      this.description = props.description;
      this.author = props.author;
      this.license = props.license;
      done();
    }.bind(this));
  },

  writing: {
    app: function() {
      this.template('babelrc', '.babelrc');
      this.template('jscsrc', '.jscsrc');
      this.template('eslintrc', '.eslintrc');
      this.template('editorconfig', '.editorconfig');
      this.template('_package.json', 'package.json');
      this.template('README.md', 'README.md');
      this.template('gitignore', '.gitignore');
      this.template('npmignore', '.npmignore');
      mkdirp.sync('src');
      this.template('src/index.js', 'src/' + this.repo + '.js');
      mkdirp.sync('dist');
    }
  },

  install: function() {
    this.installDependencies({
      bower: false,
      npm: true,
      skipInstall: this.options['skip-install']
    });
  }
});
