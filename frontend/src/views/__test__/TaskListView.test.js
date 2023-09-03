import { mount } from '@vue/test-utils';
import { test } from 'vitest';
import TaskListView from '../TaskListView.vue';
import { createRouter, createWebHistory } from 'vue-router';

test('TaskList view renders correctly', async () => {
    const router = createRouter({
        history: createWebHistory(),
        routes: [
         // { path: '/test/:priority123'},
        ],
    });

    router.push({ path: '/test/priority123' }); 

    const wrapper = mount(TaskListView, {
        global: {
        plugins: [router],
    },
    });

});
