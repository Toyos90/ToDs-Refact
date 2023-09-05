<script setup>
import ApiConnection from '../services/ApiConnection';
import ListCategory from '../components/ListCategory.vue';
import { ref, onBeforeMount, computed } from 'vue';
import AddButton from '../components/AddButton.vue';

const tasks = ref([]);
const selectedCategory = ref('all'); // Valor por defecto, 'all' representa todas las categorías
const categories = ref([]); // Almacenar las categorías disponibles

function getAllTasks() {
  ApiConnection.getAllTasks()
    .then(response => {
      tasks.value = response.data;
      tasks.value.sort((a, b) => {
        const orderPriority = { urgent: 1, high: 2, normal: 3 };
        const orderByPriority = orderPriority[a.priority] - orderPriority[b.priority];
        const orderByDate = new Date(a.dueDate).getDate() - new Date(b.dueDate).getDate();
        return orderByPriority === 0 ? orderByDate : orderByPriority;
      });
      // PRIMERO UN CONJUNTO CON Set, PARA EVITAR ELEMENTOS DUPLICADOS Y DESPUÉS ARRAY PARA FACILITAR ACCESO
      categories.value = Array.from(new Set(response.data.map(task => task.category))); // Obtener categorías únicas
    })
    .catch(e => {
      console.log(e);
    });
}

onBeforeMount(() => {
  getAllTasks();
})

const filterTasksByCategory = computed(() => {
  if (selectedCategory.value === 'all') {
    return tasks.value;
  } else {
    return tasks.value.filter(task => task.category === selectedCategory.value);
  }
});
</script>


<template>
  <main class="main-container">
    <header>
      <h1 class="categories-title">Mi Lista de Tareas</h1>
    </header>

    <div class="categories">
      <div class="ico-addTask">
        <AddButton></AddButton>
      </div>
      <span class="new-task">Agregar nueva tarea</span>
    </div>

    <div class="dropdown">
      <label for="category-select">Categorías:</label>
      <select id="category-select" v-model="selectedCategory">
        <option value="all">Todas</option>
        <option v-for="category in categories" :value="category" :key="category">{{ category }}</option>
      </select>
    </div>

    <div class="rectangles-categories">
      <!-- Muestra todas las ListCategory y déjalas filtrarse automáticamente según la prioridad -->
      <ListCategory :priority="'urgent'" :title="'Urgent'" :tasks="filterTasksByCategory"></ListCategory>
      <ListCategory :priority="'high'" :title="'High'" :tasks="filterTasksByCategory"></ListCategory>
      <ListCategory :priority="'normal'" :title="'Normal'" :tasks="filterTasksByCategory"></ListCategory>
    </div>
  </main>
</template>

<style scoped>

@font-face 
{
  font-family: "Inter";
  src: local("Inter"),
  url(../src/assets/fonts/Inter/Inter-Regular.ttf) format("truetype");
}
  
.main-container{
  background: #F5F5F5;
  min-height: 58.25rem;
}

header{
  display:flex;
  justify-content: center;
  align-items: center;
  height: 6.25rem;
  background: rgba(221, 75, 57, 0.7);
}

h1{
  font: normal 700 1.5rem "Inter";
  color:white;
}
.new-task{
  color: rgba(0, 0, 0, 1);
  font: capitalize 400 1rem normal "Inter";
  margin-top: 1rem;
}
.categories{
  display:flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 5rem;
}

.categories-title{
  font: normal 700 1.875rem "Inter";
  }

.ico-addTask{
  width: 1.8125rem;
  height: 1.8125rem;
  flex-shrink: 0;
  width: 3.8125rem;
  height: 3.5rem;
}

.rectangles-categories{
  display:flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
}

@media (min-width: 768px) {
  .rectangles-categories {
    display: flex;
    flex-direction: row;
    }
  
}

</style>
