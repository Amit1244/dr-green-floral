export default function isIOS(userAgent) {
    return userAgent.includes("iPhone") || userAgent.includes("iPad")
        ? true
        : false;
}
