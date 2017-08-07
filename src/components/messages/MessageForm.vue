<template lang="html">
  <div class="messages__form">
      <div class="ui inverted form">
          <div class="two fields">
              <div class="field">
                  <textarea name="message" id="message"
                  v-model.trim="message"
                  rows="3"
                  placeholder="Message"></textarea>
              </div>

              <div class="field">
                  <button class="ui green button" @click.prevent="sendMessage">Send</button>
                  <button class="ui labeled icon button" @click.prevent="openFileModal"
                      :class="{'disabled': uploadState == 'uploading'}">
                      <i class="cloud upload icon"></i>Upload
                  </button>
              </div>
          </div>
      </div>

      <!--  Process bar upload file -->
      <div class="ui small orange inverted progress" data-total="100" id="uploadedFile" v-if="uploadState != null">
          <div class="bar">
              <div class="progress">

              </div>
          </div>
          <div class="label">
              {{ uploadLabel }}
          </div>
      </div>
      <file-modal ref='file_modal'></file-modal>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import uuidV4 from 'uuid'
import { firebaseObj } from '../../config/firebaseConfig'
import FileModal from './FileModal'

export default {
    name: 'message-form',
    components: {
        FileModal
    },
    data() {
        return {
            message: '',
            errors: [],
            storageRef: firebaseObj.storage().ref(),
            uploadtask: null,
            uploadState: null
        }
    },
    computed: {
        ...mapGetters(['currentChannel', 'currentUser', 'isPrivate']),
        uploadLabel() {
            switch (this.uploadState) {
            case 'uploading':
                return 'Uploading...'
            case 'error':
                return 'Error...'
            case 'done':
                return 'Upload successfully'
            default:
                return ''
            }
        }
    },
    methods: {
        sendMessage() {
            if (this.currentChannel !== null) {
                if (this.message.length > 0) {
                    console.log('sendMessage', this.currentChannel.id)
                    this.$parent.getMessageRef().child(this.currentChannel.id).push()
                    .set(this.createMessage())
                    .then(() => {
                        console.log('success')
                    })
                    .catch((error) => {
                        console.error(error.message)
                        this.errors.push(error.message)
                    })
                }
            }
        },
        createMessage(fileUrl = null) {
            const message = {
                timestamp: firebaseObj.database.ServerValue.TIMESTAMP,
                user: {
                    name: this.currentUser.displayName,
                    avatar: this.currentUser.photoURL,
                    id: this.currentUser.uid
                }
            }
            if (fileUrl === null) {
                message.content = this.message
            } else {
                message.image = fileUrl
            }
            return message
        },
        uploadFile(file, metadata) {
            if (file === null) return false
            const pathToUpload = this.currentChannel.id
            const ref = this.$parent.getMessageRef()
            const filePath = this.getPath() + '/' + uuidV4() + '.jpg'

            // upload to Firebase storegae
            this.uploadTask = this.storageRef.child(filePath).put(file, metadata)
            this.uploadState = 'uploading'

            this.uploadTask.on('state_changed', (snap) => {
                // status
                const percent = (snap.bytesTransferred / snap.totalBytes) * 100
                $('#uploadedFile').progress('set percent', percent)
            }, (error) => {
                this.errors.push(error.message)
                this.uploadState = 'error'
                this.uploadTask = null
                // error
            }, () => {
                // finish
                this.uploadState = 'done'
                this.$refs.file_modal.resetForm()

                const fileUrl = this.uploadTask.snapshot.downloadURL
                this.sendFileMessage(fileUrl, ref, pathToUpload)
            })
            return true
        },
        sendFileMessage(fileUrl, ref, pathToUpload) {
            ref.child(pathToUpload).push().set(this.createMessage(fileUrl)).then(() => {
                this.$nextTick(() => {
                    /* global $ */
                    /* eslint no-undef: "error" */
                    $('html, body').scrollTop($(document).height())
                })
            })
            .catch((error) => {
                this.errors.push(error.message)
            })
        },
        openFileModal() {
            /* global $ */
            /* eslint no-undef: "error" */
            $('#fileModal').modal('show')
        },
        getPath() {
            if (this.isPrivate) {
                return 'tchat/private/' + this.currentChannel.id
            }
            return 'tchat/public'
        }
    },
    beforeDestroy() {
        if (this.uploadTask !== null) {
            this.uploadTask.cancel()
            this.uploadTask = null
        }
    }
}
</script>

<style lang="css" scoped>
    .messages__form {
        position: fixed;
        bottom: 0;
        background-color: #232323;
        padding: 10px;
        padding-top: 20px;
        height: 210px;
        left: 300px;
        right: 0;
    }

    .messages__form.big {
        height: 350px;
    }

    .shortcut {
        color: white;
    }


</style>
