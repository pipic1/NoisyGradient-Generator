import { AppConfig } from '../types';

export const downloadSVG = (svgContent: string, filename: string) => {
  const blob = new Blob([svgContent], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${filename}.svg`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const downloadPNG = (
  svgElement: SVGSVGElement,
  config: AppConfig,
  scale: number = 1,
  filename: string
) => {
  const { width, height } = config;
  const scaledWidth = width * scale;
  const scaledHeight = height * scale;

  // Serialize the SVG
  const serializer = new XMLSerializer();
  let svgString = serializer.serializeToString(svgElement);

  // Ensure width/height are explicit in the SVG string for the canvas to read correctly
  svgString = svgString.replace(/width="[^"]*"/, `width="${scaledWidth}"`);
  svgString = svgString.replace(/height="[^"]*"/, `height="${scaledHeight}"`);
  
  // Create an image from the SVG
  const img = new Image();
  const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(svgBlob);

  img.onload = () => {
    const canvas = document.createElement('canvas');
    canvas.width = scaledWidth;
    canvas.height = scaledHeight;
    const ctx = canvas.getContext('2d');
    
    if (ctx) {
      ctx.drawImage(img, 0, 0, scaledWidth, scaledHeight);
      const pngUrl = canvas.toDataURL('image/png', 1.0);
      
      const link = document.createElement('a');
      link.href = pngUrl;
      link.download = `${filename}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
    URL.revokeObjectURL(url);
  };
  
  img.src = url;
};
