const initState = {
  type: null,
  payload: {}
};

export default (stateCopy = initState, action) => {
  const state = {...stateCopy};

  switch (action.type) {
    default:
      return state;
  }
}