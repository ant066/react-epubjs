import '../assets/navigator.scss'
import React, { useState, useEffect } from 'react'
import { Rendition } from 'epubjs'

interface NavigatorProps {
  rendition: Rendition | null
  handleShowMore: () => void
  visible: boolean
  handleNext?: () => void
  handlePrev?: () => void
  showCurrentPage: boolean
}

export const Navigator: React.FC<NavigatorProps> = ({
  rendition,
  handleShowMore,
  visible,
  handleNext,
  handlePrev,
  showCurrentPage,
}) => {
  if (!visible) return null

  const [atStart, setAtStart] = useState<boolean>(false)
  const [page, setPage] = useState<number>(0)
  const [totalPage, setTotalPage] = useState<number>(0)
  const [chapter, setChapter] = useState<number>(0)

  const setPageNumber = (location) => {
    setAtStart(location.atStart)
    setChapter(location.start.index)
    setPage(location.start.displayed.page)
    setTotalPage(location.start.displayed.total)
  }

  const onRelocated = () => {
    if (!rendition) return
    rendition.on('relocated', setPageNumber)
    return () => rendition.off('relocated', setPageNumber)
  }

  useEffect(onRelocated, [rendition])
  return (
    <div className="navigator">
      <div className="more-info-area" onClick={handleShowMore}></div>
      <div className="prev-area" onClick={handlePrev}></div>
      <div className="next-area" onClick={handleNext}></div>
      {showCurrentPage && !atStart && (
        <div className={`page-number ${typeof showCurrentPage === 'string' ? showCurrentPage : 'bottom'}`}>
          {page}/{totalPage} in this chapter
        </div>
      )}
    </div>
  )
}

export default Navigator
