const englishDigits = [/0/g, /1/g, /2/g, /3/g, /4/g, /5/g, /6/g, /7/g, /8/g, /9/g]
const persianDigits = [/۰/g, /۱/g, /۲/g, /۳/g, /۴/g, /۵/g, /۶/g, /۷/g, /۸/g, /۹/g]
const englishMap = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
const persianMap = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"]

export const replaceWithPersian = num => {
  if (!num) return
  let str = typeof num === "number" ? String(num) : num
  for (var i = 0; i < 10; i++) {
    str = str.replace(englishDigits[i], persianMap[i])
  }
  return str
}

export const replaceWithEnglish = num => {
  if (!num) return
  let str = typeof num === "number" ? String(num) : num
  for (var i = 0; i < 10; i++) {
    str = str.replace(persianDigits[i], englishMap[i])
  }
  return str
}
