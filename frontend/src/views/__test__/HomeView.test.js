import { mount } from '@vue/test-utils';
import { expect, test } from 'vitest';
import HomeView from '../HomeView.vue';


test('TaskListView makes API call', async () => {
  // Monta el componente TaskListView
  const wrapper = mount(HomeView);

  // Espera un breve momento para permitir que se realice la llamada a la API (puedes ajustar el tiempo según tus necesidades)
  await new Promise(resolve => setTimeout(resolve, 100));

  // Verifica que la propiedad "tasks" del componente se haya actualizado, lo que indicaría que se realizó una llamada a la API
  expect(wrapper.vm.tasks).not.toEqual([]);
});
