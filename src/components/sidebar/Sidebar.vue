<template lang="html">
    <div class="sidebar">
        <h1 class="ui inverted center aligned header">Slack Demo</h1>
        <connected-user></connected-user>
        <channels></channels>
        <div class="ui divider"></div>
        <users></users>
    </div>
</template>

<script>
import ConnectedUser from './ConnectedUser'
import Channels from './Channels'
import Users from './Users'

export default {
    name: 'sidebar',
    components: { ConnectedUser, Channels, Users }
}
</script>

<style lang="css" scoped>

.sidebar {
    position: fixed;
    display: flex;
    flex-flow: column nowrap;
    width: 300px;
    padding: 10px;
    top: 0;
    left: 0;
    bottom: 0;
    background-color: #795548;
    padding-top: 110px;
}
</style>
