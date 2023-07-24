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

export const toHumanDate = (date: Dayjs) => date.format("dddd, MMMM D, h:mm A")

export default dayjs
