import {vueInstance} from './client';
import {flowRouterContextToRouteObject, vueRouterObjectToRouteObject} from './lib.js';

let FlowRouter = null;

if (Package['peerlibrary:flow-router']) {
  FlowRouter = Package['peerlibrary:flow-router'].FlowRouter;
}
else if (Package['kadira:flow-router']) {
  FlowRouter = Package['kadira:flow-router'].FlowRouter;
}

if (FlowRouter) {
  FlowRouter.triggers.enter(function (context, redirect, stop) {
    Meteor.apply('Activity.route', [flowRouterContextToRouteObject(context)], {noRetry: true}, function (error, result) {
      // We are ignoring errors.
    });
  });
}

vueInstance.then(function (vm) {
  if (vm) {
    vm.$router.afterEach((to, from) => {
      Meteor.apply('Activity.route', [vueRouterObjectToRouteObject(to, from)], {noRetry: true}, function (error, result) {
        // We are ignoring errors.
      });
    });
  }
});
