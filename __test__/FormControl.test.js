import React from 'react'
import {TextInput} from 'react-native'
import renderer from 'react-test-renderer'
import FormControl from '../src/FormControl'

it('renders correctly', () => {
  const tree = renderer.create(<FormControl component={TextInput} name="test-input" />).toJSON()
  expect(tree).toMatchSnapshot()
})
