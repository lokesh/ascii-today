<template>
  <div class="app">
    <textarea class="text-input" v-model="text" spellcheck="false" autofocus></textarea>
    <template v-for="font in fonts">
      <preview :font-name="font.name" :text="text"></preview>
    </template>
  </div>
</template>

<script>
import figlet from 'figlet';
import Preview from './components/Preview.vue';

export default {
  name: 'app',
  components: { Preview },
  created: onCreate,

  data: function() {
    return {
      text: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789!@#$%^&*()_+-={}[]|:";<>,.?/~`',
      fonts: [
        { name: '3D Diagonal' },
        { name: 'Basic' },
        { name: 'Standard' },
        { name: 'Ghost' },
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
.text-input {
  width: 100%;
}
</style>
