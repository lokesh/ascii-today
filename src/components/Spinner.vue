<template>
  <div class="spinner"></div>
</template>

<script>
  export default {
    name: 'spinner'
  }
</script>

<style lang="sass" scoped>
@import '../sass/vars';

$spinner-list: ('⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏');

@keyframes spinner {
  @for $i from 1 through 10 {
    $number: $i * 10;
    $percent: $number + "%";
    #{$percent} {
      content: nth($spinner-list, $i);
    }
  }
}

.spinner {
  color: $muted;
  font-family: $font-mono;
  font-size: 24px;

  &::after {
    content: '⠋';
    animation: spinner 0.5s linear infinite;
  }
}

</style>
