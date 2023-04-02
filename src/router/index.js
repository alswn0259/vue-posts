import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import AboutView from '@/views/AboutView.vue';
import PostCreateView from '@/views/posts/PostCreateView.vue';
import PostDetailView from '@/views/posts/PostDetailView.vue';
import PostListView from '@/views/posts/PostListView.vue';
import PostEditView from '@/views/posts/PostEditView.vue';
import NotFoundView from '@/views/NotFoundView.vue';
import NestedView from '@/views/nested/NestedView.vue';
import NestedOneView from '@/views/nested/NestedOneView.vue';
import NestedTwoView from '@/views/nested/NestedTwoView.vue';
import NestedHomeView from '@/views/nested/NestedHomeView.vue';
import MyPage from '@/views/MyPage.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
  },
  {
    path: '/about',
    name: 'About',
    component: AboutView,
  },
  {
    path: '/posts',
    name: 'PostList',
    component: PostListView,
  },
  {
    path: '/posts/create',
    name: 'PostCreate',
    component: PostCreateView,
  },
  {
    // /user/alice
    // /user/bruce  -> PostDetailView
    // /user/tom
    path: '/posts/:id',
    name: 'PostDetail',
    component: PostDetailView,
    props: true,
    // props: route => ({
    //     id: parseInt(route.params.id),
    //   })
  },
  {
    path: '/posts/:id/edit',
    name: 'PostEdit',
    component: PostEditView,
  },
  { 
    path: '/:pathMatch(.*)*', 
    name: 'NotFound', 
    component: NotFoundView,
   },
   { 
    path: '/nested', 
    name: 'Nested', 
    component: NestedView,
    children: [
      { 
        path: '', 
        name: 'NestedHome', 
        component: NestedHomeView,
       },
      { 
        path: 'one', 
        name: 'NestedOne', 
        component: NestedOneView,
       },
       { 
        path: 'two', 
        name: 'NestedTwo', 
        component: NestedTwoView,
       },
    ]
   },
   {
    path: '/my',
    name: 'MyPage',
    component: MyPage,
    beforeEnter: removeQueryString,
   }
];
function removeQueryString(to) {
  if (Object.keys(to.query).length > 0) {
    return {path: to.path, query: {}}
  }
}
const router = createRouter({
  history: createWebHistory('/'),
  // history: createWebHashHistory(), 
  // '#'이 붙고 안붙고의 차이
  // 프레임워크는 SPA 기반이라 프로젝트 빌드하면 파일 한개
  // 서버사이드 렌더링, 클라이언트 사이드 렌더링
  // 서버사이드 렌더링: UI에 보여질 html문서를 서버에서 내려주는 것
  // 클라이언트 사이드 렌더링: 자바스크립트 코드로 html코드를 생성해 사용자에게 보여주는것 (ex. vue)
  // hash 모드, 
  // 차이는 운영 서버에 배포할 때 일어남
  // 운영 서버에 배포할때는 html 하나만 
  // 해쉬 모드로 작동할때는 # 뒤의 문자열은 제거하고 요청함
  // 히스토리 모드로 작동할때는 전체경로를 포함해서 리소스를 요청함
  // 대부분의 서버는 루트로 요청하면 index.html 파일을,,\]
  // 히스토리 모드로 배포할때는 서버에 추가로 설정해 줘야함.
  // 해쉬모드의 단점 : 구글이나 네이버에 노출이 잘 안될수 있음. 검색엔진 최적하에 나쁜 영향을 미칠 수 있음
  // 운영서버에 배포할때 대부분 히스토리모드를 사용해서 배포함. createWebHistory
  routes,
});

// router.beforeEach((to, from) => {
//   if (to.name === 'MyPage') {
//     // return false;
//     // return router.push({name: 'Home'});
//     return '/posts';
//   }
// })
export default router;