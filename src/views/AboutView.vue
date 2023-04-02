<template>
	<div>
		<h2>About View</h2>
		<p>{{ $route.path }}</p>
		<button class="btn btn-primary" @click="$router.push('/')">Home으로 이동</button>
	</div>
	<h2>Store</h2>
	<p>counter: {{ counter }}</p>
	<p>doubleCounter: {{ doubleCount }}</p>
	<p>doubleCountPlusOne: {{ doubleCountPlusOne }}</p>
	<button @click="increment()">Click!!</button>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { useCounterStore } from '@/stores/counter';
import { storeToRefs } from 'pinia';

const route = useRoute();
console.log('route.path: ', route.path);

const store = useCounterStore();
// 반응성 잃지 않기 위한 storeToRefs
const { counter, doubleCount, doubleCountPlusOne } = storeToRefs(store);
// 함수는 그냥 구조분해 할당 가능
const { increment } = store;
counter.value = 100; // vuex에서는 바로 수정 못함
</script>

<style lang="scss" scoped></style>
