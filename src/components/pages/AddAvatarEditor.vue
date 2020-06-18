<template>
  <div>
    <vue-avatar
      :width='width'
      :height='height'
      :rotation="rotation"
      :borderRadius="borderRadius"
      :border='border'
      :color='color'
      :scale="scale"
      ref="vueavatar"
      @vue-avatar-editor:image-ready="onImageReady"
      @select-file="onSelectFile($event)"
      >
    </vue-avatar>
    <br>
    <label v-if="hasScale">
      Zoom : {{scale}}x
      <br>
      <input
        type="range"
        min=1
        max=3
        step=0.02
        v-model='scale'
      />
    </label>
    <br>
    <label v-if="hasRotation">
      Rotation : {{rotation}}°
      <br>
      <input
        type="range"
        min=0
        max=360
        step=1
        v-model='rotation'
      />
    </label>
    <br>
    <button @click="finished">{{ finishText }}</button>
  </div>
</template>

<script>
import VueAvatar from './AddAvatar';

export default {
    props: {
        finishText: {
            type: String,
            default: 'Save'
        },
        hasRotation: {
            type: Boolean,
            default: true
        },
        hasScale: {
            type: Boolean,
            default: true
        },
        image: {
            type: String,
            default: ''
        },
        border: {
            type: Number,
            default: 25
        },
        borderRadius: {
            type: Number,
            default: 0
        },
        width: {
            type: Number,
            default: 200
        },
        height: {
            type: Number,
            default: 200
        },
        color: {
            type: Array,
            default: () => [0, 0, 0, 0.5]
        }
    },
    data () {
        return {
            rotation: 0,
            scale: 1
        };
    },
    components: {
        VueAvatar
    },
    methods: {
        onSelectFile (files) {
            this.$emit('select-file', files);
        },
        onImageReady () {
            this.scale = 1;
            this.rotation = 0;
        },
        finished () {
            return this.$emit('finished', this.$refs.vueavatar.getImageScaled());
        }
    }
};

</script>
