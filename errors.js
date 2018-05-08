import {Meteor} from 'meteor/meteor';
import {Promise} from 'meteor/promise';
import {StackTrace} from 'meteor/peerlibrary:stacktrace';

import {vueInstance, previousRouter} from './client';
import {flowRouterContextToRouteObject, vueRouterObjectToRouteObject} from './lib.js';

const getStack = function (error) {
  if (error) {
    return StackTrace.fromError(error).then((stackframes) => {
      return stackframes.map((stackframe) => {
        return stackframe.toString();
      });
    });
  }
  else {
    return Promise.resolve([]);
  }
};

vueInstance.then(function (vm) {
  window.addEventListener('error', function (event) {
    let FlowRouter = null;
    let route = null;

    if (Package['peerlibrary:flow-router']) {
      FlowRouter = Package['peerlibrary:flow-router'].FlowRouter;
    }
    else if (Package['kadira:flow-router']) {
      FlowRouter = Package['kadira:flow-router'].FlowRouter;
    }

    if (vm) {
      route = vueRouterObjectToRouteObject(vm.$router, previousRouter);
    }
    else if (FlowRouter) {
      const currentRoute = FlowRouter.current();

      if (currentRoute) {
        route = flowRouterContextToRouteObject(currentRoute);
      }
    }

    let languages = [];
    if (navigator.languages) {
      languages = navigator.languages;
    }
    else if (navigator.language || navigator.userLanguage) {
      languages = [navigator.language || navigator.userLanguage];
    }

    getStack(event.error).then((stack) => {
      Meteor.apply('Activity.error', [{
        message: event.message || '',
        filename: event.filename || '',
        lineNumber: parseInt(event.lineno) || null,
        columnNumber: parseInt(event.colno) || null,
        route,
        stack,
        userAgent: navigator.userAgent || null,
        languages,
        clientTime: new Date(),
        windowWidth: window.innerWidth || null,
        windowHeight: window.innerHeight || null,
        screenWidth: screen.width || null,
        screenHeight: screen.height || null,
        devicePixelRatio: window.devicePixelRatio || null,
        status: Meteor.status(),
        protocol: Meteor.connection && Meteor.connection._stream && Meteor.connection._stream.socket && Meteor.connection._stream.socket.protocol || null,
        settings: Meteor.settings,
        release: Meteor.release,
        version: __meteor_runtime_config__.VERSION || null,
      }],
        {noRetry: true}
      ,
        function (error, result) {
          // We are ignoring errors.
        }
      );
    });
  }, false);
});

