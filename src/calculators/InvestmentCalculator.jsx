import { useState, useEffect } from 'react'
import { TrendingUp } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../Card'
import { Input } from '../Input'

const InvestmentCalculator = ({ urlParams }) => {
  const [initialInvestment, setInitialInvestment] = useState('')
  const [monthlyContribution, setMonthlyContribution] = useState('')
  const [annualInterestRate, setAnnualInterestRate] = useState('')
  const [investmentPeriod, setInvestmentPeriod] = useState('')
  const [futureValue, setFutureValue] = useState(null)

  useEffect(() => {
    if (initialInvestment && annualInterestRate && investmentPeriod) {
      const P = parseFloat(initialInvestment)
      const r = parseFloat(annualInterestRate) / 100
      const t = parseFloat(investmentPeriod)
      const PMT = parseFloat(monthlyContribution || 0)

      if (isNaN(P) || isNaN(r) || isNaN(t) || P < 0 || t <= 0) {
        setFutureValue(null)
        return
      }

      const n = 12 // compounded monthly
      const totalMonths = t * n
      const monthlyRate = r / n

      let fv = P * Math.pow((1 + monthlyRate), totalMonths)

      if (PMT > 0) {
        fv += PMT * ((Math.pow((1 + monthlyRate), totalMonths) - 1) / monthlyRate)
      }

      setFutureValue(fv)
    } else {
      setFutureValue(null)
    }
  }, [initialInvestment, monthlyContribution, annualInterestRate, investmentPeriod])

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <div className="inline-flex p-4 rounded-full bg-green-50">
          <TrendingUp className="h-8 w-8 text-green-600" />
        </div>
        <h1 className="text-3xl font-bold text-foreground">Investment Calculator</h1>
        <p className="text-lg text-muted-foreground">Calculate investment returns with compound interest</p>
      </div>

      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Estimate Your Investment Growth</CardTitle>
          <CardDescription>Enter your investment details to see potential future value</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Initial Investment ($)</label>
            <Input
              type="number"
              placeholder="e.g., 10000"
              value={initialInvestment}
              onChange={(e) => setInitialInvestment(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Monthly Contribution ($)</label>
            <Input
              type="number"
              placeholder="e.g., 100 (optional)"
              value={monthlyContribution}
              onChange={(e) => setMonthlyContribution(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Annual Interest Rate (%)</label>
            <Input
              type="number"
              placeholder="e.g., 7"
              value={annualInterestRate}
              onChange={(e) => setAnnualInterestRate(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Investment Period (Years)</label>
            <Input
              type="number"
              placeholder="e.g., 10"
              value={investmentPeriod}
              onChange={(e) => setInvestmentPeriod(e.target.value)}
            />
          </div>
          
          {futureValue !== null && (
            <div className="bg-muted p-6 rounded-lg text-center">
              <div className="text-2xl font-bold text-foreground">
                ${futureValue.toFixed(2)}
              </div>
              <div className="text-sm text-muted-foreground">Estimated Future Value</div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default InvestmentCalculator

