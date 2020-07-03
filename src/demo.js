import React from 'react'
import ReactDOM from 'react-dom'
import Reader from './'
import book from './assets/book.epub'

const root = document.getElementById('root')
ReactDOM.render(<Reader url={book} className="padding-50" />, root)
