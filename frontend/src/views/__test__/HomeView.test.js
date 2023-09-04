
import HomeView from '../HomeView.vue';
import { test, it } from 'vitest';

test('HomeView.vue', () => {
  it('renderiza correctamente', async () => {
    const { getByText, getByTestId } = render(HomeView);

    const title = getByText('My To Do´s List');
    expect(title).toBeInTheDocument();

    const addButton = getByTestId('add-button');
    expect(addButton).toBeInTheDocument();

    const urgentCategory = getByTestId('urgent-category');
    const highCategory = getByTestId('high-category');
    const normalCategory = getByTestId('normal-category');
    expect(urgentCategory).toBeInTheDocument();
    expect(highCategory).toBeInTheDocument();
    expect(normalCategory).toBeInTheDocument();
  });
});