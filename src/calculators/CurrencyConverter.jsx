import { useState, useEffect } from 'react'
import { ArrowRightLeft, TrendingUp, RefreshCw } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../Card'
import { Button } from '../Button'
import { Input } from '../Input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../Select'

const CurrencyConverter = ({ urlParams }) => {
  const [amount, setAmount] = useState('')
  const [fromCurrency, setFromCurrency] = useState('USD')
  const [toCurrency, setToCurrency] = useState('EUR')
  const [result, setResult] = useState(null)
  const [exchangeRate, setExchangeRate] = useState(null)
  const [loading, setLoading] = useState(false)
  const [lastUpdated, setLastUpdated] = useState(null)

  // Popular currencies
  const currencies = [
    { code: 'USD', name: 'US Dollar', symbol: '$' },
    { code: 'EUR', name: 'Euro', symbol: '€' },
    { code: 'GBP', name: 'British Pound', symbol: '£' },
    { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
    { code: 'AUD', name: 'Australian Dollar', symbol: 'A$' },
    { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$' },
    { code: 'CHF', name: 'Swiss Franc', symbol: 'CHF' },
    { code: 'CNY', name: 'Chinese Yuan', symbol: '¥' },
    { code: 'INR', name: 'Indian Rupee', symbol: '₹' },
    { code: 'KRW', name: 'South Korean Won', symbol: '₩' },
    { code: 'SGD', name: 'Singapore Dollar', symbol: 'S$' },
    { code: 'HKD', name: 'Hong Kong Dollar', symbol: 'HK$' },
    { code: 'NOK', name: 'Norwegian Krone', symbol: 'kr' },
    { code: 'SEK', name: 'Swedish Krona', symbol: 'kr' },
    { code: 'DKK', name: 'Danish Krone', symbol: 'kr' },
    { code: 'PLN', name: 'Polish Zloty', symbol: 'zł' },
    { code: 'CZK', name: 'Czech Koruna', symbol: 'Kč' },
    { code: 'HUF', name: 'Hungarian Forint', symbol: 'Ft' },
    { code: 'RUB', name: 'Russian Ruble', symbol: '₽' },
    { code: 'BRL', name: 'Brazilian Real', symbol: 'R$' },
    { code: 'MXN', name: 'Mexican Peso', symbol: '$' },
    { code: 'ZAR', name: 'South African Rand', symbol: 'R' },
    { code: 'TRY', name: 'Turkish Lira', symbol: '₺' },
    { code: 'NZD', name: 'New Zealand Dollar', symbol: 'NZ$' }
  ]

  // Parse URL parameters on component mount
  useEffect(() => {
    if (urlParams.param1 && urlParams.param2 && urlParams.param3) {
      // Format: /currency-converter/usd-to-eur/100
      const [from, , to] = urlParams.param1.split('-')
      setFromCurrency(from.toUpperCase())
      setToCurrency(to.toUpperCase())
      setAmount(urlParams.param2)
    } else if (urlParams.param1 && urlParams.param1.includes('-to-')) {
      // Format: /currency-converter/usd-to-eur
      const [from, , to] = urlParams.param1.split('-')
      setFromCurrency(from.toUpperCase())
      setToCurrency(to.toUpperCase())
    }
  }, [urlParams])

  // Fetch exchange rate
  const fetchExchangeRate = async () => {
    if (!fromCurrency || !toCurrency) return

    setLoading(true)
    try {
      const response = await fetch(`https://open.er-api.com/v6/latest/${fromCurrency}`)
      const data = await response.json()
      
      if (data.result === 'success' && data.rates[toCurrency]) {
        setExchangeRate(data.rates[toCurrency])
        setLastUpdated(new Date(data.time_last_update_utc))
      } else {
        console.error('Failed to fetch exchange rate')
      }
    } catch (error) {
      console.error('Error fetching exchange rate:', error)
    } finally {
      setLoading(false)
    }
  }

  // Calculate conversion
  useEffect(() => {
    if (amount && exchangeRate) {
      const numAmount = parseFloat(amount)
      if (!isNaN(numAmount)) {
        setResult(numAmount * exchangeRate)
      }
    } else {
      setResult(null)
    }
  }, [amount, exchangeRate])

  // Fetch exchange rate when currencies change
  useEffect(() => {
    fetchExchangeRate()
  }, [fromCurrency, toCurrency])

  const swapCurrencies = () => {
    setFromCurrency(toCurrency)
    setToCurrency(fromCurrency)
  }

  const getCurrencySymbol = (code) => {
    const currency = currencies.find(c => c.code === code)
    return currency ? currency.symbol : code
  }

  const formatCurrency = (value, currencyCode) => {
    if (value === null || value === undefined) return ''
    const symbol = getCurrencySymbol(currencyCode)
    return `${symbol}${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex p-4 rounded-full bg-green-50">
          <TrendingUp className="h-8 w-8 text-green-600" />
        </div>
        <h1 className="text-3xl font-bold text-foreground">Currency Converter</h1>
        <p className="text-lg text-muted-foreground">
          Convert between different currencies with live exchange rates
        </p>
      </div>

      {/* Main Calculator */}
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Convert Currency</CardTitle>
          <CardDescription>
            Enter an amount and select currencies to convert
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Amount Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Amount</label>
            <Input
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="text-lg"
            />
          </div>

          {/* Currency Selection */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div className="space-y-2">
              <label className="text-sm font-medium">From</label>
              <Select value={fromCurrency} onValueChange={setFromCurrency}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {currencies.map((currency) => (
                    <SelectItem key={currency.code} value={currency.code}>
                      {currency.code} - {currency.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-center">
              <Button
                variant="outline"
                size="icon"
                onClick={swapCurrencies}
                className="rounded-full"
              >
                <ArrowRightLeft className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">To</label>
              <Select value={toCurrency} onValueChange={setToCurrency}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {currencies.map((currency) => (
                    <SelectItem key={currency.code} value={currency.code}>
                      {currency.code} - {currency.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Result */}
          {result !== null && (
            <div className="bg-muted p-6 rounded-lg text-center space-y-2">
              <div className="text-2xl font-bold text-foreground">
                {formatCurrency(result, toCurrency)}
              </div>
              <div className="text-sm text-muted-foreground">
                {formatCurrency(parseFloat(amount), fromCurrency)} = {formatCurrency(result, toCurrency)}
              </div>
            </div>
          )}

          {/* Exchange Rate Info */}
          {exchangeRate && (
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <div>
                1 {fromCurrency} = {exchangeRate.toFixed(4)} {toCurrency}
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={fetchExchangeRate}
                disabled={loading}
              >
                <RefreshCw className={`h-3 w-3 mr-1 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
            </div>
          )}

          {lastUpdated && (
            <div className="text-xs text-muted-foreground text-center">
              Last updated: {lastUpdated.toLocaleString()}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Popular Conversions */}
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Popular Conversions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {[
              { from: 'USD', to: 'EUR' },
              { from: 'USD', to: 'GBP' },
              { from: 'USD', to: 'JPY' },
              { from: 'USD', to: 'INR' },
              { from: 'EUR', to: 'USD' },
              { from: 'GBP', to: 'USD' },
              { from: 'EUR', to: 'GBP' },
              { from: 'CAD', to: 'USD' }
            ].map((pair) => (
              <Button
                key={`${pair.from}-${pair.to}`}
                variant="outline"
                size="sm"
                onClick={() => {
                  setFromCurrency(pair.from)
                  setToCurrency(pair.to)
                }}
                className="text-xs"
              >
                {pair.from} → {pair.to}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default CurrencyConverter

