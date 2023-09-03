import { mount } from '@vue/test-utils';
import { expect, test, describe, it } from 'vitest';
import EditView from '../EditView.vue';



describe("EditView.vue", () => {
  it("existe y se puede importar correctamente", () => {
    expect(EditView).toBeDefined();
  });
});
