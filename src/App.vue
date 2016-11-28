<template>
  <div class="app">
    <textarea id="text" type="text" @input="onTextChange"></textarea>
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
      text: 'Hello There!',
      fonts: [
        { name: 'Standard' },
        { name: 'Ghost' },
      ]
    }
  },

  methods: {
    onTextChange: function(event) {
      this.text = event.target.value;
    }
  }
}

function onCreate() {
  // Set font path and preload fonts
  figlet.defaults({fontPath: "src/assets/fonts"});
  figlet.preloadFonts(["Standard", "Ghost"], ready);
}

function ready() {
  console.log('preloaded!');
}

</script>

<style lang="sass" scoped>
</style>
