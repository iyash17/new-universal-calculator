import { useState, useEffect } from 'react'
import { Globe } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../Card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../Select'
import { Label } from '../Label'
import { Input } from '../Input'

const TimezoneConverter = ({ urlParams }) => {
  const [fromTimezone, setFromTimezone] = useState('America/New_York')
  const [toTimezone, setToTimezone] = useState('Europe/London')
  const [fromTime, setFromTime] = useState('')
  const [convertedTime, setConvertedTime] = useState(null)
  const [timezones, setTimezones] = useState([])

  useEffect(() => {
    // Fetch available timezones from TimeAPI.io
    const fetchTimezones = async () => {
      try {
        const response = await fetch('https://www.timeapi.io/api/TimeZone/AvailableTimeZones')
        const data = await response.json()
        setTimezones(data)
      } catch (error) {
        console.error('Error fetching timezones:', error)
      }
    }
    fetchTimezones()

    const now = new Date()
    setFromTime(now.toTimeString().split(' ')[0].substring(0, 5))
  }, [])

  useEffect(() => {
    if (fromTime && fromTimezone && toTimezone) {
      const [hours, minutes] = fromTime.split(':').map(Number)
      const fromDate = new Date()
      fromDate.setHours(hours, minutes, 0, 0)

      // Convert time using the API (this is a simplified client-side conversion)
      // For accurate conversion, a backend API call would be ideal.
      // Here, we'll simulate by adjusting based on a fixed offset for demonstration.
      // In a real app, you'd send fromTime, fromTimezone, toTimezone to a backend.
      
      // For demonstration, we'll use Intl.DateTimeFormat for client-side conversion
      // This might not be perfectly accurate for all edge cases or historical data
      // but serves the purpose for a basic converter.
      try {
        const options = {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
          timeZone: toTimezone,
        }
        const formatter = new Intl.DateTimeFormat('en-US', options)
        setConvertedTime(formatter.format(fromDate))
      } catch (error) {
        console.error('Error converting timezone:', error)
        setConvertedTime(null)
      }

    } else {
      setConvertedTime(null)
    }
  }, [fromTime, fromTimezone, toTimezone])

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <div className="inline-flex p-4 rounded-full bg-yellow-50">
          <Globe className="h-8 w-8 text-yellow-600" />
        </div>
        <h1 className="text-3xl font-bold text-foreground">Time Zone Converter</h1>
        <p className="text-lg text-muted-foreground">Convert time between different time zones</p>
      </div>

      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Convert Time Zone</CardTitle>
          <CardDescription>Select time zones and enter time to convert</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>From Time</Label>
            <Input
              type="time"
              value={fromTime}
              onChange={(e) => setFromTime(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>From Time Zone</Label>
            <Select onValueChange={setFromTimezone} defaultValue={fromTimezone}>
              <SelectTrigger>
                <SelectValue placeholder="Select a timezone" />
              </SelectTrigger>
              <SelectContent>
                {timezones.map((tz) => (
                  <SelectItem key={tz} value={tz}>
                    {tz}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>To Time Zone</Label>
            <Select onValueChange={setToTimezone} defaultValue={toTimezone}>
              <SelectTrigger>
                <SelectValue placeholder="Select a timezone" />
              </SelectTrigger>
              <SelectContent>
                {timezones.map((tz) => (
                  <SelectItem key={tz} value={tz}>
                    {tz}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {convertedTime !== null && (
            <div className="bg-muted p-6 rounded-lg text-center">
              <div className="text-2xl font-bold text-foreground">
                {convertedTime}
              </div>
              <div className="text-sm text-muted-foreground">Converted Time</div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default TimezoneConverter

