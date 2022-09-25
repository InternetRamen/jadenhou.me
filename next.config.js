/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    images: {
        domains: ["images.ctfassets.net", "via.placeholder.com"],
    },
};

module.exports = nextConfig
