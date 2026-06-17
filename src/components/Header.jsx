
const styles = {
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '16px 20px',
    borderBottom: '1px solid rgba(255,255,255,0.08)',
    background: 'rgba(26,26,46,0.95)',
    zIndex: 10,
  },
  iconBtn: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: '#d8d0f0',
    fontSize: '22px',
    lineHeight: 1,
    padding: '4px',
  },
  title: {
    fontSize: '18px',
    fontWeight: '700',
    color: '#ffffff',
    letterSpacing: '0.05em',
  },
}

export default function Header() {
  return (
    <header style={styles.header}>
      <button style={styles.iconBtn} aria-label="メニュー">☰</button>
      <h1 style={styles.title}>マイモンスター</h1>
      <button style={styles.iconBtn} aria-label="通知">🔔</button>
    </header>
  )
}
