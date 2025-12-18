export enum SoundType {
  CLICK = 'CLICK',
  WIN = 'WIN',
  LOSE = 'LOSE',
  DRAW = 'DRAW',
}

// Simple synth to avoid external asset dependencies
const createOscillator = (
  ctx: AudioContext,
  type: OscillatorType,
  frequency: number,
  duration: number,
  startTime: number,
  volume: number = 0.1
) => {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = type;
  osc.frequency.setValueAtTime(frequency, startTime);
  
  gain.gain.setValueAtTime(volume, startTime);
  gain.gain.exponentialRampToValueAtTime(0.01, startTime + duration);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(startTime);
  osc.stop(startTime + duration);
};

let audioContext: AudioContext | null = null;

const getContext = () => {
  if (!audioContext) {
    audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  return audioContext;
};

export const playSound = (type: SoundType) => {
  try {
    const ctx = getContext();
    if (ctx.state === 'suspended') {
      ctx.resume();
    }
    
    const now = ctx.currentTime;

    switch (type) {
      case SoundType.CLICK:
        createOscillator(ctx, 'sine', 800, 0.1, now);
        break;
      case SoundType.WIN:
        createOscillator(ctx, 'triangle', 523.25, 0.1, now); // C5
        createOscillator(ctx, 'triangle', 659.25, 0.1, now + 0.1); // E5
        createOscillator(ctx, 'triangle', 783.99, 0.4, now + 0.2); // G5
        break;
      case SoundType.LOSE:
        createOscillator(ctx, 'sawtooth', 392.00, 0.1, now); // G4
        createOscillator(ctx, 'sawtooth', 349.23, 0.1, now + 0.1); // F4
        createOscillator(ctx, 'sawtooth', 311.13, 0.4, now + 0.2); // Eb4
        break;
      case SoundType.DRAW:
        createOscillator(ctx, 'square', 440, 0.2, now);
        createOscillator(ctx, 'square', 440, 0.2, now + 0.25);
        break;
    }
  } catch (e) {
    console.warn('Audio playback failed', e);
  }
};