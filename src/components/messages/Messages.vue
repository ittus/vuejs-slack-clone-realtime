<template lang="html">
    <div class="messages__container">
        <div class="messages__content">
            <h2 class="ui inverted center aligned header"># Welcome to new channel</h2>
            <div class="ui segment">
                <div class="ui comments">
                    <!--  Single message -->
                    <transition-group tag="div" name="list">
                        <single-message v-for="message in messages" :message="message" :key="message.id"></single-message>
                    </transition-group>
                </div>
            </div>
        </div>

        <!--  Message Form-->
        <message-form></message-form>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import MessageForm from './MessageForm'
import SingleMessage from './SingleMessage'
import { firebaseObj } from '../../config/firebaseConfig'

export default {
    name: 'messages',
    components: { MessageForm, SingleMessage },
    data() {
        return {
            messagesRef: firebaseObj.database().ref('messages'),
            messages: [],
            channel: null
        }
    },
    computed: {
        ...mapGetters(['currentChannel', 'currentUser'])
    },
    mounted() {
        this.addListeners()
    },
    watch: {
        currentChannel() {
            this.messages = []
            this.detachListeners()
            this.addListeners()

            this.channel = this.currentChannel
        }
    },
    methods: {
        addListeners() {
            if (this.currentChannel != null) {
                this.messagesRef.child(this.currentChannel.id).on('child_added', (snap) => {
                    const message = snap.val()
                    message.id = snap.key
                    this.messages.push(message)
                })
            }
        },
        detachListeners() {
            if (this.channel !== null) {
                this.messagesRef.child(this.channel.id).off('child_added')
            }
        }

    },
    beforeDestroy() {
        this.detachListeners()
    }
}
</script>

<style lang="css" scoped>
    .messages__container {
        position: relative;
        background-color: #2a2a2e;
        padding: 10px 30px 210px 30px;
        margin-left: 300px;
        min-height: 100%;
    }

    .messages__container .comments {
        font-size: 1.2em;
    }

    .list-enter-active {
        transition: all 0.3s;
    }

    .list-enter, .list-leave-to {
        opacity: 0;
        transform: translateX(30px);
    }

</style>
