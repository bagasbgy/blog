/** @type {import('next').NextConfig} */
const nextConfig = {
    trailingSlash: true,
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/i,
            use: ['@svgr/webpack'],
        });

        return config;
    }
}

module.exports = nextConfig
