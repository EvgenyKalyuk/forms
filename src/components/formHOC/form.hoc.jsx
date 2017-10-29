import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import {
  submitForm,
  submitSuccess,
  submitFail,
  changeForm,
} from '../../actions/forms.actions';

const FormHOC = (WrappedComponent, formOption) => {
  const validation = values => formOption.validation && formOption.validation(values);

  const validateField = (name, value) => {
    const values = {
      [name]: value,
    };
    const errors = formOption.validation && formOption.validation(values);
    return errors[name] || null;
  };

  const maskField = (value, mask) => mask(value);

  @connect(({ formsState }) => ({
    formsState,
  }), dispatch => ({
    submitForm: bindActionCreators(submitForm, dispatch),
    submitSuccess: bindActionCreators(submitSuccess, dispatch),
    submitFail: bindActionCreators(submitFail, dispatch),
    changeForm: bindActionCreators(changeForm, dispatch),
  }))

  class Form extends React.Component {
    static defaultProps = {
      formsState: {},
      submitForm: () => null,
      submitSuccess: () => null,
      submitFail: () => null,
      changeForm: () => null,
      initForm: () => null,
    };

    static propTypes = {
      formsState: PropTypes.object,
      submitForm: PropTypes.func,
      submitSuccess: PropTypes.func,
      submitFail: PropTypes.func,
      changeForm: PropTypes.func,
      initForm: PropTypes.func,
    };

    constructor(props) {
      super(props);

      this.exports = {
        changeForm: this.onChangeHandler,
        submitForm: this.onSubmitHandler,
      };
    }

    onChangeHandler = ({ target }) => {
      const { name, value } = target;
      let transformedValue = value;
      if (formOption.masks && formOption.masks[name]) {
        transformedValue = maskField(value, formOption.masks[name]);
      }
      const error = validateField(name, transformedValue);
      this.props.changeForm(formOption.name, name, transformedValue, error);
    };

    onSubmitHandler = (e) => {
      e.preventDefault();
      const form = e.target;
      const formLength = form.length;
      const formValues = {};
      for (let i = 0; i < formLength; i += 1) {
        const element = form.elements[i];
        if (element.type === 'text' || element.type === 'number') {
          formValues[element.name] = element.value;
        }
        if (element.type === 'checkbox') {
          formValues[element.name] = element.checked;
        }
      }
      const errors = validation(formValues) || {};
      this.props.submitForm(formOption.name, formValues);
      if (Object.keys(errors).length) {
        Object.keys(formValues).forEach((value) => {
          if (!errors[value]) {
            errors[value] = null;
          }
        });
        this.props.submitFail(formOption.name, errors);
      } else {
        const redirectPath = formOption.redirectOnSuccess;
        this.props.submitSuccess(formOption.name, formValues);
        if (redirectPath) {
          browserHistory.push(redirectPath);
        }
      }
      return false;
    };

    render() {
      return <WrappedComponent {...this.props} {...this.exports} />;
    }
  }

  return Form;
};

export default FormHOC;
