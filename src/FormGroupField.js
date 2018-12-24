import PropTypes from 'prop-types'
import React from 'react'
import { View } from 'react-native'

class FormGroupField extends React.Component {
  render() {
    return <View {...this.props}>{this.props.children}</View>
  }
}

FormGroupField.propTypes = {
  children: PropTypes.node,
}

export default FormGroupField
