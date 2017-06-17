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
  box-sizing: content-box;
  width: $info-control-width * 1.5;
  height: $info-control-height * 1.5;
  line-height: $info-control-height * 1.5;
  padding: 0;
  text-align: center;
  background-color: $color;
  font-family: $font-mono;
  cursor: pointer;
  outline: none;
  user-select:  none;
  border: none;
}

@media (min-width: 760px) {
  .control {
    width: $info-control-width;
    height: $info-control-height;
    line-height: $info-control-height;
  }
}


</style>
