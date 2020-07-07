import '../assets/navigator.scss'
import React from 'react'

interface NavigatorProps {
  handleShowMore: () => void
  visible: boolean
  handleNext?: () => void
  handlePrev?: () => void
  showCurrentPage: boolean
}

export const Navigator: React.FC<NavigatorProps> = ({
  handleShowMore,
  visible,
  handleNext,
  handlePrev,
  percent,
  percentString = '$percent of this book',
}) => {
  if (!visible) return null

  percent = Math.round(percent.toFixed(2) * 100)
  const percentStr = percentString.replace('$percent', percent + '%')

  return (
    <div className="navigator">
      <div className="more-info-area" onClick={handleShowMore}></div>
      <div className="prev-area" onClick={handlePrev}></div>
      <div className="next-area" onClick={handleNext}></div>
      {percent ? <div className="page-number">{percentStr}</div> : null}
    </div>
  )
}

export default Navigator
