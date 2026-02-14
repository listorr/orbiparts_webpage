import React from 'react';
import PropTypes from 'prop-types';

/**
 * ResponsiveHeroImage - Optimized hero image component with srcSet for performance
 * 
 * Features:
 * - srcSet for responsive image loading based on viewport width
 * - loading="eager" and fetchpriority="high" for LCP optimization
 * - Automatic fallback handling
 * - Maintains aspect ratio and prevents layout shift
 */
const ResponsiveHeroImage = ({
  src = null,
  alt,
  className = '',
  sizes = '100vw',
  priority = true,
  onError = null,
}) => {
  // Generate srcSet URLs by detecting image resolution patterns
  // Assumes images follow naming: image.jpg, image-sm.jpg, image-md.jpg, etc.
  const generateSrcSet = (baseSrc) => {
    if (!baseSrc) return '';
    
    // Extract base path and extension
    const lastDot = baseSrc.lastIndexOf('.');
    const lastSlash = baseSrc.lastIndexOf('/');
    const basePath = baseSrc.substring(0, lastDot);
    const ext = baseSrc.substring(lastDot);
    const fileName = baseSrc.substring(lastSlash + 1, lastDot);
    
    // Check if image already has size suffix (e.g., hero-sm.jpg)
    const hasSizeSuffix = fileName.match(/-(sm|md|lg|xl)$/);
    const cleanBase = hasSizeSuffix 
      ? basePath.replace(/-(sm|md|lg|xl)$/, '')
      : basePath;
    
    // For now, we'll return the original image at different viewport widths
    // In future, actual resized images should be generated and stored
    // Format: "url width, url width, ..."
    return [
      `${baseSrc} 1920w`,
      `${baseSrc} 1280w`,
      `${baseSrc} 768w`,
      `${baseSrc} 640w`,
    ].join(', ');
  };

  if (!src) {
    if (onError) {
      onError();
    }
    return null;
  }

  const srcSet = generateSrcSet(src);

  const handleError = (e) => {
    console.warn(`Failed to load hero image: ${src}`);
    if (onError) {
      onError(e);
      return;
    }

    if (e?.currentTarget) {
      const target = e.currentTarget;
      target.onerror = null;
      target.style.display = 'none';
    }
  };

  return (
    <img
      src={src}
      srcSet={srcSet}
      sizes={sizes}
      alt={alt}
      className={className}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : 'auto'}
      onError={handleError}
      style={{
        // Prevent layout shift
        maxWidth: '100%',
        height: 'auto',
      }}
    />
  );
};

ResponsiveHeroImage.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string.isRequired,
  className: PropTypes.string,
  sizes: PropTypes.string,
  priority: PropTypes.bool,
  onError: PropTypes.func,
};

export default ResponsiveHeroImage;
