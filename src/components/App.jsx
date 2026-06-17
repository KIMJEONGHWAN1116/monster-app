import { useState } from 'react'
import BottomNav from './components/BottomNav'
import Header from './components/Header'
import HomePage from './pages/HomePage'

// 他のページのプレースホルダー
function PlaceholderPage({ name }) {
  return (
    <div style={{
      flex: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#6a6490',
      fontSize: '16px',
    }}>
      {name} ページ（準備中）
    </div>
  )
}

export default function App() {
  const [activeTab, setActiveTab] = useState('home')

  const renderPage = () => {
    switch (activeTab) {
      case 'home':   return <HomePage />
      case 'log':    return <PlaceholderPage name="感情ログ" />
      case 'record': return <PlaceholderPage name="きろく" />
      case 'shop':   return <PlaceholderPage name="ショップ" />
      case 'mypage': return <PlaceholderPage name="マイページ" />
      default:       return <HomePage />
    }
  }

  return (
    <div className="phone-frame">
      <Header />
      {renderPage()}
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  )
}
