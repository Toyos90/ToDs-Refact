import { mount } from '@vue/test-utils';
import { expect, test } from 'vitest';
import ListCategory from '../ListCategory.vue';
import DetailsButton from '../DetailsButton.vue';

test('DetailsButton component is rendered correctly in ListCategory', () => {
  const wrapper = mount(ListCategory);
  expect(wrapper.findComponent(DetailsButton).exists()).toBe(true);
});
