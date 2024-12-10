import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import { FormData } from "./types"
import { EVALUATION_SERVICES } from "./constants"

dayjs.extend(customParseFormat)
dayjs.extend(isSameOrBefore)

export const dateUtils = {
  getDaysInMonth(month?: string, year?: string): number {
    if (!month || !year) return 31
    return dayjs(`${year}-${month}`).daysInMonth()
  },

  isValidDate(year?: string, month?: string, date?: string): boolean {
    if (!year || !month || !date) return true
    return dayjs(`${year}-${month}-${date}`, 'YYYY-MM-DD', true).isValid()
  },

  isFutureDate(year?: string, month?: string, date?: string): boolean {
    if (!year || !month || !date) return false
    return dayjs(`${year}-${month}-${date}`).isAfter(dayjs())
  },

  isValidDateRange(startMonth?: string, startYear?: string, endMonth?: string, endYear?: string): boolean {
    if (!startMonth || !startYear || !endMonth || !endYear) return true

    const startDate = dayjs(`${startYear}-${startMonth}-01`)
    const endDate = dayjs(`${endYear}-${endMonth}-01`)

    return endDate.isAfter(startDate)
  }
}

export function calculateTotalPrice(formData: FormData): number {
  let total = 0;

  // Foreign Credential Evaluation
  const fceSpeed = formData.serviceType.foreignCredentialEvaluation.firstDegree.speed;
  if (fceSpeed) {
    total += EVALUATION_SERVICES.FOREIGN_CREDENTIAL.FIRST_DEGREE[fceSpeed].price;

    // Add second degree prices
    const secondDegreePrice = fceSpeed === "7day"
      ? EVALUATION_SERVICES.FOREIGN_CREDENTIAL.SECOND_DEGREE["7day"].price
      : EVALUATION_SERVICES.FOREIGN_CREDENTIAL.SECOND_DEGREE.DEFAULT.price;

    total += secondDegreePrice * formData.serviceType.foreignCredentialEvaluation.secondDegrees;
  }

  // Course Evaluation
  const cbeSpeed = formData.serviceType.coursebyCourse.firstDegree.speed;
  if (cbeSpeed) {
    total += EVALUATION_SERVICES.COURSE_BY_COURSE.FIRST_DEGREE[cbeSpeed].price;

    // Add second degree prices
    const secondDegreePrice = cbeSpeed === "8day"
      ? EVALUATION_SERVICES.COURSE_BY_COURSE.SECOND_DEGREE["8day"].price
      : EVALUATION_SERVICES.COURSE_BY_COURSE.SECOND_DEGREE.DEFAULT.price;

    total += secondDegreePrice * formData.serviceType.coursebyCourse.secondDegrees;
  }

  return total;
}
