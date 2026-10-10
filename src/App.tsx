import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Camera, Layers, Sun, Maximize2, X, ArrowRight, Sparkles, Loader2, Download, RefreshCw } from "lucide-react";
import { COMMERCIAL_RESULTS, type CommercialResult } from "./constants";

export default function App() {
  const [selectedResult, setSelectedResult] = useState<CommercialResult | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Generation State
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedResults, setGeneratedResults] = useState<CommercialResult[]>([]);
  const [error, setError] = useState<string | null>(null);
  
  const labRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || isGenerating) return;

    setIsGenerating(true);
    setError(null);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error || "Generation failed");

      const newResult: CommercialResult = {
        id: `gen-${Date.now()}`,
        title: prompt.length > 20 ? prompt.substring(0, 20) + "..." : prompt,
        category: "Generated Output",
        description: `Custom generation based on: "${prompt}"`,
        imageUrl: data.imageUrl,
        metadata: {
          camera: "Medium Format Digital",
          lens: "80mm Anamorphic",
          aperture: "f/2.8",
          shutter: "1/250s",
          material: "Precision AI Texture",
          lighting: ["Rembrandt", "Cinematic Backlight"]
        }
      };

      setGeneratedResults(prev => [newResult, ...prev]);
      setPrompt("");
      
      // Smooth scroll to the new result
      setTimeout(() => {
        const el = document.getElementById(`result-${newResult.id}`);
        el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);

    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-x-hidden pt-24 pb-32">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 mix-blend-difference px-8 py-6 flex justify-between items-center bg-transparent">
        <div className="font-serif italic text-xl tracking-tight">C/R</div>
        <div className="flex gap-8 text-[10px] uppercase tracking-[0.2em] font-medium opacity-70 text-white">
          <a href="#" className="hover:opacity-100 transition-opacity">Archive</a>
          <a href="#laboratory" className="hover:opacity-100 transition-opacity flex items-center gap-2">
            <Sparkles size={10} /> Laboratory
          </a>
          <a href="#" className="hover:opacity-100 transition-opacity">Contact</a>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="px-6 md:px-12 lg:px-24 mb-32">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="technical-label block mb-4">Portfolio—2026</span>
            <h1 className="editorial-title text-[clamp(2.5rem,12vw,12rem)] md:text-[clamp(3.5rem,15vw,14rem)]">
              Results <span className="italic font-light opacity-30">Commercial</span>
            </h1>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="mt-8 flex flex-wrap gap-x-12 gap-y-4 font-mono text-[11px] uppercase tracking-widest border-t border-white/10 pt-8"
          >
            <div className="flex items-center gap-2"><Camera size={14} /> Medium Format 80mm</div>
            <div className="flex items-center gap-2"><Sun size={14} /> Rembrandt Lighting</div>
            <div className="flex items-center gap-2"><Layers size={14} /> Material Precision</div>
          </motion.div>
        </div>
      </header>

      {/* Laboratory Section (Image Generation) */}
      <section id="laboratory" ref={labRef} className="px-6 md:px-12 lg:px-24 mb-48 scroll-mt-32">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12">
            <span className="technical-label text-brand-accent mb-2 flex items-center gap-2">
              <RefreshCw size={12} className={isGenerating ? "animate-spin" : ""} /> 
              Gen-AI Suite v1.0
            </span>
            <h2 className="editorial-title text-4xl md:text-6xl italic lowercase">Generation laboratory</h2>
            <p className="mt-4 text-brand-muted max-w-xl font-light">
              Input a texture, object, or scene. Our pipeline will interpret it through medium-format constraints 
              and Rembrandt lighting schemas to produce production-grade output.
            </p>
          </div>

          <form onSubmit={handleGenerate} className="relative group">
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="E.g. Iridescent obsidian, floating silk, industrial concrete..."
              className="w-full bg-white/5 border-b border-white/20 px-0 py-6 text-xl md:text-3xl font-serif italic outline-none focus:border-brand-accent transition-colors placeholder:opacity-20"
              disabled={isGenerating}
            />
            <button
              type="submit"
              disabled={isGenerating || !prompt.trim()}
              className="absolute right-0 bottom-6 p-2 rounded-full hover:bg-brand-accent hover:text-brand-bg transition-all disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-inherit"
            >
              {isGenerating ? <Loader2 className="animate-spin" /> : <Sparkles className="group-focus-within:animate-pulse" />}
            </button>
            {error && (
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute top-full mt-2 text-red-400 text-[10px] font-mono uppercase tracking-widest"
              >
                Error: {error}
              </motion.p>
            )}
          </form>
        </div>
      </section>

      {/* Results Grid */}
      <main className="px-4 md:px-8 lg:px-12 max-w-[1800px] mx-auto">
        <div className="flex justify-between items-end mb-8 border-b border-white/10 pb-4">
          <h3 className="technical-label">Recent Archives</h3>
          <span className="text-[10px] font-mono opacity-30 tracking-tighter">Total Items: {COMMERCIAL_RESULTS.length + generatedResults.length}</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {/* Combined Grid: Generated Results First, then Static */}
          {[...generatedResults, ...COMMERCIAL_RESULTS].map((result, idx) => (
            <motion.div
              key={result.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + idx * 0.05, duration: 0.8 }}
              className="group relative aspect-[3/4] cursor-pointer overflow-hidden bg-brand-bg md:bg-brand-bg/50 border border-white/5"
              onClick={() => setSelectedResult(result)}
              id={`result-${result.id}`}
            >
              {/* Image Container */}
              <div className="absolute inset-0 transition-transform duration-1000 ease-out group-hover:scale-105">
                <img
                  src={result.imageUrl}
                  alt={result.title}
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Overlay Info */}
              <div className="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="technical-label text-brand-accent mb-1">{result.category}</span>
                <h3 className="font-serif text-2xl mb-4 italic leading-tight">{result.title}</h3>
                <div className="h-[1px] w-0 group-hover:w-full bg-brand-accent/50 transition-all duration-700" />
                <div className="mt-4 flex justify-between items-center text-[9px] font-mono tracking-tighter uppercase opacity-60">
                  <span>{result.metadata.lens}</span>
                  <Maximize2 size={12} />
                </div>
              </div>

              {/* Tag for generated results */}
              {result.id.startsWith('gen-') && (
                <div className="absolute top-4 left-4 z-10">
                  <span className="bg-brand-accent text-brand-bg text-[9px] px-2 py-0.5 font-mono uppercase font-bold rounded-sm flex items-center gap-1">
                    <Sparkles size={8} /> AI Render
                  </span>
                </div>
              )}

              {/* Static ID */}
              <div className="absolute top-4 right-4 font-mono text-[10px] opacity-30 select-none">
                [{result.id.substring(0, 5)}]
              </div>
            </motion.div>
          ))}
        </div>
      </main>

      {/* Detailed View Modal (Unchanged) */}
      <AnimatePresence>
        {selectedResult && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-12 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-start"
            >
              {/* Image Section */}
              <div className="relative aspect-[4/5] rounded-sm overflow-hidden border border-white/10">
                <img
                  src={selectedResult.imageUrl}
                  alt={selectedResult.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Info Section */}
              <div className="flex flex-col h-full py-8">
                <div className="flex justify-between items-center mb-12">
                  <div className="flex gap-4">
                    {selectedResult.id.startsWith('gen-') && (
                      <a 
                        href={selectedResult.imageUrl} 
                        download={`CR_Result_${selectedResult.id}.png`}
                        className="p-2 border border-white/10 rounded-full hover:bg-white/10 transition-colors"
                      >
                        <Download size={20} />
                      </a>
                    )}
                  </div>
                  <button
                    onClick={() => setSelectedResult(null)}
                    className="p-2 hover:bg-white/10 rounded-full transition-colors text-white"
                  >
                    <X size={24} />
                  </button>
                </div>

                <div className="space-y-12 p-6 md:p-0">
                  <div>
                    <span className="technical-label">{selectedResult.category}</span>
                    <h2 className="editorial-title text-5xl md:text-8xl mt-4 lowercase italic">{selectedResult.title}</h2>
                    <p className="mt-8 text-brand-muted leading-relaxed font-light max-w-md">
                      {selectedResult.description}
                    </p>
                  </div>

                  {/* Tech Specs Panel */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-8 pt-12 border-t border-white/10">
                    <SpecItem label="Camera" value={selectedResult.metadata.camera} />
                    <SpecItem label="Lens" value={selectedResult.metadata.lens} />
                    <SpecItem label="Aperture" value={selectedResult.metadata.aperture} />
                    <SpecItem label="Shutter" value={selectedResult.metadata.shutter} />
                    <SpecItem label="Material" value={selectedResult.metadata.material} />
                    <div className="sm:col-span-2">
                      <span className="technical-label block mb-2">Lighting Schema</span>
                      <div className="flex flex-wrap gap-2">
                        {selectedResult.metadata.lighting.map((light) => (
                          <span key={light} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-mono tracking-widest">
                            {light}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <button className="flex items-center gap-4 text-brand-accent group pt-4">
                    <span className="text-xs uppercase tracking-[0.3em] font-medium group-hover:mr-2 transition-all">Request Full Case</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background Ambience */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10 opacity-30 overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-brand-accent/10 blur-[200px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/5 blur-[200px] rounded-full" />
      </div>
    </div>
  );
}

function SpecItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <span className="technical-label block mb-1">{label}</span>
      <span className="font-serif italic text-lg">{value}</span>
    </div>
  );
}
