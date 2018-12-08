import React from 'react'
import { View } from 'react-native'
import FormField from './FormField'

class Form extends React.Component {
  constructor(props) {
    super(props)
    this.state = {errors: {}, valid: false}
    this.values = []
  }

  _onInputChange(name, value) {
    this.values[name] = value
  }

  _createElements(elements) {
    return React.Children.map(elements, child => {
      if (child.type !== FormField) {
        return child
      }

      const {value, name} = child.props
      if (value) {
        this.values[name] = value
      }

      return React.cloneElement(child, {
        onChange: this._onInputChange.bind(this),
        valid: !!this.state.errors[name],
        error: this.state.errors[name]
      })
    })
  }

  submit() {
    const {validate} = this.props
    if (validate) {
      const errors = validate(this.values)
      if (Object.keys(errors).length) {
        this.setState({valid: false, errors})
      }
      else {
        this.setState({valid: true, errors: {}})
      }
    }
  }

  render() {
    const {children, ...props} = this.props
    return <View {...props}>{this._createElements(children)}</View>
  }
}

export default Form
