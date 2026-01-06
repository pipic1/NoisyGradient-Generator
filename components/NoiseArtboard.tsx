import React, { forwardRef } from 'react';
import { AppConfig } from '../types';

interface NoiseArtboardProps {
  config: AppConfig;
  className?: string;
  preview?: boolean;
}

export const NoiseArtboard = forwardRef<SVGSVGElement, NoiseArtboardProps>(
  ({ config, className, preview = false }, ref) => {
    const { width, height, backgroundColor, blobs, noise, blur } = config;

    // In preview mode, we use percentages to ensure it scales responsively.
    // In export mode (controlled by logic outside, but this component supports explicit pixels too),
    // we strictly adhere to the viewBox.
    
    return (
      <svg
        ref={ref}
        viewBox={`0 0 ${width} ${height}`}
        className={className}
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
        style={{ backgroundColor }}
      >
        <defs>
          <filter id="noiseFilter">
            <feTurbulence
              type={noise.type}
              baseFrequency={noise.baseFrequency}
              numOctaves={noise.numOctaves}
              stitchTiles="stitch"
              result="noise"
            />
            <feColorMatrix
              type="saturate"
              values="0"
              in="noise"
              result="desaturatedNoise"
            />
             <feComponentTransfer in="desaturatedNoise" result="theNoise">
                <feFuncA type="linear" slope={noise.opacity} />
            </feComponentTransfer>
            <feBlend in="theNoise" in2="SourceGraphic" mode={noise.blendMode} result="blend" />
          </filter>

          {/* High blur filter for blobs */}
          <filter id="blurFilter">
            <feGaussianBlur in="SourceGraphic" stdDeviation={blur} />
          </filter>
        </defs>

        {/* Background Base */}
        <rect width="100%" height="100%" fill={backgroundColor} />

        {/* Blobs Layer */}
        <g filter="url(#blurFilter)">
          {blobs.map((blob) => (
            <circle
              key={blob.id}
              cx={`${blob.x}%`}
              cy={`${blob.y}%`}
              r={`${blob.radius}%`}
              fill={blob.color}
              opacity={blob.opacity}
            />
          ))}
        </g>

        {/* Noise Overlay Layer */}
        {/* We apply the filter to a rect that covers the whole area.
            Note: Applying feBlend within the filter often works better if the input source is defined.
            Alternative approach: Render noise on top with CSS mix-blend-mode or SVG feBlend.
            
            Here, we use a rect filled with 50% gray (neutral for overlay) or transparent,
            then apply the turbulence filter which generates pixel values. 
        */}
        <rect
          width="100%"
          height="100%"
          filter="url(#noiseFilter)"
          fill="transparent"
          style={{ mixBlendMode: noise.blendMode as any }}
          opacity={noise.opacity} 
        />
        
        {/*
          Implementation Note:
          Standard SVG filters can be tricky with mix-blend-mode when exported to PNG via canvas.
          The safest cross-browser method for "baking" the look is to use pure SVG <feBlend> inside the filter,
          but 'mix-blend-mode' CSS property on the rect is often visually superior in browsers.
          
          For this generator, since we use `canvas.drawImage`, modern browsers usually respect the CSS blend modes 
          if the SVG is loaded as an Image.
        */}
      </svg>
    );
  }
);

NoiseArtboard.displayName = 'NoiseArtboard';