<template>
  <div>
    <h2>게시글 목록</h2>
    <hr class="my-4"/>
    <PostFilter v-model:title="params.title_like" v-model:limit="params._limit"></PostFilter>
    <hr class="my-4" />

    <AppLoading v-if="loading"></AppLoading>

    <AppError v-else-if="error" :message="error.message"></AppError>

    <template v-else>
      <AppGrid :items="posts">
        <template v-slot="{ item }">
          <PostItem
              :title="item.title"
              :content="item.content"
              :created-at="item.createdAt"
              @click="goPage(item.id)"
              @modal="openModal(item)"
              @preview="selectPreview(item.id)"
            ></PostItem>
        </template>
      </AppGrid>
      <Teleport to="#modal">
        <PostModal v-model="show" :title="modalTitle" :content="modalContent" :created-at="modalCreatedAt"/>
      </Teleport>
      <!-- <AppModal :show="show" title="게시글" @close="closeModal">
        <template #default>
          <div class="row g-3">
            <div class="col-3">제목</div>
            <div class="col-9">{{ modalTitle }}</div>
            <div class="col-3">내용</div>
            <div class="col-9">{{ modalContent }}</div>
            <div class="col-3">등록일</div>
            <div class="col-9">{{ modalCreatedAt }}</div>
          </div>
        </template>
        <template #actions>
          <button type="button" class="btn btn-secondary" @click="closeModal">닫기</button>
        </template>
      </AppModal> -->
      <AppPagination 
        :current-page="params._page" 
        :page-count="pageCount" 
        @page="page => params._page = page"
      />
    </template>
    <template v-if="previewId">
      <hr class="my-5"/>
      <AppCard>
        <PostDetailView :id="previewId"></PostDetailView>
      </AppCard>
    </template>
  </div>
</template>

<script setup>
import PostItem from '../../components/posts/PostItem.vue';
import PostDetailView from './PostDetailView.vue';
import PostFilter from './PostFilter.vue';
import PostModal from '@/components/posts/PostModal.vue';
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAxios } from '@/hooks/useAxios';


const router = useRouter();

const previewId = ref(null);
const selectPreview = id => (previewId.value = id);

const params = ref({
  _sort: 'createdAt',
  _order: 'desc',
  _page: 1,
  _limit: 3,
});
const { response, data: posts , error, loading } = useAxios('/posts', { params });
// pagination
const totalCount = computed(() => response.value.headers['x-total-count']);
const pageCount = computed(() => Math.ceil(totalCount.value / params.value._limit))

// const fetchPosts = async () => {
//   try {
//     loading.value = true;
//     const { data, headers } = await getPosts(params.value); // response의 data만 받아오기 위해 구조분해 할당
//     posts.value = data;
//     totalCount.value = headers['x-total-count'];
//   } catch (err) {
//     error.value = err
//   } finally {
//     loading.value = false;
//   }
// }
// watchEffect(fetchPosts);
const goPage = (id) => {
  // router.push(`/posts/${id}`);
  router.push({
    name: 'PostDetail',
    params: {
      id,
    }
  })
}

// modal
const show = ref(false);
const modalTitle = ref('');
const modalContent = ref('');
const modalCreatedAt = ref('');
const openModal = ({title, content, createdAt}) => {
  show.value = true;
  modalTitle.value = title;
  modalContent.value = content;
  modalCreatedAt.value = createdAt;
}
</script>

<style lang="scss" scoped>

</style>