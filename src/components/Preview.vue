<template>
  <div class="preview" @click="selectText">
    <div :class="[
        'copied-msg',
        {'open': wasRecentlyClicked}
      ]">
      Copied to clipboard
    </div>
    <h2 class="name">{{ fontName }} by {{ fontAuthor }}</h2>

    <pre v-if="loaded" ref="text" class="text"></pre>
    <spinner v-else />
  </div>
</template>

<script>
import figlet from 'figlet';
import TextSelection from '../utils/TextSelection';
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
      wasRecentlyClicked: false
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

    selectText() {
      if (this.wasRecentlyClicked) return;

      this.wasRecentlyClicked = true;
      setTimeout(function() {
        this.wasRecentlyClicked = false;
      }.bind(this), 1200)

      TextSelection.select(this.$refs.text);

      try {
        // copy text
        document.execCommand('copy');
        TextSelection.deselect()
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
  position: relative;
  overflow: hidden;
  padding: 20px;
  background-color: $bg-color;

  &:hover {
    background-color: lighten($bg-color, 5%);
    cursor: pointer;
  }

  &:active {
    color: $bg-color;
    background-color: $color;

    .text {
      color: $bg-color;
    }

    .name {
      color: $bg-color;
    }
  }
}

.name {
  margin: 0 0 8px 0;
  font-size: 10px;
  font-family: $font-mono;
  font-weight: 400;
  color: $muted;
  text-transform: uppercase;
  // display: none;
}

.text {
  margin: 0;
  color: $color;
  font-size: 12px;
  font-family: $font-mono;

  &::selection {
    background-color: $red;
  }
}

.copied-msg {
  position: absolute;
  top: -25%;
  left: 50%;
  width: 90px;
  padding: 8px;
  color: $bg-color;
  font-size: 12px;
  background-color: $color;
  font-family: $font-mono;
  text-align: center;
  text-transform: uppercase;
  transform: translateX(-50%) translateY(-50%);
  transition: transform 0.2s cubic-bezier(0.17, 0.67, 0.18, 0.96);

  &.open {
    transform: translateX(-50%) translateY(100px);
  }
}

</style>
