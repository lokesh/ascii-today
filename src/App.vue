<template>
  <div class="app">

    <preview-control ref="control" :initial-text="text" @input="onPreviewControlInput"></preview-control>

    <section ref="previews" :class="['previews', 'previews--cols-' + colCount]">
        <preview v-for="font in fonts" :text="text" :font-name="font.name" :font-author="font.author"></preview>
    </section>

  </div>
</template>

<script>
import {fonts as fontList} from './data/fonts.json';
import Preview from './components/Preview.vue';
import PreviewControl from './components/PreviewControl.vue';

let fontListFiltered = fontList.filter( function(font) {
  return !font.hidden;
});

export default {
  name: 'app',

  components: {
    Preview,
    PreviewControl
  },

  data() {
    return {
      windowWidth: '',
      text: 'Button',
      // text: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789!@#$%^&*()_+-={}[]|:";<>,.?/~`',
      colCount: '3',
      fonts: fontListFiltered
    }
  },

  watch: {
    text: function(val) {
      this.updateCols();
    }
  },

  mounted() {
    this.updateCols();
    window.addEventListener('resize', this.updateCols);
  },

  destroyed() {
    window.removeEventListener('resize', this.updateCols);
  },

  methods: {
    updateCols() {
      this.windowWidth = document.documentElement.clientWidth;
      this.text.length ;

      const maxCols = 8;
      const letterWidth = 60; // ~width of a single ascii styled letter
      const padding = 20;     // Left padding of each column
      let previewWidth = (this.text.length * letterWidth) + padding;

      // Using an approximate width of a preview, calc how many columns fit in the window.
      // Limit column count between 1 and maxCols.
      this.colCount = Math.floor(this.windowWidth / previewWidth);
      this.colCount = Math.max(Math.min(this.colCount, maxCols), 1);
    },

    onPreviewControlInput(val) {
      if (typeof val !== 'undefined') {
        this.text = val;
      }
    },
  }
}

function ready() {
  console.log('preloaded!');
}

</script>

<style lang="sass" scoped>
@import '/sass/vars';

.app {
  padding-top: $header-height;
  background-color: $bg-color;
}

.previews {
  display: flex;
  flex-wrap: wrap;
}

.app {

  .previews {}

  .preview {
    border-right: $border;
    border-bottom: $border;
  }

  .previews--cols-1 {
    .preview {
      width: 100%;
    }
  }

  .previews--cols-2 {
    .preview {
      width: 50%;
    }

    .preview:nth-child(2n+1) {

    }

    .preview:nth-child(2n) {
      border-right: 0;
    }
  }

  .previews--cols-3 {
    .preview {
      width: 33.3%;
    }

    .preview:nth-child(3n) {
      border-right: 0;
    }
  }

 .previews--cols-4 {
    .preview {
      width: 25%;
    }

    .preview:nth-child(4n) {
      border-right: 0;
    }
  }

 .previews--cols-5 {
    .preview {
      width: 20%;
    }

    .preview:nth-child(5n) {
      border-right: 0;
    }
  }

  .previews--cols-6 {
    .preview {
      width: 16.6%;
    }

    .preview:nth-child(6n) {
      border-right: 0;
    }
  }

 .previews--cols-7 {
    .preview {
      width: 14.2%;
    }

    .preview:nth-child(7n) {
      border-right: 0;
    }
  }

 .previews--cols-8 {
    .preview {
      width: 12.5%;
    }

    .preview:nth-child(8n) {
      border-right: 0;
    }
  }
}


</style>
