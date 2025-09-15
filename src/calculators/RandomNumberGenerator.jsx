import { useState } from 'react'
import { Dice5 } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../Card'
import { Input } from '../Input'
import { Button } from '../Button'

const RandomNumberGenerator = () => {
  const [min, setMin] = useState('1')
  const [max, setMax] = useState('100')
  const [randomNumber, setRandomNumber] = useState(null)

  const generateRandomNumber = () => {
    const parsedMin = parseInt(min)
    const parsedMax = parseInt(max)

    if (isNaN(parsedMin) || isNaN(parsedMax)) {
      setRandomNumber(null)
      return
    }

    if (parsedMin > parsedMax) {
      setRandomNumber('Min cannot be greater than Max')
      return
    }

    const random = Math.floor(Math.random() * (parsedMax - parsedMin + 1)) + parsedMin
    setRandomNumber(random)
  }

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <div className="inline-flex p-4 rounded-full bg-purple-50">
          <Dice5 className="h-8 w-8 text-purple-600" />
        </div>
        <h1 className="text-3xl font-bold text-foreground">Random Number Generator</h1>
        <p className="text-lg text-muted-foreground">Generate a random number within a specified range</p>
      </div>

      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Generate Random Number</CardTitle>
          <CardDescription>Enter a minimum and maximum value</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Minimum Value</label>
            <Input
              type="number"
              placeholder="e.g., 1"
              value={min}
              onChange={(e) => setMin(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Maximum Value</label>
            <Input
              type="number"
              placeholder="e.g., 100"
              value={max}
              onChange={(e) => setMax(e.target.value)}
            />
          </div>
          <Button onClick={generateRandomNumber} className="w-full">
            Generate
          </Button>
          
          {randomNumber !== null && (
            <div className="bg-muted p-6 rounded-lg text-center">
              <div className="text-2xl font-bold text-foreground">
                {randomNumber}
              </div>
              <div className="text-sm text-muted-foreground">Your Random Number</div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default RandomNumberGenerator

