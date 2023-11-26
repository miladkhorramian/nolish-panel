export default function isObjEmpty(obj) {
  if (obj !== null && obj !== undefined) {
    return Object.keys(obj).length === 0
  }
  return true
}
