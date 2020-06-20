import '../assets/reader.scss'
import React, { useEffect, useRef, useState } from 'react'
import ePub, { Rendition } from 'epubjs'
import Navigator from './navigator'
import More from './more'
import Loader from './loader'

export const Reader: React.FC<{ url: any; size: string }> = ({ url, size }) => {
  const ref = useRef<HTMLDivElement>(null)
  const [rendition, setRendition] = useState<Rendition | null>(null)
  const [isMoreShow, setIsMoreShow] = useState<boolean>(false)

  useEffect(() => {
    const domElement = ref.current
    if (!domElement) return
    const ebook = ePub(url)

    const rendition = ebook.renderTo(domElement, { flow: 'paginated', width: '100%', height: '100%' })
    rendition.themes.fontSize(size)
    rendition.display()
    setRendition(rendition)
  }, [])

  const handleShowMore = (): void => setIsMoreShow(true)
  const handleHideMore = (): void => setIsMoreShow(false)

  return (
    <div className="wrapper">
      {!rendition && <Loader />}

      <Navigator rendition={rendition} handleShowMore={handleShowMore} visible={!isMoreShow} />
      <More rendition={rendition} visible={isMoreShow} handleHideMore={handleHideMore} />

      <div className="reader" ref={ref}></div>
    </div>
  )
}

export default Reader
