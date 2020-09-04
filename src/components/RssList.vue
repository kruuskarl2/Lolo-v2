<template>
    <div class="rss-list">
        <div v-if="feedsExist">
            <RssListItem v-for="feed in feedList" v-bind:key="feed.name" v-bind:name="feed.name" v-bind:url="feed.url"/>
        </div>
        <div v-else class="no-feeds">You haven't added any feeds yet.</div>
    </div>
</template>

<script>
import RssListItem from './RssListItem.vue'

export default {
    name: 'RssList',
    data: function() {
        return {
            feedList: []
        };
    },
    components: {
        RssListItem
    },
    computed: {
        feedsExist: function() {
            return (this.feedList.length != 0);
        },
    },
    mounted: function() {
        this.feedList = this.$store.state.feedList;
    }
}
</script>

<style scoped>
.rss-list {
    background-color: var(--dark-accent);
    height: 100%;
}

.no-feeds {
    color: lightgray;
}
</style>
