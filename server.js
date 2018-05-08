export let collection = null;
export let levels = {};

export function init(c, l) {
  // If a PeerDB document.
  if (c.documents) {
    collection = c.documents;
  }
  else {
    collection = c;
  }

  levels = l;
}
