# React Epubjs v0.0.1

View epub file in ReactJs application using epub.js

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
  //   fontSize?: string
  //   fontFamily?: string
  //   page?: number
  onLoad?: (rendition?: Rendition) => void
  onNext?: (rendition?: Rendition) => void
  onPrev?: (rendition?: Rendition) => void
}
```

```tsx
import Book from './book.epub'
import Reader from 'react-epubjs'

<Reader src={Book} />
<Reader src="https://abc.com/book.epub" />
```

### Direction

- Support click on left to back to prev page
- Support click on right to next page
- Also support swipe to switch page

### More feature in feature

Create new issue here: [https://github.com/ant066/react-epubjs/issues](https://github.com/ant066/react-epubjs/issues)
