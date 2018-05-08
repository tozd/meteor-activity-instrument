import {vueInstance} from './client';
import {flowRouterContextToRouteObject, vueRouterObjectToRouteObject} from './lib.js';

let FlowRouter = null;

if (Package['peerlibrary:flow-router']) {
  FlowRouter = Package['peerlibrary:flow-router'].FlowRouter;
}
else if (Package['kadira:flow-router']) {
  FlowRouter = Package['kadira:flow-router'].FlowRouter;
}

if (vueInstance) {
  vueInstance.$route.afterEach((to, from) => {
    Meteor.apply('Activity.route', [vueRouterObjectToRouteObject(to, from)], {noRetry: true}, function (error, result) {
      // We are ignoring errors.
    });
  });
}

if (FlowRouter) {
  FlowRouter.triggers.enter(function (context, redirect, stop) {
    Meteor.apply('Activity.route', [flowRouterContextToRouteObject(context)], {noRetry: true}, function (error, result) {
      // We are ignoring errors.
    });
  });
}
