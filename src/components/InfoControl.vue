<template>
  <button :class="[
    'control',
    {'open': open}
  ]">
    <template v-if="open">Back</template>
    <template v-else>Info</template>
  </button>
</template>

<script>
  export default {
    name: 'info-control',
    props: ['open']
  }

</script>

<style scoped>
.control {
  box-sizing: content-box;
  width: 48px;
  height: 24px;
  line-height: 24px;
  padding: 0;
  text-align: center;
  background-color: var(--muted);
  font-family: var(--font-mono);
  cursor: pointer;
  outline: none;
  user-select:  none;
  border: none;
}
</style>
