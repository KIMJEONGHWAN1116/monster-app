import { useEffect } from 'react'
import FeedButton from '../components/FeedButton'
import HungerBar from '../components/HungerBar'
import MonsterCanvas from '../components/MonsterCanvas'
import { useMonster } from '../hooks/useMonster'

const styles = {
  page: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  },
  monsterName: {
    position: 'absolute',
    top: '72px',
    left: '20px',
    fontSize: '14px',
    color: '#d8d0f0',
    fontWeight: '500',
    zIndex: 5,
  },
  canvasWrap: {
    flex: 1,
    position: 'relative',
    minHeight: 0,
  },
  bottom: {
    padding: '8px 0 78px',
    background: 'rgba(26,26,46,0.95)',
  },
}

export default function HomePage() {
  const { hunger, mood, isEating, feed, decreaseHunger } = useMonster()

  // 10秒ごとにおなかが減る
  useEffect(() => {
    const id = setInterval(decreaseHunger, 10_000)
    return () => clearInterval(id)
  }, [decreaseHunger])

  return (
    <div style={styles.page}>
      <div style={styles.canvasWrap}>
        <div style={styles.monsterName}>モンスターの名前</div>
        <MonsterCanvas mood={mood} isEating={isEating} />
      </div>
      <div style={styles.bottom}>
        <HungerBar hunger={hunger} />
        <FeedButton onFeed={feed} isEating={isEating} isFull={hunger >= 100} />
      </div>
    </div>
  )
}
