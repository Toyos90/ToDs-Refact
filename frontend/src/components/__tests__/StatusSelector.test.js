
import { mount } from '@vue/test-utils';
import { expect, test,it } from 'vitest';
import TaskListView from '../../views/TaskListView.vue';
import TaskSelection from '../TaskSelection.vue';
import StatusSelector from '../StatusSelector.vue';


test('TaskListView', () => {
  it('imports TaskSelection component', () => {
    const wrapper = mount(TaskListView);
    expect(wrapper.contains(TaskSelection)).toBe(true);
  });
});

test('TaskSelection', () => {
  it('renders StatusSelector component', () => {
    const wrapper = mount(TaskSelection);
    expect(wrapper.contains(StatusSelector)).toBe(true);
  });
});

