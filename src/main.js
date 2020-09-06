import Vue from 'vue';
import App from './App.vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlusSquare, faRss, faTrashAlt, faBook, faSpinner, faWindowClose, faCheckSquare, faMinus, faRedo } from '@fortawesome/free-solid-svg-icons';
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
library.add(faMinus);
library.add(faRedo);

Vue.use(Vuex)

const corsProxy = 'https://hidden-ocean-65163.herokuapp.com/';

const store = new Vuex.Store({
    state: {
      feedList: [],
      selectedFeedIndex: 0,
      selectedArticleIndex: null,
      selectedCategory: null
    },
    mutations: {
        selectFeed(state, { index }) {
            if (index == undefined) return;
            state.selectedFeedIndex = index;
            state.selectedCategory = null;
            state.selectedArticleIndex = null;
        },
        selectArticle(state, { index }) {
            if (index == undefined) return;
            if (state.selectedArticleIndex == index) index = null;
            state.selectedArticleIndex = index;
        },
        initialiseStore(state) {
            var storedFeedListStr = localStorage.getItem('feedList');
            if (storedFeedListStr) {
                var storedFeedList = JSON.parse(storedFeedListStr);
                state.feedList = storedFeedList;
            }
        },
        selectCategory(state, { category }) {
            if (category == undefined) return;
            state.selectedCategory = category;
            state.selectedArticleIndex = null;
        },
        removeFeed(state, { index }) {
            state.feedList.splice(index, 1);
            state.selectedFeedIndex = 0;
            state.selectedArticleIndex = null;
            state.selectedCategory = null;
        }
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
        addFeedUsingProxy(context, { url, name="Unnamed feed", proxyUrl="", atIndex }) {
            var state = context.state;
            // proxyUrl must be used to bypass CORS: https://medium.com/@dtkatz/3-ways-to-fix-the-cors-error-and-how-access-control-allow-origin-works-d97d55946d9
            fetch(proxyUrl + url)
                .then(response => response.text())
                .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
                .then(data => {
                    var nameFromFeed = data.querySelector("title").innerHTML;
                    if (name=="Unnamed feed") name = nameFromFeed;

                    var parsedItems = [];
                    var categoryLinkPairs = {};
                    var categories = [];
                    var items = data.querySelectorAll("item");
                    for (var i = 0; i < items.length; i++) {
                        var item = items[i];
                        var articleLink = item.querySelector('link').innerHTML;

                        var categoryEl = item.querySelector('category');
                        if (categoryEl) {
                            var category = categoryEl.innerHTML;
                            categoryLinkPairs[articleLink] = category;
                            if (!categories.includes(category)) categories.push(category);
                        }
                        
                        // BUG: Using the mercury web parser with a proxy causes multiple GET errors. This is due to the proxy changing the base domain address. 
                        Mercury.parse(corsProxy + articleLink).then(result => {
                            // Remove the proxy url from the result
                            result.url = result.url.replace(corsProxy, '');

                            // If a category exists for this article, add it to the object. This has to be done, since mercury doesn't seem to read categories.
                            if (categoryLinkPairs[result.url] !== undefined) { 
                                result.category = categoryLinkPairs[result.url]; 
                            }

                            parsedItems.push(result);

                            if (parsedItems.length == items.length) {
                                // Sort the items by date, newest first
                                var sortedItems = parsedItems.sort((a, b) => {
                                    var aDate = Date.parse(a.date_published || 0);
                                    var bDate = Date.parse(b.date_published || 0);
                                    return bDate - aDate;
                                });
                                // When all the articles have been parsed and sorted, add the new feed
                                var newFeed = {
                                    name, 
                                    url, 
                                    items: sortedItems,
                                    categories
                                };
                                if (atIndex !== undefined) state.feedList[atIndex] = newFeed;
                                else state.feedList.push(newFeed);
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
                            proxyUrl: corsProxy,
                            atIndex
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
