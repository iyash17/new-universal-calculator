import { useSearchParams, Link } from 'react-router-dom'
import { Search } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './Card'

const SearchResults = () => {
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q') || ''

  // All available calculators for search
  const allCalculators = [
    {
      name: 'Currency Converter',
      path: '/currency-converter',
      description: 'Convert between different currencies with live exchange rates',
      keywords: ['currency', 'exchange', 'convert', 'money', 'usd', 'eur', 'gbp', 'inr', 'forex']
    },
    {
      name: 'BMI Calculator',
      path: '/bmi-calculator',
      description: 'Calculate Body Mass Index and health status',
      keywords: ['bmi', 'body', 'mass', 'index', 'weight', 'height', 'health', 'fitness']
    },
    {
      name: 'Percentage Calculator',
      path: '/percentage-calculator',
      description: 'Calculate percentages, percentage change, and ratios',
      keywords: ['percentage', 'percent', '%', 'ratio', 'proportion', 'change']
    },
    {
      name: 'Loan Calculator',
      path: '/loan-calculator',
      description: 'Calculate monthly payments, interest, and total cost of loans',
      keywords: ['loan', 'mortgage', 'payment', 'interest', 'finance', 'monthly']
    },
    {
      name: 'Time Zone Converter',
      path: '/timezone-converter',
      description: 'Convert time between different time zones',
      keywords: ['time', 'zone', 'timezone', 'convert', 'utc', 'gmt', 'clock']
    },
    {
      name: 'Age Calculator',
      path: '/age-calculator',
      description: 'Calculate exact age in years, months, and days',
      keywords: ['age', 'birthday', 'years', 'months', 'days', 'old']
    },
    {
      name: 'Unit Converter',
      path: '/unit-converter',
      description: 'Convert between different units of measurement',
      keywords: ['unit', 'convert', 'measurement', 'length', 'weight', 'volume', 'temperature']
    },
    {
      name: 'Basic Calculator',
      path: '/basic-calculator',
      description: 'Standard calculator for basic arithmetic operations',
      keywords: ['calculator', 'math', 'arithmetic', 'add', 'subtract', 'multiply', 'divide']
    },
    {
      name: 'Calorie Calculator',
      path: '/calorie-calculator',
      description: 'Calculate daily calorie needs and weight loss goals',
      keywords: ['calorie', 'calories', 'diet', 'weight', 'loss', 'nutrition', 'food']
    },
    {
      name: 'Investment Calculator',
      path: '/investment-calculator',
      description: 'Calculate compound interest and investment returns',
      keywords: ['investment', 'compound', 'interest', 'returns', 'savings', 'finance']
    },
    {
      name: 'Temperature Converter',
      path: '/temperature-converter',
      description: 'Convert between Celsius, Fahrenheit, and Kelvin',
      keywords: ['temperature', 'celsius', 'fahrenheit', 'kelvin', 'convert', 'weather']
    },
    {
      name: 'Tip Calculator',
      path: '/tip-calculator',
      description: 'Calculate tips and split bills among multiple people',
      keywords: ['tip', 'gratuity', 'bill', 'split', 'restaurant', 'service']
    }
  ]

  // Filter calculators based on search query
  const filteredCalculators = allCalculators.filter(calc => {
    const searchTerms = query.toLowerCase().split(' ')
    return searchTerms.some(term => 
      calc.name.toLowerCase().includes(term) ||
      calc.description.toLowerCase().includes(term) ||
      calc.keywords.some(keyword => keyword.includes(term))
    )
  })

  return (
    <div className="space-y-8">
      {/* Search Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex p-4 rounded-full bg-primary/10">
          <Search className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-3xl font-bold text-foreground">Search Results</h1>
        <p className="text-lg text-muted-foreground">
          {query ? `Results for "${query}"` : 'Please enter a search term'}
        </p>
      </div>

      {/* Results */}
      {query && (
        <div>
          {filteredCalculators.length > 0 ? (
            <>
              <p className="text-muted-foreground mb-6">
                Found {filteredCalculators.length} calculator{filteredCalculators.length !== 1 ? 's' : ''}
              </p>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCalculators.map((calculator) => (
                  <Link key={calculator.path} to={calculator.path}>
                    <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                      <CardHeader>
                        <CardTitle className="text-lg">{calculator.name}</CardTitle>
                        <CardDescription>{calculator.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-primary font-medium">Open Calculator</span>
                          <span className="text-primary">→</span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <h2 className="text-xl font-semibold text-foreground mb-4">No Results Found</h2>
              <p className="text-muted-foreground mb-6">
                We couldn't find any calculators matching "{query}". Try searching for:
              </p>
              <div className="flex flex-wrap justify-center gap-2 mb-6">
                {['currency', 'BMI', 'percentage', 'loan', 'time zone', 'age', 'temperature'].map((suggestion) => (
                  <Link
                    key={suggestion}
                    to={`/search?q=${encodeURIComponent(suggestion)}`}
                    className="px-3 py-1 bg-muted rounded-full text-sm hover:bg-muted/80 transition-colors"
                  >
                    {suggestion}
                  </Link>
                ))}
              </div>
              <Link to="/" className="text-primary hover:underline">
                Browse all calculators
              </Link>
            </div>
          )}
        </div>
      )}

      {/* Popular Searches */}
      {!query && (
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-4">Popular Searches</h2>
          <div className="flex flex-wrap gap-2">
            {['currency converter', 'BMI calculator', 'percentage calculator', 'loan calculator', 'time zone converter'].map((term) => (
              <Link
                key={term}
                to={`/search?q=${encodeURIComponent(term)}`}
                className="px-4 py-2 bg-muted rounded-lg text-sm hover:bg-muted/80 transition-colors"
              >
                {term}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default SearchResults

