import { Country, State } from 'country-state-city'

export const PURPOSE_OPTIONS = [
  { value: "immigration", label: "Immigration" },
  { value: "employment", label: "Employment" },
  { value: "education", label: "Education" },
  { value: "other", label: "Other" },
] as const

export const US_STATES = [
  { value: 'AK', label: 'Alaska' },
  { value: 'AL', label: 'Alabama' },
  { value: 'AR', label: 'Arkansas' },
  { value: 'AS', label: 'American Samoa' },
  { value: 'AZ', label: 'Arizona' },
  { value: 'CA', label: 'California' },
  { value: 'CO', label: 'Colorado' },
  { value: 'CT', label: 'Connecticut' },
  { value: 'DC', label: 'District of Columbia' },
  { value: 'DE', label: 'Delaware' },
  { value: 'FL', label: 'Florida' },
  { value: 'GA', label: 'Georgia' },
  { value: 'GU', label: 'Guam' },
  { value: 'HI', label: 'Hawaii' },
  { value: 'IA', label: 'Iowa' },
  { value: 'ID', label: 'Idaho' },
  { value: 'IL', label: 'Illinois' },
  { value: 'IN', label: 'Indiana' },
  { value: 'KS', label: 'Kansas' },
  { value: 'KY', label: 'Kentucky' },
  { value: 'LA', label: 'Louisiana' },
  { value: 'MA', label: 'Massachusetts' },
  { value: 'MD', label: 'Maryland' },
  { value: 'ME', label: 'Maine' },
  { value: 'MI', label: 'Michigan' },
  { value: 'MN', label: 'Minnesota' },
  { value: 'MO', label: 'Missouri' },
  { value: 'MP', label: 'Northern Mariana Islands' },
  { value: 'MS', label: 'Mississippi' },
  { value: 'MT', label: 'Montana' },
  { value: 'NC', label: 'North Carolina' },
  { value: 'ND', label: 'North Dakota' },
  { value: 'NE', label: 'Nebraska' },
  { value: 'NH', label: 'New Hampshire' },
  { value: 'NJ', label: 'New Jersey' },
  { value: 'NM', label: 'New Mexico' },
  { value: 'NV', label: 'Nevada' },
  { value: 'NY', label: 'New York' },
  { value: 'OH', label: 'Ohio' },
  { value: 'OK', label: 'Oklahoma' },
  { value: 'OR', label: 'Oregon' },
  { value: 'PA', label: 'Pennsylvania' },
  { value: 'PR', label: 'Puerto Rico' },
  { value: 'RI', label: 'Rhode Island' },
  { value: 'SC', label: 'South Carolina' },
  { value: 'SD', label: 'South Dakota' },
  { value: 'TN', label: 'Tennessee' },
  { value: 'TX', label: 'Texas' },
  { value: 'UT', label: 'Utah' },
  { value: 'VA', label: 'Virginia' },
  { value: 'VI', label: 'U.S. Virgin Islands' },
  { value: 'VT', label: 'Vermont' },
  { value: 'WA', label: 'Washington' },
  { value: 'WI', label: 'Wisconsin' },
  { value: 'WV', label: 'West Virginia' },
  { value: 'WY', label: 'Wyoming' },
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

// 生成年份选项（从1940到当前年份）
const currentYear = new Date().getFullYear()
export const YEAR_OPTIONS = Array.from(
  { length: currentYear - 1940 + 1 },
  (_, i) => {
    const year = String(currentYear - i)
    return { value: year, label: year }
  }
)

export const FCE_FIRST_DEGREE = [
  { value: "7day", label: "7 business day service", price: 100 },
  { value: "3day", label: "3 business day service", price: 150 },
  { value: "24hour", label: "24-hour service", price: 200 },
  { value: "sameday", label: "Same-day service", price: 250 },
] as const

export const COURSE_BY_COURSE_FIRST_DEGREE = [
  { value: "8day", label: "8 business day service", price: 180 },
  { value: "5day", label: "5 business day service", price: 210 },
  { value: "3day", label: "3 business day service", price: 280 },
  { value: "24hour", label: "24-hour service", price: 350 },
] as const

export const PROFESSIONAL_EXPERIENCE = [
  { value: "21day", label: "21 business day service", price: 600 },
  { value: "7day", label: "7 business day service", price: 700 },
  { value: "3day", label: "3 business day service", price: 800 },
] as const

export const POSITION_EVALUATION = [
  { value: "10day", label: "10 business day service", price: 300 },
  { value: "5day", label: "5 business day service", price: 400 },
  { value: "3day", label: "3 business day service", price: 500 },
  { value: "2day", label: "2 business day service", price: 600 },
] as const

export const DELIVERY_OPTIONS = [
  { value: "usps_domestic", label: "USPS First Class Mail (Regular Mail) - U.S. domestic", price: 7 },
  { value: "usps_international", label: "USPS First Class Mail (Regular Mail) - International", price: 13 },
  { value: "usps_priority_domestic", label: "USPS Priority Mail- U.S. Domestic", price: 17 },
  { value: "usps_express_domestic", label: "USPS Express Mail-US Domestic", price: 32 },
  { value: "ups_express_domestic", label: "UPS Express Mail-US Domestic", price: 58 },
  { value: "usps_express_international", label: "USPS Express Mail- International", price: 71 },
  { value: "fedex_express_international", label: "FedEx Express Mail- International", price: 93 },
] as const

export const ADDITIONAL_SERVICES = [
  { id: "extra_copy", label: "Extra Hard Copy Report", price: 20 },
  { id: "pdf_with_hard_copy", label: "PDF Report with Hard Copy", price: 20 },
  { id: "pdf_only", label: "PDF Report Only (without Hard Copy)", price: 10 },
] as const

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
