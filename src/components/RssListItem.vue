<template>
    <div class="rss-list-item-wrapper">
        <div class="rss-list-item" v-bind:class="{ selected: isSelected && noCategorySelected }" v-on:click="selectThisFeed">
            <div class="feed-name">
                <font-awesome-icon icon="book"/>&nbsp;{{ name }}
            </div>
            <div class="article-amount">{{ articleCount }}</div> 
        </div>
        <div v-if="isSelected">
            <RssListSubitem v-for="(category, index) in categories" v-bind:key="index" v-bind:category="category"/>
        </div>
    </div>
</template>

<script>
import RssListSubitem from './RssListSubitem.vue';

export default {
    name: 'RssListItem',
    props: ['name', 'url', 'articleCount', 'index', 'categories'],
    components: {
        RssListSubitem
    },
    computed: {
        isSelected: function () {
            return (this.$store.state.selectedFeedIndex === this.index);
        },
        noCategorySelected: function () {
            return (this.$store.state.selectedCategory == null);
        }
    },
    methods: {
        selectThisFeed: function () {
            this.$store.commit("selectFeed", { index: this.index });
        }
    }
}
</script>

<style scoped>
.rss-list-item {
    width: 100%;
    display: flex;
    flex-direction: row;
    padding: 5px 0;
    transition: 0.3s;
}

.rss-list-item:hover {
    background-color: var(--accent-color);
}

.selected {
    background-color: var(--accent-color);
}

.feed-name {
    flex-grow: 15;
    margin: 0 6px;
    max-width: 260px;
    height: 18px;
    overflow: hidden;
}

.article-amount {
    color: var(--dark-accent);
    background-color: white;
    flex-grow: 1;
    text-align: center;
    font-weight: bold;
    border-radius: 5px;
    margin: 0 5px;
}
</style>
