import PropTypes from 'prop-types'
import React from 'react'
import { View } from 'react-native'
import FormField from './FormField'
import FormSubmit from './FormSubmit'
import FormGroupField from './FormGroupField'

class Form extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      errors: props.errors || {},
      valid: false,
      submitting: false,
      submitted: false,
      dirty: false,
      touched: false,
    }
    this.values = {}
  }

  _getInputError(name) {
    const {errors: stateErrors} = this.state
    const {errors: propsErrors} = this.props
    return (stateErrors && stateErrors[name]) || (propsErrors && propsErrors[name])
  }

  _onInputChange(name, value) {
    this.setState({dirty: true, touched: true})
    this.values[name] = value
  }

  _submitForm() {
    const {validate} = this.props
    let promise

    if (!this.state.dirty) {
      return Promise.resolve()
    }

    this.setState({submitted: false, submitting: true})

    if (validate) {
      promise = Promise
        .resolve(validate(this.values))
        .then(errors => {
          const valid = Object.keys(errors).length === 0
          this.setState({errors, valid, touched: valid})
        })
    } else {
      promise = Promise
        .resolve()
        .then(() => this.setState({valid: true}))
    }
    return promise.then(() => this.state.valid)
  }

  _handleSubmit() {
    const {onSubmit} = this.props
    this._submitForm()
        .then(isValid => {
          this.setState({submitted: true, submitting: false})
          isValid && onSubmit && Promise.resolve(onSubmit(this.values))
        })
  }

  _createFormFieldElement(child) {
    const {value, name} = child.props
    if (value) {
      this.values[name] = value
    }

    return React.cloneElement(child, {
      onChange: this._onInputChange.bind(this),
      valid: !!this._getInputError(name),
      error: this._getInputError(name)
    })
  }

  _createFormSubmitElement(child) {
    return React.cloneElement(child, {
      handleSubmit: this._handleSubmit.bind(this),
      submitting: this.state.submitting,
      submitted: this.state.submitted,
      valid: this.state.valid,
      dirty: this.state.dirty,
      touched: this.state.touched,
    })
  }

  _createFormGroupElement(child) {
    return React.cloneElement(child, {
      children: this._createElements(child.props.children)
    })
  }

  _createElements(elements) {
    const that = this
    return React.Children.map(elements, child => {
      if (child.type === FormField) {
        return that._createFormFieldElement(child)
      } else if (child.type === FormSubmit) {
        return that._createFormSubmitElement(child)
      } else if (child.type === FormGroupField) {
        return that._createFormGroupElement(child)
      }
      return child
    })
  }

  render() {
    const {children, ...props} = this.props
    return <View {...props}>{this._createElements(children)}</View>
  }
}

Form.propTypes = {
  validate: PropTypes.func,
  onSubmit: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.node,
  ]),
}

export default Form
