import Waves from '../../ReactBits/Waves/Waves';

export default function WaveBackground() {
  return (
    <div className="absolute -z-10 w-full h-full">
      <Waves
        lineColor="#202020ff"
        backgroundColor="#1a1a1aff"
        waveSpeedX={0.02}
        waveSpeedY={0.01}
        waveAmpX={40}
        waveAmpY={20}
        friction={0.9}
        tension={0.01}
        maxCursorMove={120}
        xGap={12}
        yGap={36}
      />
    </div>
  );
}
