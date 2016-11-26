export const updateCoordinates = (store, payload) => {
  const pep = payload.pep;
  // top...
  // left...
  store.commit('COORDINATE_CHANGE', { top, left });
}

export const setMapLoaded = (store, payload) => {
  store.commit('MAP_LOADED');
}
