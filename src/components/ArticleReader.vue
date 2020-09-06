<template>
    <div class="article-reader" v-bind:class="{ open: articleIsSelected }">
        <div class="article-wrapper">
            <div v-if="articleIsSelected" class="article-content" v-html="articleContent"></div>
        </div>
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
    transition: 0.5s;
    flex-grow: 1;
    width: 0;
    overflow: auto;
    height: 100vh;
}

.article-wrapper {
    padding: 10px;
}

.open {
    width: 100%;
}

.article-content {
    margin: 15px;
}

.article-content >>> img {
    max-width: 100% !important;
    text-align: center;
}
</style>
