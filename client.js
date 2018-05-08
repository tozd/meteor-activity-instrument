import {Promise} from 'meteor/promise';

let vueInstanceResolve = null;

export const vueInstance = new Promise(function (resolve, reject) {
  vueInstanceResolve = resolve;
});
export let previousRouter = null;

export function init(collection, vm) {
  vueInstanceResolve(vm);

  vm.$router.afterEach((to, from) => {
    previousRouter = from;
  });
}
