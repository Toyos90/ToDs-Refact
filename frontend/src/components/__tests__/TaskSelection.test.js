import { expect, test, it } from 'vitest';
import TaskListView from '../../views/TaskListView.vue'
import { mount } from '@vue/test-utils'
import TaskSelection from '../TaskSelection.vue' 

test('TaskListView', () => {
  it('imports TaskSelection component', () => {
    
    const wrapper = mount(TaskListView)

    expect(wrapper.contains(TaskSelection)).toBe(true)
 })
})