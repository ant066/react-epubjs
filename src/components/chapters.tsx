import React, { useEffect, useState } from 'react'

export default function Chapters({ rendition, renderChapters }): React.FC {
  const [tocs, setTocs] = useState([])

  useEffect(() => {
    if (!rendition) return
    const { book } = rendition
    book.ready.then(() => {
      const { navigation } = book
      const { toc } = navigation
      setTocs(toc)
    })
  }, [rendition])

  const gotoChapter = (toc) => () => {
    rendition.display(toc.href)
  }

  return (
    <div className="chapters">
      {renderChapters
        ? renderChapters(tocs, rendition)
        : tocs.map((toc, index) => {
            const { label } = toc
            return (
              <p className="chapter" key={index} onClick={gotoChapter(toc)}>
                {index}: {label}
              </p>
            )
          })}
    </div>
  )
}
