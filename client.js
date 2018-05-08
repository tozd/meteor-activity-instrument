export let vueInstance = null;
export let previousRouter = null;

export function init(collection, vm) {
  vueInstance = vm;

  vueInstance.$router.afterEach((to, from) => {
    previousRouter = from;
  });
}
