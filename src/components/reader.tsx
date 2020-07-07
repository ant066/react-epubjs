import '../assets/reader.scss'
import React, { useEffect, useRef, useState } from 'react'
import ePub, { Rendition, Location } from 'epubjs'
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

  showPercentage: boolean
  percentString: string

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
  showPercentage = true,
  percentString,
  className = '',
  cfi,
  renderChapters,
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const [rendition, setRendition] = useState<Rendition | null>(null)
  const [isMoreShow, setIsMoreShow] = useState<boolean>(false)
  const [info, setInfo] = useState()
  const [percent, setPercent] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const ebook = ePub(url)
    const rendition = ebook.renderTo(el, { flow: 'paginated', width: '100%', height: '100%' })
    onReaderLoad(ebook, rendition)
  }, [])

  const onReaderLoad = (ebook, rendition: Rendition) => {
    if (!rendition) return
    setRendition(rendition)

    cfi ? rendition.display(cfi) : rendition.display()

    setupStyles(rendition)

    ebook.ready.then(async () => {
      const { package: { metadata = {} } = {} } = ebook
      setInfo(metadata)

      await ebook.locations.generate(1600)

      onLoad && onLoad(rendition)
      onRelocated && rendition.on('relocated', handleRelocated(ebook))
    })
  }

  const setupStyles = (rendition) => {
    fontSize && rendition.themes.default({ p: { 'font-size': `${fontSize} !important` } })
    fontColor && rendition.themes.default({ p: { color: `${fontColor} !important` } })
    fontFamily && rendition.themes.default({ p: { fontFamily: `${fontFamily} !important` } })
  }

  const handleRelocated = (ebook) => (location: Location): void => {
    onRelocated(location)

    const percent = ebook.locations.percentageFromCfi(location.start.cfi)
    setPercent(percent)
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
    <Swipeable onSwiped={handleSwipe} className="react-epubjs">
      {!rendition && <Loader />}
      <Navigator
        handleShowMore={handleShowMore}
        visible={true}
        handleNext={handleNext}
        handlePrev={handlePrev}
        percent={showPercentage ? percent : null}
        percentString={percentString}
      />
      <More
        info={info}
        rendition={rendition}
        visible={isMoreShow}
        handleHideMore={handleHideMore}
        renderChapters={renderChapters}
      />
      <div className={`reader ${className} ${showPercentage ? 'pb-25' : ''}`} ref={ref} />
    </Swipeable>
  )
}

export default Reader
