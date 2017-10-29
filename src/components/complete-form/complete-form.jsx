import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { completeForm } from '../../actions/forms.actions';
import './complete-form.styl';

@connect(({ completeState, formsState }) => ({
  formsState,
}), dispatch => ({
  completeFormHandler: bindActionCreators(completeForm, dispatch),
}))

export class CompleteFormComponent extends React.Component {
  static defaultProps = {
    formsState: {},
    completeFormHandler: () => null,
  };

  static propTypes = {
    formsState: PropTypes.object,
    completeFormHandler: PropTypes.func,
  };

  render() {
    const {
      completeFormHandler,
      formsState,
    } = this.props;
    const {
      isCompleted = false,
      personal = {},
      bank = {}
    } = formsState.payload;
    let isFull = true;

    if (Object.keys(personal.values).length) {
      Object.keys(personal.values).forEach((value) => {
        if (!personal.values[value]) {
          isFull = false;
        }
      });
    } else {
      isFull = false;
    }
    Object.keys(personal.errors).forEach((error) => {
      if (personal.errors[error]) {
        isFull = false;
      }
    });
    if (Object.keys(bank.values).length) {
      Object.keys(bank.values).forEach((value) => {
        if (!bank.values[value]) {
          isFull = false;
        }
      });
    } else {
      isFull = false;
    }
    Object.keys(bank.errors).forEach((error) => {
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
            onClick={completeFormHandler}
          >
            Complete
          </button>
        }
      </div>
    );
  }
}
