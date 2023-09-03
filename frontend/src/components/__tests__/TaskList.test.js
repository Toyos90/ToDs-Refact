import { mount } from '@vue/test-utils';
import { test, it } from 'vitest';
import TaskList from '../TaskList.vue';
import { ref } from 'vue';

test('TaskList.vue', () => {
    it('renders the category', async () => {
      const category = 'My Custom Category';
      const tasks = ref([
        { id: 1, title: 'Task 1' },
        { id: 2, title: 'Task 2' },
      ]);
  
      // Monta el componente con vi-test y proporciona las props y el ref de tareas
      const wrapper = mount(TaskList, {
        props: {
          category,
        },
        setup() {
          return {
            tasks,
          };
        },
      });
  
      // Espera a que las promesas se resuelvan
      await wrapper.vm.$nextTick();
  
      // Verifica que la categoría se muestre en el componente
      expect(wrapper.text()).toContain(category);
    });
  
    it('renders tasks when data is available', async () => {
      const tasks = ref([
        { id: 1, title: 'Task 1' },
        { id: 2, title: 'Task 2' },
      ]);
  
      // Monta el componente con vi-test y proporciona el ref de tareas
      const wrapper = mount(TaskList, {
        setup() {
          return {
            tasks,
          };
        },
      });
  
      // Espera a que las promesas se resuelvan
      await wrapper.vm.$nextTick();
  
      // Verifica que las tareas se representen correctamente
      expect(wrapper.findAll('.task').length).toBe(2); // Ajusta según tus datos de prueba
    });
  
    it('displays a message when no tasks are available', async () => {
      const tasks = ref([]);
  
      // Monta el componente con vi-test y proporciona el ref de tareas vacío
      const wrapper = mount(TaskList, {
        setup() {
          return {
            tasks,
          };
        },
      });
  
      // Espera a que las promesas se resuelvan
      await wrapper.vm.$nextTick();
  
      // Verifica que se muestre un mensaje cuando no hay tareas
      expect(wrapper.text()).toContain('No tasks added to this list');
    });
  });