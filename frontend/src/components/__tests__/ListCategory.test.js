import { mount } from '@vue/test-utils';
import { expect, test } from 'vitest';
import HomeView from '../../views/HomeView.vue';
import ListCategory from '../ListCategory.vue';

test('ListCategory component is rendered correctly in HomeView', () => {
  const wrapper = mount(HomeView);
  expect(wrapper.findComponent(ListCategory).exists()).toBe(true);
});
