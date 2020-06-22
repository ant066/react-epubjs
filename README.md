# STILL TESING, DONT USE THIS PACKAGE

# React Epubjs v0.0.1

Use epub.js in this package: https://github.com/futurepress/epub.js

## Getting Started

```js
npm i react-epubjs
```

or

```js
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
