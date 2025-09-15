import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-white shadow-sm border-t mt-12 py-8">
      <div className="container mx-auto px-4 text-center text-muted-foreground">
        <div className="ad-placeholder w-full h-24 bg-gray-200 flex items-center justify-center text-sm text-gray-500 mb-8">
          Advertisement (Footer)
        </div>
        <p>&copy; {new Date().getFullYear()} Universal Calculator. All rights reserved.</p>
        <p className="text-xs mt-2">
          Disclaimer: This calculator is for informational purposes only. Consult a professional for financial, health, or legal advice.
        </p>
      </div>
    </footer>
  )
}

export default Footer

