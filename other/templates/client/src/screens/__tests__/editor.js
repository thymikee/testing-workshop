import React from 'react'
import {mount} from 'enzyme'
import {Component as Editor} from '../editor'

// WORKSHOP_START
// Here's where your tests go... What are the use-cases
// our editor should support? Here are some ideas:
// 1. Can be handy to just render the default and get a snapshot
//   for just a baseline
// 2. What about if I provide an override for a prop? How does
//   that render differently? Any specific assertions I should make?
// 3. What about user interaction? Maybe the tag input interaction?
//   Run the application and login (user: "joe@example.com", pass: "joe")
//   and play around with the tag component. How could we use some
//   of the utilities to make sure that interaction keeps working?
// WORKSHOP_END
// FINAL_START
test('renders editor form by default', () => {
  const wrapper = mountEditor()
  expect(wrapper).toMatchSnapshot()
})

test('renders the given title', () => {
  const title = 'The day I dualed Lord Voldemort'
  const wrapper = mountEditor({title})
  expect(wrapper.find(sel('title')).node.value).toBe(title)
})

test('adds tag when the user hits enter', () => {
  const newTag = 'interwebs'
  const tagList = ['internet', 'web', 'network']
  const wrapper = mountEditor({tagList})
  const tagInput = wrapper.find(sel('tags'))
  changeInputValue(tagInput, newTag)
  keyUpInput(tagInput, 13)
  const tagPills = wrapper.find(sel('tag-pills'))
  expect(tagPills.children()).toHaveLength(4)
  expect(tagPills.find(sel(`tag-3-${newTag}`))).toHaveLength(1)
})
// FINAL_END

// WORKSHOP_START
// I'm going to go ahead and give these utils to you
// because I think you get the idea :)
// And this is a little domain-specific anyway.
// WORKSHOP_END
function mountEditor(props = {}) {
  const propsToUse = {
    onLoad() {},
    onSubmit() {},
    onUnload() {},
    articleSlug: '',
    title: '',
    description: '',
    body: '',
    tagList: [],
    inProgress: false,
    params: {},
    ...props,
  }
  return mount(<Editor {...propsToUse} />)
}

// This helper will make it easier to change the value
// in an input element. For example:
// changeInputValue(tagInput, 'hello')
// will change the input's value to 'hello'
function changeInputValue(input, value) {
  input.simulate('change', {target: {value}})
}

// this helper will make it easier to fire the keyUp event
// on elements. For example:
// keyUpInput(tagInput, 13)
// will fire the "enter" key on that input
function keyUpInput(input, keyCode) {
  input.simulate('keyup', {keyCode})
}

// this helper will make it easier for you to find
// labeled elements in the wrapper:
// const tagInput = wrapper.find(sel('tags'))
function sel(id) {
  return `[data-test="${id}"]`
}
