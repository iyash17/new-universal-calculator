import { useState, useEffect } from 'react'
import { Zap } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../Card'
import { Input } from '../Input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../Select'

const EnergyCalculator = () => {
  const [value, setValue] = useState('')
  const [fromUnit, setFromUnit] = useState('joules')
  const [toUnit, setToUnit] = useState('calories')
  const [convertedValue, setConvertedValue] = useState(null)

  const conversionFactors = {
    joules: {
      joules: 1,
      calories: 0.239006,
      kilojoules: 0.001,
      kilocalories: 0.000239006,
      electronvolts: 6.242e+18,
    },
    calories: {
      joules: 4.184,
      calories: 1,
      kilojoules: 0.004184,
      kilocalories: 0.001,
      electronvolts: 2.611e+19,
    },
    kilojoules: {
      joules: 1000,
      calories: 239.006,
      kilojoules: 1,
      kilocalories: 0.239006,
      electronvolts: 6.242e+21,
    },
    kilocalories: {
      joules: 4184,
      calories: 1000,
      kilojoules: 4.184,
      kilocalories: 1,
      electronvolts: 2.611e+22,
    },
    electronvolts: {
      joules: 1.602e-19,
      calories: 3.829e-20,
      kilojoules: 1.602e-22,
      kilocalories: 3.829e-23,
      electronvolts: 1,
    },
  }

  useEffect(() => {
    if (value) {
      const numValue = parseFloat(value)
      if (isNaN(numValue)) {
        setConvertedValue(null)
        return
      }

      if (conversionFactors[fromUnit] && conversionFactors[fromUnit][toUnit]) {
        const result = numValue * conversionFactors[fromUnit][toUnit]
        setConvertedValue(result)
      } else {
        setConvertedValue(null)
      }
    } else {
      setConvertedValue(null)
    }
  }, [value, fromUnit, toUnit])

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <div className="inline-flex p-4 rounded-full bg-yellow-50">
          <Zap className="h-8 w-8 text-yellow-600" />
        </div>
        <h1 className="text-3xl font-bold text-foreground">Energy Converter</h1>
        <p className="text-lg text-muted-foreground">Convert between various units of energy</p>
      </div>

      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Convert Energy</CardTitle>
          <CardDescription>Enter a value and select units to convert</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Value</label>
            <Input
              type="number"
              placeholder="e.g., 100"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">From Unit</label>
              <Select onValueChange={setFromUnit} defaultValue="joules">
                <SelectTrigger>
                  <SelectValue placeholder="Select unit" />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(conversionFactors).map((unit) => (
                    <SelectItem key={unit} value={unit}>{unit.charAt(0).toUpperCase() + unit.slice(1)}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">To Unit</label>
              <Select onValueChange={setToUnit} defaultValue="calories">
                <SelectTrigger>
                  <SelectValue placeholder="Select unit" />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(conversionFactors).map((unit) => (
                    <SelectItem key={unit} value={unit}>{unit.charAt(0).toUpperCase() + unit.slice(1)}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {convertedValue !== null && (
            <div className="bg-muted p-6 rounded-lg text-center">
              <div className="text-2xl font-bold text-foreground">
                {convertedValue.toExponential(4)} {toUnit.charAt(0).toUpperCase() + toUnit.slice(1)}
              </div>
              <div className="text-sm text-muted-foreground">Converted Value</div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default EnergyCalculator

