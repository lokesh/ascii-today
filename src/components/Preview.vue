<template>
  <div class="preview">
    <h2 class="preview__name">{{ fontName }} by {{ fontAuthor }}</h2>
    <pre ref="text" class="preview__text" @click="selectText"></pre>

  </div>
</template>

<script>
import figlet from 'figlet';

export default {
  name: 'preview',
  props: ['text', 'fontName', 'fontAuthor'],

  watch: {
    text: function(newText) {
      this.generateText();
    }
  },

  mounted: function() {
    this.generateText();
  },

  methods: {
    selectText: function(event) {
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
    },

    generateText: function() {
      const previewText = this.$refs.text;

      figlet(this.text, this.fontName, function(err, text) {
        previewText.textContent = text;
      });
    }

  }
}


</script>

<style lang="sass" scoped>
@import '../sass/vars';

.preview {
  overflow: hidden;
  padding: 12px;
}

.preview__name {
  margin: 0 0 8px 0;
  font-size: 12px;
  font-family: $font-mono;
  font-weight: 400;
  color: $muted;
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
