<template>
    <div class="tchat__container">
        <sidebar></sidebar>
        <messages></messages>
    </div>
</template>

<script>
    import Sidebar from '../components/Sidebar'
    import Messages from '../components/Messages'

    export default {
        name: 'tchat',
        components: { Sidebar, Messages }
    }
</script>

<style scoped>

.tchat__container {
    height: 100%;
}

</style>
