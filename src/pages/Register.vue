<template lang="html">
    <div class="ui middle aligned center aligned grid login__container">
      <div class="column">
        <h2 class="ui orange header">
          <div class="content">
            Register new account
          </div>
        </h2>
        <form class="ui large form">
          <div class="ui stacked segment">

            <div class="field">
              <div class="ui left icon input">
                <i class="user icon"></i>
                <input type="text" name="name" placeholder="Enter your name" v-model="name">
              </div>
            </div>

            <div class="field">
              <div class="ui left icon input">
                <i class="user icon"></i>
                <input type="email" name="email" placeholder="Enter your email" v-model="email">
              </div>
            </div>

            <div class="field">
              <div class="ui left icon input">
                <i class="lock icon"></i>
                <input type="password" name="password" placeholder="Password" v-model="password">
              </div>
            </div>

            <div class="field">
              <div class="ui left icon input">
                <i class="lock icon"></i>
                <input type="password" name="password_confirmation" placeholder="Password Confirmation" v-model="password_confirmation">
              </div>
            </div>

            <div class="ui fluid large orange button" @click.prevent="register">Register</div>
          </div>

          <div class="ui error message"></div>

        </form>

        <div class="ui message">
          Have an account? <router-link to="/login">Sign In</router-link>
        </div>
      </div>
    </div>
</template>

<script>
import { firebaseObj } from '../config/firebaseConfig'

export default {
    name: 'register',
    data() {
        return {
            name: '',
            email: '',
            password: '',
            password_confirmation: '',
        }
    },
    methods: {
        register() {
            console.log('Register Click')
            firebaseObj.auth().createUserWithEmailAndPassword(this.email, this.password)
            .then((user) => {
                console.log(`Register successfully  ${user.email}`)
            }).catch((error) => {
                console.error(error)
            })
        },
    },
}
</script>

<style lang="css" scoped>

.login__container {
    margin-top: 40px;
}

.column {
    max-width: 450px;
}

</style>
