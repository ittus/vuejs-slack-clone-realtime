<template lang="html">
    <div class="comment comment__container">
        <a class="avatar">
            <img :src="message.user.avatar"/>
        </a>
        <div class="content" :class="{'comment__self': selfMessage(message.user)}">
            <a class="author">{{ message.user.name }}</a>
            <div class="metadata">
                <span class="date comment__date">{{ message.timestamp | fromNow }}</span>
            </div>
            <div class="text" v-if="!isFile(message)">
                {{ message.content }}
            </div>

            <img class="ui image content__image" :src="message.image" alt="image" v-else>
        </div>
    </div>
</template>

<script>
import moment from 'moment'
import { mapGetters } from 'vuex'

export default {
    name: 'single-message',
    props: ['message'],
    computed: {
        ...mapGetters(['currentUser'])
    },
    methods: {
        selfMessage(user) {
            return user.id === this.currentUser.uid
        },
        isFile(message) {
            return message.content == null && message.image != null
        }
    },
    filters: {
        fromNow(value) {
            return moment(value).fromNow()
        }
    }
}
</script>

<style lang="css">
    .comment__container pre {
        font-size: 0.9em;
        background: #232323;
        box-shadow: 3px 6px 9px 0px #a2a2a2;
    }

    .comment__self {
        border-left: 10px solid orange;
        padding-left: 8px;
    }

    .comment__image {
        min-height: 100px;
        margin-top: 16px;
    }

    .comment__date {
        color: #767676;
    }
</style>
