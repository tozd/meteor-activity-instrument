import {Match} from 'meteor/check';

import isPlainObject from 'lodash.isplainobject';

export function escapeKeys(object) {
  if (Array.isArray(object)) {
    return object.map((i) => {
      return escapeKeys(i);
    });
  }
  else if (isPlainObject(object)) {
    const result = {};
    for (let key in object) {
      // We replace $ at the beginning with \$, so that it is not at the beginning anymore.
      // We replace . anywhere with \_. We also replace \ with \\ so that we can unescape.
      const value = object[key];
      key = key.replace(/\\/g, '\\\\').replace(/^\$/, '\\$').replace(/\./g, '\\_');
      result[key] = escapeKeys(value);
    }
    return result;
  }
  else {
    return object;
  }
}

export function flowRouterContextToRouteObject(context) {
  return {
    routeName: context.route.name,
    params: context.params,
    queryParams: context.queryParams,
    hash: context.context.hash,
    path: context.context.canonicalPath,
    oldRouteName: context.oldRoute && context.oldRoute.name || null,
  };
}

export function vueRouterObjectToRouteObject(object, previous) {
  return {
    routeName: object.name,
    params: object.params,
    queryParams: object.query,
    hash: object.hash,
    path: object.fullPath,
    oldRouteName: previous && previous.name || null,
  };
}

export const routeObjectMatch = {
  routeName: Match.NonEmptyString,
  params: Object,
  queryParams: Object,
  hash: String,
  path: Match.NonEmptyString,
  oldRouteName: Match.OneOf(Match.NonEmptyString, null),
};
