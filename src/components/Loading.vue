<template>
    <div v-if="isLoading" class="loading">
        <div class="modal-overlay"></div>
        <font-awesome-icon icon="spinner"/>
        <div class="message"> {{ loadingMessage }}</div>
    </div>
</template>

<script>
export default {
    name: 'Loading',
    computed: {
        isLoading: function () {
            return this.$store.state.isLoading;
        },
        loadingMessage: function () {
            return this.$store.state.loadingMessage;
        }
    }
}
</script>

<style scoped>
.loading {
    color: var(--light-bgcolor);
}

.modal-overlay {
    position: absolute;
    top: 0;
    width: 100vw;
    height: 100vh;
    background-color: black;
    opacity: 75%;
}

.fa-spinner {
    animation: rotation 2s infinite linear;
    position: absolute;
    top: 40%;
    height: 10%;
    width: 100%;
    text-align: center;
}

.message {
    position: absolute;
    width: 100%;
    text-align: center;
    font-size: 15px;
    top: 53%;
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
