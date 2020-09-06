<template>
    <div class="article-reader" v-bind:class="{ open: articleIsSelected }">
        <div class="article-wrapper">
            <span v-if="articleIsSelected" class="article-content" v-html="articleContent"></span>
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
    border: 1px solid black;
    transition: 0.5s;
    flex-grow: 1;
    width: 0;
    overflow: auto;
    height: 98vh;
}

.article-wrapper {
    padding: 10px;
}

.open {
    width: 100%;
}
</style>
