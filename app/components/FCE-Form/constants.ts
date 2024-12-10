import { Country, State } from 'country-state-city'


export const COUNTRIES = Country.getAllCountries().map(country => ({
  value: country.isoCode,
  label: country.name
}))

export const getCountryLabel = (countryCode: string) => {
  return COUNTRIES.find(country => country.value === countryCode)?.label || countryCode
}

export const getRegionLabel = (countryCode: string) => {
  const states = State.getStatesOfCountry(countryCode)

  const regionLabels: Record<string, string> = {
    US: "州",
    CN: "省",
    // 可以添加更多国家的翻译
  }

  return {
    label: regionLabels[countryCode] || "地区",
    options: states.map(state => ({
      value: state.isoCode,
      label: state.name
    }))
  }
}

export const PURPOSE_OPTIONS = [
  { value: "immigration", label: "Immigration" },
  { value: "employment", label: "Employment" },
  { value: "education", label: "Education" },
  { value: "other", label: "Other" },
] as const

export const TITLE_OPTIONS = [
  { value: "mr", label: "Mr. (he/him)" },
  { value: "ms", label: "Ms. (she/her)" },
  { value: "mx", label: "Mx. (they/them)" },
] as const

export const MONTH_OPTIONS = [
  { value: "01", label: "January" },
  { value: "02", label: "February" },
  { value: "03", label: "March" },
  { value: "04", label: "April" },
  { value: "05", label: "May" },
  { value: "06", label: "June" },
  { value: "07", label: "July" },
  { value: "08", label: "August" },
  { value: "09", label: "September" },
  { value: "10", label: "October" },
  { value: "11", label: "November" },
  { value: "12", label: "December" },
] as const

// Generate year options (from 1940 to current year)
const currentYear = new Date().getFullYear()
export const YEAR_OPTIONS = Array.from(
  { length: currentYear - 1940 + 1 },
  (_, i) => {
    const year = String(currentYear - i)
    return { value: year, label: year }
  }
)

// Document Evaluation Services
export const EVALUATION_SERVICES = {
  FOREIGN_CREDENTIAL: {
    FIRST_DEGREE: {
      "7day": {
        label: "7 Business Days",
        price: 100
      },
      "3day": {
        label: "3 Business Days",
        price: 150
      },
      "24hour": {
        label: "24 Hours",
        price: 200
      },
      "sameday": {
        label: "Same Day",
        price: 250
      }
    },
    SECOND_DEGREE: {
      "7day": {
        label: "7 Business Days",
        price: 30
      },
      DEFAULT: {
        label: "Standard",
        price: 40
      }
    }
  },
  COURSE_BY_COURSE: {
    FIRST_DEGREE: {
      "8day": {
        label: "8 Business Days",
        price: 180
      },
      "5day": {
        label: "5 Business Days",
        price: 210
      },
      "3day": {
        label: "3 Business Days",
        price: 280
      },
      "24hour": {
        label: "24 Hours",
        price: 350
      }
    },
    SECOND_DEGREE: {
      "8day": {
        label: "8 Business Days",
        price: 40
      },
      DEFAULT: {
        label: "Standard",
        price: 60
      }
    }
  },
  PROFESSIONAL_EXPERIENCE: {
    "21day": {
      label: "21 Business Days",
      price: 600
    },
    "7day": {
      label: "7 Business Days",
      price: 700
    },
    "3day": {
      label: "3 Business Days",
      price: 800
    }
  },
  POSITION: {
    "10day": {
      label: "10 Business Days",
      price: 300
    },
    "5day": {
      label: "5 Business Days",
      price: 400
    },
    "3day": {
      label: "3 Business Days",
      price: 500
    },
    "2day": {
      label: "2 Business Days",
      price: 600
    }
  }
} as const

// 配送选项（结合显示文本和价格）
export const DELIVERY_OPTIONS = {
  usps_domestic: {
    label: "USPS First Class Mail (Domestic)",
    price: 7
  },
  usps_international: {
    label: "USPS First Class Mail (International)",
    price: 13
  },
  usps_priority_domestic: {
    label: "USPS Priority Mail (Domestic)",
    price: 17
  },
  usps_express_domestic: {
    label: "USPS Express Mail (Domestic)",
    price: 32
  },
  ups_express_domestic: {
    label: "UPS Express Mail (Domestic)",
    price: 58
  },
  usps_express_international: {
    label: "USPS Express Mail (International)",
    price: 71
  },
  fedex_express_international: {
    label: "FedEx Express Mail (International)",
    price: 93
  }
} as const

// 附加服务（结合显示文本和价格）
export const ADDITIONAL_SERVICES = {
  extra_copy: {
    label: "Extra Hard Copy Report",
    price: 20,
    quantity: true
  },
  pdf_with_hard_copy: {
    label: "PDF Report with Hard Copy",
    price: 20
  },
  pdf_only: {
    label: "PDF Report Only (No Hard Copy)",
    price: 10
  }
} as const
