<template>
  <div class="preview">
    <h2 class="preview__name">{{ fontName }} by {{ fontAuthor }}</h2>

    <pre v-if="loaded" ref="text" class="preview__text" @click="selectText">Loading...</pre>
    <spinner v-else />
  </div>
</template>

<script>
import figlet from 'figlet';
import Spinner from '../components/Spinner.vue';

export default {
  name: 'preview',

  components: {
    Spinner
  },

  props: ['text', 'fontName', 'fontAuthor'],

  data() {
    return {
      loaded: false,
    }
  },

  watch: {
    text: function(newText) {
      this.generateText();
    }
  },

  created() {
    figlet.defaults({fontPath: 'src/assets/fonts'});
  },

  mounted() {
    this.generateText();
  },

  methods: {
    generateText() {
      const previewText = this.$refs.text;

      figlet(this.text, this.fontName, function(err, text) {
        if (this.loaded) {
          this.updateText(text);
        } else {
          this.loaded = true;
          this.$nextTick(this.updateText.bind(this, text))
        }
      }.bind(this));
    },

    updateText(text) {
      this.$refs.text.textContent = text;
    },

    selectText(event) {
      // Text selection code taken from http://stackoverflow.com/a/987376/400407
      if (document.body.createTextRange) {
          let range = document.body.createTextRange();
          range.moveToElementText(event.target);
          range.select();
      } else if (window.getSelection) {
          let selection = window.getSelection();
          let range = document.createRange();
          range.selectNodeContents(event.target);
          selection.removeAllRanges();
          selection.addRange(range);
      }
      try {
        // copy text
        document.execCommand('copy');
        this.$emit('copied');
      }
      catch (err) {
        // alert('please press Ctrl/Cmd+C to copy');
      }

    }
  }
}


</script>

<style lang="sass" scoped>
@import '../sass/vars';

.preview {
  overflow: hidden;
  padding: 12px;
  // background-color: #272822;
}

.preview__name {
  margin: 0 0 8px 0;
  font-size: 10px;
  font-family: $font-mono;
  font-weight: 400;
  color: $muted;
  text-transform: uppercase;
  // display: none;
}

.preview__text {
  margin: 0;
  cursor: pointer;
  font-size: 12px;
  font-family: $font-mono;
  // &::selection {
  //   background-color: yellow;
  // }
}


</style>
