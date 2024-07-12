export function getPath() {
  if (typeof window !== "undefined") {
    const { pathname } = window.location;
    return pathname;
  }
  return "";
}

export function isValidLink(e: string) {
  const newURL = e.replace(/^(www\.|https?:\/\/(www\.)?)/, "");
  try {
    const re = /^(www\.|https?:\/\/)\S+(\.\w{2,}|\/\S*)$/;
    const { href, origin } = new URL("http://" + newURL);
    if (re.test(`${origin}/`)) return href;
    return "";
  } catch (e) {
    console.log("Check isValidLink function", e);
    return "";
  }
}
