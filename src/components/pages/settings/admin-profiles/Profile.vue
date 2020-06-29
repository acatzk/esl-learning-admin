<template>
    <div class="profile-setting">
        <header class="d-flex justify-space-between">
            <v-toolbar-title>
                <v-icon right>mdi-account-box</v-icon> Administrator Settings
            </v-toolbar-title>
            <v-btn small depressed color="primary" @click.stop="dialog = true">
               <v-icon left>mdi-plus</v-icon> Add
            </v-btn>   
        </header>

        <v-card flat>
            <!-- ** SEARCH TEXT FIELD ** -->
            <v-text-field
                label="Search"
                filled
                class="mx-3"
                append-icon="search"
                dense
                rounded
                style="position: relative; top: 12px; border-radius: 50px;"
            ></v-text-field>
        </v-card>
    </div>
</template>

<style scoped lang="scss">
.profile-setting {
    background: white;
    border: 1px solid #eee;
}
.profile-setting {
    header {
        padding: 15px;
        border-bottom: 1px solid #eee;
    }
    .v-btn-toggle {
        .v-btn {
            text-transform: capitalize;
        }
    }
}
</style>