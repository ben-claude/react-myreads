import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'

ReactDOM.render(
  // use of react-router: our App component is wrapped inside a BrowserRouter
  <BrowserRouter><App /></BrowserRouter>, 
  document.getElementById('root'))
