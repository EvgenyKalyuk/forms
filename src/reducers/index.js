import formReducer from './forms.reducer';

const initialState = [
  'formsState',
].reduce((state, key) => {
  state[key] = undefined;
  return state;
}, {});

const rootReducer = (state = initialState, action) => {
  state.formsState = formReducer(state.formsState, action);
  return { ...state };
};

export default rootReducer;
