import {Match, check} from 'meteor/check';
import {Meteor} from 'meteor/meteor';

import {routeObjectMatch, escapeKeys} from './lib.js';
import {collection, levels} from './server';

Meteor.methods({
  'Activity.route'(routeObject) {
    check(routeObject, routeObjectMatch);

    let user;
    if (this.userId) {
      user = {
        _id: this.userId,
      };
    }
    else {
      user = null;
    }

    collection.insert({
      timestamp: new Date(),
      connection: this.connection.id,
      byUser: user,
      type: 'route',
      level: levels.DEBUG,
      data: escapeKeys(routeObject),
    });
  },

  'Activity.error'(error) {
    check(error, {
      message: String,
      filename: String,
      lineNumber: Match.OneOf(Match.Integer, null),
      columnNumber: Match.OneOf(Match.Integer, null),
      route: routeObjectMatch,
      stack: [Match.NonEmptyString],
      userAgent: Match.OneOf(Match.NonEmptyString, null),
      languages: [Match.NonEmptyString],
      clientTime: Date,
      windowWidth: Match.OneOf(Match.Integer, null),
      windowHeight: Match.OneOf(Match.Integer, null),
      screenWidth: Match.OneOf(Match.Integer, null),
      screenHeight: Match.OneOf(Match.Integer, null),
      devicePixelRatio: Match.OneOf(Number, null),
      status: Object,
      protocol: Match.OneOf(Match.NonEmptyString, null),
      settings: Object,
      release: Match.NonEmptyString,
      version: Match.OneOf(Match.NonEmptyString, null),
    });

    let user;
    if (this.userId) {
      user = {
        _id: this.userId,
      };
    }
    else {
      user = null;
    }

    collection.insert({
      timestamp: new Date(),
      connection: this.connection.id,
      byUser: user,
      type: 'error',
      level: levels.ERROR,
      data: escapeKeys(error),
    });
  },

  'Activity.visibility'(visible) {
    check(visible, Boolean);

    let user;
    if (this.userId) {
      user = {
        _id: this.userId,
      };
    }
    else {
      user = null;
    }

    collection.insert({
      timestamp: new Date(),
      connection: this.connection.id,
      byUser: user,
      type: 'visibility',
      level: levels.DEBUG,
      data: {
        visible,
      },
    });
  },

  'Activity.focus'(focused) {
    check(focused, Boolean);

    let user;
    if (this.userId) {
      user = {
        _id: this.userId,
      };
    }
    else {
      user = null;
    }

    return collection.insert({
      timestamp: new Date(),
      connection: this.connection.id,
      byUser: user,
      type: 'focus',
      level: levels.DEBUG,
      data: {
        focused,
      },
    });
  },
});
