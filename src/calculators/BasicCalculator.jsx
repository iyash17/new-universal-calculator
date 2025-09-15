import { useState } from 'react'
import { Calculator } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../Card'
import { Button } from '../Button'

const BasicCalculator = ({ urlParams }) => {
  const [display, setDisplay] = useState('0')
  const [previousValue, setPreviousValue] = useState(null)
  const [operation, setOperation] = useState(null)
  const [waitingForOperand, setWaitingForOperand] = useState(false)

  const inputNumber = (num) => {
    if (waitingForOperand) {
      setDisplay(String(num))
      setWaitingForOperand(false)
    } else {
      setDisplay(display === '0' ? String(num) : display + num)
    }
  }

  const inputOperation = (nextOperation) => {
    const inputValue = parseFloat(display)

    if (previousValue === null) {
      setPreviousValue(inputValue)
    } else if (operation) {
      const currentValue = previousValue || 0
      const newValue = calculate(currentValue, inputValue, operation)

      setDisplay(String(newValue))
      setPreviousValue(newValue)
    }

    setWaitingForOperand(true)
    setOperation(nextOperation)
  }

  const calculate = (firstValue, secondValue, operation) => {
    switch (operation) {
      case '+':
        return firstValue + secondValue
      case '-':
        return firstValue - secondValue
      case '*':
        return firstValue * secondValue
      case '/':
        return firstValue / secondValue
      case '=':
        return secondValue
      default:
        return secondValue
    }
  }

  const performCalculation = () => {
    const inputValue = parseFloat(display)

    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation)
      setDisplay(String(newValue))
      setPreviousValue(null)
      setOperation(null)
      setWaitingForOperand(true)
    }
  }

  const clear = () => {
    setDisplay('0')
    setPreviousValue(null)
    setOperation(null)
    setWaitingForOperand(false)
  }

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <div className="inline-flex p-4 rounded-full bg-orange-50">
          <Calculator className="h-8 w-8 text-orange-600" />
        </div>
        <h1 className="text-3xl font-bold text-foreground">Basic Calculator</h1>
        <p className="text-lg text-muted-foreground">Standard calculator for basic arithmetic operations</p>
      </div>

      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Calculator</CardTitle>
          <CardDescription>Perform basic arithmetic calculations</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-muted p-4 rounded-lg text-right">
            <div className="text-2xl font-mono font-bold text-foreground">
              {display}
            </div>
          </div>
          
          <div className="grid grid-cols-4 gap-2">
            <Button variant="outline" onClick={clear} className="col-span-2">
              Clear
            </Button>
            <Button variant="outline" onClick={() => inputOperation('/')}>
              ÷
            </Button>
            <Button variant="outline" onClick={() => inputOperation('*')}>
              ×
            </Button>
            
            <Button variant="outline" onClick={() => inputNumber(7)}>7</Button>
            <Button variant="outline" onClick={() => inputNumber(8)}>8</Button>
            <Button variant="outline" onClick={() => inputNumber(9)}>9</Button>
            <Button variant="outline" onClick={() => inputOperation('-')}>-</Button>
            
            <Button variant="outline" onClick={() => inputNumber(4)}>4</Button>
            <Button variant="outline" onClick={() => inputNumber(5)}>5</Button>
            <Button variant="outline" onClick={() => inputNumber(6)}>6</Button>
            <Button variant="outline" onClick={() => inputOperation('+')} className="row-span-2">+</Button>
            
            <Button variant="outline" onClick={() => inputNumber(1)}>1</Button>
            <Button variant="outline" onClick={() => inputNumber(2)}>2</Button>
            <Button variant="outline" onClick={() => inputNumber(3)}>3</Button>
            
            <Button variant="outline" onClick={() => inputNumber(0)} className="col-span-2">0</Button>
            <Button variant="outline" onClick={() => setDisplay(display + '.')}>.</Button>
            <Button onClick={performCalculation}>=</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default BasicCalculator

