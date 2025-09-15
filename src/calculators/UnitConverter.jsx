import { useState, useEffect } from 'react'
import { Ruler } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../Card'
import { Input } from '../Input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../Select'

const UnitConverter = ({ urlParams }) => {
  const [value, setValue] = useState('')
  const [fromUnit, setFromUnit] = useState('meters')
  const [toUnit, setToUnit] = useState('feet')
  const [convertedValue, setConvertedValue] = useState(null)

  const units = {
    length: {
      meters: 1,
      feet: 3.28084,
      inches: 39.3701,
      centimeters: 100,
      kilometers: 0.001,
      miles: 0.000621371,
    },
    weight: {
      kilograms: 1,
      pounds: 2.20462,
      grams: 1000,
      ounces: 35.274,
    },
    volume: {
      liters: 1,
      gallons: 0.264172,
      milliliters: 1000,
      cups: 4.22675,
    },
  }

  const getUnitCategory = (unit) => {
    for (const category in units) {
      if (units[category][unit]) {
        return category
      }
    }
    return null
  }

  useEffect(() => {
    if (value) {
      const numValue = parseFloat(value)
      if (isNaN(numValue)) {
        setConvertedValue(null)
        return
      }

      const fromCategory = getUnitCategory(fromUnit)
      const toCategory = getUnitCategory(toUnit)

      if (fromCategory && toCategory && fromCategory === toCategory) {
        const baseValue = numValue / units[fromCategory][fromUnit]
        setConvertedValue(baseValue * units[toCategory][toUnit])
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
        <div className="inline-flex p-4 rounded-full bg-indigo-50">
          <Ruler className="h-8 w-8 text-indigo-600" />
        </div>
        <h1 className="text-3xl font-bold text-foreground">Unit Converter</h1>
        <p className="text-lg text-muted-foreground">Convert between various units of measurement</p>
      </div>

      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Convert Units</CardTitle>
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
              <Select onValueChange={setFromUnit} defaultValue="meters">
                <SelectTrigger>
                  <SelectValue placeholder="Select unit" />
                </SelectTrigger>
                <SelectContent>
                  <optgroup label="Length">
                    {Object.keys(units.length).map((unit) => (
                      <SelectItem key={unit} value={unit}>{unit.charAt(0).toUpperCase() + unit.slice(1)}</SelectItem>
                    ))}
                  </optgroup>
                  <optgroup label="Weight">
                    {Object.keys(units.weight).map((unit) => (
                      <SelectItem key={unit} value={unit}>{unit.charAt(0).toUpperCase() + unit.slice(1)}</SelectItem>
                    ))}
                  </optgroup>
                  <optgroup label="Volume">
                    {Object.keys(units.volume).map((unit) => (
                      <SelectItem key={unit} value={unit}>{unit.charAt(0).toUpperCase() + unit.slice(1)}</SelectItem>
                    ))}
                  </optgroup>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">To Unit</label>
              <Select onValueChange={setToUnit} defaultValue="feet">
                <SelectTrigger>
                  <SelectValue placeholder="Select unit" />
                </SelectTrigger>
                <SelectContent>
                  <optgroup label="Length">
                    {Object.keys(units.length).map((unit) => (
                      <SelectItem key={unit} value={unit}>{unit.charAt(0).toUpperCase() + unit.slice(1)}</SelectItem>
                    ))}
                  </optgroup>
                  <optgroup label="Weight">
                    {Object.keys(units.weight).map((unit) => (
                      <SelectItem key={unit} value={unit}>{unit.charAt(0).toUpperCase() + unit.slice(1)}</SelectItem>
                    ))}
                  </optgroup>
                  <optgroup label="Volume">
                    {Object.keys(units.volume).map((unit) => (
                      <SelectItem key={unit} value={unit}>{unit.charAt(0).toUpperCase() + unit.slice(1)}</SelectItem>
                    ))}
                  </optgroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {convertedValue !== null && (
            <div className="bg-muted p-6 rounded-lg text-center">
              <div className="text-2xl font-bold text-foreground">
                {convertedValue.toFixed(4)} {toUnit.charAt(0).toUpperCase() + toUnit.slice(1)}
              </div>
              <div className="text-sm text-muted-foreground">Converted Value</div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default UnitConverter

