import React from 'react'
import ReactDOM from 'react-dom'
import Readii from '../src'
import bookFile from '../src/assets/book.epub'

const rootElement = document.getElementById('root')
ReactDOM.render(<Readii url={bookFile} />, rootElement)
