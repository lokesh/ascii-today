<template>
  <div class="preview">
    <!-- <h2 class="preview__name">{{ fontName }}</h2> -->
    <pre class="preview__text" @click="selectText"></pre>
  </div>
</template>

<script>
import figlet from 'figlet';

export default {
  name: 'preview',
  props: ['text', 'fontName'],

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
      const previewText = this.$el.querySelector('.preview__text');

      figlet(this.text, this.fontName, function(err, text) {
        previewText.textContent = text;
      });
    }

  }
}


</script>

<style lang="sass" scoped>
.preview {
  margin-bottom: 32px;
}

.preview__name {
  margin: 0;
  font-size: 14px;
  text-transform: uppercase;
}

.preview__text {
  margin: 0;
  // max-width: 100%;
  // overflow: hidden;
  cursor: pointer;
  font-size: 12px;

  // &::selection {
  //   background-color: #a7541a;
  // }
}


</style>
