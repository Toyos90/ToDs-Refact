<script setup>
import {ref, onBeforeMount} from 'vue'
import StatusSelector from './StatusSelector.vue'
import { format } from 'date-fns'

const props = defineProps (
	{
		task:
		{
			type: Object,
		}
	},
	{
		id:
		{
			type: Number,
		}
	}
)

const currentStatus = ref();

onBeforeMount(() =>
{
	currentStatus.value = props.task.status;
	props.task.dueDate = format(new Date(props.task.dueDate), 'dd-MM-yyyy');
})


</script>

<template>
	<main class="task-container">
		<section class="status-selector">
			<StatusSelector :id="task.id" :status="task.status" @response="(data) => currentStatus = data"/>
		</section>
		<section class="task-info scrollbar">
			<h3 v-if="currentStatus" class="done">{{ task.title }}</h3>
			<h3 v-else>{{ task.title }}</h3>
			<p v-if="task.description">{{ task.description }}</p>
			<p>{{ task.dueDate }}</p>
			<p>{{ task.priority }}</p>
		</section>
		<section class="task-edit">
			<router-link :to="'/edit/' + task.id">
		<svg xmlns="http://www.w3.org/2000/svg" width="20" height="18" viewBox="0 0 20 18" fill="none">
			  <path d="M13.9792 2.88542L17.1111 6.01736C17.2431 6.14931 17.2431 6.36458 17.1111 6.49653L9.52778 14.0799L6.30556 14.4375C5.875 14.4861 5.51042 14.1215 5.55903 13.691L5.91667 10.4688L13.5 2.88542C13.6319 2.75347 13.8472 2.75347 13.9792 2.88542ZM19.6042 2.09028L17.9097 0.395833C17.3819 -0.131944 16.5243 -0.131944 15.9931 0.395833L14.7639 1.625C14.6319 1.75694 14.6319 1.97222 14.7639 2.10417L17.8958 5.23611C18.0278 5.36806 18.2431 5.36806 18.375 5.23611L19.6042 4.00694C20.1319 3.47569 20.1319 2.61806 19.6042 2.09028ZM13.3333 12.0174V15.5521H2.22222V4.44097H10.2014C10.3125 4.44097 10.4167 4.39583 10.4965 4.31944L11.8854 2.93056C12.1493 2.66667 11.9618 2.21875 11.5903 2.21875H1.66667C0.746528 2.21875 0 2.96528 0 3.88542V16.1076C0 17.0278 0.746528 17.7743 1.66667 17.7743H13.8889C14.809 17.7743 15.5556 17.0278 15.5556 16.1076V10.6285C15.5556 10.2569 15.1076 10.0729 14.8438 10.3333L13.4549 11.7222C13.3785 11.8021 13.3333 11.9063 13.3333 12.0174Z" fill="black"/>
		</svg>
	</router-link>
		</section>
	</main>
</template>

<style scoped>
	.task-container
	{
		display: flex;
    	align-items: center;
		justify-content: space-around;
    	background-color: white;
    	height: 7rem;
		border-radius: 0.8rem;
		margin: 1rem 0;
	}

	.status-selector, .task-edit
	{
		width: 15%;
	}
	.task-info
	{
		width: 60%;
    	height: 70%;
    	overflow-y: scroll;
		overscroll-behavior: none;
	}

	.status-selector
	{
		display: flex;
		justify-content: center;
	}

	.done
	{
		text-decoration: line-through;
	}

	.scrollbar::-webkit-scrollbar 
	{
	    width: 6px;
	}

	.scrollbar::-webkit-scrollbar-track 
	{
	    background-color: transparent; 
	}

	.scrollbar::-webkit-scrollbar-thumb 
	{
	    background-color: rgba(186, 186, 192, 0.5); 
	    border-radius: 16px;
	    border: 5px solid transparent; 
	}

	.scrollbar::-webkit-scrollbar-button 
	{
	    display: none;
	}

</style>