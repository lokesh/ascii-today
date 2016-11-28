<template>
  <div class="preview">
    <h2 class="preview__name">{{ fontName }}</h2>
    <textarea class="preview__text" readonly="readonly" @click="selectText"></textarea>
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
     event.target.focus();
     event.target.select();
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
  height: 10em;
  padding: 0;
  // overflow-y: hidden;
  // resize: none;
  font-size: 12px;
}


</style>
