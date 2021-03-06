import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loadDataFromLocalStore } from '../actions/forms.actions';
import { Menu } from '../components/menu/menu';
import { FormCount } from '../components/forms-count/forms-count';
import { CLIENT_PAGES } from '../common/const';

const forms = [{
  title: 'Personal Form',
  path: CLIENT_PAGES.PERSONAL,
  state: 'personal',
}, {
  title: 'Bank Form',
  path: CLIENT_PAGES.BANK,
  state: 'bank',
}, {
  title: 'Complete',
  path: CLIENT_PAGES.COMPLETE,
  state: 'complete',
}];

@connect(() => ({}), dispatch => ({
  loadDataFromLocalStore: bindActionCreators(loadDataFromLocalStore, dispatch),
}))
export class MainContainer extends React.Component {
  static defaultProps = {
    loadStateFromLocalStorage: () => null,
    loadDataFromLocalStore: () => null,
  };

  static propTypes = {
    children: PropTypes.node.isRequired,
    loadDataFromLocalStore: PropTypes.func,
    loadStateFromLocalStorage: PropTypes.func,
  };

  componentWillMount() {
    this.props.loadDataFromLocalStore();
  }

  render() {
    const { children } = this.props;

    return (
      <div className='content'>
        <div className='content__item'>
          <Menu items={forms} />
        </div>
        <div className='content__item'>
          <FormCount items={forms} />
        </div>
        <div className='content__item'>
          { children }
        </div>
      </div>
    );
  }
}
