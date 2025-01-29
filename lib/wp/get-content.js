export default async function GetContent(query) {
    const res = await fetch(
        `${process.env.WORDPRESS_API_URL}?query=${encodeURIComponent(query)}`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            next: {
                revalidate: 0,
            },
        }
    );

    const { data } = await res.json();

    return data;
}
