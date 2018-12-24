import React from 'react'
import PropTypes from 'prop-types'

class FormSubmit extends React.Component {
  render() {
    const { component: WrappedComponent, ...props } = this.props
    return (
      <WrappedComponent
        {...props}
        submitting={this.props.submitting}
        submitted={this.props.submitted}
        valid={this.props.valid}
      />
    )
  }
}

FormSubmit.propTypes = {
  component: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.func,
  ]).isRequired,
}

export default FormSubmit
