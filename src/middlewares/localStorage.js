import { EVENTS_FORM } from '../actions/forms.actions';
import { EVENTS_COMPLETE } from '../actions/complete.actions';

export const localStorageMiddleware = () =>
  next => async action => {
    if (action.type === EVENTS_FORM.TYPE_FORM_SUBMIT_SUCCESS) {
      localStorage.setItem(action.payload.name, JSON.stringify(action.payload.values));
      return next(action)
    }

    if (action.type === EVENTS_FORM.TYPE_FORM_LOADING_VALUES) {
      let initValues = {};

      Object.keys(localStorage).forEach(key => {
        if (key === 'isCompleted') return false;
        initValues = {...initValues, [key]: {values: {...JSON.parse(localStorage[key])}}}
      });

      if (Object.keys(initValues).length) {
        return next({
          type: EVENTS_FORM.TYPE_FORM_LOADED_VALUES,
          payload: initValues,
        });
      }
      return next(action);
    }

    if (action.type === EVENTS_COMPLETE.TYPE_COMPLETED_FORMS) {
      localStorage.setItem('isCompleted', JSON.stringify(true));
      return next(action);
    }

    if (action.type === EVENTS_COMPLETE.TYPE_COMPLETE_LOADING) {
      const state = {
        isCompleted: JSON.parse(localStorage.getItem('isCompleted')),
      };
      return next({
        type: EVENTS_COMPLETE.TYPE_COMPLETE_LOADED,
        payload: state,
      });
    }

    return next(action);
  };