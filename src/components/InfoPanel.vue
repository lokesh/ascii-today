<template>
  <div class="info-panel">
    <div class="text">
<pre>
-----------------------
|       __  _ ___ ___ |
|  /\  (_  /   |   |  |
| /--\ __) \_ _|_ _|_ |
| ___                 |
|  |  _   _|  _.      |
|  | (_) (_| (_| \/   |
|                /    |
-----------------------</pre>

<p>A super-fast ASCII title generator. Add some fun to your code comments and
readmes.</p>

<p>By <a href="//lokeshdhakar.com">Lokesh Dhakar</a> - <a href="https://github.com/lokesh/ascii-today">Code on Github</a></p>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'info-panel'
  }
</script>

<style lang="sass" scoped>
@import '../sass/vars';

.info-panel {
  display: flex;
  justify-content: flex-end;
  padding: 20px;
  // color: $color;
  background-color: $color;
  font-family: $font-mono;
  font-size: 12px;

  pre {
    font-family: $font-mono;
    font-size: 14px;
  }
}

.text {
  max-width: 320px;
}


</style>
