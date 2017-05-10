<template>
  <div class="app">
      <info-panel class="info-panel" v-if="isInfoPanelOpen" />
      <info-control class="info-control" :open="isInfoPanelOpen" @click.native="toggleInfoPanel"></info-control>
      <top-bar ref="control" :initial-text="text" @textChange="onPreviewControlInput"></top-bar>

      <section v-if="text.length > 0" ref="previews" :class="['previews', 'previews--cols-' + colCount]">
        <template v-for="font in fonts">
          <div class="preview-wrapper">
            <preview :text="text" :font-name="font.name" :font-author="font.author"></preview>
          </div>
        </template>
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

      text: 'Bop',
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
      const padding = 32;     // Left padding of each column

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

  .preview-wrapper {
    padding: 0 0 $gutter $gutter;
  }

  .previews--cols-1 {
    .preview-wrapper {
      width: 100%;
    }
  }

  .previews--cols-2 {
    .preview-wrapper {
      width: 50%;
    }

    .preview-wrapper:nth-child(2n+1) {
    }

    .preview-wrapper:nth-child(2n) {
      padding-right: $gutter;
    }
  }

  .previews--cols-3 {
    .preview-wrapper {
      width: 33.3%;
    }

    .preview-wrapper:nth-child(3n) {
      padding-right: $gutter;
    }
  }

 .previews--cols-4 {
    .preview-wrapper {
      width: 25%;
    }

    .preview-wrapper:nth-child(4n) {
      padding-right: $gutter;
    }
  }

 .previews--cols-5 {
    .preview-wrapper {
      width: 20%;
    }

    .preview-wrapper:nth-child(5n) {
      padding-right: $gutter;
    }
  }

  .previews--cols-6 {
    .preview-wrapper {
      width: 16.6%;
    }

    .preview-wrapper:nth-child(6n) {
      padding-right: $gutter;
    }
  }

 .previews--cols-7 {
    .preview-wrapper {
      width: 14.2%;
    }

    .preview-wrapper:nth-child(7n) {
      padding-right: $gutter;
    }
  }

 .previews--cols-8 {
    .preview-wrapper {
      width: 12.5%;
    }

    .preview-wrapper:nth-child(8n) {
      padding-right: $gutter;
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
