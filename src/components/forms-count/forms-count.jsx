import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import shortId from 'shortid';
import './forms-count.styl';

@connect(({ formsState, completeState }) => ({
  formsState,
  completeState,
}))

class FormCount extends React.Component {
  render() {
    const {
      items = [],
      formsState = {},
      completeState = {},
    } = this.props;
    const { payload = {} } = formsState;
    const { isCompleted = false } = completeState.payload;

    return (
      <div className='forms-count'>
        {items.map((item) => {
          let count = 0;
          let isFull = false;
          const { values = {}, errors = {} } = payload[item.state] || {};
          Object.keys(values).forEach((value) => {
            if (!errors[value]) {
              count += 1;
            }
          });
          if (payload[item.state]
            && payload[item.state].fieldsCount
            && payload[item.state].fieldsCount === count) {
            isFull = true;
          }
          if (item.state === 'complete') {
            return (
              <div
                className={`forms-count__item ${!isCompleted ? 'forms-count__item_error' : ''}`}
                key={shortId.generate()}
              >
                {item.title}: {isCompleted ? 'Yes' : 'No'}
              </div>
            );
          }
          return (
            <div
              className={`forms-count__item ${!isFull ? 'forms-count__item_error' : ''}`}
              key={shortId.generate()}
            >
              {item.title}: {count} / {(payload[item.state] && payload[item.state].fieldsCount) || 0}
            </div>
          );
        })}
      </div>
    );
  }
}

FormCount.defaultProps = {
  formsState: {},
  completeState: {},
};

FormCount.propTypes = {
  formsState: PropTypes.object,
  completeState: PropTypes.object,
  items: PropTypes.array.isRequired,
};

export default FormCount;
