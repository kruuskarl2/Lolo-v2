<template>
    <div class="article-browser">
        <div class="nav-bar">
            <font-awesome-icon icon="rss"/>&nbsp;
            <input type="text" class="rss-url">&nbsp;
            <font-awesome-icon icon="trash-alt"/>
        </div>
    </div>
</template>

<script>
export default {
  name: 'ArticleBrowser',
}
</script>

<style scoped>
.article-browser {
    padding: 1%;
    width: 100%;
    border: 1px solid black;
    height: 100vh;
    color: var(--dark-accent);
}
.nav-bar {
    display: flex;
    flex-direction: row;
}
.rss-url {
    padding: 0;
    height: 25px;
    margin: 10px;
    flex-grow: 30;
}
.fa-w-14 {
    /* This class is attached to all font-awesome icons */
    font-size: 25px;
    transition: 0.2s;
    padding: 12px 0 0;
    flex-grow: 1;
}
.fa-trash-alt:hover {
    color: var(--error-color);
}
</style>
