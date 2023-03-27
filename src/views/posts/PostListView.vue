<template>
  <div>
    <h2>게시글 목록</h2>
    <form @submit.prevent>
      <div class="row g-3">
        <div class="col">
          <input type="text" class="form-control">
        </div>
      </div>
    </form>
    <hr class="my-4" />
    <div class="row g-3">
      <div v-for="post in posts" :key="post.id" class="col-4">
        <PostItem
         :title="post.title"
         :content="post.content"
         :created-at="post.createdAt"
         @click="goPage(post.id)"
         @modal="openModal(post)"
        ></PostItem>
      </div>
    </div>
    <nav class="mt-5" aria-label="Page navigation example">
      <ul class="pagination justify-content-center">
        <li class="page-item">
          <a class="page-link" :class="{disabled : !(params._page > 1)}" href="#" @click.prevent="--params._page">Previous</a>
        </li>
        <li v-for="page in pageCount" :key="page" class="page-item" :class="{ active: params._page === page }">
          <a class="page-link" href="#" @click.prevent="params._page = page">{{ page }}</a>
        </li>
        <li class="page-item" :class="{disabled : !(params._page < pageCount)}">
          <a class="page-link" href="#" @click.prevent="++params._page">Next</a>
        </li>
      </ul>
    </nav>
    
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
    <hr class="my-5"/>
    <AppCard>
      <PostDetailView :id="1"></PostDetailView>
  </AppCard>
  </div>
</template>

<script setup>
import PostItem from '../../components/posts/PostItem.vue';
import PostDetailView from './PostDetailView.vue';
import AppCard from '@/components/AppCard.vue';
import PostModal from '@/components/posts/PostModal.vue';
import { getPosts } from '@/api/posts';
import { ref, computed, watchEffect } from 'vue';
import { useRouter } from 'vue-router';


const router = useRouter();
const posts = ref([]);
const params = ref({
  _sort: 'createdAt',
  _order: 'desc',
  _page: 1,
  _limit: 3,
});
// pagination
const totalCount = ref(0);
const pageCount = computed(() => Math.ceil(totalCount.value / params.value._limit))

const fetchPosts = async () => {
  try {
    const { data, headers } = await getPosts(params.value); // response의 data만 받아오기 위해 구조분해 할당
    posts.value = data;
    totalCount.value = headers['x-total-count'];
  } catch (error) {
    console.error(error);
  }
  
}
watchEffect(fetchPosts);
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