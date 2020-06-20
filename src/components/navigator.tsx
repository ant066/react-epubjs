import '../assets/navigator.scss'
import React from 'react'
import { Rendition } from 'epubjs'

interface NavigatorProps {
  rendition: Rendition | null
  handleShowMore: () => void
  visible: boolean
}

export const Navigator: React.FC<NavigatorProps> = ({ rendition, handleShowMore, visible }) => {
  const onNext = () => {
    rendition && rendition.next()
  }
  const onPrev = () => {
    rendition && rendition.prev()
  }

  if (!visible) return null
  return (
    <div className="navigator">
      <div className="more-info-area" onClick={handleShowMore}></div>
      <div className="prev-area" onClick={onPrev}></div>
      <div className="next-area" onClick={onNext}></div>
    </div>
  )
}

export default Navigator
