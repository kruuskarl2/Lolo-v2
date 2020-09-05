<template>
    <div class="article-reader" v-bind:class="{ open: articleIsSelected }">
        <span v-if="articleIsSelected" class="article-content" v-html="articleContent"></span>
    </div>
</template>

<script>
export default {
    name: 'ArticleReader',
    data: function () {
        return {
            isOpen: false
        }
    },
    computed: {
        articleIsSelected: function () {
            return (this.$store.state.selectedArticleIndex != null);
        },
        articleContent: function () {
            return this.$store.getters.selectedArticle.content;
        }
    }
}
</script>

<style scoped>
.article-reader {
    border: 1px solid black;
    transition: 0.5s;
    flex-grow: 1;
    width: 0;
    padding: 10px;
    overflow: auto;
    height: 98vh;
}

.open {
    width: 100%;
}
</style>
