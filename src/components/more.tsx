import '../assets/more.scss'
import React from 'react'
import { Rendition } from 'epubjs'

interface MoreProps {
  rendition: Rendition | null
  visible: boolean
  handleHideMore: () => void
}

export const More: React.FC<MoreProps> = ({ rendition, visible, handleHideMore }) => {
  if (!visible) return null

  const setFontSize = (percent: number) => {
    percent = percent > 200 ? 150 : percent
    rendition?.themes.fontSize(`${percent}%`)
  }

  return (
    <div className="more">
      <div className="setting">{/* <button onClick={() => setFontSize(150)}>SIZE</button> */}</div>
      <div className="cancel" onClick={handleHideMore}></div>
    </div>
  )
}

export default More
