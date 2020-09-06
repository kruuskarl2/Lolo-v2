<template>
    <div class="article" v-on:click="selectArticle" v-bind:class="{ selected: isSelected}">
        <div class="image"><img v-if="articleImage" v-bind:src="articleImage"/><font-awesome-icon v-else icon="rss"/></div>
        <div class="text-content">
            <h4 class="title">
                {{ articleTitle || "Untitled Article" }}
                <font-awesome-icon icon="link" v-on:click="openArticle"/>
            </h4>
            <p class="desc">{{ articleDescription }}</p>
            <div class="article-details">
                <p class="date">Date: {{ articleDate }}</p>
            </div>
        </div>
    </div>
</template>

<script>


export default {
    name: 'Article',
    props: ['article', 'index'],
    methods: {
        selectArticle() {
            this.$store.commit("selectArticle", { index: this.index });
        },
        openArticle: function() {
            window.open(this.article.url, "_blank");
        }
    },
    computed: {
        articleTitle: function() {
            return this.article.title;
        },
        articleImage: function() {
            return this.article.lead_image_url;
        },
        articleDescription: function() {
            return this.article.excerpt;
        },
        isSelected: function() {
            return (this.index == this.$store.state.selectedArticleIndex);
        },
        articleDate: function() {
            if (!this.article.date_published) return "Unknown";
            var date = new Date(this.article.date_published);
            return date.toDateString();
        }
    }
}
</script>

<style scoped>
.article {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    padding: 10px 0;
    border: solid 1px whitesmoke;
    transition: 0.2s;
}
.article:hover {
    background-color: var(--accent-color);
    color: var(--light-bgcolor);
}
.selected {
    background-color: var(--accent-color);
    color: var(--light-bgcolor);
}
.image {
    height: 100px;
    flex: 0 0 200px;
    margin-left: 10px;
    overflow: hidden;
    text-align: center;
}
img {
    max-width: 200px;
}
.text-content {
    flex-grow: 10;
    padding-left: 15px;
}
.title {
    margin: 0;
}
.fa-rss {
    font-size: 100px;
}
.article-details {
    font-size: 13px;
}
.fa-link {
    background-color: var(--black-bgcolor);
    color: var(--white-bgcolor);
}
</style>
