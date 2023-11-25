import dayjs from 'dayjs'

/**
 * @description: 日期格式化
 * @param {string | number | Date} date 日期
 * @param {string} format 默认格式 YYYY-MM-DD HH:mm:ss
 * @return {string} 格式化后的日期
 */
export const dateFormat = (date: string | number | Date, format: string = 'YYYY-MM-DD HH:mm:ss'): string => {
  return dayjs(date).format(format)
}

/**
 * @description: 将字符串日期转换成时间戳
 * @return {number} 时间戳
 */
export const dateToTimestamp = (date: string | number | Date): number => {
  return dayjs(date).valueOf()
}

/**
 * @description: 日期比较，默认返回相差的天数
 * @param {string | number | Date} date1  日期1
 * @param {string | number | Date} date2  日期2
 * @param {dayjs} unit 单位
 * @return {number} 格式化后的日期
 */
export const dateDiff = (
  date1: string | number | Date,
  date2: string | number | Date,
  unit: dayjs.OpUnitType = 'day'
): number => {
  return dayjs(date1).diff(dayjs(date2), unit)
}

/**
 * @description: 日期加减
 * @param {string | number | Date} date 日期
 * @param {number} number 加减的数量
 * @param {dayjs} unit 单位
 * @return {string} 格式化后的日期
 * @example
 * dateAdd('2021-01-01', 1, 'day') // 2021-01-02
 * dateAdd('2021-01-01', -1, 'year') // 2020-01-01
 */
export const dateAdd = (date: string | number | Date, number: number, unit: dayjs.ManipulateType): string => {
  return dayjs(date).add(number, unit).format('YYYY-MM-DD HH:mm:ss')
}
