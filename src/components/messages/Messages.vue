<template lang="html">
    <div class="messages__container">
        <div class="messages__content">
            <h2 class="ui inverted channel_header">{{ channelName }}</h2>
            <div class="ui">
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
            privateMessagesRef: firebaseObj.database().ref('privateMessages'),
            messages: [],
            channel: null,
            listeners: []
        }
    },
    computed: {
        ...mapGetters(['currentChannel', 'currentUser', 'isPrivate']),
        channelName() {
            if (this.channel !== null) {
                return this.isPrivate ? '@' + this.channel.name : '#' + this.channel.name
            }
            return 'unknown'
        }
    },
    mounted() {
        this.addListeners()
    },
    watch: {
        currentChannel() {
            this.detachListeners()
            this.addListeners()

            this.channel = this.currentChannel
        }
    },
    methods: {
        addListeners() {
            const ref = this.getMessageRef()
            if (this.currentChannel != null) {
                ref.child(this.currentChannel.id).on('child_added', (snap) => {
                    const message = snap.val()
                    message.id = snap.key
                    this.messages.push(message)

                    this.$nextTick(() => {
                        /* global $ */
                        /* eslint no-undef: "error" */
                        $('html, body').scrollTop($(document).height())
                    })
                })

                this.addToListeners(this.currentChannel.id, ref, 'child_added')
            }
        },
        addToListeners(id, ref, event) {
            const index = this.listeners.findIndex(el => el.id === id &&
                    el.ref === ref && el.event === event)
            if (index === -1) {
                this.listeners.push({
                    id,
                    ref,
                    event
                })
            }
        },
        detachListeners() {
            this.listeners.forEach((listener) => {
                listener.ref.child(listener.id).off(listener.event)
            })

            this.listeners = []
            this.messages = []
            // const ref = this.getMessageRef()
            // if (this.channel !== null) {
            //     ref.child(this.channel.id).off('child_added')
            // }
        },
        getMessageRef() {
            if (this.isPrivate) {
                return this.privateMessagesRef
            }
            return this.messagesRef
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
    .channel_header {
        display: inline-block;
        padding: 0 .5rem 0 1.5rem;
        color: $color_scarpa_flow;
        font-size: 1.4rem;
        font-weight: 900;
        line-height: 53px;
        cursor: pointer;
    }

</style>
