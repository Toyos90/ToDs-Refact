<template>
  <div>
    <main class="task-list-layout">
      <header class="task-list-header">
        <CloseButton path="/" fill="black" />
      </header>
      <section class="list">
        <article class="title">
          <h2>Priority: {{ priority }}</h2>
          <select v-model="sortOrder">
  <option value="asc">Fecha ascendente</option>
  <option value="desc">Fecha descendente</option>
  <option value="titleAsc">Título ascendente</option>
  <option value="titleDesc">Título descendente</option>
</select>
        </article>
        <section v-if="tasks" class="tasks">
          <article class="task" v-for="task in tasks" :key="task.id">
            <TaskSelection :task="task" />
          </article>
        </section>
        <section v-else>
          <h3>No tasks added to this list</h3>
        </section>
      </section>
      <article class="add-button">
        <AddButton />
      </article>
    </main>
    <Teleport to="body">
      <modal :show="showModal" @close="showModal = false">
        <template #header>
          <h3>Task {{ action }} succesfully</h3>
        </template>
      </modal>
    </Teleport>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { onBeforeMount, ref, watch } from 'vue';
import ApiConnection from '../services/ApiConnection';
import TaskSelection from '../components/TaskSelection.vue';
import AddButton from '../components/AddButton.vue';
import CloseButton from '../components/CloseButton.vue';
import Modal from '../components/Modal.vue';

const route = useRoute();
const priority = route.params.priority;
const modal = (route.params.modal === 'true') || false;
const action = route.params.action || '';

const tasks = ref([]);
const showModal = ref(false);
const sortOrder = ref('asc');

onBeforeMount(async () => {
  showModal.value = modal;
  const taskData = await ApiConnection.getAllTasks();
  tasks.value = taskData.data.filter((task) => task.priority === priority);
  sortTasks();
});

watch(sortOrder, sortTasks);

function sortTasks() {
  tasks.value.sort((a, b) => {
    if (sortOrder.value === 'asc' || sortOrder.value === 'desc') {
      if (!a.dueDate || !b.dueDate) {
        return 0;
      }
      const dateA = a.dueDate.split('/').join('-');
      const dateB = b.dueDate.split('/').join('-');
      if (sortOrder.value === 'asc') {
        return new Date(dateA) - new Date(dateB);
      } else {
        return new Date(dateB) - new Date(dateA);
      }
    } else if (sortOrder.value === 'titleAsc' || sortOrder.value === 'titleDesc') {
      if (!a.title || !b.title) {
        return 0;
      }
      if (sortOrder.value === 'titleAsc') {
        return a.title.localeCompare(b.title);
      } else {
        return b.title.localeCompare(a.title);
      }
    }
  });
}
</script>


<style scoped>
.task-list-header {
  display: flex;
  justify-content: end;
}
.task-list-layout {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 100vh;
}

.title {
  margin: 1rem 0;
}

.tasks {
  overflow-y: scroll;
  height: 60vh;
}

.add-button {
  display: flex;
  justify-content: center;
}
</style>