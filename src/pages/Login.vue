<template lang="html">
    <div class="ui middle aligned center aligned grid login__container">
      <div class="column">
        <h2 class="ui orange header">
          <div class="content">
            Login
          </div>
        </h2>
        <form class="ui large form" :class="{ 'error': hasErrors}">
          <div class="ui stacked segment">

            <div class="field">
              <div class="ui left icon input">
                <i class="user icon"></i>
                <input type="email" name="email" placeholder="Enter your email" v-model.trim="email" required>
              </div>
            </div>

            <div class="field">
              <div class="ui left icon input">
                <i class="lock icon"></i>
                <input type="password" name="password" placeholder="Password" v-model.trim="password" required>
              </div>
            </div>

            <div class="ui fluid large orange button" @click.prevent="login" :class="{ 'loading': isLoading }">Sign in</div>
          </div>

          <div class="ui error message" v-if="hasErrors">
              <p v-for="error in errors"> {{ error }} </p>
          </div>

        </form>

        <div class="ui message">
          Don't have an account? <router-link to="/register">Register one</router-link>
        </div>
      </div>
    </div>
</template>

<script>
import { firebaseObj } from '../config/firebaseConfig'

export default {
    name: 'login',
    data() {
        return {
            email: '',
            password: '',
            errors: [],
            isLoading: false
        }
    },
    computed: {
        hasErrors() {
            return this.errors.length > 0
        }
    },
    methods: {
        login() {
            console.log('login')
            this.errors = []
            if (this.isFormValid()) {
                this.isLoading = true
                firebaseObj.auth().signInWithEmailAndPassword(this.email, this.password)
                .then((user) => {
                    this.$store.dispatch('setUser', user)
                    this.$router.push('/')
                }).catch((error) => {
                    this.errors.push(error.message)
                    this.isLoading = false
                })
            }
        },
        isFormValid() {
            if (this.email.length > 0 && this.password.length > 0) {
                return true
            }
            return false
        }
    }
}
</script>

<style scoped>
.login__container {
    margin-top: 40px;
}

.column {
    max-width: 450px;
}

</style>
