import { expect, test, it } from 'vitest';
import AddView from '../../views/AddView.vue'
import { mount } from '@vue/test-utils'
import Calendar from '../Calendar.vue' 

test('AddView', () => {
  it('imports Calendar component', () => {
    
    const wrapper = mount(AddView)

    expect(wrapper.contains(Calendar)).toBe(true)
 })
})