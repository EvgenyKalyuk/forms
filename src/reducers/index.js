import formReducer from './forms.reducer';
import completeReducer from './complete.reducer';

const initialState = [
  'formsState',
  'completeState',
].reduce((state, key) => {
  state[key] = undefined;
  return state;
}, {});

const rootReducer = (state = initialState, action) => {
  state.formsState = formReducer(state.formsState, action);
  state.completeState = completeReducer(state.completeState, action);
  return { ...state };
};

export default rootReducer;
