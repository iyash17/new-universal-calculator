import { useState, useEffect } from 'react'
import { Activity, Scale, Ruler } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../Card'
import { Button } from '../Button'
import { Input } from '../Input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../Select'

const BMICalculator = ({ urlParams }) => {
  const [weight, setWeight] = useState('')
  const [height, setHeight] = useState('')
  const [weightUnit, setWeightUnit] = useState('kg')
  const [heightUnit, setHeightUnit] = useState('cm')
  const [bmi, setBmi] = useState(null)
  const [category, setCategory] = useState('')
  const [healthyWeightRange, setHealthyWeightRange] = useState(null)

  // Parse URL parameters on component mount
  useEffect(() => {
    if (urlParams.param1 && urlParams.param2) {
      // Format: /bmi-calculator/70/170 (weight in kg, height in cm)
      setWeight(urlParams.param1)
      setHeight(urlParams.param2)
      setWeightUnit('kg')
      setHeightUnit('cm')
    }
  }, [urlParams])

  // Calculate BMI
  useEffect(() => {
    if (weight && height) {
      const weightInKg = weightUnit === 'kg' ? parseFloat(weight) : parseFloat(weight) * 0.453592
      const heightInM = heightUnit === 'cm' ? parseFloat(height) / 100 : 
                       heightUnit === 'ft' ? parseFloat(height) * 0.3048 : parseFloat(height)

      if (weightInKg > 0 && heightInM > 0) {
        const calculatedBmi = weightInKg / (heightInM * heightInM)
        setBmi(calculatedBmi)

        // Determine category
        if (calculatedBmi < 18.5) {
          setCategory('Underweight')
        } else if (calculatedBmi < 25) {
          setCategory('Normal weight')
        } else if (calculatedBmi < 30) {
          setCategory('Overweight')
        } else {
          setCategory('Obese')
        }

        // Calculate healthy weight range
        const minHealthyWeight = 18.5 * (heightInM * heightInM)
        const maxHealthyWeight = 24.9 * (heightInM * heightInM)
        
        if (weightUnit === 'lbs') {
          setHealthyWeightRange({
            min: (minHealthyWeight * 2.20462).toFixed(1),
            max: (maxHealthyWeight * 2.20462).toFixed(1),
            unit: 'lbs'
          })
        } else {
          setHealthyWeightRange({
            min: minHealthyWeight.toFixed(1),
            max: maxHealthyWeight.toFixed(1),
            unit: 'kg'
          })
        }
      }
    } else {
      setBmi(null)
      setCategory('')
      setHealthyWeightRange(null)
    }
  }, [weight, height, weightUnit, heightUnit])

  const getBmiColor = (bmiValue) => {
    if (bmiValue < 18.5) return 'text-blue-600'
    if (bmiValue < 25) return 'text-green-600'
    if (bmiValue < 30) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getBmiBackground = (bmiValue) => {
    if (bmiValue < 18.5) return 'bg-blue-50'
    if (bmiValue < 25) return 'bg-green-50'
    if (bmiValue < 30) return 'bg-yellow-50'
    return 'bg-red-50'
  }

  const getBmiDescription = (category) => {
    switch (category) {
      case 'Underweight':
        return 'You may need to gain weight. Consider consulting with a healthcare provider.'
      case 'Normal weight':
        return 'You have a healthy body weight. Maintain your current lifestyle.'
      case 'Overweight':
        return 'You may benefit from weight loss. Consider a balanced diet and regular exercise.'
      case 'Obese':
        return 'Consider consulting with a healthcare provider for a weight management plan.'
      default:
        return ''
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex p-4 rounded-full bg-red-50">
          <Activity className="h-8 w-8 text-red-600" />
        </div>
        <h1 className="text-3xl font-bold text-foreground">BMI Calculator</h1>
        <p className="text-lg text-muted-foreground">
          Calculate your Body Mass Index and understand your health status
        </p>
      </div>

      {/* Main Calculator */}
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Calculate Your BMI</CardTitle>
          <CardDescription>
            Enter your weight and height to calculate your Body Mass Index
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Weight Input */}
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2 space-y-2">
              <label className="text-sm font-medium flex items-center">
                <Scale className="h-4 w-4 mr-2" />
                Weight
              </label>
              <Input
                type="number"
                placeholder="Enter weight"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="text-lg"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Unit</label>
              <Select value={weightUnit} onValueChange={setWeightUnit}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="kg">kg</SelectItem>
                  <SelectItem value="lbs">lbs</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Height Input */}
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2 space-y-2">
              <label className="text-sm font-medium flex items-center">
                <Ruler className="h-4 w-4 mr-2" />
                Height
              </label>
              <Input
                type="number"
                placeholder="Enter height"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="text-lg"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Unit</label>
              <Select value={heightUnit} onValueChange={setHeightUnit}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cm">cm</SelectItem>
                  <SelectItem value="ft">ft</SelectItem>
                  <SelectItem value="m">m</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Result */}
          {bmi !== null && (
            <div className={`p-6 rounded-lg text-center space-y-4 ${getBmiBackground(bmi)}`}>
              <div className="space-y-2">
                <div className={`text-4xl font-bold ${getBmiColor(bmi)}`}>
                  {bmi.toFixed(1)}
                </div>
                <div className={`text-lg font-semibold ${getBmiColor(bmi)}`}>
                  {category}
                </div>
                <div className="text-sm text-muted-foreground">
                  {getBmiDescription(category)}
                </div>
              </div>
            </div>
          )}

          {/* Healthy Weight Range */}
          {healthyWeightRange && (
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Healthy Weight Range</h3>
              <p className="text-sm text-muted-foreground">
                For your height, a healthy weight range is{' '}
                <span className="font-medium">
                  {healthyWeightRange.min} - {healthyWeightRange.max} {healthyWeightRange.unit}
                </span>
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* BMI Categories */}
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>BMI Categories</CardTitle>
          <CardDescription>Understanding BMI ranges and their meanings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
              <span className="font-medium text-blue-800">Underweight</span>
              <span className="text-blue-600">Below 18.5</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
              <span className="font-medium text-green-800">Normal weight</span>
              <span className="text-green-600">18.5 - 24.9</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
              <span className="font-medium text-yellow-800">Overweight</span>
              <span className="text-yellow-600">25 - 29.9</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
              <span className="font-medium text-red-800">Obese</span>
              <span className="text-red-600">30 and above</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Disclaimer */}
      <Card className="max-w-2xl mx-auto">
        <CardContent className="pt-6">
          <div className="text-sm text-muted-foreground space-y-2">
            <p className="font-medium">Important Note:</p>
            <p>
              BMI is a screening tool and does not diagnose body fatness or health. 
              It may not be accurate for athletes, pregnant women, or elderly individuals. 
              Always consult with a healthcare provider for personalized health advice.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default BMICalculator

