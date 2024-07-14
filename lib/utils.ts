export function getPath() {
  if (typeof window !== "undefined") {
    const { pathname } = window.location;
    return pathname;
  }
  return "";
}

export function isValidLink(url: string) {
  const formattedURL = url.replace(/^(www\.|https?:\/\/(www\.)?)|(\/)/, "");
  try {
    const re = /^(www\.|https?:\/\/)\S+(\.\w{2,})/;
    const u = new URL(`http://${formattedURL}`);
    const { href, origin } = new URL(`http://${formattedURL}`);

    console.log(formattedURL, u);
    if (re.test(`${origin}/`)) return href.slice(0, -1);

    return "";
  } catch (error: any) {
    console.log("isValidLink:", error?.message);
    return "";
  }
}
