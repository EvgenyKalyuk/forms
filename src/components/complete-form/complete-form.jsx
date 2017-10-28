import './complete-form.styl';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { completeForm } from '../../actions/complete.actions';

@connect(({ completeState, formsState }) => ({
  completeState,
  formsState,
}), dispatch => ({
  completeForm: bindActionCreators(completeForm, dispatch),
}))
export class CompleteFormComponent extends React.Component {
  render() {
    const {
      completeState = {},
      formsState = {},
      completeForm
    } = this.props;
    const { isCompleted } = completeState.payload;
    const { personal = {}, bank = {} } = formsState.payload;
    let isFull = true;

    if (Object.keys(personal.values).length) {
      Object.keys(personal.values).forEach(value => {
        if (!personal.values[value]) {
          isFull = false;
        }
      });
    } else {
      isFull = false;
    }
    Object.keys(personal.errors).forEach(error => {
      if (personal.errors[error]) {
        isFull = false;
      }
    });
    if (Object.keys(bank.values).length) {
      Object.keys(bank.values).forEach(value => {
        if (!bank.values[value]) {
          isFull = false
        }
      });
    } else {
      isFull = false
    }
    Object.keys(bank.errors).forEach(error => {
      if (bank.errors[error]) {
        isFull = false;
      }
    });

    return (
      <div className='complete'>
        {isCompleted ?
          <div className='complete__success'>Completed</div> :
          <button
            autoFocus
            type='button'
            disabled={!isFull}
            className={`complete__btn ${!isFull ? 'complete__btn_disabled' : ''}`}
            onClick={ completeForm }>
            Complete
          </button>
        }
      </div>
    );
  }
}
