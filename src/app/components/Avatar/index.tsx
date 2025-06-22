'use client';

import Image from 'next/image';
import defaultAvatar from '../../images/default_avatar.webp';

/**
 * Image Optimization Loader - Adds processing parameters to remote images.
 * 
 * Supported image processing parameter format:
 * ?imageView2/2/w/${width}/format/webp/q/${quality}
 * 
 * Parameter Description:
 * - imageView2/2: Qiniu/Tencent Cloud image processing API version
 * - w/${width}: Set image width
 * - format/webp: Force conversion to WebP format
 * - q/${quality}: Set image quality (1-100)
 * 
 * @param src - Original image URL
 * @param width - Target width calculated with DPR (window.devicePixelRatio)
 * @param quality - Image quality (1-100), default 75
 * @returns Processed image URL
 */
const imageLoader = ({ src, width, quality = 75 }: {
  src: string;
  width: number;
  quality?: number;
}): string => {
  
  // Build image processing parameters
  const imageParams = `imageView2/2/w/${width}/format/webp/q/${quality}`;
  
  // Check if the URL already has query parameters
  const separator = src.includes('?') ? '&' : '?';
  
  const processedUrl = `${src}${separator}${imageParams}`;
  
  return processedUrl;
};

/**
 * Type definition for Avatar component props.
 */
type AvatarProps = {
  src?: string;        // Optional image URL - supports remote CDN and local images
  alt: string;         // Required accessibility alt text - describes the image content
  priority?: boolean;  // Whether to preload the image (recommended for avatars visible above the fold)
  size?: number;       // Optional size, default 48px
  ariaLabel?: string;  // Optional accessibility label - describes the component's function or context
  quality?: number;    // Optional image quality (1-100), default 75. Higher value means better quality but larger file size.
};

/**
 * Avatar Component - Client Component
 * 
 * Uses Next.js <Image> component which provides several optimizations:
 * - Automatic image resizing and format conversion (WebP/AVIF) in production
 * - Lazy loading by default with blur-up placeholders for smooth UX
 * - Prevents Cumulative Layout Shift (CLS) by enforcing width/height
 * - Development vs Production behavior differences:
 *   • Development: Images are served at full resolution without optimization for faster builds
 *   • Production: Images are automatically optimized, resized, and converted to modern formats
 *   • Development: Remote images may load slower due to lack of optimization pipeline
 *   • Production: Remote images benefit from Next.js Image Optimization API with caching
 * 
 * @param src - Image source URL, supports remote CDNs (configured in next.config.mjs)
 * @param alt - Accessibility description text
 * @param priority - Whether to load with priority (recommended for above-the-fold avatars)
 * @param size - Avatar size (px), default 48
 * @param ariaLabel - Accessibility description text (for the role of this component or button)
 * @param quality - Image quality (1-100), default 75, only effective for remote CDN images
 */
