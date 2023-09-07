import { mount } from '@vue/test-utils';
import { expect, test } from 'vitest';
import AddButton from '../AddButton.vue';

test('AddButton component is mounted correctly and has the correct link', () => {
  const wrapper = mount(AddButton);
  expect(wrapper.find('figure.add-task').exists()).toBe(true);
  expect(wrapper.find('router-link').attributes('to')).toBe('/add');
});
