import '../assets/reader.scss'
import React, { useEffect, useRef, useState } from 'react'
import ePub, { Rendition } from 'epubjs'
import Navigator from './navigator'
import More from './more'
import Loader from './loader'

interface ReaderProps {
  url: any
  fontSize?: string
  fontFamily?: string
  page?: number
  onLoad?: (rendition?: Rendition) => void
  onNext?: (rendition?: Rendition) => void
  onPrev?: (rendition?: Rendition) => void
}

export const Reader: React.FC<ReaderProps> = ({ url, fontSize, fontFamily, onLoad, onNext, onPrev }) => {
  const ref = useRef<HTMLDivElement>(null)
  const [rendition, setRendition] = useState<Rendition | null>(null)
  const [isMoreShow, setIsMoreShow] = useState<boolean>(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const ebook = ePub(url)
    console.log(ebook)
    const rendition = ebook.renderTo(el, { flow: 'paginated', width: '100%', height: '100%' })
    onReaderLoad(rendition)
  }, [])

  const onReaderLoad = (rendition: Rendition) => {
    if (!rendition) return
    setRendition(rendition)
    rendition.display()
    onLoad && onLoad(rendition)
  }

  const handleShowMore = (): void => setIsMoreShow(true)
  const handleHideMore = (): void => setIsMoreShow(false)

  return (
    <div className="wrapper">
      {!rendition && <Loader />}

      <Navigator rendition={rendition} handleShowMore={handleShowMore} visible={true} onNext={onNext} onPrev={onPrev} />
      {/* <More rendition={rendition} visible={isMoreShow} handleHideMore={handleHideMore} /> */}

      <div className="reader" ref={ref} />
    </div>
  )
}

export default Reader
