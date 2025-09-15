import { useState, useEffect } from 'react'
import { Calendar } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../Card'
import { Input } from '../Input'

const AgeCalculator = ({ urlParams }) => {
  const [birthDate, setBirthDate] = useState('')
  const [age, setAge] = useState(null)

  useEffect(() => {
    if (birthDate) {
      const today = new Date()
      const dob = new Date(birthDate)

      if (isNaN(dob.getTime())) {
        setAge(null)
        return
      }

      let calculatedAge = today.getFullYear() - dob.getFullYear()
      const monthDifference = today.getMonth() - dob.getMonth()

      if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < dob.getDate())) {
        calculatedAge--
      }
      setAge(calculatedAge)
    } else {
      setAge(null)
    }
  }, [birthDate])

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <div className="inline-flex p-4 rounded-full bg-blue-50">
          <Calendar className="h-8 w-8 text-blue-600" />
        </div>
        <h1 className="text-3xl font-bold text-foreground">Age Calculator</h1>
        <p className="text-lg text-muted-foreground">Calculate your age based on your birth date</p>
      </div>

      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Calculate Your Age</CardTitle>
          <CardDescription>Enter your birth date to find out your age</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Birth Date</label>
            <Input
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
            />
          </div>
          
          {age !== null && (
            <div className="bg-muted p-6 rounded-lg text-center">
              <div className="text-2xl font-bold text-foreground">
                {age} years old
              </div>
              <div className="text-sm text-muted-foreground">Your Age</div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default AgeCalculator

