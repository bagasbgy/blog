import dayjs, { Dayjs } from "dayjs"

export const getCopyrightYear = () => {
    const startYear = 2023
    const currentYear = dayjs().year()
    if (startYear == currentYear) {
        return startYear
    }
    return `${startYear}-${currentYear}`
}

export const toDate = (x: string) => dayjs(x)

export const toHumanDate = (date: Dayjs) => {
    const currentYear = dayjs().year()
    if (date.year() == currentYear) {
        return date.format("dddd, MMMM D, h:mm A")
    }
    return date.format("dddd, MMMM D YYYY, h:mm A")
}

export default dayjs
