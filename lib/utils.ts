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
    const re = /^(www\.|https?:\/\/)\S+(\.\w{2,})(\/\S*)?/;
    const u = new URL(`http://${formattedURL}`);
    const { href, origin } = new URL(`http://${formattedURL}`);

    console.log(href.replace(/\/?$/, ""));

    if (re.test(`${origin}/`)) return href.replace(/\/?$/, "");

    return "";
  } catch (error: any) {
    console.log("isValidLink:", error?.message);
    return "";
  }
}
