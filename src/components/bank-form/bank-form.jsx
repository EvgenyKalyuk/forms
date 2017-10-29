import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import FormHOC from '../formHOC/form.hoc';
import { CLIENT_PAGES } from '../../common/const';

const validation = (values) => {
  const errors = {};

  if (!values.bankNumber) {
    errors.bankNumber = 'Required';
  }

  return errors;
};

const bankNumberMask = value => value.replace(/[^\d]/g, '').replace(/[^\dA-Z]/g, '').replace(/(.{4})/g, '$1 ').trim();

const BankForm = (props) => {
  const {
    submitForm,
    changeForm,
    formsState,
  } = props;

  const { bank = {} } = formsState.payload;
  const { values = {}, errors = {} } = bank;

  const formValues = {
    bankNumber: values.bankNumber || '',
  };

  const formErrors = {
    bankNumber: errors.bankNumber || null,
  };

  return (
    <form
      className='form'
      onSubmit={submitForm}
    >
      <div className='form__group'>
        <label className='form__label'>
          <div className='form__label-item'>
            Bank card number
          </div>
          <div className='form__label-item'>
            <input
              autoFocus
              className={`form__field ${formErrors.bankNumber ? 'form__field_error' : ''}`}
              value={formValues.bankNumber}
              onChange={changeForm}
              name='bankNumber'
            />
          </div>
        </label>
      </div>
      <div className='form__handler'>
        <Link
          className='form__btn'
          to={CLIENT_PAGES.PERSONAL}
        >
          Back
        </Link>
        <button className='form__btn'>
          Next
        </button>
      </div>
    </form>
  );
};

BankForm.defaultProps = {
  submitForm: () => null,
  changeForm: () => null,
  formsState: {},
};

BankForm.propTypes = {
  submitForm: PropTypes.func,
  changeForm: PropTypes.func,
  formsState: PropTypes.object,
};

export default FormHOC(BankForm, {
  name: 'bank',
  validation,
  masks: {
    bankNumber: bankNumberMask,
  },
  redirectOnSuccess: CLIENT_PAGES.COMPLETE,
});
