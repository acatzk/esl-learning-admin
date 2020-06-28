<template>
    <div class="edit-profile">
        <v-col cols="12" sm="6" md="4">
            <v-text-field 
                label="Firstname" 
                autocomplete="off"
                prepend-inner-icon="mdi-account-outline"
            ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="4">
            <v-text-field 
                label="Middlename" 
                autocomplete="off" 
                prepend-inner-icon="mdi-account-outline"
            ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="4">
            <v-text-field 
                label="Lastname" 
                autocomplete="off"
                prepend-inner-icon="mdi-account-outline"
            ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
            <v-text-field 
                label="Company" 
                autocomplete="off"
                prepend-inner-icon="mdi-hospital-building"
            ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
            <v-text-field 
                label="Location" 
                autocomplete="off"
                prepend-inner-icon="mdi-map-marker-circle"
            ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
            <v-text-field 
                label="Website" 
                autocomplete="off"
                prepend-inner-icon="mdi-link"
            ></v-text-field>
        </v-col>
            <v-col cols="12" sm="6">
            <v-text-field 
                label="Twitter/username" 
                autocomplete="off"
                prepend-inner-icon="mdi-twitter"
            ></v-text-field>
        </v-col>
        <v-col cols="12">
            <v-textarea
                clearable
                clear-icon="mdi-close"
                label="Bio"
                autocomplete="off"
                prepend-inner-icon="mdi-paper-cut-vertical"
                rows="1"
            ></v-textarea>
        </v-col>
        <v-col cols="12">
            <v-btn  
                color="success"
                class="float-right"
            >
                Save
            </v-btn>
            <v-btn  
                class="float-right mr-2"
            >
                Cancel
            </v-btn>
        </v-col>
    </div>
</template>