import { mount } from '@vue/test-utils';
import { expect, test } from 'vitest';
import AddView from '../../views/AddView.vue';
import CompleteButton from '../CompleteButton.vue';

test('CompleteButton component is rendered correctly in AddView', () => {
  const wrapper = mount(AddView);
  expect(wrapper.findComponent(CompleteButton).exists()).toBe(true);
});