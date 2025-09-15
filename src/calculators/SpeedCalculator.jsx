import { useState, useEffect } from 'react'
import { Gauge } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../Card'
import { Input } from '../Input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../Select'

const SpeedCalculator = () => {
  const [distance, setDistance] = useState('')
  const [distanceUnit, setDistanceUnit] = useState('kilometers')
  const [time, setTime] = useState('')
  const [timeUnit, setTimeUnit] = useState('hours')
  const [speed, setSpeed] = useState(null)
  const [speedUnit, setSpeedUnit] = useState('km/h')

  const distanceConversionFactors = {
    meters: 1,
    kilometers: 1000,
    miles: 1609.34,
    feet: 0.3048,
  }

  const timeConversionFactors = {
    seconds: 1,
    minutes: 60,
    hours: 3600,
  }

  useEffect(() => {
    if (distance && time) {
      const parsedDistance = parseFloat(distance)
      const parsedTime = parseFloat(time)

      if (isNaN(parsedDistance) || isNaN(parsedTime) || parsedTime <= 0) {
        setSpeed(null)
        return
      }

      // Convert distance to meters
      const distanceInMeters = parsedDistance * distanceConversionFactors[distanceUnit]

      // Convert time to seconds
      const timeInSeconds = parsedTime * timeConversionFactors[timeUnit]

      // Calculate speed in meters/second
      const speedInMps = distanceInMeters / timeInSeconds

      // Convert speed to desired output unit
      let calculatedSpeed
      if (speedUnit === 'km/h') {
        calculatedSpeed = speedInMps * 3.6 // m/s to km/h
      } else if (speedUnit === 'mph') {
        calculatedSpeed = speedInMps * 2.23694 // m/s to mph
      } else if (speedUnit === 'm/s') {
        calculatedSpeed = speedInMps
      }

      setSpeed(calculatedSpeed)
    } else {
      setSpeed(null)
    }
  }, [distance, distanceUnit, time, timeUnit, speedUnit])

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <div className="inline-flex p-4 rounded-full bg-orange-50">
          <Gauge className="h-8 w-8 text-orange-600" />
        </div>
        <h1 className="text-3xl font-bold text-foreground">Speed Calculator</h1>
        <p className="text-lg text-muted-foreground">Calculate speed based on distance and time</p>
      </div>

      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Calculate Speed</CardTitle>
          <CardDescription>Enter distance and time to calculate speed</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Distance</label>
              <Input
                type="number"
                placeholder="e.g., 100"
                value={distance}
                onChange={(e) => setDistance(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Unit</label>
              <Select onValueChange={setDistanceUnit} defaultValue="kilometers">
                <SelectTrigger>
                  <SelectValue placeholder="Select unit" />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(distanceConversionFactors).map((unit) => (
                    <SelectItem key={unit} value={unit}>{unit.charAt(0).toUpperCase() + unit.slice(1)}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Time</label>
              <Input
                type="number"
                placeholder="e.g., 2"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Unit</label>
              <Select onValueChange={setTimeUnit} defaultValue="hours">
                <SelectTrigger>
                  <SelectValue placeholder="Select unit" />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(timeConversionFactors).map((unit) => (
                    <SelectItem key={unit} value={unit}>{unit.charAt(0).toUpperCase() + unit.slice(1)}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Speed Unit</label>
            <Select onValueChange={setSpeedUnit} defaultValue="km/h">
              <SelectTrigger>
                <SelectValue placeholder="Select speed unit" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="km/h">Kilometers/Hour (km/h)</SelectItem>
                <SelectItem value="mph">Miles/Hour (mph)</SelectItem>
                <SelectItem value="m/s">Meters/Second (m/s)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {speed !== null && (
            <div className="bg-muted p-6 rounded-lg text-center">
              <div className="text-2xl font-bold text-foreground">
                {speed.toFixed(2)} {speedUnit}
              </div>
              <div className="text-sm text-muted-foreground">Calculated Speed</div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default SpeedCalculator


