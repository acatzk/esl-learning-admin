<template>
    <v-row justify="center">
        <v-dialog v-model="show" max-width="550px">
            <v-card>
                <v-card-title>
                    <span class="headline">
                        <v-icon left size="35">mdi-plus</v-icon> New Lesson
                    </span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                         <v-form 
                            :disabled="loading" 
                            ref="form"
                            v-model="valid"
                            lazy-validation
                        >
                            <v-row>
                                <v-col cols="12">
                                    <v-text-field
                                        label="Title"
                                        v-model="title"
                                        prepend-icon="mdi-file-document"
                                        :rules="[required('Title')]"
                                    />
                                </v-col>
                                <v-col cols="12">
                                    <v-textarea
                                        label="Description"
                                        rows="2"
                                        v-model="description"
                                        prepend-icon="mdi-image-filter-frames"
                                        hint="Optional"
                                    ></v-textarea>
                                </v-col>
                                <v-col cols="12">
                                    <v-text-field
                                        label="Price in peso"
                                        v-model="price"
                                        type="number"
                                        prepend-icon="mdi-currency-php"
                                        :rules="[required('Price')]"
                                    />
                                </v-col>
                                <v-col>
                                    <v-file-input
                                        v-model="files"
                                        counter
                                        label="Upload PDF File"
                                        multiple
                                        prepend-icon="mdi-file-pdf-box"
                                        :show-size="1000"
                                        :loading="false"
                                        accept="application/pdf"
                                        :rules="[required('PDF File')]"
                                    >
                                        <template v-slot:selection="{ index, text }">
                                        <v-chip
                                            v-if="index < 2"
                                            color="indigo darken-1"
                                            dark
                                            label
                                            small
                                        >
                                            {{ text }}
                                        </v-chip>

                                        <span
                                            v-else-if="index === 2"
                                            class="overline grey--text text--darken-3 mx-2"
                                        >
                                            +{{ files.length - 2 }} File(s)
                                        </span>
                                        </template>
                                    </v-file-input>
                                </v-col>
                            </v-row>
                        </v-form>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-btn 
                        text 
                        small
                        color="grey" 
                    >
                        <v-icon left>mdi-reload</v-icon> Reset
                    </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn color="indigo darken-1" text small @click="show = !show">
                        <v-icon left>mdi-close-circle-outline</v-icon> Close
                    </v-btn>
                    <v-btn 
                        color="indigo darken-1 white--text" 
                        small
                        depressed
                    >
                      <v-icon left>mdi-content-save</v-icon>  Save
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog> 
    </v-row>
</template>

<script>

export default {
    name: 'LessonDialog',

    props: ['visible'],

    data () {
        return {
            loading: false,
            date: null,
            valid: true,
            title: '',
            description: '',
            price: '',
            files: [],
            required(propertyType) { 
                return v => v && v.length > 0 || `${propertyType} is required.`
            }
        }
    },

    computed: {
        show: {
            get () {
                return this.visible
            },
            set (value) {
                if (!value) {
                    this.$emit('close')
                }
            }
        }
    }
}
</script>

<style scoped>
.v-btn {
  text-transform: capitalize;
}
</style>