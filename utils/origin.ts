export function getOrigin() {
  return "location" in window ? window.location.origin : "https://kalle.app"
}
