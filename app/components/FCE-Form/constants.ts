export const PURPOSE_OPTIONS = [
  { value: "immigration", label: "Immigration" },
  { value: "employment", label: "Employment" },
  { value: "education", label: "Education" },
  { value: "other", label: "Other" },
] as const

export const US_STATES = [
  { value: 'AL', label: 'Alabama' },
  { value: 'AK', label: 'Alaska' },
  { value: 'AZ', label: 'Arizona' },
  { value: 'AR', label: 'Arkansas' },
  { value: 'CA', label: 'California' },
  { value: 'CO', label: 'Colorado' },
  { value: 'CT', label: 'Connecticut' },
  { value: 'DE', label: 'Delaware' },
  { value: 'FL', label: 'Florida' },
  { value: 'GA', label: 'Georgia' },
  { value: 'HI', label: 'Hawaii' },
  { value: 'ID', label: 'Idaho' },
  { value: 'IL', label: 'Illinois' },
  { value: 'IN', label: 'Indiana' },
  { value: 'IA', label: 'Iowa' },
  { value: 'KS', label: 'Kansas' },
  { value: 'KY', label: 'Kentucky' },
  { value: 'LA', label: 'Louisiana' },
  { value: 'ME', label: 'Maine' },
  { value: 'MD', label: 'Maryland' },
  { value: 'MA', label: 'Massachusetts' },
  { value: 'MI', label: 'Michigan' },
  { value: 'MN', label: 'Minnesota' },
  { value: 'MS', label: 'Mississippi' },
  { value: 'MO', label: 'Missouri' },
  { value: 'MT', label: 'Montana' },
  { value: 'NE', label: 'Nebraska' },
  { value: 'NV', label: 'Nevada' },
  { value: 'NH', label: 'New Hampshire' },
  { value: 'NJ', label: 'New Jersey' },
  { value: 'NM', label: 'New Mexico' },
  { value: 'NY', label: 'New York' },
  { value: 'NC', label: 'North Carolina' },
  { value: 'ND', label: 'North Dakota' },
  { value: 'OH', label: 'Ohio' },
  { value: 'OK', label: 'Oklahoma' },
  { value: 'OR', label: 'Oregon' },
  { value: 'PA', label: 'Pennsylvania' },
  { value: 'RI', label: 'Rhode Island' },
  { value: 'SC', label: 'South Carolina' },
  { value: 'SD', label: 'South Dakota' },
  { value: 'TN', label: 'Tennessee' },
  { value: 'TX', label: 'Texas' },
  { value: 'UT', label: 'Utah' },
  { value: 'VT', label: 'Vermont' },
  { value: 'VA', label: 'Virginia' },
  { value: 'WA', label: 'Washington' },
  { value: 'WV', label: 'West Virginia' },
  { value: 'WI', label: 'Wisconsin' },
  { value: 'WY', label: 'Wyoming' },
] as const

export const TITLE_OPTIONS = [
  { value: "mr", label: "Mr. (he/him)" },
  { value: "ms", label: "Ms. (she/her)" },
  { value: "mrs", label: "Mrs. (she/her)" },
  { value: "mx", label: "Mx. (they/them)" },
  { value: "dr", label: "Dr." },
  { value: "prof", label: "Prof." },
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
