import { expect, test, it } from 'vitest';
import AddView from '../../views/AddView.vue'
import { mount } from '@vue/test-utils'
import PriorityDropdown from '../PriorityDropdown.vue' 

test('AddView', () => {
    it('imports PriorityDropdown component', () => {
    
    const wrapper = mount(AddView)

    expect(wrapper.contains(PriorityDropdown)).toBe(true)
 })
})