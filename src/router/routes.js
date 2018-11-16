export default [
  {
    path: '/auth/register',
    name: 'Register',
    component: () => import('@/views/auth/Register')
  },
  {
    path: '/',
    name: 'Home',
    alias: '/topics',
    component: () => import('@/views/Home')
  },
  {
    path: '/auth/login',
    name: 'Login',
    component: () => import('@/views/auth/Login')
  },
  {
    path: '/users/:userId/edit',
    component: () => import('@/views/users/Edit.vue'),
    children: [
      {
        path: '',
        name: 'EditProfile',
        component: () => import('@/views/users/Profile.vue'),
        meta: { isAuth: true }
      },
      {
        path: '/users/:userId/edit_avatar',
        name: 'EditAvatar',
        component: () => import('@/views/users/Avatar.vue'),
        meta: { isAuth: true }
      },
      {
        path: '/users/:userId/edit_password',
        name: 'EditPassword',
        component: () => import('@/views/users/Password.vue'),
        meta: { isAuth: true }
      }
    ]
  },
  {
    path: '/articles/create',
    name: 'Create',
    component: () => import('@/views/articles/Create'),
    meta: { isAuth: true }
  },
  {
    path: '/articles/:articleId/edit',
    name: 'Edit',
    component: () => import('@/views/articles/Create'),
    meta: { isAuth: true }
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import('@/views/Search')
  },
  {
    path: '/blogs/:blogId',
    name: 'Content',
    component: () => import('@/views/articles/Content.vue')
  },
 {
  path: '/:userId',
  component: () => import('@/views/articles/Column'),
    children: [
      {
        path: '',
        name: 'Column',
        component: () => import('@/views/articles/List.vue')
      },
      {
        path: '/blogs/:blogId',
        name: 'Content',
        component: () => import('@/views/articles/Content.vue')
      }
    ]
  },
]
