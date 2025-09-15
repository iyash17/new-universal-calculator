import { useState } from 'react'
import { HeartCrack } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../Card'
import { Input } from '../Input'
import { Button } from '../Button'

const LoveCalculator = () => {
  const [name1, setName1] = useState('')
  const [name2, setName2] = useState('')
  const [result, setResult] = useState(null)

  const calculateLove = () => {
    if (name1.trim() === '' || name2.trim() === '') {
      setResult(null)
      return
    }

    const combinedNames = (name1.toLowerCase() + name2.toLowerCase()).replace(/\s/g, '')
    let score = 0

    for (let i = 0; i < combinedNames.length; i++) {
      score += combinedNames.charCodeAt(i)
    }

    const lovePercentage = (score % 101)
    setResult(lovePercentage)
  }

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <div className="inline-flex p-4 rounded-full bg-pink-50">
          <HeartCrack className="h-8 w-8 text-pink-600" />
        </div>
        <h1 className="text-3xl font-bold text-foreground">Love Calculator</h1>
        <p className="text-lg text-muted-foreground">Find out your love compatibility!</p>
      </div>

      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Calculate Love Score</CardTitle>
          <CardDescription>Enter two names to see your compatibility</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Your Name</label>
            <Input
              type="text"
              placeholder="Enter your name"
              value={name1}
              onChange={(e) => setName1(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Partner's Name</label>
            <Input
              type="text"
              placeholder="Enter partner's name"
              value={name2}
              onChange={(e) => setName2(e.target.value)}
            />
          </div>
          <Button onClick={calculateLove} className="w-full">
            Calculate Love
          </Button>
          
          {result !== null && (
            <div className="bg-muted p-6 rounded-lg text-center">
              <div className="text-2xl font-bold text-foreground">
                {result}%
              </div>
              <div className="text-sm text-muted-foreground">Love Compatibility</div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default LoveCalculator

