import '../assets/navigator.scss'
import React from 'react'
import { Rendition } from 'epubjs'

interface NavigatorProps {
  rendition: Rendition | null
  handleShowMore: () => void
  visible: boolean
  onNext?: (rendition?: Rendition) => void
  onPrev?: (rendition?: Rendition) => void
}

export const Navigator: React.FC<NavigatorProps> = ({ rendition, handleShowMore, visible, onNext, onPrev }) => {
  const handleNext = () => {
    if (!rendition) return
    rendition.next()
    onNext && onNext(rendition)
  }

  const handlePrev = () => {
    if (!rendition) return
    rendition.prev()
    onPrev && onPrev(rendition)
  }

  if (!visible) return null
  return (
    <div className="navigator">
      <div className="more-info-area" onClick={handleShowMore}></div>
      <div className="prev-area" onClick={handlePrev}></div>
      <div className="next-area" onClick={handleNext}></div>
    </div>
  )
}

export default Navigator
