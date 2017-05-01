<template>
  <div class="app">
      <info-panel class="info-panel" v-if="isInfoPanelOpen" />
      <info-control class="info-control" :open="isInfoPanelOpen" @click.native="toggleInfoPanel"></info-control>
      <top-bar ref="control" :initial-text="text" @textChange="onPreviewControlInput"></top-bar>

      <section v-if="text.length > 0" ref="previews" :class="['previews', 'previews--cols-' + colCount]">
          <preview v-for="font in fonts" :text="text" :font-name="font.name" :font-author="font.author"></preview>
      </section>
      <template v-else>
        <empty-state></empty-state>
      </template>
  </div>
</template>

<script>
import figlet from 'figlet';
import {fonts as fontList} from './data/fonts.json';
import EmptyState from './components/EmptyState.vue';
import InfoControl from './components/InfoControl.vue';
import InfoPanel from './components/InfoPanel.vue';
import Preview from './components/Preview.vue';
import TopBar from './components/TopBar.vue';

const fontListFiltered = fontList.filter(font => !font.hidden);

export default {
  name: 'app',

  components: {
    EmptyState,
    InfoControl,
    InfoPanel,
    Preview,
    TopBar
  },

  data() {
    return {
      colCount: '3',
      fonts: fontListFiltered,
      isInfoPanelOpen: false,

      text: '',
      // text: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789!@#$%^&*()_+-={}[]|:";<>,.?/~`',
      windowWidth: '',
    }
  },

  watch: {
    text: function(val) {
      this.updateCols();
    }
  },

  mounted() {
    window.addEventListener('resize', this.updateCols);

    // Preload fonts
    const fontNames = this.fonts.map(font => font.name)
    figlet.defaults({fontPath: 'src/assets/fonts'});
    figlet.preloadFonts(fontNames);
  },

  destroyed() {
    window.removeEventListener('resize', this.updateCols);
  },

  methods: {
    updateCols() {
      this.windowWidth = document.documentElement.clientWidth;

      const maxCols = 8;
      const letterWidth = 60; // ~width of a single ascii styled letter
      const padding = 20;     // Left padding of each column

      // Length of the longest line in the textarea
      let longestLine = 0;
      const lines = this.text.split('\n');
      for (let line of lines) {
        if (line.length > longestLine) {
          longestLine = line.length;
        }
      }

      let previewWidth = (longestLine * letterWidth) + padding;

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

    toggleInfoPanel() {
      this.isInfoPanelOpen = !this.isInfoPanelOpen;

      // GA event
      let gaEventLabel = this.isInfoPanelOpen ? 'Open': 'Close';
      ga('send', 'event', 'Info Control', gaEventLabel);
    }
  }
}
</script>

<style lang="sass">
@import './sass/vars';

* {
  box-sizing: border-box;
}

::selection {
  background-color: $select-color;
}

a {
  color: $link-color;
}

</style>



<style lang="sass" scoped>
@import '/sass/vars';

.app {
  padding-top: $header-height;

  .info-panel {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 20;
  }

  .previews {
    display: flex;
    flex-wrap: wrap;
  }

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

.empty-state {
  text-align: center;
  color: white;
  font-family: $font-mono;
}

.info-control {
  position: fixed;
  left: 20px;
  bottom: 20px;
  z-index: 30;
  font-weight: bold;
}

@media (min-width: 760px) {
  .info-control {
    top: ($header-height / 2) - ($info-control-height / 2);
    right: ($header-height / 2) - ($info-control-width / 2);
    bottom: auto;
    left: auto;
  }
}

</style>
