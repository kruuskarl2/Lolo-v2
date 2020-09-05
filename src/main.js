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
    actions: {
        addFeedUsingProxy(context, { url, name="Unnamed feed", proxyUrl="" }) {
            var state = context.state;
            // proxyUrl must be used to bypass CORS: https://medium.com/@dtkatz/3-ways-to-fix-the-cors-error-and-how-access-control-allow-origin-works-d97d55946d9
            fetch(proxyUrl + url)
                .then(response => response.text())
                .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
                .then(data => {
                    var nameFromFeed = data.querySelector("title").innerHTML;
                    console.log(nameFromFeed);
                    if (name=="Unnamed feed") name = nameFromFeed;

                    var items = data.querySelectorAll("item");

                    state.feedList.push({
                        name, 
                        url, 
                        items
                    });
                    
                    console.log("feed added");
                    console.log(state.feedList);
                }).catch(error => {
                    // Try to parse the feed again, using the proxy to bypass CORS
                    if (proxyUrl == "") { 
                        context.dispatch("addFeedUsingProxy", {
                            url,
                            name,
                            proxyUrl: 'https://hidden-ocean-65163.herokuapp.com/'
                        });
                        return;
                    }
                    console.log("Failed to parse feed: " + error);
                });
        }
    }
})
 
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  store
}).$mount('#app')
