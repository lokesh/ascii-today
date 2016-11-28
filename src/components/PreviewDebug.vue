<template>
  <div class="preview">

    <h2 class="preview__name">{{ fontName }} {{ fontHeight }}</h2>
    <textarea class="preview__text" readonly="readonly" @click="selectText" :style="{ height: fontHeight + 'em' }"></textarea>
  </div>
</template>

<script>
import figlet from 'figlet';

export default {
  name: 'preview-debug',
  props: ['text', 'fontName', 'fontHeight'],

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
     event.target.focus();
     event.target.select();
    },

    generateText: function() {
      const self = this;
      const previewTextarea = this.$el.querySelector('.preview__text');

      figlet(this.text, this.fontName, function(err, text) {
        previewTextarea.textContent = text;
        self.measureHeight();
      });
    },

    measureHeight: function() {
      const previewTextEl = this.$el.querySelector('.preview__text');
      const previewText = previewTextEl.textContent;
      const lineCount = previewText.split(/\r*\n/).length + 1;
      console.log(lineCount);
    }

  }
}


</script>

<style lang="sass" scoped>
h1 {
  display: none;
}

.preview {
  margin-bottom: 32px;
}

.preview__name {
  font-size: 14px;
  text-transform: uppercase;
}

.preview__text {
  width: 10000px;
  height: 40em;
  border: none;
  overflow: hidden;
  // resize: none;
  font-size: 10px;
  cursor: pointer;

  // &:active {
  //   background-color: yellow;
  // }

  // &:focus {
  //   background-color: red;
  // }

  &::selection {
    background: yellow;
  }
}


</style>
