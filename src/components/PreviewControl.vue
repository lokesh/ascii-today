<template>
  <div class="preview-control">
    <textarea ref="input" class="input" v-model="text" spellcheck="false" autofocus></textarea>
  </div>
</template>

<script>
  export default {
    name: 'preview',
    props: ['initialText'],

    data: function() {
      return {
        text: ''
      }
    },

    watch: {
      'text': function() {
        this.$emit('input', this.text);
      }
    },

    created() {
      this.text = this.initalText;
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

      }
    }
  }
</script>


<style lang="sass" scoped>
@import '../sass/vars';

.preview-control {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  height: $header-height;
}


.input {
  width: 100%;
  height: $header-height;
  padding: 4px;
  background-color: yellow;
  text-align: center;
  border: 0;
  border-bottom: 1px solid #eee;
  font-family: $font-mono;
  font-size: 24px;

  resize: none;
  overflow: hidden;
}
</style>
