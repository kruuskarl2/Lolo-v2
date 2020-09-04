<template>
    <div class="side-bar">
        <div class="site-title">
            <div class="site-title-icon"><font-awesome-icon icon="rss"/></div>
            <br>
            <h1 class="site-title-text">Lolo v2</h1>
        </div>
        <div class="rss-list-container"><RssList/></div>
        <div class="add-rss-feed-btn" v-on:click="openAddFeedModal">
            <font-awesome-icon icon="plus-square"/>
            Add a new feed
        </div>
        <NewFeedModal/>
    </div>
</template>

<script>
import RssList from './RssList.vue'
import NewFeedModal from './NewFeedModal'

export default {
    name: 'SideBar',
    components: {
        RssList,
        NewFeedModal
    },
    methods: {
        openAddFeedModal: function () {
            this.$root.$emit('setAddFeedModal', true);
        }
    }
}
</script>

<style scoped>
.side-bar {
    background-color: var(--dark-bgcolor);
    width: 300px;
    height: 100vh;
    color: var(--light-bgcolor);
    user-select: none;
    position: absolute;
}

.site-title {
    margin: 0 0 20px;
    text-align: center;
}

.site-title-text {
    padding: 20px 0 0;
    padding: 0;
    margin: 0;
    font-size: 15px;
}

.site-title-icon {
    font-size: 60px;
    margin: 0 0 -20px;
    padding: 10px 0 0
}

.add-rss-feed-btn {
    background-color: var(--accent-color);
    text-align: center;
    font-size: 20px;
    transition: 0.2s;
    position: absolute;
    bottom: 0;
    width: 300px;
    padding: 10px 0;
}

.add-rss-feed-btn:hover {
    background-color: var(--accent-lighter);
}

.rss-list-container {
    max-height: 70%;
}
</style>
