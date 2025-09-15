import { useState, useEffect } from 'react'
import { Home } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../Card'
import { Input } from '../Input'

const MortgageCalculator = ({ urlParams }) => {
  const [amount, setAmount] = useState('')
  const [rate, setRate] = useState('')
  const [years, setYears] = useState('')
  const [monthlyPayment, setMonthlyPayment] = useState(null)

  useEffect(() => {
    if (amount && rate && years) {
      const principal = parseFloat(amount)
      const annualRate = parseFloat(rate)
      const loanTermYears = parseFloat(years)

      if (isNaN(principal) || isNaN(annualRate) || isNaN(loanTermYears) || principal <= 0 || loanTermYears <= 0) {
        setMonthlyPayment(null)
        return
      }

      const monthlyRate = annualRate / 100 / 12
      const numberOfPayments = loanTermYears * 12

      if (monthlyRate === 0) {
        setMonthlyPayment(principal / numberOfPayments)
      } else {
        const payment = principal * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
                        (Math.pow(1 + monthlyRate, numberOfPayments) - 1)
        setMonthlyPayment(payment)
      }
    } else {
      setMonthlyPayment(null)
    }
  }, [amount, rate, years])

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <div className="inline-flex p-4 rounded-full bg-green-50">
          <Home className="h-8 w-8 text-green-600" />
        </div>
        <h1 className="text-3xl font-bold text-foreground">Mortgage Calculator</h1>
        <p className="text-lg text-muted-foreground">Calculate your monthly mortgage payments</p>
      </div>

      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Calculate Mortgage Payment</CardTitle>
          <CardDescription>Enter loan details to estimate your monthly payment</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Loan Amount ($)</label>
            <Input
              type="number"
              placeholder="e.g., 200000"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Annual Interest Rate (%)</label>
            <Input
              type="number"
              placeholder="e.g., 3.5"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Loan Term (Years)</label>
            <Input
              type="number"
              placeholder="e.g., 30"
              value={years}
              onChange={(e) => setYears(e.target.value)}
            />
          </div>
          
          {monthlyPayment !== null && (
            <div className="bg-muted p-6 rounded-lg text-center">
              <div className="text-2xl font-bold text-foreground">
                ${monthlyPayment.toFixed(2)}
              </div>
              <div className="text-sm text-muted-foreground">Estimated Monthly Payment</div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default MortgageCalculator


