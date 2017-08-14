<template lang="html">
    <div class="connectedUser__container">
        <div class="ui items user_component">
            <div class="item">
                <div class="ui mini image">
                    <img :src="currentUser.photoURL" alt="avatar">
                </div>
                <div class="middle aligned content">
                    <div class="ui container">
                        <div class="ui inverted header">
                            {{ currentUser.displayName }}
                        </div>
                    </div>
                </div>
                <div>
                    <button class="ui circular icon right floated button" @click="logout">
                        <i class="icon sign out"></i>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { firebaseObj } from '../../config/firebaseConfig'

export default {
    name: 'connected-user',
    data() {
        return {
            presenceRef: firebaseObj.database().ref('presence')
        }
    },
    computed: {
        ...mapGetters(['currentUser'])
    },
    methods: {
        logout() {
            this.presenceRef.child(this.currentUser.uid).remove()
            firebaseObj.auth().signOut()
            this.$store.dispatch('setUser', null)
            this.$router.push('/login')
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../../main.scss';

.connectedUser__container {
    position: absolute;
    background-color: $color_masala;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    height: 90px;
    padding: 8px;
    box-shadow: -4px 1px 8px 3px $color_blackcurrant;
}

.user_component {
    padding-top: 10px;
}

</style>
