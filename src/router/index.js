import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import AddData from '@/components/AddData'
import EditData from '@/components/EditData'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/add-data',
      name: 'AddData',
      component: AddData
    },
    {
      path: '/edit-data/:data_slug',
      name: 'EditData',
      component: EditData
    }
  ]
})
