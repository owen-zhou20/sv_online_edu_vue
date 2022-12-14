import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index')
    }]
  },

  {
    path: '/teacher',
    component: Layout,
    redirect: '/teacher/table',
    name: 'Teacher Management',
    meta: { title: 'Teacher Management', icon: 'example' },
    children: [
      {
        path: 'table',
        name: 'Teacher List',
        component: () => import('@/views/edu/teacher/list'),
        meta: { title: 'Teacher List', icon: 'table' }
      },
      {
        path: 'save',
        name: 'Add Teacher',
        component: () => import('@/views/edu/teacher/save'),
        meta: { title: 'Add Teacher', icon: 'tree' }
      },
      {
        path: 'edit/:id',
        name: 'EduTeacherEdit',
        component: () => import('@/views/edu/teacher/save'),
        meta: { title: 'Edit Teacher', noCache: 'true' },
        hidden: true
      }
    ]
  },

  {
    path: '/subject',
    component: Layout,
    redirect: '/subject/list',
    name: 'Subject Management',
    meta: { title: 'Subject Management', icon: 'example' },
    children: [
      {
        path: 'list',
        name: 'Subject List',
        component: () => import('@/views/edu/subject/list'),
        meta: { title: 'Subject List', icon: 'table' }
      },
      {
        path: 'save',
        name: 'Add Subject',
        component: () => import('@/views/edu/subject/save'),
        meta: { title: 'Add Subject', icon: 'tree' }
      }
    ]
  },

  {
    path: '/course',
    component: Layout,
    redirect: '/course/list',
    name: 'Course Management',
    meta: { title: 'Course Management', icon: 'example' },
    children: [
      {
        path: 'list',
        name: 'Course List',
        component: () => import('@/views/edu/course/list'),
        meta: { title: 'Course List', icon: 'table' }
      },
      {
        path: 'courseinfo',
        name: 'Add Course',
        component: () => import('@/views/edu/course/courseinfo'),
        meta: { title: 'Add Course', icon: 'tree' }
      },
      {
        path: 'courseinfo/:id',
        name: 'EduCourseInfoEdit',
        component: () => import('@/views/edu/course/courseinfo'),
        meta: { title: 'Fill in this course infomation', noCache: true },
        hidden: true
      },
      {
        path: 'chapter/:id',
        name: 'EduCourseChapterEdit',
        component: () => import('@/views/edu/course/chapter'),
        meta: { title: 'Create course outline', noCache: true },
        hidden: true
      },
      {
        path: 'publish/:id',
        name: 'EduCoursePublishEdit',
        component: () => import('@/views/edu/course/publish'),
        meta: { title: 'Release new course', noCache: true },
        hidden: true
      }
    ]
  },

  {
    path: '/sta',
    component: Layout,
    redirect: '/sta/create',
    name: 'StatisticsDaily',
    meta: { title: 'Statistics Daily', icon: 'example' },
    children: [
      {
        path: 'create',
        name: 'CreateData',
        component: () => import('@/views/statistics/create'),
        meta: { title: 'Create Data', icon: 'table' }
      },
      {
        path: 'show',
        name: 'ShowData',
        component: () => import('@/views/statistics/show'),
        meta: { title: 'Show Data', icon: 'tree' }
      }
    ]
  },

  {
    path: '/example',
    component: Layout,
    redirect: '/example/table',
    name: 'Example',
    meta: { title: 'Example', icon: 'example' },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/table/index'),
        meta: { title: 'Table', icon: 'table' }
      },
      {
        path: 'tree',
        name: 'Tree',
        component: () => import('@/views/tree/index'),
        meta: { title: 'Tree', icon: 'tree' }
      }
    ]
  },

  {
    path: '/form',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/form/index'),
        meta: { title: 'Form', icon: 'form' }
      }
    ]
  },

  {
    path: '/nested',
    component: Layout,
    redirect: '/nested/menu1',
    name: 'Nested',
    meta: {
      title: 'Nested',
      icon: 'nested'
    },
    children: [
      {
        path: 'menu1',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'Menu1',
        meta: { title: 'Menu1' },
        children: [
          {
            path: 'menu1-1',
            component: () => import('@/views/nested/menu1/menu1-1'),
            name: 'Menu1-1',
            meta: { title: 'Menu1-1' }
          },
          {
            path: 'menu1-2',
            component: () => import('@/views/nested/menu1/menu1-2'),
            name: 'Menu1-2',
            meta: { title: 'Menu1-2' },
            children: [
              {
                path: 'menu1-2-1',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
                name: 'Menu1-2-1',
                meta: { title: 'Menu1-2-1' }
              },
              {
                path: 'menu1-2-2',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
                name: 'Menu1-2-2',
                meta: { title: 'Menu1-2-2' }
              }
            ]
          },
          {
            path: 'menu1-3',
            component: () => import('@/views/nested/menu1/menu1-3'),
            name: 'Menu1-3',
            meta: { title: 'Menu1-3' }
          }
        ]
      },
      {
        path: 'menu2',
        component: () => import('@/views/nested/menu2/index'),
        meta: { title: 'menu2' }
      }
    ]
  },

  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        meta: { title: 'External Link', icon: 'link' }
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //??????????????????
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
