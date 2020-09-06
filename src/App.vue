<template>
    <div id="app">
        <SideBar/>
        <div class="content-container">
            <ArticleBrowser/>
            <ArticleReader/>
        </div>
        <Loading/>
    </div>
</template>

<script>
import SideBar from './components/SideBar.vue'
import ArticleBrowser from './components/ArticleBrowser.vue'
import ArticleReader from './components/ArticleReader.vue';
import Loading from './components/Loading.vue';

export default {
    name: 'App',
    components: {
        SideBar,
        ArticleBrowser,
        ArticleReader,
        Loading
    }
}
</script>

<style>
:root {
    --accent-color: #469c36;
    --accent-lighter: #4ab037;
    --dark-bgcolor: #525252;
    --light-bgcolor: white;
    --dark-accent: #242424;
    --error-color: #c21010;
    --error-lighter: #e31717
}

body {
    margin: 0;
    font-family: Helvetica;
    background-color: var(--light-bgcolor);
    overflow: hidden;
}

input {
    outline-color: var(--accent-color);
}

.content-container {
    display: flex;
    flex-direction: row;
    margin: 0 0 0 300px;
}
</style>
