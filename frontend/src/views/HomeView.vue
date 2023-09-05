<script setup>
import ApiConnection from '../services/ApiConnection';
import ListCategory from '../components/ListCategory.vue';
import { ref, onBeforeMount, computed } from 'vue';
import AddButton from '../components/AddButton.vue';

const tasks = ref([]);
const selectedCategory = ref('all'); 
const categories = ref([]); 
const sortOrder = ref('asc');

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
  let filteredTasks;
  if (selectedCategory.value === 'all') {
    filteredTasks = tasks.value;
  } else {
    filteredTasks = tasks.value.filter(task => task.category === selectedCategory.value);
  }
  return filteredTasks.sort((a, b) => {
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
    <label for="sortOrder"> Ordenar por: </label>
    <select v-model="sortOrder">
  <option value="asc">Fecha ascendente</option>
  <option value="desc">Fecha descendente</option>
  <option value="titleAsc">Título ascendente</option>
  <option value="titleDesc">Título descendente</option>
</select>
    <div class="dropdown">
      <label for="category-select">Categorías: </label>
      <select id="category-select" v-model="selectedCategory">
        <option value="all">Todas</option>
        <option v-for="category in categories" :value="category" :key="category">{{ category }}</option>
      </select>
    </div>

    <div class="rectangles-categories">
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
