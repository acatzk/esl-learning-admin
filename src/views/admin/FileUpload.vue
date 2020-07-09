<template>
  <div>
       <v-file-input
        :rules="rules"
        accept="image/png, image/jpeg, image/bmp"
        placeholder="Pick an avatar"
        prepend-icon="mdi-camera"
        @change="uploadImage"
        label="Avatar"
        :loading="loading"
    ></v-file-input>
  </div>
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
                    let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                }, (error) => {
                    // Handle unsuccessful uploads
                    toastAlertStatus('error', error)
                }, () => {
                    // Handle successful uploads on complete
                    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                    this.loading = false
                    uploadTask.snapshot.ref.getDownloadURL()
                        .then(downloadUrl => {
                            console.log('File available at: ', downloadUrl)
                            toastAlertStatus('success', `Uploaded ${downloadUrl}`)
                        })
                        .catch(error => toastAlertStatus('error', error))
            });
        }
    }
}
</script>