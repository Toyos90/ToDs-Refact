<script setup>
import { useRoute, useRouter } from 'vue-router'

const props= defineProps(
{
	show: Boolean
})

const	route = useRoute();
const	router = useRouter();
const	priority = route.params.priority;
const	emit = defineEmits(['close']);

const ftClose = () =>
{
	emit('close', 'close');
	router.push({name: 'TaskList', params: {priority: priority}});
}

</script>

	<template>
	<Transition name="modal">
		<div v-if="show" class="modal-mask" @click="ftClose()">
			<div class="modal-container">
				<div class="modal-header">
					<slot name="header">default header</slot>
				</div>
			</div>
		</div>
	</Transition>
	</template>

	<style>
	.modal-mask {
	position: fixed;
	z-index: 9998;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.5);
	display: flex;
	transition: opacity 0.3s ease;	
	}

	.modal-container {
	width: 300px;
	margin: auto;
	padding: 20px 30px;
	background-color: #fff;
	border-radius: 2px;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
	transition: all 0.3s ease;
	}

	.modal-header h3 {
	margin: 0.7rem;
	color: #42b983;
	}

	.modal-body {
	margin: 20px 0;
	}

	.modal-default-button {
	float: right;
	margin: 1rem;
	background-color: #4CAF50;
	border: none;
	color: white;
	text-align: center;
	text-decoration: none;
	padding: 10px 20px;
	}

	.modal-enter-from {
	opacity: 0;
	}

	.modal-leave-to {
	opacity: 0;
	}

	.modal-enter-from .modal-container,
	.modal-leave-to .modal-container {
	-webkit-transform: scale(1.1);
	transform: scale(1.1);
	}
	</style>