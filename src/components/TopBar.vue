<template>
  <div class="top-bar" @click="$refs.input.focus()">
    <textarea ref="input" :class="'input rows-' + rows" v-model="text" spellcheck="false" autocomplete="off" autocorrect="off" autocapitalize="off" :rows="rows" autofocus></textarea>
  </div>
</template>

<script>
  export default {
    name: 'top-bar',
    props: ['initialText'],

    data: function() {
      return {
        text: '',
        rows: 1,
        lineLengths: []
      }
    },

    watch: {
      'text': function() {
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

      sizeInput() {
        this.rows = (this.lineLengths.length < 3) ? this.lineLengths.length : 3;
      },

      updateCaretPosition() {
        const start = this.$refs.input.selectionStart;
        const end = this.$refs.input.selectionEnd;

        if (start === end ) {
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
          console.log(caretLine + ':' + caretLinePosition);
        } else {
          console.log('selection');
        }
      }
    }
  }
</script>


<style lang="sass" scoped>
@import '../sass/vars';

.top-bar {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 10;
  top: 0;
  right: 0;
  left: 0;
  height: $header-height;
  cursor: text;
  padding-left: 16px;
  background-color: $bg-color;
  // border-bottom: 1px solid $border-color;
}

.input {
  width: 100%;
  padding-left: 16px;
  color: $color;
  background-color: transparent;
  border: 0;
  font-family: Monaco, $font-mono;
  font-size: 32px;
  outline: none;
  resize: none;
  overflow: hidden;

  // &:focus {
  //   background-color: $color;
  // }

  // &::selection {
  //   background-color: $select-color;
  // }

  &.rows-1 {
    font-size: 32px;
  }

  &.rows-2 {
    font-size: 24px
  }

  &.rows-3 {
    font-size: 16px;
  }
}
</style>
