import React from 'react'
import PropTypes from 'prop-types'

class FormField extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: props.value || null, dirty: false, valid: false };
  }

  _onChange(value) {
    const { validateOnChange, onChange } = this.props;
    onChange && onChange(this.props.name, value);
    this.setState({ dirty: true, value });
    if (validateOnChange) {
      this.setState({ valid: true });
    }
  }

  render() {
    const { component: WrappedComponent, ...props } = this.props;
    return (
      <WrappedComponent
        {...props}
        onChange={value => this._onChange(value)}
        dirty={this.state.dirty}
        valid={this.props.valid}
        error={this.props.error}
        value={this.state.value}
      />
    );
  }
}

FormField.propTypes = {
  component: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.func,
  ]).isRequired,
  name: PropTypes.string.isRequired
};

export default FormField
