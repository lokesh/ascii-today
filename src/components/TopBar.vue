<template>
  <div class="top-bar" @click="$refs.input.focus()">
    <div ref="ruler" class="ruler"></div>
    <div ref="wrapper" class="input-wrapper">
      <div ref="caret" class="caret" v-show="!hasUserSelectedText"></div>
      <textarea
        ref="input"
        :class="'input rows-' + rows"
        v-model="text"
        spellcheck="false"
        autocomplete="off"
        autocorrect="off"
        autocapitalize="off"
        :rows="rows"
        autofocus
        @mouseup="onInputMouseUp"
      >
      </textarea>
    </div>
  </div>
</template>

<script>
  const fonts = new Map();

  fonts.set(1, {
      'font-size': '32px',
      'line-height': '34px',
    })
    .set(2, {
      'font-size': '24px',
      'line-height': '30px',
    })
    .set(3, {
      'font-size': '16px',
      'line-height': '20px',
    });

  export default {
    name: 'top-bar',
    props: ['initialText'],

    data: function() {
      return {
        text: '',
        rows: 1,
        lineLengths: [],
        rulerText: '',
        hasUserSelectedText: false,
      }
    },

    watch: {
      'text': function() {
        this.validateText(); // Max 3 lines allowed

        let lines = this.text.split('\n');
        this.lineLengths = lines.map( line => line.length );

        this.sizeInput();
        this.$emit('textChange', this.text);
      }
    },

    created() {
      this.text = this.initialText;
    },

    mounted() {
      this.measureChars();
      document.addEventListener('keydown', this.onKeyDown);
      document.addEventListener('keyup', this.onKeyUp);
    },

    destroyed() {
      document.removeEventListener('keydown', this.onKeyDown);
      document.removeEventListener('keydown', this.onKeyUp);
    },

    methods: {
      /*
      If the input doesn't have focus and the key that is pressed shows intent
      that the user is trying to manipulate the input, switch focus to the input
      before keyUp.
       */
      onKeyDown: function(event) {
        // Does the input already have focus?
        if (this.$refs.input === document.activeElement) return;

        // Is the cmd or ctrl key pressed?
        // The user could be doing a ctrl-c/cmd-c keyboard shortcut for copying.
        if (event.metaKey || event.ctrlKey) return;

        // If any of the following keys are pressed, switch focus to the input.
        // They key will register in the input on key up.
        if (
              (event.code === 'Backspace') ||
              (event.code === 'Enter') ||
              (event.code === 'ArrowUp') ||
              (event.code === 'ArrowDown') ||
              (event.code === 'ArrowLeft') ||
              (event.code === 'ArrowRight') ||
              (event.keyCode >= 48 && event.keyCode <= 57) || // Key was 0-9
              (event.keyCode >= 65 && event.keyCode <= 90)    // Key was a-z or A-Z
           ) {
          this.$refs.input.focus();
        }
      },

      onKeyUp: function(event) {
        this.updateCaretPosition();
      },

      /*
      If user made a text selection, hide the custom caret.
      The caret doesn't match the height of the selection rectangle so it looks bad.
       */
      onInputMouseUp() {
        const start = this.$refs.input.selectionStart;
        const end = this.$refs.input.selectionEnd;

        if (start !== end ) {
          this.hasUserSelectedText = true;
        } else {
          this.hasUserSelectedText = false;
        }
      },

      measureChars() {
        const $r = this.$refs.ruler;
        $r.style.display = 'block';

        for (let [key, value] of fonts) {
          $r.style.fontSize = value['font-size'];
          $r.style.lineHeight = value['line-height'];

          $r.innerHTML = '1234567890';

          value.charWidth = this.$refs.ruler.offsetWidth / 10;
          value.charHeight = this.$refs.ruler.offsetHeight;
        }

        $r.style.display = 'none';
      },

      sizeInput() {
        this.rows = (this.lineLengths.length < 3) ? this.lineLengths.length : 3;
      },

      /*
      Only allow three lines of text max.
      Because we are using a custom caret, supporting more lines requires more
      caret positioning logic and there is already plenty. Unlikely this is a
      common use case.
       */
      validateText() {
        let lines = this.text.split('\n');
        if (lines.length > 3) {
          this.$refs.wrapper.classList.remove('shake');

          this.$nextTick(function() {
            this.$refs.wrapper.classList.add('shake');
          })

          lines = lines.slice(0, 3);
          this.text = lines.join('\n');
        };
      },

      updateCaretPosition() {
        if (!this.$refs.input) return;

        const start = this.$refs.input.selectionStart;
        const end = this.$refs.input.selectionEnd;

        // If no selection
        if (start === end ) {
          this.hasUserSelectedText = false;

          let previousLineStart = 0;
          let previousLineLength = 0;
          let currentLineStart;
          let currentLineLength;
          let currentLineEnd;
          let caretLine;
          let caretLinePosition;

          for (let i = 0; i < this.lineLengths.length; i++) {
            // Note the + 1 for length. The available positions for the caret are one more than the
            // characters. Example using a four letter line with dots representing the possible
            // caret positions:
            // TEST
            // .T.E.S.T.
            currentLineStart = previousLineStart + previousLineLength;
            currentLineLength = this.lineLengths[i] + 1;
            currentLineEnd = currentLineStart + currentLineLength;

            if (start < currentLineEnd) {
              caretLine = i;
              caretLinePosition = start - currentLineStart;
              break;
            }

            previousLineStart = currentLineStart;
            previousLineLength = currentLineLength;
          }
          const $c = this.$refs.caret;

          let horizontalFix = 2;

          $c.style.top = caretLine * fonts.get(this.rows)['charHeight'] + 'px';
          $c.style.left = (caretLinePosition * fonts.get(this.rows)['charWidth']) + horizontalFix + 'px';
          $c.style.width = fonts.get(this.rows)['charWidth'] + 'px';
          $c.style.height = fonts.get(this.rows)['charHeight'] + 'px';

        } else {
          this.hasUserSelectedText = true;
        }
      }
    }
  }
