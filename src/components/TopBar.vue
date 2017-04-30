<template>
  <div class="top-bar" @click="$refs.input.focus()">
    <textarea ref="input" :class="'input rows-' + rows" v-model="text" spellcheck="false" :rows="rows" autofocus></textarea>
  </div>
</template>

<script>
  export default {
    name: 'top-bar',
    props: ['initialText'],

    data: function() {
      return {
        text: '',
        rows: 1
      }
    },

    watch: {
      'text': function() {
        this.sizeInput();

        this.$emit('textChange', this.text);
      }
    },

    created() {
      this.text = this.initialText;
    },

    mounted() {
      document.addEventListener('keydown', this.onKeyDown);
    },

    destroyed() {
      document.removeEventListener('keydown', this.onKeyDown);
    },

    methods: {
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

      sizeInput() {
        let lines = this.text.split('\n').length;
        this.rows = (lines < 3) ? lines : 3;
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
  background-color: $color;
  cursor: text;
}

.input {
  width: 100%;
  color: $bg-color;
  background-color: transparent;
  text-align: center;
  border: 0;
  font-family: $font-mono;
  font-weight: bold;
  font-size: 32px;
  outline: none;
  resize: none;
  overflow: hidden;

  &:focus {
    background-color: $color;
  }

  &::selection {
    background-color: $select-color;
  }

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
