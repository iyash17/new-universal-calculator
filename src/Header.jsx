import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Search, Calculator, Menu, X } from 'lucide-react'
import { Button } from './Button'
import { Input } from './Input'

const Header = ({ searchQuery, setSearchQuery }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      // Parse natural language query and redirect to appropriate calculator
      const parsedResult = parseNaturalLanguage(searchQuery)
      if (parsedResult) {
        navigate(parsedResult.url)
      } else {
        navigate(`/search?q=${encodeURIComponent(searchQuery)}`)
      }
    }
  }

  const parseNaturalLanguage = (query) => {
    const lowerQuery = query.toLowerCase()
    
    // Currency conversion patterns
    const currencyPattern = /convert\s+(\d+(?:\.\d+)?)\s+(\w{3})\s+to\s+(\w{3})/i
    const currencyMatch = lowerQuery.match(currencyPattern)
    if (currencyMatch) {
      const [, amount, from, to] = currencyMatch
      return { url: `/currency-converter/${from.toLowerCase()}-to-${to.toLowerCase()}/${amount}` }
    }

    // BMI patterns
    const bmiPattern = /bmi\s+(?:for\s+)?(\d+(?:\.\d+)?)\s*kg\s+(\d+(?:\.\d+)?)\s*cm/i
    const bmiMatch = lowerQuery.match(bmiPattern)
    if (bmiMatch) {
      const [, weight, height] = bmiMatch
      return { url: `/bmi-calculator/${weight}/${height}` }
    }

    // Percentage patterns
    const percentPattern = /(\d+(?:\.\d+)?)\s*%\s+of\s+(\d+(?:\.\d+)?)/i
    const percentMatch = lowerQuery.match(percentPattern)
    if (percentMatch) {
      const [, percent, number] = percentMatch
      return { url: `/percentage-calculator/${percent}/${number}` }
    }

    // Loan calculator patterns
    const loanPattern = /loan\s+(\d+(?:\.\d+)?)\s+(\d+(?:\.\d+)?)\s*%\s+(\d+)/i
    const loanMatch = lowerQuery.match(loanPattern)
    if (loanMatch) {
      const [, amount, rate, years] = loanMatch
      return { url: `/loan-calculator/${amount}/${rate}/${years}` }
    }

    return null
  }

  const categories = [
    { id: 'finance', name: 'Finance' },
    { id: 'health', name: 'Health' },
    { id: 'time', name: 'Time' },
    { id: 'science', name: 'Science' },
    { id: 'math', name: 'Math' },
    { id: 'fun', name: 'Fun' }
  ]

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Calculator className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold text-foreground">Universal Calculator</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/category/${category.id}`}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {category.name}
              </Link>
            ))}
          </nav>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="hidden md:flex items-center space-x-2 flex-1 max-w-md mx-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Try: 'convert 200 USD to INR' or 'BMI for 70kg 170cm'"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button type="submit" size="sm">
              Search
            </Button>
          </form>
          <div className="ad-placeholder w-full h-16 bg-gray-200 flex items-center justify-center text-sm text-gray-500 hidden md:block">
            Advertisement
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Try: 'convert 200 USD to INR'"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button type="submit" className="w-full mt-2">
                Search
              </Button>
            </form>

            {/* Mobile Navigation */}
            <nav className="space-y-2">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  to={`/category/${category.id}`}
                  className="block py-2 text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {category.name}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header

