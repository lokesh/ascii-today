<template>
  <div class="info-panel">
    <div class="text">
<pre class="title">
-----------------------
|       __  _ ___ ___ |
|  /\  (_  /   |   |  |
| /--\ __) \_ _|_ _|_ |
| ___                 |
|  |  _   _|  _.    | |
|  | (_) (_| (_| \/ o |
|                /    |
-----------------------</pre>

<p>A super-fast ASCII title generator.</p>
<p>Spruce up your code comments and readmes. Have fun!</p>

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
  justify-content: flex-start;
  align-items: flex-end;
  padding: 20px 20px 70px 20px;
  color: $color;
  background-color: $bg-color;
  font-family: $font-mono;
  font-size: 12px;

  pre {
    font-family: $font-mono;
    font-size: 16px;
  }
}

.text {
  max-width: 320px;
}

.title {
  font-weight: bold;
}


@media (min-width: 760px) {
  .info-panel {
    justify-content: flex-end;
    align-items: flex-start;
    padding: 20px;
  }
}


</style>
