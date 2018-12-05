import React from 'react'
import renderer from 'react-test-renderer'
import Form from '../src/Form'

it('renders correctly', () => {
  const tree = renderer.create(<Form />).toJSON()
  expect(tree).toMatchSnapshot()
})
