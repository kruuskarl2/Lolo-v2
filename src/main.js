import Vue from 'vue';
import App from './App.vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlusSquare, faRss, faTrashAlt, faBook, faSpinner, faWindowClose, faCheckSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import Vuex from 'vuex';
import Mercury from "@postlight/mercury-parser";

library.add(faPlusSquare);
library.add(faRss);
library.add(faTrashAlt);
library.add(faBook);
library.add(faSpinner);
library.add(faWindowClose);
library.add(faCheckSquare);

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
      feedList: [],
      selectedFeedIndex: 0,
      selectedArticleIndex: null
    },
    mutations: {
        selectFeed(state, { index }) {
            if (index == undefined) return;
            state.selectedFeedIndex = index;
        },
        selectArticle(state, { index }) {
            if (index == undefined) return;
            if (state.selectedArticleIndex == index) index = null;
            state.selectedArticleIndex = index;
            console.log(state.selectedArticleIndex);
        },
        initialiseStore(state) {
            var storedFeedListStr = localStorage.getItem('feedList');
            if (storedFeedListStr) {
                var storedFeedList = JSON.parse(storedFeedListStr);
                state.feedList = storedFeedList;
                console.log(storedFeedList);
            }
        },
    },
    getters: {
        selectedFeed: state => {
            var selectedIndex = state.selectedFeedIndex;
            return state.feedList[selectedIndex];
        },
        selectedArticle: state => {
            var selectedFeedIndex = state.selectedFeedIndex;
            var selectedFeed = state.feedList[selectedFeedIndex];
            var selectedArticleIndex = state.selectedArticleIndex;
            return selectedFeed.items[selectedArticleIndex];
        }
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
                    if (name=="Unnamed feed") name = nameFromFeed;

                    var parsedItems = [];
                    var items = data.querySelectorAll("item");
                    for (var i = 0; i < items.length; i++) {
                        var item = items[i];
                        var articleLink = item.querySelector('link').innerHTML;
                        Mercury.parse('https://hidden-ocean-65163.herokuapp.com/' + articleLink).then(result => {
                            parsedItems.push(result);
                            if (parsedItems.length == items.length) {
                                // Sort the items by date, newest first
                                var sortedItems = parsedItems.sort((a, b) => {
                                    var aDate = Date.parse(a.date_published || 0);
                                    var bDate = Date.parse(b.date_published || 0);
                                    return bDate - aDate;
                                });
                                // When all the articles have been parsed and sorted, add the new feed
                                state.feedList.push({
                                    name, 
                                    url, 
                                    items: sortedItems
                                });
                                localStorage.setItem('feedList', JSON.stringify(state.feedList));
                            }
                        });
                    }
                }).catch(error => {
                    // Try to parse the feed again, using the proxy to bypass CORS
                    if (proxyUrl == "") {
                        console.log('Failed to fetch rss feed without proxy. Trying to fetch with proxy...');
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
  store,
  beforeCreate() { this.$store.commit('initialiseStore');},
}).$mount('#app')
