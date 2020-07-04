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
  showCurrentPage: boolean | 'buttom' | 'top'

  onLoad?: (rendition?: Rendition) => void
  onNext?: (rendition?: Rendition) => void
  onPrev?: (rendition?: Rendition) => void
}
```

```tsx
import Book from './book.epub'
import Reader from 'react-epubjs'

<Reader url={Book} />
<Reader url="https://abc.com/book.epub" />
```

### Direction

- Support click on left to back to prev page
- Support click on right to next page
- Also support swipe to switch page

### More feature in feature

Create new issue here: [https://github.com/ant066/react-epubjs/issues](https://github.com/ant066/react-epubjs/issues)

Track the progress here: [Kanban](https://github.com/ant066/react-epubjs/projects/1?fullscreen=true)
