
const styles = {
  wrapper: {
    margin: '0 16px',
    background: 'rgba(46,43,80,0.9)',
    borderRadius: '16px',
    padding: '14px 18px',
  },
  label: {
    fontSize: '14px',
    fontWeight: '700',
    color: '#d8d0f0',
    marginBottom: '8px',
    letterSpacing: '0.04em',
  },
  track: {
    background: '#1e1a3a',
    borderRadius: '999px',
    height: '10px',
    overflow: 'hidden',
  },
  fill: (pct) => ({
    height: '100%',
    width: `${pct}%`,
    borderRadius: '999px',
    background: pct > 50
      ? 'linear-gradient(90deg, #f4a0b5, #e07a96)'
      : 'linear-gradient(90deg, #ff6b6b, #ff4444)',
    transition: 'width 0.6s ease',
  }),
}

export default function HungerBar({ hunger }) {
  return (
    <div style={styles.wrapper}>
      <div style={styles.label}>おなか　{hunger}%</div>
      <div style={styles.track}>
        <div style={styles.fill(hunger)} />
      </div>
    </div>
  )
}
