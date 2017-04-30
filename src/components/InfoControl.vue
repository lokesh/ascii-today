<template>
  <button :class="[
    'control',
    {'open': open}
  ]">
    <template v-if="open">X</template>
    <template v-else>I</template>
  </button>
</template>

<script>
  export default {
    name: 'info-control',
    props: ['open']
  }

</script>

<style lang="sass" scoped>
@import '../sass/vars';

.control {
  width: $info-control-width;
  height: $info-control-height;
  background-color: $color;
  border: 2px solid $border-color;
  font-family: $font-mono;
  cursor: pointer;
  outline: none;

  // &.open {
  //   color: $color;
  //   background-color: $bg-color;
  // }
}


</style>
