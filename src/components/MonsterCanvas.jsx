import { useEffect, useState } from 'react'

// ふわふわアニメ用スタイル
const floatStyle = `
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50%       { transform: translateY(-10px); }
  }
  @keyframes blink {
    0%, 90%, 100% { transform: scaleY(1); }
    95%           { transform: scaleY(0.1); }
  }
  @keyframes starSpin {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }
  @keyframes heartPop {
    0%   { transform: scale(0); opacity: 0; }
    50%  { transform: scale(1.2); opacity: 1; }
    100% { transform: scale(1); opacity: 1; }
  }
  .monster-body   { animation: float 3s ease-in-out infinite; }
  .monster-eye    { animation: blink 4s ease-in-out infinite; transform-origin: center; }
  .star-top       { animation: starSpin 3s linear infinite; transform-origin: 200px 60px; }
  .heart-bubble   { animation: heartPop 0.4s ease-out forwards; }
`

export default function MonsterCanvas({ mood, isEating }) {
  const [showHeart, setShowHeart] = useState(true)

  useEffect(() => {
    setShowHeart(false)
    const t = setTimeout(() => setShowHeart(true), 100)
    return () => clearTimeout(t)
  }, [mood])

  const mouthPath =
    mood === 'happy'  ? 'M185 265 Q200 278 215 265' :
    mood === 'hungry' ? 'M183 270 Q200 260 217 270' :
                        'M187 268 L213 268'

  return (
    <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
      <style>{floatStyle}</style>

      {/* 背景：夜空グラデーション */}
      <svg
        viewBox="0 0 390 380"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: '100%', height: '100%', display: 'block' }}
      >
        <defs>
          <radialGradient id="bgGrad" cx="50%" cy="40%" r="70%">
            <stop offset="0%"   stopColor="#2a2060" />
            <stop offset="100%" stopColor="#0d0d1a" />
          </radialGradient>
          <radialGradient id="monsterGrad" cx="45%" cy="35%" r="60%">
            <stop offset="0%"   stopColor="#e0d4ff" />
            <stop offset="100%" stopColor="#9b87d4" />
          </radialGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>

        {/* 背景 */}
        <rect width="390" height="380" fill="url(#bgGrad)" />

        {/* 星 */}
        {[
          [60, 30], [130, 20], [310, 25], [350, 55],
          [80, 100], [320, 90], [170, 15], [270, 60],
        ].map(([x, y], i) => (
          <text
            key={i}
            x={x} y={y}
            fontSize={i % 3 === 0 ? 18 : 13}
            fill="#f5d76e"
            filter="url(#glow)"
            opacity={0.7 + (i % 3) * 0.1}
          >★</text>
        ))}

        {/* 床・クッション */}
        <ellipse cx="195" cy="340" rx="140" ry="65" fill="#1e1a3a" opacity="0.8" />
        <rect x="80" y="310" width="230" height="50" rx="15" fill="#2d265a" />

        {/* 家具（左） */}
        <rect x="30" y="230" width="60" height="80" rx="6" fill="#2a1f3d" />
        <rect x="25" y="225" width="70" height="10" rx="4" fill="#3a2d55" />
        <text x="28" y="220" fontSize="24">🪴</text>
        <text x="58" y="220" fontSize="18">🌸</text>

        {/* モンスター本体 */}
        <g className="monster-body">
          {/* 体 */}
          <ellipse cx="200" cy="270" rx="85" ry="95" fill="url(#monsterGrad)" />
          {/* ほっぺ */}
          <ellipse cx="165" cy="270" rx="16" ry="20" fill="#f4a0b5" opacity="0.6" />
          <ellipse cx="235" cy="270" rx="16" ry="20" fill="#f4a0b5" opacity="0.6" />
          {/* 目（左） */}
          <g className="monster-eye">
            <ellipse cx="183" cy="248" rx="9" ry="10" fill="#1a1a2e" />
            <circle   cx="186" cy="245" r="3"  fill="white" />
          </g>
          {/* 目（右） */}
          <g className="monster-eye">
            <ellipse cx="217" cy="248" rx="9" ry="10" fill="#1a1a2e" />
            <circle   cx="220" cy="245" r="3"  fill="white" />
          </g>
          {/* 口 */}
          <path d={mouthPath} stroke="#1a1a2e" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          {/* 手（左） */}
          <ellipse cx="125" cy="295" rx="22" ry="18" fill="#c4b0f5" />
          {/* 手（右） */}
          <ellipse cx="275" cy="295" rx="22" ry="18" fill="#c4b0f5" />
          {/* 頭の星 */}
          <line x1="200" y1="185" x2="200" y2="155" stroke="#c4b0f5" strokeWidth="3" strokeLinecap="round" />
          <text x="191" y="155" fontSize="20" fill="#f5d76e" className="star-top" filter="url(#glow)">★</text>
        </g>

        {/* 吹き出し（ハート） */}
        {showHeart && (
          <g className="heart-bubble">
            <ellipse cx="270" cy="215" rx="28" ry="22" fill="white" />
            <polygon points="258,232 265,242 270,232" fill="white" />
            <text x="256" y="225" fontSize="20">
              {mood === 'hungry' ? '😢' : '❤️'}
            </text>
          </g>
        )}
      </svg>
    </div>
  )
}
