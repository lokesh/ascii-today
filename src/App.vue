<template>
  <div class="app">
    <textarea v-model="text" autofocus></textarea>
    <template v-for="font in fonts">
      <preview-debug :font-name="font.name" :font-height="font.height"  :text="text"></preview-debug>
    </template>
  </div>
</template>

<script>
import figlet from 'figlet';
import PreviewDebug from './components/PreviewDebug.vue';

export default {
  name: 'app',
  components: { PreviewDebug },
  created: onCreate,

  data: function() {
    return {
      text: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789!@#$%^&*()_+-={}[]|:";<>,.?/~`',
      fonts: [
        { name: '3D Diagonal', height: 20 },
        { name: 'Acrobatic', height: 12 },
        { name: 'Basic', height: 7 },
        { name: 'Standard', height: 7 },
        { name: 'Ghost', height: 10 },
      ]
    }
  }
}

function onCreate() {
  // Set font path and preload fonts
  figlet.defaults({fontPath: 'src/assets/fonts'});
  figlet.preloadFonts(['Standard', 'Ghost'], ready);
}

function ready() {
  console.log('preloaded!');
}

</script>

<style lang="sass" scoped>
</style>
