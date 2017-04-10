<template>
  <div class="app">
    <div class="header">
      <textarea class="text-input" v-model="text" spellcheck="false" autofocus></textarea>
    </div>
    <section ref="previews" class="previews previews--cols-3">
      <template v-for="font in fonts">
        <preview :text="text" :font-name="font.name" :font-author="font.author"></preview>
      </template>
    </section>
  </div>
</template>

<script>
import figlet from 'figlet';
import Preview from './components/Preview.vue';

export default {
  name: 'app',

  components: {
    Preview
  },

  data: function() {
    return {
      text: 'Tester',
      // text: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789!@#$%^&*()_+-={}[]|:";<>,.?/~`',
      fonts: [
        {
          name: '3D Diagonal',
          author: 'nabis, LG Beard, Markus Gebhard and others'
        },
        {
          name: 'Basic',
          author: 'Craig O\'Flaherty'
        },
        { name: 'Standard',
          author: 'Glenn Chappell & Ian Chai'
        },
        {
          name: 'Ghost',
          author: 'myflix'
        },
        {
          name: 'Cola',
          author: 'MikeChat'
        }, // temp
        {
          name: 'Contessa',
          author: 'Christopher Joseph Pirillo'
        }, // temp
        { name: 'Cybermedium' }, // temp
        { name: 'Cyberlarge' }, // temp
        { name: '3D Diagonal' },
        { name: 'Acrobatic' }, // temp
        { name: 'Basic' },
        { name: 'Standard' },
        { name: 'Ghost' },
        { name: 'Cola' }, // temp
        { name: 'Contessa' }, // temp
        { name: 'Cybermedium' }, // temp
        { name: 'Cyberlarge' }, // temp
        { name: '3D Diagonal' },
        { name: 'Acrobatic' }, // temp
        { name: 'Basic' },
        { name: 'Standard' },
        { name: 'Ghost' },
        { name: 'Cola' }, // temp
        { name: 'Contessa' }, // temp
        { name: 'Cybermedium' }, // temp
        { name: 'Cyberlarge' }, // temp
        { name: '3D Diagonal' },
        { name: 'Acrobatic' }, // temp
        { name: 'Basic' },
        { name: 'Standard' },
        { name: 'Ghost' },
        { name: 'Cola' }, // temp
        { name: 'Contessa' }, // temp
        { name: 'Cybermedium' }, // temp
        { name: 'Cyberlarge' }, // temp
        { name: 'Basic' },
        { name: 'Standard' },
        { name: 'Ghost' },
        { name: 'Cola' }, // temp
        { name: 'Contessa' }, // temp
        { name: 'Cybermedium' }, // temp
        { name: 'Cyberlarge' }, // temp
        { name: '3D Diagonal' },
        { name: 'Acrobatic' }, // temp
        { name: 'Basic' },
        { name: 'Standard' },
        { name: 'Ghost' },
        { name: 'Cola' }, // temp
        { name: 'Contessa' }, // temp
        { name: 'Cybermedium' }, // temp
        { name: 'Cyberlarge' }, // temp
      ]
    }
  },

  created() {
  // Set font path and preload fonts
    figlet.defaults({fontPath: 'src/assets/fonts'});
    figlet.preloadFonts(['Standard', 'Ghost'], ready);
  },

  mounted() {
    // DEBUGGING CODE
    let vm = this;

    document.addEventListener('keypress', function(event) {
      if ([49, 50, 51, 52, 53].indexOf(event.keyCode) !== -1 ) {
        let c = vm.$refs.previews.classList;
        let a = [1, 2, 3, 4, 5].map(val => 'previews--cols-' + val)
        c.remove(...a);
        c.add('previews--cols-' + (parseInt(event.keyCode, 10) - 48));
      }
    })

  }
}

function ready() {
  console.log('preloaded!');
}

</script>

<style lang="sass" scoped>
@import '/sass/vars';

$header-height: 36px;

.app {
  padding-top: $header-height;
}

.header {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  height: $header-height;
}

.text-input {
  width: 100%;
  height: $header-height;
  padding: 4px;
  background-color: yellow;
  text-align: center;
  border: 0;
  border-bottom: 1px solid #eee;
  font-family: $font-mono;
  font-size: 24px;
  outline: none;
  resize: none;
  overflow: hidden;
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
}


</style>
