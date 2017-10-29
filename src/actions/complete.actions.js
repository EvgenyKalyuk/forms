export const EVENTS_COMPLETE = {
  TYPE_COMPLETED_FORMS: 'TYPE_COMPLETED_FORMS',
  TYPE_COMPLETE_LOADING: 'TYPE_COMPLETE_LOADING',
  TYPE_COMPLETE_LOADED: 'TYPE_COMPLETE_LOADED',
};

export const completeForm = () =>
  dispatch => dispatch({
    type: EVENTS_COMPLETE.TYPE_COMPLETED_FORMS,
  });

export const loadStateFromLocalStorage = () =>
  dispatch => dispatch({
    type: EVENTS_COMPLETE.TYPE_COMPLETE_LOADING,
  });
