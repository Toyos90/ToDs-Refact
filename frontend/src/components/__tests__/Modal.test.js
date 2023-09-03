import { mount } from '@vue/test-utils';
import { expect, test } from 'vitest';
import Modal from '../Modal.vue';

test('El componente Modal emite el evento de cierre correctamente', async () => {
  const mockRoute = { params: { priority: 'high' } };
  const mockRouter = { push: jest.fn() };
  const wrapper = mount(Modal, {
    props: {
      show: true,
    },
    global: {
      provide: {
        route: mockRoute,
        router: mockRouter,
      },
    },
  });
  await wrapper.find('.modal-mask').trigger('click');
  expect(wrapper.emitted().close).toBeTruthy();
});
