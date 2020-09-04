<template>
    <div v-if="showModal" class="new-feed-modal">
        <div class="modal-overlay"></div>
        <div class="modal">
            <h1 class="new-feed-label">New Feed</h1>
            <h4 class="input-label">Custom Name (optional)</h4>
            <input type="text">
            <h4 class="input-label">RSS Feed URL</h4>
            <input type="text" v-model="rssFeed">
            <div class="buttons">
                <div class="add-button button" v-on:click="addFeed">Add feed</div>
                <div class="cancel-button button" v-on:click="closeModal">Cancel</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'NewFeedModal',
    data: function() {
        return {
            rssFeed: "",
            showModal: false
        }
    },
    methods: {
        addFeed: function () {
            if (this.rssFeed == "") return;
            this.$store.commit('addFeed', { url: this.rssFeed});
            this.closeModal();
        },
        closeModal: function () {
            this.showModal = false;
            this.rssFeed = "";
        }
    },
    mounted: function () {
        this.$root.$on('setAddFeedModal', (show) => {
            this.showModal = show;
        })
    }
}
</script>

<style scoped>
.new-feed-modal {
    color: var(--dark-accent);
}

.modal-overlay {
    position: absolute;
    top: 0;
    width: 100vw;
    height: 100vh;
    background-color: black;
    opacity: 50%;
}

.modal {
    background-color: var(--light-bgcolor);
    position: absolute;
    width: 33vw;
    height: 190px;
    left: 33vw;
    top: 30vh;
    padding: 20px;
}

.new-feed-label {
    margin: 0;
}

.input-label {
    margin: 10px 0 5px;
}

input {
    width: 98%;
}

.buttons {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    color: var(--light-bgcolor);
}

.button {
    width: 46%;
    text-align: center;
    margin: 15px 0;
    padding: 3px;
    transition: 0.3s;
}

.add-button {
    background-color: var(--accent-color);
}

.add-button:hover {
    background-color: var(--accent-lighter);
}

.cancel-button {
    background-color: var(--error-color);
}

.cancel-button:hover {
    background-color: var(--error-lighter);
}
</style>
