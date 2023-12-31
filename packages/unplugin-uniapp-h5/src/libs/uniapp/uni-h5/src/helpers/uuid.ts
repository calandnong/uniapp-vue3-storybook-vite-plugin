const UUID_KEY = '__DC_STAT_UUID'
const storage: Record<string, string> =
  (navigator.cookieEnabled && (window.localStorage || window.sessionStorage)) ||
  {}
let deviceId: string

export default function () {
  deviceId = deviceId || storage[UUID_KEY]
  if (!deviceId) {
    deviceId = Date.now() + '' + Math.floor(Math.random() * 1e7)
    try {
      storage[UUID_KEY] = deviceId
    } catch (error) {}
  }
  return deviceId
}
