<template>
  <v-file-input
    :rules="rules"
    accept="image/png, image/jpeg, image/bmp"
    placeholder="Pick an avatar"
    prepend-icon="mdi-camera"
    @change="uploadImage"
    label="Avatar"
    :loading="loading"
  ></v-file-input>
</template>

<script>

import { fb } from '@/firebase'

import { toastAlertStatus } from '@/assets/js/toastAlert'

export default {
    data: () => ({
        rules: [
        value => !value || value.size < 2000000 || 'Avatar size should be less than 2 MB!',
        ],
        loading: false
    }),
    methods: {
        uploadImage (file) {
            if (!file) return;

            this.loading = true
            let storageRef = fb.storage().ref('admin-profiles/' + file.name)
            let uploadTask = storageRef.put(file)

            uploadTask.on('state_changed', (snapshot) => {
                uploadTask.snapshot.ref.getDownloadURL()
                    .then(downloadUrl => {
                        console.log('File available at: ', downloadUrl)
                        toastAlertStatus('success', `Uploaded`)
                        this.loading = false
                    })
            })
        }
    }
}
</script>