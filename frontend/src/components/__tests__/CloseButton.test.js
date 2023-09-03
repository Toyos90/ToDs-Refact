import { mount } from '@vue/test-utils';
import { expect, test } from 'vitest';
import AddView from '../../views/AddView.vue';
import CloseButton from '../CloseButton.vue';

test('CloseButton component is rendered correctly in AddView', () => {
  const addWrapper = mount(AddView);
  expect(addWrapper.findComponent(CloseButton).exists()).toBe(true);

});
