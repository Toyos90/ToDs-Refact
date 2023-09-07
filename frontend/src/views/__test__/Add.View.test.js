import { mount } from '@vue/test-utils';
import { expect, test } from 'vitest';
import AddView from '../AddView.vue';

test('AddView view is rendered correctly', () => {
  const wrapper = mount(AddView);
  expect(wrapper.find('.add-task-title').text()).toBe('Add Task');
  expect(wrapper.find('#task-text').attributes('placeholder')).toBe('Enter Task');
  expect(wrapper.find('#description-text').attributes('placeholder')).toBe('Enter Description');
  expect(wrapper.find('#category-text').attributes('placeholder')).toBe('Enter Category');
});
