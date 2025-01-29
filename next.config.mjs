/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "stage-profiles-backend.s3.amazonaws.com",
                port: "",
                pathname: "**",
            },
            {
                protocol: "https",
                hostname: "cms.drgrn.shop",
                port: "",
                pathname: "**",
            },
            {
                protocol: "https",
                hostname: "purecatamphetamine.github.io",
                port: "",
                pathname: "**",
            },
            {
                protocol: "https",
                hostname: "drgreennft.com",
                port: "",
                pathname: "**",
            },
            {
                protocol: "https",
                hostname: "drgreen.surgeclients.site", // Add this hostname
                port: "",
                pathname: "**",
            },
        ],
    },
};

export default nextConfig;
