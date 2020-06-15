<template>
    <div class="teachers">
        <header class="d-flex justify-space-between">
            <h3 class="d-inline-block">
                <v-icon>supervisor_account</v-icon> Teachers list
            </h3>
            <v-btn small depressed color="primary">
               <v-icon left>create_new_folder</v-icon> Add
            </v-btn>
        </header>

        <v-card flat>
            <v-text-field
                label="Search"
                v-model="search"
                filled
                class="mx-3"
                append-icon="search"
                dense
                rounded
                style="position: relative; top: 10px; border-radius: 50px;"
            ></v-text-field>
            <teachers-table 
                :items="teachers"
                :headers="headers"
                :search="search"
            />
        </v-card>
        
    </div>
</template>

<script>


export default {
    name: 'App',

    data() {
        return {
            teachers: [
                {
                "id": "1",
                "firstname": "Brigitte",
                "lastname": "Bardont",
                "email": "bb@example.com",
                "phone": "0143520987",
                "birth_date": "1991-08-06",
                "gender": "female",
                "is_active": true
                },
                {
                "id": "2",
                "firstname": "Gerald",
                "lastname": "Kleberth",
                "email": "gege208@example.com",
                "phone": "0109875432",
                "birth_date": "2001-01-03",
                "gender": "male",
                "is_active": false
                },
                {
                "id": "3",
                "firstname": "Amandine",
                "lastname": "Delalune",
                "email": "amandine@example.com",
                "phone": "0198653698",
                "birth_date": "1980-12-04",
                "gender": "female",
                "is_active": true
                },
                {
                "id": "4",
                "firstname": "Joséphine",
                "lastname": "Dupont",
                "email": "jdupont@example.com",
                "phone": "0190809879",
                "birth_date": "1956-10-10",
                "gender": "female",
                "is_active": true
                },
                {
                "id": "5",
                "firstname": "Mounir",
                "lastname": "Al estel",
                "email": "mounir@example.com",
                "phone": "0876543765",
                "birth_date": "1996-05-04",
                "gender": "male",
                "is_active": true
                },
                {
                "id": "6",
                "firstname": "Hans",
                "lastname": "Kleber",
                "email": "hans23@example.com",
                "phone": "0685939474",
                "birth_date": "1998-02-11",
                "gender": "male",
                "is_active": true
                },
                {
                "id": "7",
                "firstname": "Robert",
                "lastname": "Duvak",
                "email": "rober.ducak@example.com",
                "phone": "0765354369",
                "birth_date": "1995-06-03",
                "gender": "male",
                "is_active": true
                },
                {
                "id": "8",
                "firstname": "Isabelle",
                "lastname": "Champion",
                "email": "isa.beast@example.com",
                "phone": "04989403428",
                "birth_date": "2002-02-03",
                "gender": "female",
                "is_active": false
                },
                {
                "id": "9",
                "firstname": "Alberto",
                "lastname": "Tulador",
                "email": "alberto@example.com",
                "phone": "0134979438",
                "birth_date": "1993-11-10",
                "gender": "male",
                "is_active": false
                }
            ],
            search: '' 
        }
    },

    computed: {
        headers() {
            return [
                { text: 'Identity', value: 'firstname' },
                { text: 'Email', value: 'email' },
                { text: 'Contact', value: 'phone', sortable: false },
                { text: 'Gender', value: 'gender', sortable: false },
                { text: 'Status', value: 'is_active', sortable: false },
                { text: 'Options', value: 'id', sortable: false },
            ]
        }
    },

    components: {
        TeachersTable: () => import('@/components/pages/TeachersTable')
    },  

    methods: {
       
    }
}
</script>

<style scoped lang="scss">
.teachers {
    header {
        background: white;
        padding: 20px;
        border-bottom: 2px solid #eee;
        h3 {
            color: rgb(54, 54, 54);
        }
    }
    .v-btn-toggle {
        .v-btn {
            text-transform: capitalize;
        }
    }
}
</style>