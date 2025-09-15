import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import Header from './Header'
import HomePage from './HomePage'
import CategoryPage from './CategoryPage'
// import CalculatorPage from './CalculatorPage' // This file does not exist, needs to be created or removed
import SearchResults from './SearchResults'
import Footer from './Footer'
import './App.css'

function App() {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/search" element={<SearchResults query={searchQuery} />} />
            <Route path="/category/:categoryId" element={<CategoryPage />} />
            <Route path="/:calculatorType" element={<CalculatorPage />} />
            <Route path="/:calculatorType/:param1" element={<CalculatorPage />} />
            <Route path="/:calculatorType/:param1/:param2" element={<CalculatorPage />} />
            <Route path="/:calculatorType/:param1/:param2/:param3" element={<CalculatorPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App

