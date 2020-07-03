<template>
    <div class="account-setting">
        <v-container>
            <form>
                <v-toolbar-title class="text-center ma-3 font-weight-medium grey--text">
                    Firebase Account Authentication
                </v-toolbar-title>
                <v-text-field
                    label="E-mail"
                    filled
                    v-model="email"
                    rounded
                ></v-text-field>
                <v-text-field
                    label="Password"
                    v-model="password"
                    filled
                    rounded
                ></v-text-field>
                <v-btn class="mr-4" color="primary white--text">
                   <v-icon left>mdi-pencil</v-icon> UPDATE</v-btn>
            </form>
        </v-container>
    </div>
</template>


<script>
export default {
    name: 'Account',

    data () {
        return {
            email: 'joshuaimalay@gmail.com',
            password: '1pLFxjNITScCFXRF9j3s7llf92j2'
        }
    }

}
</script>

<style scoped>
.account-setting {
    border-top: 1px solid #eee;
}
</style>