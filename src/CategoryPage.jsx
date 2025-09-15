import { useParams, Link } from 'react-router-dom'
import { 
  DollarSign, 
  Heart, 
  Clock, 
  Atom, 
  Calculator, 
  Smile 
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './Card'

const CategoryPage = () => {
  const { categoryId } = useParams()

  const categories = {
    finance: {
      name: 'Finance',
      description: 'Financial calculations for loans, investments, currency conversion, and more',
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      calculators: [
        {
          name: 'Currency Converter',
          path: '/currency-converter',
          description: 'Convert between different currencies with live exchange rates'
        },
        {
          name: 'Loan Calculator',
          path: '/loan-calculator',
          description: 'Calculate monthly payments, interest, and total cost of loans'
        },
        {
          name: 'Investment Calculator',
          path: '/investment-calculator',
          description: 'Calculate compound interest and investment returns'
        },
        {
          name: 'Mortgage Calculator',
          path: '/mortgage-calculator',
          description: 'Calculate mortgage payments and amortization schedules'
        },
        {
          name: 'Tip Calculator',
          path: '/tip-calculator',
          description: 'Calculate tips and split bills among multiple people'
        },
        {
          name: 'Tax Calculator',
          path: '/tax-calculator',
          description: 'Calculate income tax and take-home pay'
        }
      ]
    },
    health: {
      name: 'Health & Fitness',
      description: 'Health metrics, fitness calculations, and body measurements',
      icon: Heart,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      calculators: [
        {
          name: 'BMI Calculator',
          path: '/bmi-calculator',
          description: 'Calculate Body Mass Index and health status'
        },
        {
          name: 'Calorie Calculator',
          path: '/calorie-calculator',
          description: 'Calculate daily calorie needs and weight loss goals'
        },
        {
          name: 'Body Fat Calculator',
          path: '/body-fat-calculator',
          description: 'Estimate body fat percentage using various methods'
        },
        {
          name: 'Water Intake Calculator',
          path: '/water-intake-calculator',
          description: 'Calculate daily water intake requirements'
        },
        {
          name: 'Heart Rate Calculator',
          path: '/heart-rate-calculator',
          description: 'Calculate target heart rate zones for exercise'
        },
        {
          name: 'Pregnancy Calculator',
          path: '/pregnancy-calculator',
          description: 'Calculate due date and pregnancy milestones'
        }
      ]
    },
    time: {
      name: 'Time & Date',
      description: 'Time zone conversions, age calculations, and date arithmetic',
      icon: Clock,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      calculators: [
        {
          name: 'Time Zone Converter',
          path: '/timezone-converter',
          description: 'Convert time between different time zones'
        },
        {
          name: 'Age Calculator',
          path: '/age-calculator',
          description: 'Calculate exact age in years, months, and days'
        },
        {
          name: 'Date Calculator',
          path: '/date-calculator',
          description: 'Add or subtract days, months, and years from dates'
        },
        {
          name: 'Working Days Calculator',
          path: '/working-days-calculator',
          description: 'Calculate business days between two dates'
        },
        {
          name: 'Time Duration Calculator',
          path: '/time-duration-calculator',
          description: 'Calculate time differences and durations'
        },
        {
          name: 'World Clock',
          path: '/world-clock',
          description: 'View current time in multiple time zones'
        }
      ]
    },
    science: {
      name: 'Science',
      description: 'Physics, chemistry, and scientific unit conversions',
      icon: Atom,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      calculators: [
        {
          name: 'Unit Converter',
          path: '/unit-converter',
          description: 'Convert between different units of measurement'
        },
        {
          name: 'Physics Calculator',
          path: '/physics-calculator',
          description: 'Calculate physics formulas and equations'
        },
        {
          name: 'Chemistry Calculator',
          path: '/chemistry-calculator',
          description: 'Calculate molecular weights and chemical equations'
        },
        {
          name: 'Temperature Converter',
          path: '/temperature-converter',
          description: 'Convert between Celsius, Fahrenheit, and Kelvin'
        },
        {
          name: 'Speed Calculator',
          path: '/speed-calculator',
          description: 'Calculate speed, distance, and time relationships'
        },
        {
          name: 'Energy Calculator',
          path: '/energy-calculator',
          description: 'Calculate energy consumption and conversions'
        }
      ]
    },
    math: {
      name: 'Mathematics',
      description: 'Mathematical calculations from basic arithmetic to advanced statistics',
      icon: Calculator,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      calculators: [
        {
          name: 'Basic Calculator',
          path: '/basic-calculator',
          description: 'Standard calculator for basic arithmetic operations'
        },
        {
          name: 'Percentage Calculator',
          path: '/percentage-calculator',
          description: 'Calculate percentages, percentage change, and ratios'
        },
        {
          name: 'Fraction Calculator',
          path: '/fraction-calculator',
          description: 'Add, subtract, multiply, and divide fractions'
        },
        {
          name: 'Statistics Calculator',
          path: '/statistics-calculator',
          description: 'Calculate mean, median, mode, and standard deviation'
        },
        {
          name: 'Algebra Calculator',
          path: '/algebra-calculator',
          description: 'Solve algebraic equations and expressions'
        },
        {
          name: 'Geometry Calculator',
          path: '/geometry-calculator',
          description: 'Calculate area, perimeter, and volume of shapes'
        }
      ]
    },
    fun: {
      name: 'Fun & Games',
      description: 'Entertainment calculators and fun tools for everyday use',
      icon: Smile,
      color: 'text-pink-600',
      bgColor: 'bg-pink-50',
      calculators: [
        {
          name: 'Love Calculator',
          path: '/love-calculator',
          description: 'Calculate love compatibility between two names'
        },
        {
          name: 'Random Number Generator',
          path: '/random-number-generator',
          description: 'Generate random numbers within specified ranges'
        },
        {
          name: 'Password Generator',
          path: '/password-generator',
          description: 'Generate secure passwords with custom criteria'
        },
        {
          name: 'Color Palette Generator',
          path: '/color-palette-generator',
          description: 'Generate beautiful color palettes for design'
        },
        {
          name: 'QR Code Generator',
          path: '/qr-code-generator',
          description: 'Generate QR codes for text, URLs, and more'
        },
        {
          name: 'Text Counter',
          path: '/text-counter',
          description: 'Count characters, words, and paragraphs in text'
        }
      ]
    }
  }

  const category = categories[categoryId]

  if (!category) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-foreground mb-4">Category Not Found</h1>
        <p className="text-muted-foreground">The requested category does not exist.</p>
        <Link to="/" className="text-primary hover:underline mt-4 inline-block">
          Return to Home
        </Link>
      </div>
    )
  }

  const IconComponent = category.icon

  return (
    <div className="space-y-8">
      {/* Category Header */}
      <div className="text-center space-y-4">
        <div className={`inline-flex p-4 rounded-full ${category.bgColor}`}>
          <IconComponent className={`h-12 w-12 ${category.color}`} />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-foreground">{category.name}</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          {category.description}
        </p>
      </div>

      {/* Calculators Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {category.calculators.map((calculator) => (
          <Link key={calculator.path} to={calculator.path}>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
              <CardHeader>
                <CardTitle className="text-lg">{calculator.name}</CardTitle>
                <CardDescription>{calculator.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-primary font-medium">Open Calculator</span>
                  <span className="text-primary">→</span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default CategoryPage

