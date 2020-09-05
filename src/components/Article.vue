<template>
    <div class="article">
        <div class="image"><img v-bind:src="articleImage"/></div>
        <div class="text-content">
            <h4 class="title">{{ articleTitle || "Untitled Article" }}</h4>
            <p class="desc">{{ articleDescription }}</p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Article',
    props: ['article'],
    computed: {
        articleTitle: function() {
            return this.article.querySelector("title").innerHTML;
        },
        articleImage: function() {
            // Find the first url in the article and use that as the image
            var imgURL = this.article.innerHTML.toString().split('url="')[1].split('"')[0];
            console.log(imgURL);
            return imgURL;
        },
        articleDescription: function() {
            return this.article.querySelector("description").innerHTML;
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
}
.image {
    height: 100px;
    flex: 0 0 200px;
    margin-left: 10px;
    overflow: hidden;
    text-align: center;
}
img {
    height: 100%;
}
.text-content {
    flex-grow: 10;
    padding-left: 15px;
}
.title {
    margin: 0;
}
</style>
