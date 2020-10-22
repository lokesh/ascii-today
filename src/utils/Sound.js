const context = new AudioContext()

function playSine(freq, shape = 'sine', duration = 0.2) {
  const o = context.createOscillator()
  o.type = shape;
  o.frequency.value = freq;
  const g = context.createGain()
  o.connect(g)
  g.connect(context.destination)
  o.start(0)
  g.gain.exponentialRampToValueAtTime(
     0.00001, context.currentTime + duration
  )
}

const beep = function() {
  playSine(261.6);
}

const boop = function() {
  playSine(830.6);
}

const zing = function() {
  playSine(1109, 'triangle', 1.5);
}

export {
    beep,
    boop,
    zing,
}
