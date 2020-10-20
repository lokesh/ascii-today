<template>
  <div class="spinner"></div>
</template>

<script>
  export default {
    name: 'spinner'
  }
</script>

<style scoped>
@keyframes spinner {
  10% { content: '⠋'; }
  20% { content: '⠙'; }
  30% { content: '⠹'; }
  40% { content: '⠸'; }
  50% { content: '⠼'; }
  60% { content: '⠴'; }
  70% { content: '⠦'; }
  80% { content: '⠧'; }
  90% { content: '⠇'; }
  100% { content: '⠏'; }
}
.spinner {
  color: var(--muted);
  font-family: var(--font-mono);
  font-size: 24px;
}

.spinner::after {
  content: '⠋';
  animation: spinner 0.5s linear infinite;
}
</style>
