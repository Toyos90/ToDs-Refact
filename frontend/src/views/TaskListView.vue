<script setup>
import { onBeforeMount, ref } from 'vue';
import { useRoute } from 'vue-router'
import TaskSelection from '../components/TaskSelection.vue'
import AddButton from '../components/AddButton.vue'
import CloseButton from '../components/CloseButton.vue'
import Modal from '../components/Modal.vue';
import ApiConnection from '../services/ApiConnection';

const route = useRoute();
const priority = route.params.priority;
const modal = (route.params.modal === "true") || false;
const action = route.params.action || "";

const tasks = ref([]);
const showModal = ref(false);

onBeforeMount(async () => {
  showModal.value = props.modal;
  const taskData = await ApiConnection.getAllTasks();
  tasks.value = taskData.data.filter((task) => task.priority === props.priority);
});
</script>

<template>
  <div>
    <main class="task-list-layout">
      <header class="task-list-header">
        <CloseButton path="/" fill="black" />
      </header>
      <section class="list">
        <article class="title">
          <h2>Priority: {{ priority }}</h2>
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