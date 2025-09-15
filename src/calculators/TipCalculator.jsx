import { useState, useEffect } from 'react'
import { DollarSign } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../Card'
import { Input } from '../Input'
import { Slider } from '../Slider'
import { Label } from '../Label'

const TipCalculator = ({ urlParams }) => {
  const [billAmount, setBillAmount] = useState('')
  const [tipPercentage, setTipPercentage] = useState(15)
  const [numberOfPeople, setNumberOfPeople] = useState(1)
  const [tipAmount, setTipAmount] = useState(null)
  const [totalAmount, setTotalAmount] = useState(null)
  const [amountPerPerson, setAmountPerPerson] = useState(null)

  useEffect(() => {
    if (billAmount) {
      const bill = parseFloat(billAmount)
      if (isNaN(bill) || bill < 0) {
        setTipAmount(null)
        setTotalAmount(null)
        setAmountPerPerson(null)
        return
      }

      const tip = bill * (tipPercentage / 100)
      const total = bill + tip
      const perPerson = total / numberOfPeople

      setTipAmount(tip)
      setTotalAmount(total)
      setAmountPerPerson(perPerson)
    } else {
      setTipAmount(null)
      setTotalAmount(null)
      setAmountPerPerson(null)
    }
  }, [billAmount, tipPercentage, numberOfPeople])

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <div className="inline-flex p-4 rounded-full bg-green-50">
          <DollarSign className="h-8 w-8 text-green-600" />
        </div>
        <h1 className="text-3xl font-bold text-foreground">Tip Calculator</h1>
        <p className="text-lg text-muted-foreground">Calculate tips and split bills easily</p>
      </div>

      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Calculate Your Tip</CardTitle>
          <CardDescription>Enter bill details to calculate tip and total amount</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>Bill Amount ($)</Label>
            <Input
              type="number"
              placeholder="e.g., 50.00"
              value={billAmount}
              onChange={(e) => setBillAmount(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Tip Percentage ({tipPercentage}%)</Label>
            <Slider
              min={0}
              max={30}
              step={1}
              value={[tipPercentage]}
              onValueChange={(value) => setTipPercentage(value[0])}
            />
          </div>
          <div className="space-y-2">
            <Label>Number of People ({numberOfPeople})</Label>
            <Slider
              min={1}
              max={10}
              step={1}
              value={[numberOfPeople]}
              onValueChange={(value) => setNumberOfPeople(value[0])}
            />
          </div>
          
          {totalAmount !== null && (
            <div className="bg-muted p-6 rounded-lg space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Tip Amount:</span>
                <span className="text-xl font-bold text-foreground">${tipAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Total Amount:</span>
                <span className="text-2xl font-bold text-foreground">${totalAmount.toFixed(2)}</span>
              </div>
              {numberOfPeople > 1 && (
                <div className="flex justify-between items-center border-t pt-4 mt-4">
                  <span className="text-muted-foreground">Amount Per Person:</span>
                  <span className="text-xl font-bold text-foreground">${amountPerPerson.toFixed(2)}</span>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default TipCalculator

