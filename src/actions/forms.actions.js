export const EVENTS_FORM = {
  TYPE_FORM_SUBMIT: 'TYPE_FORM_SUBMIT',
  TYPE_FORM_SUBMIT_FAIL: 'TYPE_FORM_SUBMIT_FAIL',
  TYPE_FORM_SUBMIT_SUCCESS: 'TYPE_FORM_SUBMIT_SUCCESS',
  TYPE_FORM_CHANGE: 'TYPE_FORM_CHANGE',
  TYPE_FORM_LOADING_VALUES: 'TYPE_FORM_LOADING_VALUES',
  TYPE_FORM_LOADED_VALUES: 'TYPE_FORM_LOADED_VALUES'
};

export const loadDataFromLocalStore = () =>
  dispatch =>
    dispatch({
      type: EVENTS_FORM.TYPE_FORM_LOADING_VALUES
    });

export const submitForm = (name, values) =>
  dispatch => dispatch({
    type: EVENTS_FORM.TYPE_FORM_SUBMIT,
    payload: {
      [name]: {
        values,
        submit: true
      }
    }
  });

export const submitSuccess = (name, values) =>
  dispatch => dispatch({
    type: EVENTS_FORM.TYPE_FORM_SUBMIT_SUCCESS,
    payload: {
      name,
      values
    }
  });

export const submitFail = (name, errors) =>
  dispatch => dispatch({
    type: EVENTS_FORM.TYPE_FORM_SUBMIT_FAIL,
    payload: {
      [name]: {
        errors
      }
    }
  });

export const changeForm = (name, field, value, error) =>
  dispatch => dispatch({
    type: EVENTS_FORM.TYPE_FORM_CHANGE,
    payload: {
      [name]: {
        values: {
          [field]: value
        },
        errors: {
          [field]: error
        }
      }
    }
  });
