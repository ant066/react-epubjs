# React Epubjs

View epub file in ReactJs application using epub.js

See a demo at: [https://ant066.github.io/react-epubjs/](https://ant066.github.io/react-epubjs/)

## Getting Started

```tsx
npm i react-epubjs
```

or

```tsx
yarn add react-epubjs
```

Create new React Epubjs

```tsx
interface ReaderProps {
  url: any
  fontSize?: string
  fontFamily?: string
  fontColor?: string
  className: string

  showPercentage?: boolean // default is true
  percentString?: string // default is '$percent of this book'

  cfi: string

  onLoad?: (rendition?: Rendition) => void
  onNext?: (rendition?: Rendition) => void
  onPrev?: (rendition?: Rendition) => void
  onRelocated?: (location?: Location) => void

  renderChapters?: (tocs) => React.ReactNode
}
```

```tsx
import React from 'react'
import ReactDOM from 'react-dom'
import Reader from 'react-epubjs'
import book from './assets/book.epub'

const root = document.getElementById('root')

const onRelocated = (location) => {
  // save current cfi to localStorage
  const cfi = location.start.cfi
  localStorage.setItem('cfi', cfi)
}

const EpubView = () => {
  // load cfi from localStorage
  const cfi = localStorage.getItem('cfi')

  // must be wrap by an element with height
  return <Reader url={book} onRelocated={onRelocated} cfi={cfi} />
}

ReactDOM.render(<EpubView />, root)
```

### More feature in future

Create new issue here: [https://github.com/ant066/react-epubjs/issues](https://github.com/ant066/react-epubjs/issues)

Track the progress here: [Kanban](https://github.com/ant066/react-epubjs/projects/1?fullscreen=true)
