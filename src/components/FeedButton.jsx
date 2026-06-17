
const base = {
  display: 'block',
  width: 'calc(100% - 32px)',
  margin: '14px 16px',
  padding: '18px',
  border: 'none',
  borderRadius: '999px',
  fontSize: '20px',
  fontWeight: '700',
  fontFamily: 'inherit',
  letterSpacing: '0.08em',
  cursor: 'pointer',
  transition: 'transform 0.15s ease, opacity 0.15s ease',
}

const active = {
  ...base,
  background: 'linear-gradient(135deg, #f4a0b5, #e07a96)',
  color: '#fff',
  boxShadow: '0 4px 20px rgba(244,160,181,0.5)',
}

const disabled = {
  ...base,
  background: '#3a3560',
  color: '#6a6490',
  cursor: 'not-allowed',
}

export default function FeedButton({ onFeed, isEating, isFull }) {
  const label = isFull ? '満腹だよ！🎉' : isEating ? 'もぐもぐ…' : 'それ、食べていい？'

  return (
    <button
      style={isFull || isEating ? disabled : active}
      onClick={onFeed}
      disabled={isFull || isEating}
      onMouseDown={e => { e.currentTarget.style.transform = 'scale(0.97)' }}
      onMouseUp={e => { e.currentTarget.style.transform = 'scale(1)' }}
    >
      {label}
    </button>
  )
}
