import React, {Component} from 'react';

class LazyLoad extends Component {
  state = {
    AsyncModule: null
  };

  componentDidMount() {
    this.props.getComponent()
      .then(module => {
        console.log(module.default);
        return module.default
      })
      .then(AsyncModule => this.setState(AsyncModule));
  }

  render() {
    const { loader, ...childProps } = this.props;
    const { AsyncModule } = this.state;
    console.log(AsyncModule);
    if (AsyncModule) {
      return <AsyncModule {...childProps} />;
    }

    if (loader) {
      const Loader = loader;
      return <Loader />;
    }

    return null;
  }
}

export default LazyLoad;