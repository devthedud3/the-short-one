export function getPath() {
  if (typeof window !== "undefined") {
    const { pathname } = window.location;
    return pathname;
  }
  return "";
}
