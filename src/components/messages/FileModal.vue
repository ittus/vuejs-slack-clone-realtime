<template lang="html">
    <div class="ui modal" id="fileModal">
        <i class="close icon"></i>
        <div class="header">
            Upload file
        </div>
        <div class="content">
            <div class="description">
                <div class="ui header">
                    Choose a file <em>(jpg, png, 1mb max)</em>
                </div>
                <form class="ui form">
                    <div class="field">
                        <input type="file" name="file" id="file" @change="addFile">
                    </div>
                </form>
            </div>
        </div>

        <div class="actions">
            <div class="ui black deny button">
                Cancel
            </div>
            <div class="ui right green labeled icon button" @click.prevent="sendFile">
                Send
                <i class="checkmark icon"></i>
            </div>
        </div>
    </div>
</template>

<script>
import mime from 'mime-types'

export default {
    name: 'file-modal',
    data() {
        return {
            file: null,
            authorized: ['image/jpeg', 'image/png']
        }
    },
    methods: {
        addFile(e) {
            const files = e.target.files
            console.log(files)
            if (files.length === 1) {
                this.file = files[0]
            }
        },
        sendFile() {
            if (this.file !== null) {
                if (this.isValid(this.file.name)) {
                    const metadata = { contentType: mime.lookup(this.file.name) }
                    this.$parent.uploadFile(this.file, metadata)
                    /* global $ */
                    /* eslint no-undef: "error" */
                    $('#fileModal').modal('hide')
                }
            }
        },
        isValid(fileName) {
            const index = this.authorized.indexOf(mime.lookup(fileName))
            return index !== -1
        },
        resetForm() {
            /* global $ */
            /* eslint no-undef: "error" */
            $('.form').trigger('reset')
            this.file = null
            console.log('Reset form')
        }
    }
}
</script>

<style lang="css">
</style>
