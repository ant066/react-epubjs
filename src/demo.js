import React from 'react'
import ReactDOM from 'react-dom'
import Reader from '../dist/bundle'
import book from './assets/book.epub'

const root = document.getElementById('root')
ReactDOM.render(<Reader url={book} />, root)
