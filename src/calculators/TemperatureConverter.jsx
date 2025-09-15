import { useState, useEffect } from 'react'
import { Thermometer } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../Card'
import { Input } from '../Input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../Select'

const TemperatureConverter = ({ urlParams }) => {
  const [temperature, setTemperature] = useState('')
  const [fromUnit, setFromUnit] = useState('celsius')
  const [toUnit, setToUnit] = useState('fahrenheit')
  const [convertedTemperature, setConvertedTemperature] = useState(null)

  useEffect(() => {
    if (temperature) {
      const temp = parseFloat(temperature)
      if (isNaN(temp)) {
        setConvertedTemperature(null)
        return
      }

      let celsius
      if (fromUnit === 'celsius') {
        celsius = temp
      } else if (fromUnit === 'fahrenheit') {
        celsius = (temp - 32) * 5 / 9
      } else if (fromUnit === 'kelvin') {
        celsius = temp - 273.15
      }

      let result
      if (toUnit === 'celsius') {
        result = celsius
      } else if (toUnit === 'fahrenheit') {
        result = (celsius * 9 / 5) + 32
      } else if (toUnit === 'kelvin') {
        result = celsius + 273.15
      }
      setConvertedTemperature(result)
    } else {
      setConvertedTemperature(null)
    }
  }, [temperature, fromUnit, toUnit])

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <div className="inline-flex p-4 rounded-full bg-purple-50">
          <Thermometer className="h-8 w-8 text-purple-600" />
        </div>
        <h1 className="text-3xl font-bold text-foreground">Temperature Converter</h1>
        <p className="text-lg text-muted-foreground">Convert between Celsius, Fahrenheit, and Kelvin</p>
      </div>

      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Convert Temperature</CardTitle>
          <CardDescription>Enter a temperature and select units to convert</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Temperature</label>
            <Input
              type="number"
              placeholder="e.g., 25"
              value={temperature}
              onChange={(e) => setTemperature(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">From Unit</label>
              <Select onValueChange={setFromUnit} defaultValue="celsius">
                <SelectTrigger>
                  <SelectValue placeholder="Select unit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="celsius">Celsius</SelectItem>
                  <SelectItem value="fahrenheit">Fahrenheit</SelectItem>
                  <SelectItem value="kelvin">Kelvin</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">To Unit</label>
              <Select onValueChange={setToUnit} defaultValue="fahrenheit">
                <SelectTrigger>
                  <SelectValue placeholder="Select unit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="celsius">Celsius</SelectItem>
                  <SelectItem value="fahrenheit">Fahrenheit</SelectItem>
                  <SelectItem value="kelvin">Kelvin</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {convertedTemperature !== null && (
            <div className="bg-muted p-6 rounded-lg text-center">
              <div className="text-2xl font-bold text-foreground">
                {convertedTemperature.toFixed(2)} {toUnit.charAt(0).toUpperCase() + toUnit.slice(1)}
              </div>
              <div className="text-sm text-muted-foreground">Converted Temperature</div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default TemperatureConverter

