import withPlaiceholder from "@plaiceholder/next";

/**
 * @type {import('next').NextConfig}
 * 
 * Reasons for using `images.remotePatterns` API instead of `images.domains`:
 * 
 * 1. **Enhanced Security**: remotePatterns provides more granular control by allowing specification of protocol, hostname, port, and path patterns,
 *    while domains only allows hostname specification, posing security risks
 * 
 * 2. **Precise Matching**: Supports wildcard path matching (e.g., '/**'), allowing restriction of image access to specific directories,
 *    preventing all images from an entire domain from being allowed for optimization
 * 
 * 3. **Protocol Control**: Can explicitly specify HTTPS protocol to ensure secure image transmission
 * 
 * 4. **Future Compatibility**: Next.js officially recommends using remotePatterns, and domains may be deprecated in the future
 * 
 * 5. **Performance Optimization**: While maintaining security, still enjoy all performance benefits of Next.js image optimization features
 * 
 * **Security ✅**
 * Use remotePatterns instead of deprecated domains, providing more granular control
 * Explicitly specify https protocol to ensure secure transmission
 * Restrict access to images only from specified domains through pathname: '/**'
 * Performance Optimization ✅
 * Configured formats: ['image/avif', 'image/webp'] to support modern image formats
 * Automatic format conversion can reduce file size by 60-80%
 * Combined with tencentImageLoader in Avatar component to further optimize Tencent Cloud COS images
 * Configuration Completeness ✅
 * Covers both Tencent Cloud COS and custom CDN image sources
 * Path wildcards ensure flexibility
 * Port left empty to use default HTTPS port
 */
const nextConfig = {
    images: {
        // image fromat we want to support
        formats: ['image/avif', 'image/webp'],
        // lock down urls people can use to optimize images
        remotePatterns: [
            // COS bucket
            {
                protocol: 'https',
                hostname: 'shijiesys-1256650073.cos.ap-beijing.myqcloud.com',
                port: '',
                pathname: '/**',
            },
            // cdn
            {
                protocol: 'https',
                hostname: 'image.sjsys.shijieu.cn',
                port: '',
                pathname: '/**',
            },
        ],
    },
};

export default withPlaiceholder(nextConfig);
