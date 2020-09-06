<template>
    <div class="article-browser">
        <div class="nav-bar">
            <font-awesome-icon class="nav-bar-icon" icon="rss"/>&nbsp;
            <input type="text" class="rss-url" v-bind:value="feedURL">&nbsp;
            <font-awesome-icon class="nav-bar-icon" icon="window-close"/>
            <font-awesome-icon class="nav-bar-icon" icon="check-square"/>
            <font-awesome-icon class="nav-bar-icon" icon="redo" v-on:click="refresh"/>
            <font-awesome-icon class="nav-bar-icon" icon="trash-alt"/>
        </div>
        <div class="articles" v-if="selectedFeed">
            <h1 class="feedName">{{ feedTitle }}</h1>
            <h4 class="category">Category: {{ selectedCategory }}</h4>
            <Article 
                v-for="(article, index) in articles"
                v-bind:article="article" 
                v-bind:key="index"
                v-bind:index="index"/>
        </div>
        <div class="no-feed-selected" v-else>You haven't opened any feeds yet.</div>
    </div>
</template>

<script>
import Article from './Article.vue';

export default {
    name: 'ArticleBrowser',
    components: {
        Article
    },
    methods: {
        refresh: function() {
            var feed = this.$store.getters.selectedFeed;
            var feeds = this.$store.state.feedList;
            var index = feeds.findIndex((arrFeed) => { return arrFeed === feed; });
            console.log(index);
            this.$store.dispatch('addFeedUsingProxy', { url: feed.url, name: feed.name, atIndex: index});
        }
    },
    computed: {
        feedTitle: function () {
            return this.$store.getters.selectedFeed.name;
        },
        selectedFeed: function () {
            return this.$store.getters.selectedFeed;
        },
        articles: function () {
            var articles = this.$store.getters.selectedFeed.items;
            var category = this.$store.state.selectedCategory;
            if (!category) return articles;
            var filteredItems = [];
            articles.forEach(article => {
                if (article.category == category) filteredItems.push(article);
            });
            return filteredItems;
        },
        feedURL: function () {
            if (!this.$store.getters.selectedFeed) return "";
            return this.$store.getters.selectedFeed.url;
        },
        selectedCategory: function () {
            return this.$store.state.selectedCategory || "Showing all";
        }
    }
}
</script>

<style scoped>
.article-browser {
    width: 100%;
    height: 99vh;
    color: var(--dark-accent);
    user-select: none;
    flex-grow: 1;
}
.nav-bar {
    display: flex;
    flex-direction: row;
    box-shadow: 0 0 5px gray;
}
.rss-url {
    padding: 0;
    height: 25px;
    margin: 10px;
    flex-grow: 30;
}
.nav-bar-icon {
    font-size: 25px;
    transition: 0.2s;
    padding: 12px 0 0;
    flex-grow: 1;
}
.fa-trash-alt:hover {
    color: var(--error-color);
}
.no-feed-selected {
    color: var(--dark-bgcolor);
    text-align: center;
    padding: 10px;
}
.articles {
    padding: 10px 0;
    height: 93.8%;
    overflow: auto;
    overflow-x: hidden;
}
.category {
    color: var(--dark-bgcolor);
    margin: 0 0 15px 10px;
    padding: 0;
}
.feedName {
    margin: 0 0 0 10px;
}
.fa-redo:hover {
    color: var(--accent-color);
}
</style>
