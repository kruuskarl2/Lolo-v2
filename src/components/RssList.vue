<template>
    <div class="rss-list">
        <div class="no-feeds">You haven't added any feeds yet.</div>
    </div>
</template>

<script>
export default {
  name: 'RssList',
}
</script>

<style scoped>
.rss-list {
    background-color: var(--dark-accent);
    height: 100%;
    padding: 10px;
}

.no-feeds {
    color: lightgray;
}
</style>
