import Vue from 'vue'
import App from './App.vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlusSquare, faRss, faTrashAlt, faBook, faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import Vuex from 'vuex'

library.add(faPlusSquare)
library.add(faRss);
library.add(faTrashAlt);
library.add(faBook);
library.add(faSpinner);

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
      feedList: []
    },
    mutations: {
        addFeed (state, { url, name="kmalwd" }) {
            state.feedList.push({name, url});
            console.log(state.feedList);
        }
    }
})
 
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  store
}).$mount('#app')
