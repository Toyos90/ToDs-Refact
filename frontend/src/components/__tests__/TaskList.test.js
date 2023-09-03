import { mount } from '@vue/test-utils';
import { expect, test, it } from 'vitest';
import TaskList from '@/components/TaskList.vue';
import TaskSelection from '@/components/TaskSelection.vue'; 
import AddButton from '@/components/AddButton.vue'; 
import CloseButton from '@/components/CloseButton.vue'; 

test('TaskList Component', () => {
  it('imports and renders TaskSelection, AddButton, and CloseButton components', () => {
    const wrapper = mount(TaskList, {
      props: {
        category: 'Test Category',
      },
    });

    // Comprueba si el componente TaskSelection se importa y se muestra
    expect(wrapper.findComponent(TaskSelection).exists()).toBe(true);

    // Comprueba si el componente AddButton se importa y se muestra
    expect(wrapper.findComponent(AddButton).exists()).toBe(true);

    // Comprueba si el componente CloseButton se importa y se muestra
    expect(wrapper.findComponent(CloseButton).exists()).toBe(true);

    // También puedes realizar más pruebas específicas para cada componente si es necesario
  });
});
