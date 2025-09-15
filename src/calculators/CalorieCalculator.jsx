import { useState, useEffect } from 'react'
import { Heart } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../Card'
import { Input } from '../Input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../Select'
import { RadioGroup, RadioGroupItem } from '../RadioGroup'
import { Label } from '../Label'

const CalorieCalculator = ({ urlParams }) => {
  const [gender, setGender] = useState('male')
  const [age, setAge] = useState('')
  const [weight, setWeight] = useState('')
  const [height, setHeight] = useState('')
  const [activityLevel, setActivityLevel] = useState('1.2')
  const [calories, setCalories] = useState(null)

  useEffect(() => {
    if (age && weight && height && gender && activityLevel) {
      const parsedAge = parseFloat(age)
      const parsedWeight = parseFloat(weight)
      const parsedHeight = parseFloat(height)
      const parsedActivityLevel = parseFloat(activityLevel)

      if (isNaN(parsedAge) || isNaN(parsedWeight) || isNaN(parsedHeight) || parsedAge <= 0 || parsedWeight <= 0 || parsedHeight <= 0) {
        setCalories(null)
        return
      }

      let bmr
      if (gender === 'male') {
        bmr = (10 * parsedWeight) + (6.25 * parsedHeight) - (5 * parsedAge) + 5
      } else {
        bmr = (10 * parsedWeight) + (6.25 * parsedHeight) - (5 * parsedAge) - 161
      }

      setCalories(bmr * parsedActivityLevel)
    } else {
      setCalories(null)
    }
  }, [gender, age, weight, height, activityLevel])

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <div className="inline-flex p-4 rounded-full bg-red-50">
          <Heart className="h-8 w-8 text-red-600" />
        </div>
        <h1 className="text-3xl font-bold text-foreground">Calorie Calculator</h1>
        <p className="text-lg text-muted-foreground">Calculate daily calorie needs</p>
      </div>

      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Calculate Your Daily Calorie Needs</CardTitle>
          <CardDescription>Enter your details to estimate your daily calorie intake</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>Gender</Label>
            <RadioGroup defaultValue="male" onValueChange={setGender} className="flex space-x-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="male" id="male" />
                <Label htmlFor="male">Male</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="female" id="female" />
                <Label htmlFor="female">Female</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label>Age (years)</Label>
            <Input
              type="number"
              placeholder="e.g., 30"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Weight (kg)</Label>
            <Input
              type="number"
              placeholder="e.g., 70"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Height (cm)</Label>
            <Input
              type="number"
              placeholder="e.g., 175"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Activity Level</Label>
            <Select onValueChange={setActivityLevel} defaultValue="1.2">
              <SelectTrigger>
                <SelectValue placeholder="Select activity level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1.2">Sedentary (little or no exercise)</SelectItem>
                <SelectItem value="1.375">Lightly active (light exercise/sports 1-3 days/week)</SelectItem>
                <SelectItem value="1.55">Moderately active (moderate exercise/sports 3-5 days/week)</SelectItem>
                <SelectItem value="1.725">Very active (hard exercise/sports 6-7 days a week)</SelectItem>
                <SelectItem value="1.9">Extra active (very hard exercise/physical job)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {calories !== null && ( 
            <div className="bg-muted p-6 rounded-lg text-center">
              <div className="text-2xl font-bold text-foreground">
                {calories.toFixed(0)} Calories/day
              </div>
              <div className="text-sm text-muted-foreground">Estimated Daily Calorie Needs</div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default CalorieCalculator

