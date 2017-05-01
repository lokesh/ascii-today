/*
This component is not used at this time.
 */
<template>
<div :class="[
        'clipboard-message',
         {'is-animating': animating}
      ]">

<pre class="frame" v-if="frame === 0">

__

     </pre>
<pre class="frame" v-if="frame === 1">

__
\ \
  </pre>
<pre class="frame" v-if="frame === 2">

__
\ \
 \</pre>
<pre class="frame" v-if="frame === 3">

__
\ \
 \__</pre>
<pre class="frame" v-if="frame === 4">

__
\ \
 \__/</pre>
<pre class="frame" v-if="frame === 5">

__
\ \/ /
 \__/</pre>
<pre class="frame" v-if="frame === 6">

__  / /
\ \/ /
 \__/</pre>
<pre class="frame" v-if="frame === 7">
     / /
__  / /
\ \/ /
 \__/</pre>
<pre class="frame" v-if="frame === 8">      __
     / /
__  / /
\ \/ /
 \__/</pre>
<pre class="frame" v-if="frame === 9">      __
     / / Copied
__  / /
\ \/ /
 \__/</pre>
<pre class="frame" v-if="frame === 10">      __
     / / Copied
__  / /  to
\ \/ /
 \__/</pre>
<pre class="frame" v-if="frame === 11">      __
     / / Copied
__  / /  to
\ \/ /   clipboard
 \__/</pre>
<pre class="frame" v-if="frame === 12">      __
     / / Copied
__  / /  to
\ \/ /   clipboard
 \__/</pre>
<pre class="frame" v-if="frame === 13">      __
     / / Copied
__  / /  to
\ \/ /   clipboard
 \__/</pre>
<pre class="frame" v-if="frame === 14">      __
     / / Copied
__  / /  to
\ \/ /   clipboard
 \__/</pre>
<pre class="frame" v-if="frame === 15">      __
     / / Copied
__  / /  to
\ \/ /   clipboard
 \__/</pre>
<pre class="frame" v-if="frame === 16">      __
     / / Copied
__  / /  to
\ \/ /   clipboard
 \__/</pre>
<pre class="frame" v-if="frame === 17">      __
     / / Copied
__  / /  to
\ \/ /   clipboard
 \__/</pre>
<pre class="frame" v-if="frame === 18">      __
     / / Copied
__  / /  to
\ \/ /   clipboard
 \__/</pre>
<pre class="frame" v-if="frame === 19">      __
     / / Copied
__  / /  to
\ \/ /   clipboard
 \__/</pre>
<pre class="frame" v-if="frame === 20">      __
     / / Copied
__  / /  to
\ \/ /   clipboard
 \__/</pre>

<pre class="frame" v-if="frame === 21">      __
     / / Copied
    / /  to
\ \/ /   clipboard
 \__/</pre>
<pre class="frame" v-if="frame === 22">      __
     / / Copied
    / /  to
   / /   clipboard
 \__/</pre>
<pre class="frame" v-if="frame === 23">      __
     / / Copied
    / /  to
   / /   clipboard
  __/</pre>
<pre class="frame" v-if="frame === 24">      __
     / / Copied
    / /  to
   / /   clipboard
  __/</pre>
<pre class="frame" v-if="frame === 25">      __
     / / Copied
    / /  to
   / /   clipboard
    /</pre>
<pre class="frame" v-if="frame === 26">      __
     / / Copied
    / /  to
   / /   clipboard
    /</pre>
<pre class="frame" v-if="frame === 27">      __
     / / Copied
    / /  to
   / /   clipboard
     </pre>
<pre class="frame" v-if="frame === 28">      __
     / / Copied
    / /  to
         clipboard
   </pre>
<pre class="frame" v-if="frame === 29">      __
     / / Copied
         to
         clipboard
   </pre>
<pre class="frame" v-if="frame === 30">      __
         Copied
         to
         clipboard
   </pre>
<pre class="frame" v-if="frame === 31">
         Copied
         to
         clipboard
   </pre>
<pre class="frame" v-if="frame === 32">
         Copied
         to
         clipboard
   </pre>
<pre class="frame" v-if="frame === 33">

         to
         clipboard
   </pre>
<pre class="frame" v-if="frame === 34">

         to
         clipboard
   </pre>
<pre class="frame" v-if="frame === 35">


         clipboard
    </pre>
<pre class="frame" v-if="frame === 36">


         clipboard
    </pre>

<pre class="frame" v-if="frame === 37">



 </pre>
<pre class="frame" v-if="frame === 38">



 </pre>
    </div>
</template>

<script>
export default {
  name: 'clipboard-message',

  props: ['animation-start'],

  data() {
    return {
      animating: false,
      frame: 0
    }
  },

  watch: {
    animationStart: function(val) {
      if (val) {
        if (this.animating) return;
        this.animate();
      }
    }
  },

  methods: {
    animate() {

      this.animating = true;
      console.log(this.animating);

      var animationInterval = setInterval(function() {
        this.frame = this.frame + 1;
        if (this.frame === 38) {
          clearInterval(animationInterval);
          console.log('emitting');
          this.$emit('animationEnd');
          // this.wasRecentlyClicked = false;
          console.log('animating done');
          this.animating = false;
          this.frame = 0;
        }
      }.bind(this), 40)
    }
  }
}
</script>

<style lang="sass" scoped>
.clipboard-message {
  display: none;

  &.is-animating {
    display: block;
  }
}

.frame {
  margin: 0;
  padding-bottom: 4px;
}
</style>
