<template>
    <div class="profile elevation-0">
        <v-row class="d-flex">
            
            <v-col cols="12" sm="8">
                <v-card
                    class="elevation-1"
                    style="background: white;"
                >
                    <v-container>
                       <header class="elevation-0 d-flex justify-space-between">
                           <div class="d-inline">
                                <v-icon left>mdi-security</v-icon>
                                <span class="title" style="position: relative; top: 4px;">
                                   CEO <span class="font-weight-light hidden-sm-and-down">Profile</span>
                                </span>
                           </div>
                            <v-btn  
                                small
                                depressed
                                outlined
                                text
                                :color="editable === false ? 'primary white--text' : ''"
                                @click="editable = !editable"
                            >
                               <v-icon left v-show="editable === false">mdi-pencil</v-icon> 
                               <v-icon left v-show="editable === true">mdi-close</v-icon> 
                               {{ editable === false ? 'Edit Profile' : 'Cancel' }}
                            </v-btn>
                       </header>
                        
                        <edit-profile v-show="editable === true"/> <!-- Editable Profile view -->

                        <show-profile v-show="editable === false" /> <!-- Show Profile  -->
                        
                    </v-container>
                </v-card>
            </v-col>

            <v-col cols="12" sm="4">
                <v-card
                    class="elevation-1 text-center card-profile"
                >
                    <v-container>            
                        <v-badge
                            bordered
                            bottom
                            color="success"
                            dot
                            offset-x="25"
                            offset-y="25"
                        >
                            <v-avatar size="140px" class="elevation-2">
                                <img
                                    src="https://cdn.vuetifyjs.com/images/john.jpg"
                                    alt="John"
                                >
                            </v-avatar>
                        </v-badge>
                        <div class="content-profile mt-2">
                            <span class="company-name mb-2">CEO / CO-FOUNDER - VIC SOLUTION, INC.</span>
                            <div class="title mt-3 mb-3">VICTOR MAGTANGOL</div>
                            <div class="message overflow-y-auto text-justify" style="height: 40vh;">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste cum eligendi exercitationem dolorum nesciunt, ad quo. Perspiciatis, non illum. Explicabo aperiam odio labore
                            </div>
                        </div>
                    </v-container>
                </v-card>
            </v-col>

        </v-row>
    </div>
</template>

<script>
export default {
    name: 'Profile',

    data () {
        return {
            editable: false
        }
    },

    components: {
        ShowProfile: () => import('@/components/pages/profile/ShowProfile'),
        EditProfile: () => import('@/components/pages/profile/EditProfile')
    }
}
</script>

<style scoped lang="scss">

.card-profile {
    height: 79vh; 
    background: white;

    .company-name {
        font-size: 13px;
        color: grey;
    }

    .message {
        font-size: 15px;
        font-weight: lighter;
        color: grey;
    }

    .v-avatar {
        border: 3px solid  transparent;
        background: #f09433; 
        background: -moz-linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%); 
        background: -webkit-linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%); 
        background: linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%); 
        filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#f09433', endColorstr='#bc1888',GradientType=1 );
    }

}

.v-btn {
    text-transform: capitalize;
}

header {
    width: 90%;
    margin: auto;
    padding: 20px;
    position: relative;
    bottom: 20px;
    border-radius: 15px;
    background: #f1f8ff;
    border: 1px solid #c8e1ff;

    .title {
        color: rgb(66, 66, 66);
    }
    .business {
        color: rgb(66, 66, 66);
        font-style: italic;
    }
    .v-btn {
        text-transform: capitalize;
    }
}

</style>