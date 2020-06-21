import '../assets/navigator.scss'
import React from 'react'
import { Rendition } from 'epubjs'

interface NavigatorProps {
  rendition: Rendition | null
  handleShowMore: () => void
  visible: boolean
  handleNext?: () => void
  handlePrev?: () => void
}

export const Navigator: React.FC<NavigatorProps> = ({ rendition, handleShowMore, visible, handleNext, handlePrev }) => {
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
