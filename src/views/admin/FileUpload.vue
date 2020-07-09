<template>
  <v-file-input
    :rules="rules"
    accept="image/png, image/jpeg, image/bmp"
    placeholder="Pick an avatar"
    prepend-icon="mdi-camera"
    @change="uploadImage"
    label="Avatar"
  ></v-file-input>
</template>

<script>

import { fb } from '@/firebase'

export default {
    data: () => ({
        rules: [
        value => !value || value.size < 2000000 || 'Avatar size should be less than 2 MB!',
        ],
    }),
    methods: {
        uploadImage (file) {
            let storageRef = fb.storage().ref('admin-profiles/' + file.name)
            storageRef.put(file)
        }
    }
}
</script>