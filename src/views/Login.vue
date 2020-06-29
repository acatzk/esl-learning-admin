<template>
  <v-app id="inspire">

    <alert 
      v-show="error"
      :text="capitalize(error.split('/')[1])"
      :textStyle="true"
    />

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
            <v-card class="elevation-12">
              <v-toolbar
                color="deep-purple darken-4"
                dark
                flat
              >
                <v-toolbar-title>Vic Solution Administrator</v-toolbar-title>
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
                    autofocus="autofocus"
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
                <v-spacer></v-spacer>
                <v-btn 
                  outlined 
                  color="deep-purple darken-4 white--text" 
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
  </v-app>
</template>

<script>

import { fb } from '@/firebase'

import { toastAlertStatus } from '@/assets/js/toastAlert'

export default {
  name: 'Login',

  components: {
    Alert: () => import('@/components/pages/Alert')
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
          return v => v && v.length > 0 || `${propertyType} is required.`
      },
      emailRules(propertyType) {
          return v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || `${propertyType} address must be valid.`
      },
      error: ''
    }
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
#inspire {
  background: #F6F7FB;
}

.v-btn {
  text-transform: capitalize;
}
</style>