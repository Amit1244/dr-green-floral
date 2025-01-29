export default async function GetUserCountryByIp() {
    try {
        const response = await fetch("https://api.ipify.org?format=json");
        const data = await response.json();
        const userIP = data.ip;

        const countryResponse = await fetch(
            `https://ipapi.co/${userIP}/country/`
        );
        const country = await countryResponse.text();

        return country;
    } catch (error) {
        console.error("Error fetching user country:", error);

        return null;
    }
}
