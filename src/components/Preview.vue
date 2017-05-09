<template>
  <div class="preview" @click="selectText">
<pre class="clip-msg" v-if="wasRecentlyClicked">      __
     / / Copied
__  / /  to
\ \/ /   clipboard
 \__/    </pre>

    <div class="copy"></div>
    <h2 class="name">{{ fontName }} by {{ fontAuthor }}</h2>

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
    // .copy {
    //   display: block;
    // }
    cursor: pointer;
  }

  // &:active {
  //   background-color: lighten($bg-color, 15%);
  // }
}

.copy {
  display: none;
  position: absolute;
  top: 8px;
  right: 0;
  // background-color: #fcab4c;
  background-color: $muted;
  width: 24px;
  height: 24px;
  border-radius: 50%;
}

.name {
  color: $muted;
  font-family: $font-mono;
  font-weight: 500;
  font-size: 10px;
  text-transform: uppercase;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  margin: 0 0 8px 0;
}

.text {
  margin: 0;
  color: lighten($color, 4%);
  font-size: 12px;
  font-family: Menlo, $font-mono;
  line-height: 1.3em;
}

.clip-msg {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 140px;
  padding: 0 8px 8px 8px;
  margin: 0;
  color: $bg-color;
  font-size: 10px;
  background-color: $color;
  font-family: $font-mono;
  text-transform: uppercase;
  transform: translateX(-50%) translateY(-50%);
}

.clip-msg__check {
  margin: 0 0 8px 0;
}

.clip-msg__text {
  text-align: center;
}



</style>
