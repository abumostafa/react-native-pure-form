import React from 'react'
import {TextInput} from 'react-native'
import renderer from 'react-test-renderer'
import FormField from '../src/FormField'

it('renders correctly', () => {
  const tree = renderer.create(<FormField component={TextInput} name="test-input" />).toJSON()
  expect(tree).toMatchSnapshot()
})
