// A soft music-box tune, played with the Web Audio API so there is no audio file to download.
// The melody is an original little waltz. Music never starts by itself: a 🎵 button turns it on,
// and the choice is remembered so the next page resumes on the visitor's first tap.
(() => {
  const KEY = "pn-music";
  const BEAT = 60 / 92;           // seconds per beat (3/4 time)
  const VOLUME = 0.12;

  // [MIDI note, beats]. C5 = 72.
  const MELODY = [
    [76, 1], [79, 1], [84, 1],   [83, 2], [79, 1],   [81, 1], [79, 1], [76, 1],   [79, 3],
    [77, 1], [81, 1], [86, 1],   [84, 2], [81, 1],   [79, 1], [76, 1], [74, 1],   [72, 3],
    [76, 1], [77, 1], [79, 1],   [84, 2], [88, 1],   [86, 1], [84, 1], [81, 1],   [79, 3],
    [81, 1], [79, 1], [77, 1],   [76, 1], [74, 1], [72, 1],   [74, 1.5], [76, 0.5], [74, 1],   [72, 3]
  ];
  // One chord root per bar; the music box plucks root, fifth and octave under the melody.
  const BASS = [48, 43, 41, 48, 41, 48, 43, 48, 48, 41, 41, 48, 41, 48, 43, 48];

  const hz = midi => 440 * Math.pow(2, (midi - 69) / 12);
  let ctx, out, timer, playing = false;

  function setup() {
    ctx = new (window.AudioContext || window.webkitAudioContext)();
    out = ctx.createGain();
    out.gain.value = VOLUME;
    // A short echo makes it sound dreamy.
    const delay = ctx.createDelay();
    delay.delayTime.value = BEAT * 0.75;
    const feedback = ctx.createGain();
    feedback.gain.value = 0.28;
    out.connect(ctx.destination);
    out.connect(delay);
    delay.connect(feedback);
    feedback.connect(delay);
    delay.connect(ctx.destination);
  }

  // One music-box "tine": a sine with a quieter overtone and a quick bell-like fade.
  function pluck(time, midi, length, level) {
    for (const [mult, amount] of [[1, 1], [2, 0.25], [3, 0.08]]) {
      const osc = ctx.createOscillator();
      const env = ctx.createGain();
      osc.type = "sine";
      osc.frequency.value = hz(midi) * mult;
      env.gain.setValueAtTime(0, time);
      env.gain.linearRampToValueAtTime(level * amount, time + 0.008);
      env.gain.exponentialRampToValueAtTime(0.0001, time + Math.max(0.4, length * 1.6));
      osc.connect(env).connect(out);
      osc.start(time);
      osc.stop(time + Math.max(0.5, length * 1.7));
    }
  }

  function scheduleLoop(start) {
    let t = start;
    for (const [midi, beats] of MELODY) {
      pluck(t, midi, beats * BEAT, 0.5);
      t += beats * BEAT;
    }
    BASS.forEach((root, bar) => {
      const b = start + bar * 3 * BEAT;
      pluck(b, root + 12, BEAT, 0.22);
      pluck(b + BEAT, root + 19, BEAT, 0.12);
      pluck(b + 2 * BEAT, root + 24, BEAT, 0.12);
    });
    const end = t;
    timer = setTimeout(() => playing && scheduleLoop(end), (end - ctx.currentTime - 0.3) * 1000);
  }

  function start() {
    if (!ctx) setup();
    ctx.resume();
    playing = true;
    scheduleLoop(ctx.currentTime + 0.1);
    button.classList.add("on");
    button.setAttribute("aria-pressed", "true");
    button.title = "Turn music off";
  }

  function stop() {
    playing = false;
    clearTimeout(timer);
    if (ctx) ctx.suspend();
    button.classList.remove("on");
    button.setAttribute("aria-pressed", "false");
    button.title = "Play music";
  }

  const remember = on => { try { localStorage.setItem(KEY, on ? "on" : "off"); } catch (e) { /* storage unavailable */ } };

  const style = document.createElement("style");
  style.textContent = `
    .music-btn {
      position: fixed; right: 14px; bottom: 16px; z-index: 15;
      width: 46px; height: 46px; border-radius: 50%;
      border: 1px solid #f6d3d8; background: #fffdf8; color: #a05c69;
      font-size: 1.3rem; cursor: pointer;
      box-shadow: 0 6px 16px rgba(194, 124, 136, .25);
    }
    .music-btn.on { background: #c27c88; color: #fff; border-color: #c27c88; animation: pn-bob 1.6s ease-in-out infinite; }
    @keyframes pn-bob { 50% { transform: translateY(-3px) rotate(-6deg); } }
    @media (prefers-reduced-motion: reduce) { .music-btn.on { animation: none; } }
  `;
  document.head.appendChild(style);

  const button = document.createElement("button");
  button.type = "button";
  button.className = "music-btn";
  button.textContent = "🎵";
  button.setAttribute("aria-label", "Background music");
  button.setAttribute("aria-pressed", "false");
  button.title = "Play music";
  button.addEventListener("click", e => {
    e.stopPropagation();
    if (playing) { stop(); remember(false); } else { start(); remember(true); }
  });
  document.body.appendChild(button);

  // Sit above the catalogue's order bar when there is one.
  const bar = document.querySelector(".order");
  if (bar && window.ResizeObserver) {
    new ResizeObserver(() => { button.style.bottom = bar.offsetHeight + 14 + "px"; }).observe(bar);
  }

  // Browsers only allow sound after a tap, so a visitor who had music on gets it back on their first tap.
  let wanted = false;
  try { wanted = localStorage.getItem(KEY) === "on"; } catch (e) { /* storage unavailable */ }
  if (wanted) {
    const resume = e => {
      if (e.target.closest && e.target.closest(".music-btn")) return; // the button handles itself
      document.removeEventListener("pointerdown", resume);
      document.removeEventListener("keydown", resume);
      if (!playing) start();
    };
    document.addEventListener("pointerdown", resume);
    document.addEventListener("keydown", resume);
  }
})();
