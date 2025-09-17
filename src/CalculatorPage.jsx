
import React from 'react';
import { useParams } from 'react-router-dom';
import BasicCalculator from './calculators/BasicCalculator';
import BMICalculator from './calculators/BMICalculator';
import CurrencyConverter from './calculators/CurrencyConverter';
import UnitConverter from './calculators/UnitConverter';
import AgeCalculator from './calculators/AgeCalculator';
import LoanCalculator from './calculators/LoanCalculator';
import InvestmentCalculator from './calculators/InvestmentCalculator';
import CalorieCalculator from './calculators/CalorieCalculator';
import LoveCalculator from './calculators/LoveCalculator';
import RandomNumberGenerator from './calculators/RandomNumberGenerator';
import SpeedCalculator from './calculators/SpeedCalculator';
import TemperatureConverter from './calculators/TemperatureConverter';
import TimezoneConverter from './calculators/TimezoneConverter';
import TipCalculator from './calculators/TipCalculator';
import ChemistryCalculator from './calculators/ChemistryCalculator';
import EnergyCalculator from './calculators/EnergyCalculator';
import MortgageCalculator from './calculators/MortgageCalculator';
import PhysicsCalculator from './calculators/PhysicsCalculator';

const calculatorMap = {
	'basic-calculator': BasicCalculator,
	'bmi-calculator': BMICalculator,
	'currency-converter': CurrencyConverter,
	'unit-converter': UnitConverter,
	'age-calculator': AgeCalculator,
	'loan-calculator': LoanCalculator,
	'investment-calculator': InvestmentCalculator,
	'calorie-calculator': CalorieCalculator,
	'love-calculator': LoveCalculator,
	'random-number-generator': RandomNumberGenerator,
	'speed-calculator': SpeedCalculator,
	'temperature-converter': TemperatureConverter,
	'timezone-converter': TimezoneConverter,
	'tip-calculator': TipCalculator,
	'chemistry-calculator': ChemistryCalculator,
	'energy-calculator': EnergyCalculator,
	'mortgage-calculator': MortgageCalculator,
	'physics-calculator': PhysicsCalculator,
};

const CalculatorPage = () => {
	const urlParams = useParams();
	const { calculatorType } = urlParams;
	const CalculatorComponent = calculatorMap[calculatorType];

	if (!CalculatorComponent) {
		return <div className="text-center py-20 text-2xl text-red-600">Calculator not found</div>;
	}

	return <CalculatorComponent urlParams={urlParams} />;
};

export default CalculatorPage;