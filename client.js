export let vueInstance = null;
export let previousRoute = null;

export function init(collection, vm) {
  vueInstance = vm;

  vueInstance.$route.afterEach((to, from) => {
    previousRoute = from;
  });
}
