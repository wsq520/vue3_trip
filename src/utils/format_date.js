import dayjs from "dayjs"

export function formatMonthDay(date, formatStr = 'MM月DD日') {
  return dayjs(date).format(formatStr)
}

// 计算时间差 单位是天
export function getDiffDays(startDate, endDate) {
  return dayjs(endDate).diff(startDate, "day")
}