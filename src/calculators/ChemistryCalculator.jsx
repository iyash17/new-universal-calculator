import { useState, useEffect } from 'react'
import { FlaskConical } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../Card'
import { Input } from '../Input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../Select'

const ChemistryCalculator = () => {
  const [calculationType, setCalculationType] = useState('molarMass')
  const [value1, setValue1] = useState('')
  const [value2, setValue2] = useState('')
  const [result, setResult] = useState(null)

  useEffect(() => {
    let calculatedResult = null
    const numValue1 = parseFloat(value1)
    const numValue2 = parseFloat(value2)

    if (isNaN(numValue1) || isNaN(numValue2)) {
      setResult(null)
      return
    }

    switch (calculationType) {
      case 'molarMass': // Molar Mass = Mass / Moles
        if (numValue2 !== 0) {
          calculatedResult = numValue1 / numValue2
        }
        break
      case 'density': // Density = Mass / Volume
        if (numValue2 !== 0) {
          calculatedResult = numValue1 / numValue2
        }
        break
      case 'concentration': // Concentration = Moles / Volume
        if (numValue2 !== 0) {
          calculatedResult = numValue1 / numValue2
        }
        break
      default:
        calculatedResult = null
    }
    setResult(calculatedResult)
  }, [calculationType, value1, value2])

  const getLabels = () => {
    switch (calculationType) {
      case 'molarMass':
        return { label1: 'Mass (g)', label2: 'Moles (mol)', resultUnit: 'g/mol' }
      case 'density':
        return { label1: 'Mass (g)', label2: 'Volume (mL)', resultUnit: 'g/mL' }
      case 'concentration':
        return { label1: 'Moles (mol)', label2: 'Volume (L)', resultUnit: 'mol/L' }
      default:
        return { label1: '', label2: '', resultUnit: '' }
    }
  }

  const { label1, label2, resultUnit } = getLabels()

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <div className="inline-flex p-4 rounded-full bg-blue-50">
          <FlaskConical className="h-8 w-8 text-blue-600" />
        </div>
        <h1 className="text-3xl font-bold text-foreground">Chemistry Calculator</h1>
        <p className="text-lg text-muted-foreground">Solve various chemistry problems</p>
      </div>

      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Chemistry Calculations</CardTitle>
          <CardDescription>Select a calculation type and enter values</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Calculation Type</label>
            <Select onValueChange={setCalculationType} defaultValue="molarMass">
              <SelectTrigger>
                <SelectValue placeholder="Select calculation type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="molarMass">Molar Mass (Mass / Moles)</SelectItem>
                <SelectItem value="density">Density (Mass / Volume)</SelectItem>
                <SelectItem value="concentration">Concentration (Moles / Volume)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">{label1}</label>
            <Input
              type="number"
              value={value1}
              onChange={(e) => setValue1(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">{label2}</label>
            <Input
              type="number"
              value={value2}
              onChange={(e) => setValue2(e.target.value)}
            />
          </div>
          
          {result !== null && (
            <div className="bg-muted p-6 rounded-lg text-center">
              <div className="text-2xl font-bold text-foreground">
                {result.toFixed(2)} {resultUnit}
              </div>
              <div className="text-sm text-muted-foreground">Result</div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default ChemistryCalculator

