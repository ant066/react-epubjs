import React from 'react'
import ReactDOM from 'react-dom'
import Reader from '.'
import book from './assets/book.epub'

const root = document.getElementById('root')

const onRelocated = (location) => {
  const cfi = location.start.cfi
  localStorage.setItem('cfi', cfi)
}

const EpubView = () => {
  const cfi = localStorage.getItem('cfi')
  return <Reader url={book} onRelocated={onRelocated} cfi={cfi} showPercentage />
}

ReactDOM.render(<EpubView />, root)
