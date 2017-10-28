import React from 'react';
import {FormHOC} from '../formHOC/form.hoc';
import {CLIENT_PAGES} from '../../common/const';

const validation = values => {
  const errors = {};

  if (!values.name) {
    errors.name = 'Required';
  } else if (!/^[A-Za-z ]+$/.test(values.name)) {
    errors.name = 'Invalid';
  }
  if (!values.years) {
    errors.years = 'Required';
  }

  if (!values.isAdult) {
    errors.isAdult = 'Поле обязательно';
  }

  return errors;
};

const yearsMask = value => value.replace(/[^\d]/g, '');

const PersonalForm = (props) => {
  const {
    submitForm,
    changeForm,
    formsState = {}
  } = props;

  const {personal = {}} = formsState.payload;
  const {values = {}, errors = {}} = personal;

  const formValues = {
    name: values.name || '',
    years: values.years || '',
    isAdult: values.isAdult || false
  };

  const formErrors = {
    name: errors.name || null,
    years: errors.years || null,
    isAdult: errors.isAdult || null
  };

  return (
    <form
      className='form'
      onSubmit={submitForm}>
      <div className='form__group'>
        <label className='form__label'>
          <div className='form__label-item'>
            Name
          </div>
          <div className='form__label-item'>
            <input
              autoFocus
              className={`form__field ${formErrors.name ? 'form__field_error' : ''}`}
              value={formValues.name}
              onChange={changeForm}
              name='name'/>
          </div>
        </label>
      </div>
      <div className='form__group'>
        <label className='form__label'>
          <div className='form__label-item'>
            Years
          </div>
          <div className='form__label-item'>
            <input
              className={`form__field ${formErrors.years ? 'form__field_error' : ''}`}
              value={formValues.years}
              onChange={changeForm}
              name='years'/>
          </div>
        </label>
      </div>
      <div className='form__group'>
        <label className='form__label'>
          <div className='form__label-item'>
            I am 18 years old
          </div>
          <div className='form__label-item'>
            <input
              className={`form__checkbox ${formErrors.isAdult ? 'form__checkbox_error' : ''}`}
              defaultChecked={formValues.isAdult}
              onChange={changeForm}
              name='isAdult'
              type='checkbox'/>
            <span className='form__checkbox-icon' />
          </div>
        </label>
      </div>
      <div className='form__handler'>
        <button className='form__btn'>Next</button>
      </div>
    </form>
  )
};

export const PersonalFormComponent = FormHOC(PersonalForm, {
  name: 'personal',
  masks: {
    years: yearsMask
  },
  validation,
  redirectOnSuccess: CLIENT_PAGES.BANK
});