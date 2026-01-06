import React, { useState, useEffect, useRef } from 'react';
import { Sidebar } from './components/Sidebar';
import { NoiseArtboard } from './components/NoiseArtboard';
import { AppConfig, BlobLayer } from './types';
import { DEFAULT_CONFIG } from './constants';
import { generateRandomBlobs } from './utils/random';
import { downloadPNG, downloadSVG } from './utils/export';

const App: React.FC = () => {
  const [config, setConfig] = useState<AppConfig>(DEFAULT_CONFIG);
  const [isDownloading, setIsDownloading] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);

  // Initial generation
  useEffect(() => {
    handleRegenerate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRegenerate = () => {
    const { blobs, bg } = generateRandomBlobs(5);
    setConfig(prev => ({
      ...prev,
      backgroundColor: bg,
      blobs
    }));
  };

  const handleUpdateConfig = (newConfig: Partial<AppConfig>) => {
    setConfig(prev => ({ ...prev, ...newConfig }));
  };

  const handleDownload = async (format: 'png' | 'svg', scale: number = 1) => {
    if (!svgRef.current) return;
    
    setIsDownloading(true);
    
    // Tiny delay to allow UI to show loading state if we added a spinner
    setTimeout(() => {
      try {
        const filename = `noisy-gradient-${Date.now()}`;
        if (format === 'svg') {
          downloadSVG(svgRef.current!.outerHTML, filename);
        } else {
          downloadPNG(svgRef.current!, config, scale, filename);
        }
      } catch (e) {
        console.error("Export failed", e);
        alert("Failed to export image. Please try again.");
      } finally {
        setIsDownloading(false);
      }
    }, 100);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-black text-white font-sans overflow-hidden">
      
      {/* Main Artboard Area */}
      <main className="flex-1 relative flex items-center justify-center bg-zinc-950 p-4 md:p-12 overflow-hidden">
        
        {/* Pattern Background for UI context */}
        <div className="absolute inset-0 opacity-10 pointer-events-none" 
             style={{ 
               backgroundImage: 'radial-gradient(circle at 1px 1px, #333 1px, transparent 0)', 
               backgroundSize: '20px 20px' 
             }} 
        />
        
        <div className="relative w-full h-full max-w-6xl max-h-[90vh] flex flex-col items-center justify-center">
          
          <div className="relative shadow-2xl rounded-sm overflow-hidden border border-zinc-800 bg-zinc-900 group transition-all duration-500 ease-in-out">
            
            {/* Resolution indicator tag */}
            <div className="absolute top-4 left-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 backdrop-blur text-xs px-2 py-1 rounded text-zinc-300 font-mono">
              {config.width} x {config.height}
            </div>

            {/* The Actual SVG Component */}
            {/* We constrain the container aspect ratio to match the config, but scale it to fit screen */}
            <div 
              style={{ 
                aspectRatio: `${config.width} / ${config.height}`,
                width: '100%',
                maxHeight: 'calc(100vh - 100px)',
                maxWidth: 'calc(100vw - 350px)' // Reserve space for sidebar
              }}
              className="flex items-center justify-center"
            >
              <NoiseArtboard 
                ref={svgRef} 
                config={config} 
                className="w-full h-full object-contain"
                preview={true}
              />
            </div>
          </div>

          <p className="mt-6 text-zinc-500 text-sm font-medium animate-pulse">
            {isDownloading ? 'Generating High-Res Export...' : ''}
          </p>
        </div>
      </main>

      {/* Sidebar Controls */}
      <Sidebar 
        config={config} 
        onUpdateConfig={handleUpdateConfig}
        onRegenerate={handleRegenerate}
        onDownload={handleDownload}
        isDownloading={isDownloading}
      />

    </div>
  );
};

export default App;
