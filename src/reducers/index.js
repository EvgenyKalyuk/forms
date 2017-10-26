import personalFormReducer from './personal-form.reducer';

const initialState = [
  'PersonalFormState'
].reduce((state, key) => {
  state[key] = undefined;
  return state
}, {});

export const rootReducer = (state = initialState, action) => {
  state.personalFormState = personalFormReducer(state.personalFormState, action);

  return {...state};
};