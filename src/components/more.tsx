import '../assets/more.scss'
import React from 'react'
import { Rendition } from 'epubjs'
import Chapters from './chapters'

interface MoreProps {
  info: any
  rendition: Rendition | null
  visible: boolean
  handleHideMore: () => void
  renderChapters?: (tocs) => React.ReactNode
}

export const More: React.FC<MoreProps> = ({ info, rendition, visible, handleHideMore, renderChapters }) => {
  if (!visible) return null
  const { title } = info
  return (
    <div className="more" onClick={handleHideMore}>
      <div className="info">
        <div className="title">{title}</div>
      </div>
      <Chapters rendition={rendition} renderChapters={renderChapters} />
    </div>
  )
}

export default More
