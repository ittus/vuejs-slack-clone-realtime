<template lang="html">
    <div class="channels__container">
        <h2 class="ui inverted center aligned header"> Channels <i class="add square icon add_channel" @click="openChannelModal"></i></h2>
        <div class="ui raised padded segment channels__list">
            <ul>
                <li class="channels__item"
                    v-for="channel in channels"
                    :key="channel.id"
                    :class="{'is_active': setChannelActive(channel)}"
                    @click="changeChannel(channel)">
                    # {{ channel.name }}
                </li>
            </ul>
        </div>

        <!-- Modal -->
        <div class="ui basic modal" id="channelModal">
            <div class="ui icon header">
                Add new channel
            </div>

            <div class="content">
                <div class="ui inverted form" :class="{'error': hasErrors}">
                    <div class="field">
                        <label for="new_channel">Channel name</label>
                        <input type="text" name="new_channel" id="new_channel" v-model="new_channel">
                    </div>
                </div>

                <div class="ui error message" v-if="hasErrors">
                    <p v-for="error in errors">
                        {{ error }}
                    </p>
                </div>


            </div>

            <div class="actions">
                <div class="ui red basic cancel inverted button" >
                    <i class="remove icon"></i> Cancel
                </div>
                <div class="ui green inverted button" @click="addChannel">
                    <i class="checkmark icon"></i> Add
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { firebaseObj } from '../../config/firebaseConfig'

export default {
    name: 'channels',
    data() {
        return {
            new_channel: '',
            errors: [],
            channelsRef: firebaseObj.database().ref('channels'),
            channels: [],
            firstLoad: true
        }
    },
    computed: {
        ...mapGetters(['currentChannel']),
        hasErrors() {
            return this.errors.length > 0
        }
    },
    mounted() {
        this.addListeners()
    },
    methods: {
        addListeners() {
            this.channelsRef.on('child_added', (snap) => {
                this.channels.push(snap.val())

                if (this.firstLoad && this.channels.length > 0) {
                    this.$store.dispatch('setCurrentChannel', this.channels[0])
                }

                this.firstLoad = false
            })
        },
        openChannelModal() {
            /* global $ */
            /* eslint no-undef: "error" */
            $('#channelModal').modal('show')
        },
        addChannel() {
            const key = this.channelsRef.push().key

            const newChannel = { id: key, name: this.new_channel }
            this.channelsRef.child(key).update(newChannel).then(() => {
                this.new_channel = ''
                /* global $ */
                /* eslint no-undef: "error" */
                $('#channelModal').modal('hide')
            }).catch((error) => {
                this.errors.push(error.message)
            })
        },
        changeChannel(channel) {
            this.$store.dispatch('setCurrentChannel', channel)
        },
        detachListeners() {
            this.channelsRef.off()
        },
        setChannelActive(channel) {
            return channel.id === this.currentChannel.id
        }
    },
    beforeDestroy() {
        this.detachListeners()
    }
}
</script>

<style lang="css" scoped>
    .channels_list {
        min-height: 100px;
        max-height: 300px !important;
        overflow-y: auto !important;
    }

    .channels__container ul {
        margin: 0;
        padding: 0;
    }

    .channels__item {
        height: 30px;
        margin: 8px;
        list-style: none;
        background-color: #ca67ff;
        cursor: pointer;
        line-height: 30px;
        border-radius: 2px;
        padding-left: 12px;
        font-weight: bold;
        font-size: 1.1em;
    }

    .channel__count {
        float: right;
    }

    .is_active {
        background-color: #9740c5;
    }

    .channels__item:hover {
        background-color: #9740c5;
    }

    .add_channel {
        cursor: pointer;
        color: #8BC34A;
    }
    .add_channel:hover {
        color: #689F38;
    }
</style>
