<template lang="html">
    <div class="users__container">
        <h2 class="ui inverted center aligned header">Users</h2>
        <div class="ui feed" v-for="user in users"
            :key="user.uid"
            :class="{'is_active': isActive(user)}"
            @click.prevent="changeChannel(user)">
            <div class="event">
                <div class="label">
                    <img :src="user.avatar" alt="avatar">
                </div>
                <div class="content">
                    <span class="ui empty circular label connection__label"
                    :class="{'olive': isOnline(user), 'red': !isOnline(user)}">
                    </span>
                    {{ user.name }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { firebaseObj } from '../../config/firebaseConfig'

export default {
    name: 'users',
    data() {
        return {
            users: [],
            usersRef: firebaseObj.database().ref('users'),
            conntectedRef: firebaseObj.database().ref('.info/connected'),
            presenceRef: firebaseObj.database().ref('presence')
        }
    },
    computed: {
        ...mapGetters(['currentUser', 'currentChannel'])
    },
    mounted() {
        this.addListeners()
    },
    methods: {
        addListeners() {
            this.usersRef.on('child_added', (snap) => {
                if (this.currentUser.uid !== snap.key) {
                    const user = snap.val()
                    user.uid = snap.key
                    user.status = 'offline'
                    this.users.push(user)
                }
            })

            this.presenceRef.on('child_added', (snap) => {
                if (this.currentUser.uid !== snap.key) {
                    this.addStatusToUser(snap.key)
                }
            })

            this.presenceRef.on('child_removed', (snap) => {
                if (this.currentUser.uid !== snap.key) {
                    this.addStatusToUser(snap.key, false)
                }
            })

            this.conntectedRef.on('value', (snap) => {
                if (snap.val() === true) {
                    const ref = this.presenceRef.child(this.currentUser.uid)
                    ref.set(true)
                    ref.onDisconnect().remove((err) => {
                        if (err !== null) {
                            console.log(err)
                        }
                    })
                }
            })
        },
        addStatusToUser(userId, connected = true) {
            const index = this.users.findIndex(user => user.uid === userId)
            if (index !== -1) {
                if (connected === true) {
                    this.users[index].status = 'online'
                } else {
                    this.users[index].status = 'offline'
                }
            }
        },
        detachListeners() {
            this.usersRef.off()
            this.presenceRef.off()
            this.conntectedRef.off()
        },
        isOnline(user) {
            return user.status === 'online'
        },
        changeChannel(user) {
            const channelId = this.getChannelId(user.uid)
            const channel = { id: channelId, name: user.name }

            this.$store.dispatch('setPrivate', true)
            this.$store.dispatch('setCurrentChannel', channel)
        },
        isActive(user) {
            const channelId = this.getChannelId(user.uid)
            console.log(this.currentChannel.id, channelId)
            return this.currentChannel.id === channelId
        },
        getChannelId(userId) {
            return userId < this.currentUser.uid ? userId + '/' + this.currentUser.uid : this.currentUser.uid + '/' + userId
        }
    },
    beforeDestroy() {
        this.detachListeners()
    }
}
</script>

<style lang="css" scoped>
    .users__container {
        overflow-y: auto;
    }

    .users__container .feed {
        cursor: pointer;
        padding: 4px;
        border-radius: 4px;
    }

    .users__container .feed:hover {
        background: #654439;
    }

    .users__container .feed:is_active {
        background: #654439;
    }

    .connection__label {
        float: left !important;
        margin-right: 12px !important;
        margin-top: 5px;
    }
</style>