const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  priority = false,
  size = 48,
  ariaLabel,
  quality = 75,
}) => {
  // Use the provided src or the default avatar
  const imageSrc = src || defaultAvatar;
  
  // Generate blur placeholder data URL - provides a smooth loading experience
  // For remote images, this must be handled manually. 
  // For local images, we'll use a pre-generated blur placeholder.
  
  // 默认提供一个简单的灰色圆形模糊占位符，避免首次渲染时的空白
  const blurDataURL = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGRlZnM+CjxsaW5lYXJHcmFkaWVudCBpZD0iZ3JhZGllbnQiIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPgo8c3RvcCBvZmZzZXQ9IjAlIiBzdG9wLWNvbG9yPSIjZjNmNGY2IiBzdG9wLW9wYWNpdHk9IjAuOCIvPgo8c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiNlNWU3ZWIiIHN0b3Atb3BhY2l0eT0iMC42Ii8+CjwvbGluZWFyR3JhZGllbnQ+CjwvZGVmcz4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMjAiIGZpbGw9InVybCgjZ3JhZGllbnQpIi8+Cjwvc3ZnPgo=";
  
  // Create an image loader with a quality parameter
  // 🔧 Custom Handling: Customize the loader for the current component's quality requirements.
  const customImageLoader = (loaderParams: { src: string; width: number; quality?: number }) => {
    return imageLoader({
      ...loaderParams,
      quality: quality, // Use the quality parameter passed to the component
    });
  };

  // Check if it is a remote CDN URL (requires image processing)
  const shouldUseCustomImageLoader = src && src.startsWith('http') && (
    src.includes('cos.ap-') ||           // Tencent Cloud COS
    src.includes('qiniu.com') ||         // Qiniu Cloud
    src.includes('oss-') ||              // Alibaba Cloud OSS
    src.includes('myqcloud.com') ||      // Tencent Cloud
    src.includes('image.sjsys.shijieu.cn')     // Tencent Cloud custom CDN domain
  );

  // const loadingStrategy = priority ? 'eager' : 'lazy';

  const decodingStrategy = priority ? 'sync' : 'async';

  const fetchPriority = priority ? 'high' : 'auto';

  return (
    <Image
      // required: Image source URL, supports remote CDNs (configured in next.config.mjs)
      src={imageSrc}
      // required: Accessibility Enhancement: Provide an image description
      alt={alt}
      
      // required: Required properties: Prevent CLS, ensure layout stability
      // CLS Prevention: Explicit width/height dimensions prevent Cumulative Layout Shift
      // By providing exact dimensions, Next.js Image component:
      // 1. Reserves the exact space in the DOM before the image loads
      // 2. Prevents content jumping/shifting when the image appears
      // 3. Maintains consistent layout during loading states
      // 4. Improves Core Web Vitals score by eliminating unexpected layout shifts
      width={size}
      height={size}
      
      // Performance Control: Priority affects loading order and strategy
      // priority={true} → Equivalent to loading="eager" (loads high-priority images, for critical above-the-fold content)
      priority={priority}

      // Fetch Priority: Finer control over resource fetching (New in Next.js 14)
      // high: High-priority fetch | low: Low-priority fetch | auto: Browser decides
      fetchPriority={fetchPriority}
      
      // Defaults to lazy. When lazy, defer loading the image until it reaches a calculated distance from the viewport.
      // loading={loadingStrategy}


      // Blur-up Placeholder: Smooth loading transition with blurred preview
      // placeholder="blur" enables the blur-up effect during image loading
      // blurDataURL provides the base64-encoded low-quality placeholder image
      // Creates a smooth visual transition from blur to sharp image
      // Improves perceived performance and user experience during loading
      
      // User Experience: show placeholder when the image is loading
      placeholder="blur"
      // User Experience: define what to show when the image is loading
      // should combine with placeholder="blur"
      blurDataURL={blurDataURL}
      
      // Decoding Strategy: Controls image decoding timing to improve rendering performance
      // async: Asynchronous decoding, does not block the main thread | sync: Synchronous decoding | auto: Browser decides
      decoding={decodingStrategy}
      
      // Custom Image Processing: Add optimization parameters for remote CDN images, with support for custom quality
      // Automatic Image Optimization: Next.js Image component provides built-in optimization
      // 1. Format Conversion: Automatically converts images to modern formats (WebP, AVIF) when supported by the browser
      //    - WebP: ~25-30% smaller than JPEG with same quality, supported by 95%+ browsers
      //    - AVIF: ~50% smaller than JPEG with same quality, supported by 90%+ browsers
      //    - Falls back to original format for unsupported browsers
      // 2. Automatic Resizing: Generates multiple sizes based on device pixel ratio and viewport
      //    - Creates responsive image variants (1x, 2x, 3x) for different screen densities
      //    - Serves appropriately sized images to reduce bandwidth usage
      // 3. Quality Optimization: Default quality=75 provides optimal balance between file size and visual quality
      //    - Can be customized via `quality` prop (1-100) for specific use cases
      // 4. Lazy Loading: Images outside viewport are loaded only when needed (unless priority=true)
      // 5. CDN Integration: Works seamlessly with image CDNs and custom loaders for advanced processing
      loader={shouldUseCustomImageLoader ? customImageLoader : undefined}
      // sizes={`${size}px`}
      
      // Style Control: Circular avatar and object-fit
      className="rounded-full object-cover"
      
      // Error Handling: Graceful failure fallback mechanism
      onError={(e) => {
        console.log('🔄 Image failed to load, switching to default avatar automatically.');
        
        // Avoid infinite loops: only switch if not already the default avatar.
        // Use the `src` property of `defaultAvatar` instead of direct object comparison.
        const defaultSrc = typeof defaultAvatar === 'string' ? defaultAvatar : defaultAvatar.src;
        if (src && e.currentTarget.src !== defaultSrc) {
          e.currentTarget.src = defaultSrc;
          // Trigger a re-render to ensure state synchronization
          e.currentTarget.onload = null;
        }
      }}
      
      // Accessibility Enhancement: Provide additional contextual information
      aria-label={ariaLabel}
    />
  );
};

export default Avatar;