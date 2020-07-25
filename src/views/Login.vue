<template>
  <v-app :class="mode ? 'login' : 'darkness'">

    <v-app-bar
        absolute
        :color="mode ? 'indigo white--text' : ''"
        elevate-on-scroll
        :dark="mode ? false : true"
    >
        <v-toolbar-title >
            <router-link to="/" style="text-decoration: none; color: white;">
              Vic Solution Administrator
            </router-link>
        </v-toolbar-title>

        <v-spacer></v-spacer>

        <!-- Light and Dark mode -->
        <v-tooltip bottom>
            <template v-slot:activator="{ on }">
                    <v-btn 
                        fab 
                        icon
                        v-on="on"
                        @click.stop="$store.dispatch('darkMode')"
                        color="white"
                    >
                        <v-icon v-if="mode">mdi-lightbulb</v-icon>
                        <v-icon v-else>mdi-lightbulb-outline</v-icon>
                    </v-btn>
            </template>
            <span>{{ mode ? 'Dark' : 'Light' }}</span>
        </v-tooltip>

        <v-spacer></v-spacer>

        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn
              :href="source"
              class="white--text mr-2" 
              depressed 
              target="_blank"
              :color="mode ? 'indigo white--text' : ''"
              v-on="on"
            >
              <v-icon left class="white--text">mdi-web</v-icon> Main Page
            </v-btn>
          </template>
          <span>Goto Main Domain</span>
        </v-tooltip>

        <v-btn 
            class="white--text" 
            depressed 
            :color="mode ? 'indigo white--text' : ''"
            to="/login"
        >
            <v-icon left>mdi-login</v-icon> Login
        </v-btn>
    
    </v-app-bar>

    <v-main>

      <v-container
        class="fill-height"
        fluid
      >
        
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
            sm="8"
            md="4"
          >
            <v-card class="elevation-12" :dark="mode ? false : true">
              <v-toolbar
                :color="mode ? 'indigo' : ''"
                dark
                flat
              >
                <v-toolbar-title>Login Authentication</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-btn
                      :href="source"
                      icon
                      large
                      target="_blank"
                      v-on="on"
                    >
                      <v-icon>mdi-web</v-icon>
                    </v-btn>
                  </template>
                  <span>Goto Main Domain</span>
                </v-tooltip>
              </v-toolbar>

              <alert 
                v-show="error"
                :text="capitalize(error.split('/')[1])"
                :textStyle="true"
              />

              <v-card-text>
              
                <v-form
                  :disabled="loading" 
                  ref="form"
                  v-model="valid"
                  lazy-validation
                >
                  <v-text-field
                    label="Email"
                    prepend-icon="mdi-email-outline"
                    type="email"
                    :rules="[required('Email'), emailRules('Email')]"
                    v-model="email"
                    autocomplete="off"
                    @keyup.enter="loginAdminstrator"
                  ></v-text-field>

                  <v-text-field
                    label="Password"
                    prepend-icon="mdi-lock-outline"
                    v-model="password"
                    :type="show ? 'text' : 'password'"
                    :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append="show = !show"
                    :rules="[required('Password')]"
                    autocomplete="off"
                    @keyup.enter="loginAdminstrator"
                  ></v-text-field>
                </v-form>

              </v-card-text>
              <v-card-actions>
                
                <v-btn 
                  text 
                  color="grey"
                  @click="$refs.form.reset()" 
                >
                  <v-icon left>mdi-reload</v-icon> Reset
                </v-btn>

                <v-spacer></v-spacer>
                <v-btn 
                  outlined 
                  :color="mode ? 'deep-purple darken-4 white--text' : 'error'" 
                  depressed
                  text
                  @click="loginAdminstrator"
                  :loading="loading"
                >
                <v-icon left>mdi-security</v-icon> Login
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <foot-bar />
  </v-app>
</template>

<script>

import { fb } from '@/services'

import { mapState } from 'vuex'

import { toastAlertStatus, required, emailRules } from '@/utils'

export default {
  name: 'Login',

  components: {
    Alert: () => import('@/components/mixins/Alert'),
    FootBar: () => import('@/components/layouts/FootBar')
  },

  data () {
    return {
      source: 'https://victorsolutions.netlify.app/',
      email: '',
      password: '', 
      show: false,
      loading: false,
      valid: true,
      required(propertyType) { 
          return required(propertyType)
      },
      emailRules(propertyType) {
          return emailRules(propertyType)
      },
      error: ''
    }
  },

  computed: {
      ...mapState(['mode'])
  },

  methods: {
    loginAdminstrator () {
      if (this.$refs.form.validate()) {
        this.loading = true

        const { email, password } = this.$data

        fb.auth()
          .signInWithEmailAndPassword(email, password)
          .then(() => {
            this.loading = false
            this.$refs.form.reset()
            toastAlertStatus('success', 'Access Granted')
            this.$router.push('/admin/dashboard')
          })
          .catch(error => { 
            this.errorProvider(error)
            toastAlertStatus('error', error)
          })
      }
    },

    errorProvider(error) {
      this.loading = false
      let errorCode = error.code;
      let errorMessage = error.message;
      if (errorCode) {
          return this.error = errorCode
      } else if (errorMessage) {
          return this.error = errorMessage
      } else {
          return this.error = error
      }
    },

    capitalize(s) {
        if (typeof s !== 'string') return ''
        return s.charAt(0).toUpperCase() + s.slice(1)
    }
  }

}
</script>


<style scoped>
.login {
    background-color: #F6F7FB;
}

.darkness {
    background-color: rgb(31, 30, 30);
}

.v-btn {
  text-transform: capitalize;
}
</style>