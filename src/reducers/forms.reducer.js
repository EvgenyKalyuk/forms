import {EVENTS_FORM} from '../actions/forms.actions';
import merge from 'deepmerge';

const initState = {
  type: null,
  payload: {
    personal: {
      values: {},
      errors: {},
      fieldsCount: 3
    },
    bank: {
      values: {},
      errors: {},
      fieldsCount: 1
    },
    isCompleted: false
  },
};

export default (stateCopy = initState, action) => {
  const state = {...stateCopy};
  switch (action.type) {
    case EVENTS_FORM.TYPE_FORM_SUBMIT_FAIL:
    case EVENTS_FORM.TYPE_FORM_SUBMIT_SUCCESS:
    case EVENTS_FORM.TYPE_FORM_LOADED_VALUES:
    case EVENTS_FORM.TYPE_FORM_CHANGE:
    case EVENTS_FORM.TYPE_FORM_SUBMIT:
      state.type = action.type;
      state.payload = merge(state.payload, action.payload);
      return state;
    default:
      return state;
  }
}