const context = new AudioContext()

function playSine(freq) {
  const o = context.createOscillator()
  o.type = 'sine';
  o.frequency.value = freq;
  const g = context.createGain()
  o.connect(g)
  g.connect(context.destination)
  o.start(0)
  g.gain.exponentialRampToValueAtTime(
     0.00001, context.currentTime + 0.2
  )
}

const beep = function() {
  playSine(261.6);
}

const boop = function() {
  playSine(830.6);
}

export {
    beep,
    boop,
}
