import Vue from 'nativescript-vue'

import Home from './components/Home'
import Albums from './components/AlbumsPage'

new Vue({
  render: (h) => h('frame', [h(Home)]),
}).$start()
