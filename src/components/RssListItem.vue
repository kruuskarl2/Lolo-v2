<template>
    <div class="rss-list-item">
        <div class="feed-name">
            <font-awesome-icon icon="book"/>&nbsp;{{ name }}
        </div>
        <div class="article-amount">{{ articleCount }}<font-awesome-icon icon="spinner" v-if="articleCount==undefined"/></div> 
    </div>
</template>

<script>
export default {
    name: 'RssListItem',
    props: ['name', 'url'],
    data: function () {
        return {
            articleCount: undefined
        }
    },
    methods: {
        getArticleCount: function (proxyUrl = "") {
            // proxyUrl must be used to bypass CORS
            fetch(proxyUrl + this.url)
                .then(response => response.text())
                .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
                .then(data => {
                    console.log(data);
                    var items = data.querySelectorAll("item");
                    this.articleCount = items.length;
                }).catch(error => {
                    // Try to parse the feed again, using the proxy to bypass CORS
                    if (proxyUrl == "") { 
                        this.getArticleCount('https://cors-anywhere.herokuapp.com/');
                        return;
                    }
                    console.log("Failed to parse feed: " + error);
                });
        }
    },
    mounted: function () {
        this.getArticleCount();
    }
}
</script>

<style scoped>
.rss-list-item {
    width: 100%;
    display: flex;
    flex-direction: row;
    padding: 10px 0;
    transition: 0.3s;
}

.rss-list-item:hover {
    background-color: var(--accent-color);
}

.feed-name {
    flex-grow: 15;
    margin: 0 6px;
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

.fa-spinner {
    animation: rotation 2s infinite linear;
}

@keyframes rotation {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
}

</style>
