import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'

/**
 * @description: 日期格式化
 * @param {string | number | Date} date 日期
 * @param {string} format 默认格式 YYYY-MM-DD HH:mm:ss
 * @return {string} 格式化后的日期
 */
export const dateFormat = (date: string | number | Date, format: string = 'YYYY-MM-DD HH:mm:ss'): string => {
    dayjs.locale('zh-cn')
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

/**
 * @description: 给一个日期，能够返回与现在相差的时间，时间格式包括年月日，时分秒。如：1年30天10时20分10秒 5月20天10时10分10秒 如果有年就显示年，没有年有月就显示月，没有月有天就显示天，没有天有小时就显示小时，没有小时有分钟就显示分钟，没有分钟有秒就显示秒
 * @param {string | number | Date} date 日期
 * @return {string} 格式化后的日期
 * @example
 * dateDiffNow('2021-01-01 00:00:00') // 1年30天10时20分10秒
 */
export const dateDiffNow = (date: string | number | Date): string => {
    dayjs.extend(duration)
    const now = dayjs()
    const diff = dayjs.duration(now.diff(date))
    const year = diff.years()
    const month = diff.months()
    const day = diff.days()
    const hour = diff.hours()
    const minute = diff.minutes()
    const second = diff.seconds()
    const yearStr = year ? `${year}年` : ''
    const monthStr = month ? `${month}月` : ''
    const dayStr = day ? `${day}天` : ''
    const hourStr = hour ? `${hour}时` : ''
    const minuteStr = minute ? `${minute}分` : ''
    const secondStr = second ? `${second}秒` : ''
    return `${yearStr}${monthStr}${dayStr}${hourStr}${minuteStr}${secondStr}`
}
