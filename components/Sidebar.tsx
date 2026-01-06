import React from 'react';
import { AppConfig, NoiseSettings } from '../types';
import { 
  RefreshCcw, 
  Download, 
  Settings2, 
  Palette, 
  Layers, 
  Cpu,
  Image as ImageIcon,
  FileType,
  Aperture
} from 'lucide-react';

interface SidebarProps {
  config: AppConfig;
  onUpdateConfig: (newConfig: Partial<AppConfig>) => void;
  onRegenerate: () => void;
  onDownload: (format: 'png' | 'svg', scale?: number) => void;
  isDownloading: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({
  config,
  onUpdateConfig,
  onRegenerate,
  onDownload,
  isDownloading
}) => {
  
  const handleNoiseChange = (key: keyof NoiseSettings, value: any) => {
    onUpdateConfig({
      noise: { ...config.noise, [key]: value }
    });
  };

  return (
    <div className="w-full md:w-80 bg-zinc-900 border-l border-zinc-800 h-full overflow-y-auto flex flex-col shadow-2xl z-20">
      
      {/* Header */}
      <div className="p-6 border-b border-zinc-800 bg-zinc-900/50 backdrop-blur-sm sticky top-0 z-10">
        <h1 className="text-xl font-bold text-white mb-1 tracking-tight">Noisy<span className="text-indigo-500">Gen</span></h1>
        <p className="text-xs text-zinc-400">PWA Texture Generator</p>
      </div>

      <div className="p-6 space-y-8 flex-1">
        
        {/* Actions */}
        <div className="grid grid-cols-1 gap-3">
          <button 
            onClick={onRegenerate}
            className="flex items-center justify-center gap-2 w-full bg-indigo-600 hover:bg-indigo-500 text-white py-3 px-4 rounded-lg font-medium transition-all active:scale-95 shadow-lg shadow-indigo-900/20"
          >
            <RefreshCcw size={18} />
            Regenerate Art
          </button>
        </div>

        {/* Composition Controls */}
        <section className="space-y-4">
           <div className="flex items-center gap-2 text-indigo-400 mb-2">
            <Aperture size={16} />
            <h3 className="text-sm font-semibold uppercase tracking-wider">Composition</h3>
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <label className="text-xs text-zinc-300">Blur Intensity</label>
              <span className="text-xs text-zinc-500">{config.blur}px</span>
            </div>
            <input
              type="range"
              min="0"
              max="250"
              step="1"
              value={config.blur}
              onChange={(e) => onUpdateConfig({ blur: parseInt(e.target.value) })}
              className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
            />
            <p className="text-[10px] text-zinc-500 mt-1">Increase to blend shapes completely.</p>
          </div>
        </section>

        {/* Noise Controls */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-indigo-400 mb-2">
            <Cpu size={16} />
            <h3 className="text-sm font-semibold uppercase tracking-wider">Noise Engine</h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <label className="text-xs text-zinc-300">Base Frequency (Grain Scale)</label>
                <span className="text-xs text-zinc-500">{config.noise.baseFrequency.toFixed(3)}</span>
              </div>
              <input
                type="range"
                min="0.1"
                max="3.0"
                step="0.05"
                value={config.noise.baseFrequency}
                onChange={(e) => handleNoiseChange('baseFrequency', parseFloat(e.target.value))}
                className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
              />
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <label className="text-xs text-zinc-300">Opacity (Intensity)</label>
                <span className="text-xs text-zinc-500">{Math.round(config.noise.opacity * 100)}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={config.noise.opacity}
                onChange={(e) => handleNoiseChange('opacity', parseFloat(e.target.value))}
                className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
              />
            </div>

             <div>
               <label className="text-xs text-zinc-300 block mb-2">Blend Mode</label>
               <div className="grid grid-cols-2 gap-2">
                 {['overlay', 'multiply', 'soft-light', 'screen'].map(mode => (
                   <button
                    key={mode}
                    onClick={() => handleNoiseChange('blendMode', mode)}
                    className={`text-xs py-2 px-3 rounded border ${
                      config.noise.blendMode === mode 
                      ? 'bg-zinc-800 border-indigo-500 text-white' 
                      : 'bg-transparent border-zinc-700 text-zinc-400 hover:border-zinc-500'
                    }`}
                   >
                     {mode}
                   </button>
                 ))}
               </div>
             </div>
          </div>
        </section>

        {/* Canvas Settings */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-indigo-400 mb-2">
            <Layers size={16} />
            <h3 className="text-sm font-semibold uppercase tracking-wider">Dimensions</h3>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
             <div>
                <label className="text-xs text-zinc-400 block mb-1">Width</label>
                <input 
                  type="number" 
                  value={config.width}
                  onChange={(e) => onUpdateConfig({ width: parseInt(e.target.value) || 100 })}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded p-2 text-sm text-white focus:border-indigo-500 outline-none"
                />
             </div>
             <div>
                <label className="text-xs text-zinc-400 block mb-1">Height</label>
                <input 
                  type="number" 
                  value={config.height}
                  onChange={(e) => onUpdateConfig({ height: parseInt(e.target.value) || 100 })}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded p-2 text-sm text-white focus:border-indigo-500 outline-none"
                />
             </div>
          </div>
        </section>

        {/* Download Section */}
        <section className="space-y-4 pt-4 border-t border-zinc-800">
           <div className="flex items-center gap-2 text-indigo-400 mb-2">
            <Download size={16} />
            <h3 className="text-sm font-semibold uppercase tracking-wider">Export</h3>
          </div>
          
          <div className="grid grid-cols-1 gap-3">
            <button
              disabled={isDownloading}
              onClick={() => onDownload('png', 1)}
              className="flex items-center justify-between w-full bg-zinc-800 hover:bg-zinc-700 text-zinc-200 py-3 px-4 rounded-lg transition-colors border border-zinc-700"
            >
              <div className="flex items-center gap-2">
                <ImageIcon size={16} />
                <span className="text-sm">Download PNG</span>
              </div>
              <span className="text-xs bg-zinc-900 px-2 py-1 rounded text-zinc-500">1x</span>
            </button>
            
            <button
              disabled={isDownloading}
              onClick={() => onDownload('png', 2)}
              className="flex items-center justify-between w-full bg-zinc-800 hover:bg-zinc-700 text-zinc-200 py-3 px-4 rounded-lg transition-colors border border-zinc-700"
            >
              <div className="flex items-center gap-2">
                <ImageIcon size={16} />
                <span className="text-sm">Download PNG (High-Res)</span>
              </div>
              <span className="text-xs bg-zinc-900 px-2 py-1 rounded text-zinc-500">2x</span>
            </button>

            <button
              disabled={isDownloading}
              onClick={() => onDownload('svg')}
              className="flex items-center justify-between w-full bg-zinc-800 hover:bg-zinc-700 text-zinc-200 py-3 px-4 rounded-lg transition-colors border border-zinc-700"
            >
               <div className="flex items-center gap-2">
                <FileType size={16} />
                <span className="text-sm">Download SVG</span>
              </div>
              <span className="text-xs bg-zinc-900 px-2 py-1 rounded text-zinc-500">Vector</span>
            </button>
          </div>
        </section>

      </div>
      
      <div className="p-4 text-center border-t border-zinc-800">
        <a href="https://github.com" target="_blank" rel="noreferrer" className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors">
          Created with Gemini & React
        </a>
      </div>
    </div>
  );
};