</script>


<style lang="sass" scoped>
@import '../sass/vars';

.size-1 {
  font-size: 32px;
  line-height: 34px;
}

.size-2 {
  font-size: 24px;
  line-height: 30px;
}

.size-3 {
  font-size: 16px;
  line-height: 20px;
}

.input-wrapper {
  position: relative;
  width: 100%;

  &.shake {
    animation: shake 0.4s forwards;
  }
}

.ruler {
  display: none;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1000;
  background-color: $bg-color;
  font-family: Monaco, Consolas, Menlo, 'Lucida Console', $font-mono;
}

.caret {
  position: absolute;
  width: 19px;
  height: 36px;
  animation: blink 1.5s cubic-bezier(.215, .61, .355, 1) forwards infinite;
}

.top-bar {
  display: flex;
  align-items: center;
  position: fixed;
  z-index: 10;
  top: 0;
  right: 0;
  left: 0;
  height: $header-height;
  cursor: text;
  padding: 0 $gutter;
  background-color: $bg-color;
}

@media (max-width: 640px) {
  .top-bar {
    padding: 0 $gutter-mobile;
  }
}

.input {
  width: 100%;
  color: $color;
  background-color: transparent;
  border: 0;
  font-family: Monaco, Conasolas, Menlo, 'Lucida Console', $font-mono;
  font-size: 32px;
  outline: none;
  resize: none;
  overflow: hidden;
  caret-color: transparent;

  &.rows-1 {
    @extend .size-1;
  }

  &.rows-2 {
    @extend .size-2;
  }

  &.rows-3 {
    @extend .size-3;
  }
}

@keyframes shake {
  0 {
    transform: translateX(-25px)
  }
  10% {
    transform: translateX(25px)
  }
  20% {
    transform: translateX(-20px)
  }
  30% {
    transform: translateX(20px)
  }
  40% {
    transform: translateX(-15px)
  }
  50% {
    transform: translateX(15px)
  }
  60% {
    transform: translateX(-10px)
  }
  70% {
    transform: translateX(10px)
  }
  80% {
    transform: translateX(-5px)
  }
  90% {
    transform: translateX(5px)
  }
  100% {
    transform: translateX(0)
  }
}

@keyframes blink {
  0 {
    background-color: $bg-color;
  }
  50% {
    background-color: $caret-color;
  }
  100% {
    background-color: $bg-color;
  }
}

</style>
