import { test } from 'vitest';
import { createRouter, createWebHistory } from 'vue-router';

test('TaskList view renders correctly', async () => {
    const router = createRouter({
        history: createWebHistory(),
        routes: [
         // { path: '/test/:priority123'},
        ],
    });

    router.push({ path: '/test/priority123' }); 


});