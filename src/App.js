import React from 'react'
import Weather from './components/Weather'
import "./App.css"

const App = () => {
  return (
    <div>
      <div className='header'>Weather Forecast</div>
      <Weather/>
    </div>
  )
}

export default App
