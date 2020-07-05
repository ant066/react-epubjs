import '../assets/reader.scss'
import React, { useEffect, useRef, useState } from 'react'
import ePub, { Rendition, Location, Book } from 'epubjs'
import Navigator from './navigator'
import More from './more'
import Loader from './loader'
import { Swipeable, EventData } from 'react-swipeable'

interface ReaderProps {
  url: any
  fontSize?: string
  fontFamily?: string
  fontColor?: string
  className: string
  showCurrentPage: boolean | 'buttom' | 'top'

  cfi: string

  onLoad?: (rendition?: Rendition) => void
  onNext?: (rendition?: Rendition) => void
  onPrev?: (rendition?: Rendition) => void
  onRelocated?: (location?: Location) => void

  renderChapters?: (tocs) => React.ReactNode
}

export const Reader: React.FC<ReaderProps> = ({
  url,
  fontSize,
  fontFamily,
  fontColor,
  onLoad,
  onNext,
  onPrev,
  onRelocated,
  showCurrentPage = true,
  className = '',
  cfi,
  renderChapters,
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const [rendition, setRendition] = useState<Rendition | null>(null)
  const [isMoreShow, setIsMoreShow] = useState<boolean>(false)
  const [info, setInfo] = useState()

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const ebook = ePub(url)
    const rendition = ebook.renderTo(el, { flow: 'paginated', width: '100%', height: '100%' })
    onReaderLoad(ebook, rendition)
  }, [])

  const onReaderLoad = (ebook: Book, rendition: Rendition) => {
    if (!rendition) return
    setRendition(rendition)

    cfi ? rendition.display(cfi) : rendition.display()
    setupStyles()

    onLoad && onLoad(rendition)
    onRelocated && rendition.on('relocated', handleRelocated)
    ebook.ready.then((values) => {
      const [, , info] = values
      setInfo(info)
    })
  }

  const setupStyles = () => {
    fontSize && rendition.themes.default({ p: { 'font-size': `${fontSize} !important` } })
    fontColor && rendition.themes.default({ p: { color: `${fontColor} !important` } })
    fontFamily && rendition.themes.default({ p: { fontFamily: `${fontFamily} !important` } })
  }

  const handleRelocated = (location: Location): void => {
    onRelocated(location)
  }

  const handleShowMore = (): void => setIsMoreShow(true)
  const handleHideMore = (): void => setIsMoreShow(false)

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

  const handleSwipe = (eventData: EventData) => {
    const { dir } = eventData
    if (dir === 'Left') handleNext()
    if (dir === 'Right') handlePrev()
  }
  return (
    <Swipeable onSwiped={handleSwipe} className="wrapper">
      {!rendition && <Loader />}
      <Navigator
        rendition={rendition}
        handleShowMore={handleShowMore}
        visible={true}
        handleNext={handleNext}
        handlePrev={handlePrev}
        showCurrentPage={showCurrentPage}
      />
      <More
        info={info}
        rendition={rendition}
        visible={isMoreShow}
        handleHideMore={handleHideMore}
        renderChapters={renderChapters}
      />
      <div className={`reader ${className}`} ref={ref} />
    </Swipeable>
  )
}

export default Reader
