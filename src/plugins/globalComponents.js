import PageHeader from '../components/PageHeader.vue'
// const PageHeader = () => import('../components/PageHeader.vue')

const components = {
  PageHeader,
}

const globalComponents = {
  install(Vue) {
    Object.entries(components).forEach(([ key, value ]) => {
      Vue.component(key, value)
    })
  }
}

export default globalComponents;
