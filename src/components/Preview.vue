<template>
  <div class="preview" @click="selectText">
<pre class="clip-msg" v-if="wasRecentlyClicked">      __
     / / Copied
__  / /  to
\ \/ /   clipboard
 \__/    </pre>

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
          this.updateText(text);
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
  padding: 20px;
  background-color: $bg-color;

  &:hover {
    background-color: lighten($bg-color, 15%);
    cursor: pointer;
  }

  &:active {
    background-color: lighten($bg-color, 30%);
  }
}

.name {
  margin: 0 0 8px 0;
  font-size: 10px;
  font-family: $font-mono;
  font-weight: 400;
  color: $muted;
  text-transform: uppercase;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  // display: none;
}

.text {
  margin: 0;
  color: $color;
  font-size: 12px;
  font-family: $font-mono;
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
