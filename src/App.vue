<template>
  <div class="app">
      <info-panel class="info-panel" v-if="isInfoPanelOpen" />
      <info-control class="info-control" :open="isInfoPanelOpen" @click.native="toggleInfoPanel"></info-control>
      <top-bar ref="control" :initial-text="text" @textChange="onPreviewControlInput"></top-bar>

      <section
        v-if="text.length > 0"
        ref="previews"
        class="previews"
        :style="`grid-template-columns: repeat(${colCount}, 1fr)`"
      >
        <template v-for="font in fonts">
          <div class="preview-wrapper">
            <preview :text="text" :font-name="font.name" :font-author="font.author"></preview>
          </div>
        </template>
      </section>
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

<style>
:root {
  /* Fonts */
  --font-sans: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  --font-mono: "Roboto Mono", "SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace;

  /* Colors */

  --yellow: yellow;
  --cyan: #45ffff;
  --magenta: #ff3dff;
  --green: #0f0;
  --dark-blue: #1900c1;


  --lime-green: #b2ff59;
  --green: #00e676;

  --red: #ff5f50;

  /* Dark theme */
  --color: #ECEEFA;
  --muted: #636773;
  --bg-color: #222;
  --border-color: var(--muted);

  --link-color: var(--yellow);

  --select-color: var(--bg-color);
  --select-bg-color: var(--yellow);

  --caret-color: var(--yellow);
  --preview-color: var(--color);

  /* Layout */
  --header-height: 64px;
  --info-control-height: 24px;
  --info-control-width: 36px;

  --gutter: 8px;
}

@media (min-width: 640px) {
  :root {
      --gutter: 16px;
      --header-height: 96px;
  }
}

* {
  box-sizing: border-box;
}

::selection {
  color: var(--select-color);
  background-color: var(--select-bg-color);
}

a {
  color: var(--link-color);
}

</style>



<style scoped>
.app {
  padding-top: var(--header-height);
}

.info-panel {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 20;
}

.previews {
  display: grid;
  grid-gap: var(--gutter);
  padding: 0 var(--gutter);
}

.preview-wrapper {
  overflow-x: hidden;
}

.empty-state {
  text-align: center;
  color: white;
  font-family: var(--font-mono);
}

.info-control {
  position: fixed;
  top: var(--gutter);
  right: var(--gutter);
  z-index: 30;
  font-weight: bold;
}
</style>
