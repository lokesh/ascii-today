<template>
  <div class="preview" @click="selectText">
    <div class="meta">
      <h2 class="name meta-text">{{ fontName }} by {{ fontAuthor }}</h2>
      <div class="copied-msg meta-text" v-if="wasRecentlyClicked">Copied to clipboard</div>
      <div class="click-msg meta-text" v-else>Click to copy</div>
    </div>
    <pre v-if="loaded" ref="text" class="text">{{ generatedText }}</pre>
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
      analyticsClickEventSent: false,
      generatedText: '',
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
          // Trim trailing spaces
          this.updateText(text.replace(/\s+$/, ''));
        } else {
          this.loaded = true;
          this.$nextTick(this.updateText.bind(this, text))
        }
      }.bind(this));
    },

    updateText(text) {
      this.generatedText = text;
    },

    selectText() {
      if (this.wasRecentlyClicked) return;

      // GA event
      // Only send max once per ~session.
      if (!this.analyticsClickEventSent) {
        this.analyticsClickEventSent = true;
        ga('send', 'event', 'Font Preview', 'Click', this.fontName, 1);
      }

      this.wasRecentlyClicked = true;

      let clickTimeout = setTimeout(function() {
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
  height: 100%;
  padding-top: 8px;
  border-top: 2px solid $border-color;

  &:hover {
    cursor: pointer;
    border-top: 2px solid white;

    .name {
      display: none;
    }

    .click-msg {
      display: block;
    }
    .copied-msg {
      display: block;
    }

  }
}

.copy {
  display: none;
  position: absolute;
  top: 8px;
  right: 0;
  background-color: $muted;
  width: 24px;
  height: 24px;
  border-radius: 50%;
}

.meta {
  color: $muted;
  font-family: $font-mono;
  margin: 0 0 8px 0;
}

.meta-text {
  font-weight: 500;
  font-size: 10px;
  text-transform: uppercase;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.name {
  margin: 0;
}

.click-msg {
  display: none;
  color: white;
}

.copied-msg {
  display: none;
  color: white;
}

.text {
  margin: 0;
  color: $preview-color;
  font-size: 12px;
  font-family: Menlo, $font-mono;
  line-height: 1.3em;
}
</style>
