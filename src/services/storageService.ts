export function saveImageURL(url: string) {
    const imageURLs = JSON.parse(localStorage.getItem("imageURLs") || "[]");
    imageURLs.push(url);
    localStorage.setItem("imageURLs", JSON.stringify(imageURLs));
}

export function getImageURLs(): string[] {
    return JSON.parse(localStorage.getItem("imageURLs") || "[]");
}