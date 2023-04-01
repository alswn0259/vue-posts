<template>
  <AppLoading v-if="loading"></AppLoading>

  <AppError v-else-if="error" :message="error.message"></AppError>

  <div v-else>
    <h2>게시글 수정</h2>
    <hr class="my-4" />
    <AppError v-if="editError" :message="editError.message"/>
    <PostForm 
      v-model:title="form.title" 
      v-model:content="form.content" 
      @submit.prevent="edit"
    >
      <template #actions>
        <button 
          type="button" 
          class="btn btn-outline-danger" 
          @click="goDetailPage"
        >
          취소
        </button>
        <button class="btn btn-primary" :disabled="editLoading">
          <template v-if="editLoading">
            <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
            <span class="visually-hidden">Loading...</span>
          </template>
          <template v-else>수정</template>
        </button>
      </template>
    </PostForm>
    <!-- <AppAlert :show="showAlert" :message="alertMessage" :type="alertType"></AppAlert> -->
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';;
import PostForm from './PostForm.vue';
import { useAlert } from '@/composables/alert';
import { useAxios } from '@/hooks/useAxios';

const { vAlert, vSuccese } = useAlert();

const route = useRoute();
const router = useRouter();
const id = route.params.id;

const { data: form, error, loading } = useAxios(`/posts/${id}`)

const { error: editError, loading: editLoading, execute } = useAxios(
  `/posts/${id}`,
  { method: 'patch' },
  {
    immediate: false,
    onSuccess: () => {
      router.push({ name: 'PostDetail', params: { id }});
      vSuccese('수정이 완료되었습니다!');
    },
    onError: () => {
      vAlert(error.message);
    },
  });

const edit = () => {
  execute({
    ...form.value,
  });
};

const goDetailPage = () => {
  router.push({ name: 'PostDetail', params: { id: id } });
}
</script>

<style lang="scss" scoped>

</style>