<template>
    <div class="rss-list-Subitem" v-on:click="selectThisCategory" v-bind:class="{selected: thisCategorySelected}">
        <div class="category-name">
            <font-awesome-icon icon="minus"/>&nbsp;{{ category }}
        </div>
        <div class="article-amount">{{ articleCount }}<font-awesome-icon icon="spinner" v-if="articleCount==undefined"/></div>
    </div>
</template>

<script>
export default {
    name: 'RssListSubitem',
    props: ['category'],
    methods: {
        selectThisCategory() {
            this.$store.commit("selectCategory", { category: this.category });
        }
    },
    computed: {
        articleCount: function () {
            var articles = this.$store.getters.selectedFeed.items;
            var count = 0;
            articles.forEach(article => {
                if (article.category == this.category) count++;
            })
            return count;
        },
        thisCategorySelected: function () {
            return (this.$store.state.selectedCategory === this.category);
        }
    }
}
</script>

<style scoped>
.rss-list-Subitem {
    width: 100%;
    display: flex;
    flex-direction: row;
    padding: 5px 0;
    transition: 0.3s;
}

.rss-list-Subitem:hover {
    background-color: var(--accent-color);
}

.selected {
    background-color: var(--accent-color);
}

.category-name {
    flex-grow: 15;
    margin: 0 25px;
    width: 100%;
}

.article-amount {
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
