import merge from 'deepmerge';
import { EVENTS_FORM } from '../actions/forms.actions';

const initState = {
  type: null,
  payload: {
    personal: {
      values: {},
      errors: {},
      fieldsCount: 3,
    },
    bank: {
      values: {},
      errors: {},
      fieldsCount: 1,
    },
    isCompleted: false
  },
};

export default (stateCopy = initState, {type, payload}) => {
  const state = { ...stateCopy };
  switch (type) {
    case EVENTS_FORM.TYPE_FORM_SUBMIT_FAIL:
    case EVENTS_FORM.TYPE_FORM_SUBMIT_SUCCESS:
    case EVENTS_FORM.TYPE_FORM_LOADED_VALUES:
    case EVENTS_FORM.TYPE_FORM_CHANGE:
    case EVENTS_FORM.TYPE_FORM_SUBMIT:
    case EVENTS_FORM.TYPE_FORM_COMPLETE:
      state.type = type;
      state.payload = merge(state.payload, payload);
      return state;
    default:
      return state;
  }
}
