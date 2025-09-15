import { Link } from 'react-router-dom'
import { 
  DollarSign, 
  Heart, 
  Clock, 
  Atom, 
  Calculator, 
  Smile,
  TrendingUp,
  Activity,
  Globe,
  Beaker,
  Plus,
  Gamepad2
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './Card'
import { Button } from './Button'

const HomePage = () => {
  const categories = [
    {
      id: 'finance',
      name: 'Finance',
      description: 'Currency, loans, investments, and financial calculations',
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      calculators: [
        { name: 'Currency Converter', path: '/currency-converter' },
        { name: 'Loan Calculator', path: '/loan-calculator' },
        { name: 'Investment Calculator', path: '/investment-calculator' },
        { name: 'Mortgage Calculator', path: '/mortgage-calculator' }
      ]
    },
    {
      id: 'health',
      name: 'Health & Fitness',
      description: 'BMI, calories, body measurements, and health metrics',
      icon: Heart,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      calculators: [
        { name: 'BMI Calculator', path: '/bmi-calculator' },
        { name: 'Calorie Calculator', path: '/calorie-calculator' },
        { name: 'Body Fat Calculator', path: '/body-fat-calculator' },
        { name: 'Water Intake Calculator', path: '/water-intake-calculator' }
      ]
    },
    {
      id: 'time',
      name: 'Time & Date',
      description: 'Time zones, age calculations, and date conversions',
      icon: Clock,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      calculators: [
        { name: 'Time Zone Converter', path: '/timezone-converter' },
        { name: 'Age Calculator', path: '/age-calculator' },
        { name: 'Date Calculator', path: '/date-calculator' },
        { name: 'Working Days Calculator', path: '/working-days-calculator' }
      ]
    },
    {
      id: 'science',
      name: 'Science',
      description: 'Physics, chemistry, and scientific calculations',
      icon: Atom,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      calculators: [
        { name: 'Unit Converter', path: '/unit-converter' },
        { name: 'Physics Calculator', path: '/physics-calculator' },
        { name: 'Chemistry Calculator', path: '/chemistry-calculator' },
        { name: 'Temperature Converter', path: '/temperature-converter' }
      ]
    },
    {
      id: 'math',
      name: 'Mathematics',
      description: 'Basic math, algebra, geometry, and statistics',
      icon: Calculator,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      calculators: [
        { name: 'Basic Calculator', path: '/basic-calculator' },
        { name: 'Percentage Calculator', path: '/percentage-calculator' },
        { name: 'Fraction Calculator', path: '/fraction-calculator' },
        { name: 'Statistics Calculator', path: '/statistics-calculator' }
      ]
    },
    {
      id: 'fun',
      name: 'Fun & Games',
      description: 'Entertainment calculators and fun tools',
      icon: Smile,
      color: 'text-pink-600',
      bgColor: 'bg-pink-50',
      calculators: [
        { name: 'Love Calculator', path: '/love-calculator' },
        { name: 'Random Number Generator', path: '/random-number-generator' },
        { name: 'Password Generator', path: '/password-generator' },
        { name: 'Color Palette Generator', path: '/color-palette-generator' }
      ]
    }
  ]

  const popularCalculators = [
    { name: 'Currency Converter', path: '/currency-converter', icon: DollarSign },
    { name: 'BMI Calculator', path: '/bmi-calculator', icon: Activity },
    { name: 'Percentage Calculator', path: '/percentage-calculator', icon: TrendingUp },
    { name: 'Time Zone Converter', path: '/timezone-converter', icon: Globe },
    { name: 'Unit Converter', path: '/unit-converter', icon: Beaker },
    { name: 'Basic Calculator', path: '/basic-calculator', icon: Calculator }
  ]

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center space-y-6">
        <h1 className="text-4xl md:text-6xl font-bold text-foreground">
          Universal Calculator
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Your all-in-one calculator suite. From currency conversion to BMI calculations, 
          we've got every calculation you need. Just type what you want to calculate!
        </p>
        <div className="flex flex-wrap justify-center gap-4 mt-8">
          <div className="bg-muted p-4 rounded-lg">
            <p className="text-sm text-muted-foreground mb-2">Try typing:</p>
            <p className="font-mono text-sm">"convert 200 USD to INR"</p>
          </div>
          <div className="bg-muted p-4 rounded-lg">
            <p className="text-sm text-muted-foreground mb-2">Or:</p>
            <p className="font-mono text-sm">"BMI for 70kg 170cm"</p>
          </div>
        </div>
      </section>

      {/* Popular Calculators */}
      <section>
        <h2 className="text-2xl font-bold text-foreground mb-6">Popular Calculators</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {popularCalculators.map((calc) => {
            const IconComponent = calc.icon
            return (
              <Link key={calc.path} to={calc.path}>
                <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
                  <CardContent className="p-4 text-center">
                    <IconComponent className="h-8 w-8 mx-auto mb-2 text-primary" />
                    <p className="text-sm font-medium">{calc.name}</p>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      </section>

      <div className="ad-placeholder w-full h-24 bg-gray-200 flex items-center justify-center text-sm text-gray-500 my-12">
        Advertisement (Middle)
      </div>

      {/* Categories */}
      <section>
        <h2 className="text-2xl font-bold text-foreground mb-6">Calculator Categories</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => {
            const IconComponent = category.icon
            return (
              <Card key={category.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${category.bgColor}`}>
                      <IconComponent className={`h-6 w-6 ${category.color}`} />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{category.name}</CardTitle>
                      <CardDescription>{category.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {category.calculators.slice(0, 3).map((calc) => (
                      <Link
                        key={calc.path}
                        to={calc.path}
                        className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {calc.name}
                      </Link>
                    ))}
                    {category.calculators.length > 3 && (
                      <Link
                        to={`/category/${category.id}`}
                        className="inline-flex items-center text-sm text-primary hover:underline"
                      >
                        <Plus className="h-3 w-3 mr-1" />
                        {category.calculators.length - 3} more
                      </Link>
                    )}
                  </div>
                  <Link to={`/category/${category.id}`}>
                    <Button variant="outline" className="w-full mt-4">
                      View All {category.name}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </section>

      <div className="ad-placeholder w-full h-24 bg-gray-200 flex items-center justify-center text-sm text-gray-500 my-12">
        Advertisement (Before Features)
      </div>

      {/* Features */}
      <section className="bg-muted rounded-lg p-8">
        <h2 className="text-2xl font-bold text-foreground mb-6 text-center">Why Choose Universal Calculator?</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="bg-primary/10 p-3 rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center">
              <Calculator className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">All-in-One</h3>
            <p className="text-sm text-muted-foreground">
              Over 50+ calculators in one place. No need to search multiple websites.
            </p>
          </div>
          <div className="text-center">
            <div className="bg-primary/10 p-3 rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center">
              <Globe className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">Smart Search</h3>
            <p className="text-sm text-muted-foreground">
              Type natural language queries and get instant results with pre-filled values.
            </p>
          </div>
          <div className="text-center">
            <div className="bg-primary/10 p-3 rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center">
              <Activity className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">Mobile First</h3>
            <p className="text-sm text-muted-foreground">
              Optimized for mobile devices with responsive design and touch-friendly interface.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage

