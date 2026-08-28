/*
 * Design: Optical Lab — a precise, tactile workspace for accessibility-minded designers.
 * This page keeps the interface in English and treats every visual change as a measurable output.
 */
import { useState } from "react";
import {
  Accessibility,
  ArrowLeftRight,
  Check,
  CheckCircle2,
  Code2,
  Copy,
  Pipette,
  RotateCcw,
  SlidersHorizontal,
  Sparkles,
  WandSparkles,
  X,
} from "lucide-react";
import { toast } from "sonner";

const ASSETS = {
  hero: "/manus-storage/a11y-glass-optical-hero_bb7ec2da.jpg",
  texture: "/manus-storage/a11y-glass-ratio-texture_7b64dac1.jpg",
  spectrum: "/manus-storage/a11y-glass-spectrum-canvas_c76cdda0.jpg",
  logo: "/manus-storage/a11y-glass-logo_34b02b8d.png",
};

const DEFAULTS = {
  textColor: "#F6F7F1",
  backgroundColor: "#1B2229",
  opacity: 18,
  blur: 12,
  borderOpacity: 34,
};

const PRESETS = [
  { name: "Ink / Paper", text: "#F6F7F1", background: "#1B2229" },
  { name: "Citrus / Ink", text: "#0B0D10", background: "#E9FF70" },
  { name: "Cobalt / Mist", text: "#F6F7F1", background: "#273B87" },
  { name: "Coral / Ink", text: "#FF7163", background: "#0B0D10" },
];

const isHex = (value: string) => /^#[0-9A-Fa-f]{6}$/.test(value);

function hexToRgb(hex: string) {
  const safeHex = isHex(hex) ? hex : "#000000";
  const normalized = safeHex.slice(1);
  return {
    r: parseInt(normalized.slice(0, 2), 16),
    g: parseInt(normalized.slice(2, 4), 16),
    b: parseInt(normalized.slice(4, 6), 16),
  };
}

function relativeLuminance(hex: string) {
  const { r, g, b } = hexToRgb(hex);
  const linearize = (channel: number) => {
    const value = channel / 255;
    return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * linearize(r) + 0.7152 * linearize(g) + 0.0722 * linearize(b);
}

function contrastRatio(first: string, second: string) {
  const luminanceA = relativeLuminance(first);
  const luminanceB = relativeLuminance(second);
  return (Math.max(luminanceA, luminanceB) + 0.05) / (Math.min(luminanceA, luminanceB) + 0.05);
}

type ComplianceRowProps = { label: string; note: string; aa: boolean; aaa: boolean };

function ComplianceRow({ label, note, aa, aaa }: ComplianceRowProps) {
  return (
    <div className="compliance-row">
      <div className="compliance-label"><span>{label}</span><small>{note}</small></div>
      <div className="compliance-results" aria-label={`${label}: WCAG results`}>
        <span className={`standard-badge ${aa ? "pass" : "fail"}`}><b>AA</b>{aa ? "Pass" : "Fail"}</span>
        <span className={`standard-badge ${aaa ? "pass" : "fail"}`}><b>AAA</b>{aaa ? "Pass" : "Fail"}</span>
      </div>
    </div>
  );
}

type ColorControlProps = { id: string; label: string; description: string; value: string; onChange: (value: string) => void };

function ColorControl({ id, label, description, value, onChange }: ColorControlProps) {
  const pickerValue = isHex(value) ? value : "#000000";
  return (
    <div className="color-control">
      <div className="field-heading"><label htmlFor={`${id}-hex`}>{label}</label><span>{description}</span></div>
      <div className={`color-input-wrap ${!isHex(value) ? "has-error" : ""}`}>
        <input id={`${id}-color`} className="native-color" type="color" value={pickerValue} aria-label={`Select ${label.toLowerCase()}`} onChange={(event) => onChange(event.target.value.toUpperCase())} />
        <input id={`${id}-hex`} className="hex-input" value={value} maxLength={7} spellCheck="false" aria-describedby={`${id}-hint`} onChange={(event) => onChange(event.target.value.toUpperCase())} />
        <span className="color-swatch" style={{ backgroundColor: pickerValue }} aria-hidden="true" />
      </div>
      <span id={`${id}-hint`} className="sr-only">Enter a hexadecimal color in the #RRGGBB format.</span>
    </div>
  );
}

type RangeControlProps = { id: string; label: string; unit: string; value: number; min: number; max: number; onChange: (value: number) => void };

function RangeControl({ id, label, unit, value, min, max, onChange }: RangeControlProps) {
  const progress = ((value - min) / (max - min)) * 100;
  return (
    <div className="range-control">
      <div className="range-label-line"><label htmlFor={id}>{label}</label><output htmlFor={id}>{value}{unit}</output></div>
      <input id={id} className="range-input" type="range" min={min} max={max} value={value} onChange={(event) => onChange(Number(event.target.value))} style={{ background: `linear-gradient(to right, #e9ff70 0%, #e9ff70 ${progress}%, rgba(255,255,255,.14) ${progress}%, rgba(255,255,255,.14) 100%)` }} />
    </div>
  );
}

export default function Home() {
  const [textColor, setTextColor] = useState(DEFAULTS.textColor);
  const [backgroundColor, setBackgroundColor] = useState(DEFAULTS.backgroundColor);
  const [opacity, setOpacity] = useState(DEFAULTS.opacity);
  const [blur, setBlur] = useState(DEFAULTS.blur);
  const [borderOpacity, setBorderOpacity] = useState(DEFAULTS.borderOpacity);
  const [copied, setCopied] = useState(false);
  const [activePreset, setActivePreset] = useState("Ink / Paper");
  const [showPresets, setShowPresets] = useState(false);

  const validTextColor = isHex(textColor) ? textColor : DEFAULTS.textColor;
  const validBackgroundColor = isHex(backgroundColor) ? backgroundColor : DEFAULTS.backgroundColor;
  const ratio = contrastRatio(validTextColor, validBackgroundColor);
  const ratioPercent = Math.min((ratio / 21) * 100, 100);
  const formattedRatio = `${ratio.toFixed(2)}:1`;
  const smallAA = ratio >= 4.5;
  const smallAAA = ratio >= 7;
  const largeAA = ratio >= 3;
  const largeAAA = ratio >= 4.5;
  const allPass = smallAA && smallAAA && largeAA && largeAAA;
  const cssCode = `.glass-panel {\n  background: rgba(255, 255, 255, ${(opacity / 100).toFixed(2)});\n  border: 1px solid rgba(255, 255, 255, ${(borderOpacity / 100).toFixed(2)});\n  backdrop-filter: blur(${blur}px);\n  -webkit-backdrop-filter: blur(${blur}px);\n}`;

  const applyPreset = (preset: typeof PRESETS[number]) => {
    setTextColor(preset.text);
    setBackgroundColor(preset.background);
    setActivePreset(preset.name);
    setShowPresets(false);
  };

  const swapColors = () => {
    setTextColor(validBackgroundColor);
    setBackgroundColor(validTextColor);
    setActivePreset("Custom");
  };

  const resetAll = () => {
    setTextColor(DEFAULTS.textColor);
    setBackgroundColor(DEFAULTS.backgroundColor);
    setOpacity(DEFAULTS.opacity);
    setBlur(DEFAULTS.blur);
    setBorderOpacity(DEFAULTS.borderOpacity);
    setActivePreset("Ink / Paper");
    toast("Studio reset", { description: "Default calibration restored." });
  };

  const copyCss = async () => {
    try {
      await navigator.clipboard.writeText(cssCode);
    } catch {
      const fallback = document.createElement("textarea");
      fallback.value = cssCode;
      fallback.style.position = "fixed";
      fallback.style.opacity = "0";
      document.body.appendChild(fallback);
      fallback.select();
      document.execCommand("copy");
      document.body.removeChild(fallback);
    }
    setCopied(true);
    toast.success("CSS copied to clipboard", { description: "Ready to paste into your project." });
    window.setTimeout(() => setCopied(false), 2200);
  };

  return (
    <div className="studio-shell">
      <header className="topbar">
        <a className="brand" href="#studio" aria-label="A11y Glass Studio, back to the top"><img src={ASSETS.logo} alt="" className="brand-mark" /><span>A11y <i>Glass</i> Studio</span></a>
        <div className="topbar-actions">
          <span className="topbar-status"><span className="status-dot" aria-hidden="true" /> WCAG 2.1 calibrated</span>
          <button className="reset-button" type="button" onClick={resetAll}><RotateCcw size={14} aria-hidden="true" /> Reset</button>
        </div>
      </header>

      <main id="studio">
        <section className="hero" style={{ backgroundImage: `linear-gradient(90deg, #0b0d10 14%, rgba(11,13,16,.92) 41%, rgba(11,13,16,.15) 100%), url(${ASSETS.hero})` }}>
          <div className="hero-copy">
            <p className="eyebrow"><Sparkles size={14} aria-hidden="true" /> Studio for accessible surfaces</p>
            <h1>Read the light.<br /><em>Design the glass.</em></h1>
            <p className="hero-text">Calibrate WCAG contrast and shape a production-ready glassmorphism surface, with every decision visible as you work.</p>
            <div className="hero-actions"><a href="#contrast-lab" className="hero-link">Open the labs <span>↘</span></a><span className="hero-microcopy">Live calculations · no sign-up</span></div>
          </div>
          <div className="hero-scale" aria-hidden="true"><span>01</span><span className="scale-line" /><span>21:1</span></div>
        </section>

        <section className="workspace" aria-label="Accessibility and glassmorphism tools">
          <article className="tool-card contrast-card" id="contrast-lab">
            <div className="card-topline"><p className="card-index">01 / Contrast lab</p><Accessibility size={18} aria-hidden="true" /></div>
            <div className="section-heading"><div><h2>Color contrast<br />checker</h2><div className="live-pill"><span className="live-dot" /> Live analysis</div></div><p>Test text and background with the WCAG relative luminance formula.</p></div>
            <div className="preset-bar">
              <div className="preset-label"><WandSparkles size={14} aria-hidden="true" /> Preset <b>{activePreset}</b></div>
              <div className="preset-actions">
                <button className="text-action" type="button" onClick={() => setShowPresets(!showPresets)} aria-expanded={showPresets}>Browse presets</button>
                <button className="icon-action" type="button" onClick={swapColors} aria-label="Swap text and background colors" title="Swap colors"><ArrowLeftRight size={15} /></button>
              </div>
              {showPresets && <div className="preset-menu">{PRESETS.map((preset) => <button key={preset.name} type="button" onClick={() => applyPreset(preset)}><span className="preset-dots"><i style={{ backgroundColor: preset.text }} /><i style={{ backgroundColor: preset.background }} /></span>{preset.name}<Check size={13} className={activePreset === preset.name ? "preset-check" : "preset-check hidden"} /></button>)}</div>}
            </div>
            <div className="contrast-workbench" style={{ backgroundImage: `linear-gradient(rgba(12,15,18,.76), rgba(12,15,18,.94)), url(${ASSETS.texture})` }}>
              <div className="color-controls"><ColorControl id="text" label="Text color" description="Foreground" value={textColor} onChange={(value) => { setTextColor(value); setActivePreset("Custom"); }} /><div className="control-divider" aria-hidden="true"><Pipette size={16} /></div><ColorControl id="background" label="Background color" description="Surface" value={backgroundColor} onChange={(value) => { setBackgroundColor(value); setActivePreset("Custom"); }} /></div>
              <div className="contrast-result-area"><div className="ratio-dial" style={{ background: `conic-gradient(#e9ff70 ${ratioPercent}%, rgba(255,255,255,.10) ${ratioPercent}% 100%)` }}><div className="ratio-dial-inner"><strong>{formattedRatio}</strong><span>Contrast ratio</span></div></div><p className="ratio-note">Maximum measurable ratio <b>21:1</b></p></div>
              <div className="type-preview" style={{ color: validTextColor, backgroundColor: validBackgroundColor }}><span>LIVE TYPE SAMPLE</span><p>The clearest designs make every word easy to read.</p><small>Regular text / 16px · Large text / 24px bold</small></div>
            </div>
            <div className={`result-callout ${allPass ? "is-pass" : "is-partial"}`}><div className="result-icon">{allPass ? <CheckCircle2 size={18} /> : <X size={18} />}</div><div><strong>{allPass ? "All text sizes pass" : smallAA ? "Readable at AA level" : "Contrast needs attention"}</strong><span>{allPass ? "This combination clears AA and AAA thresholds." : "Adjust either color to improve the result."}</span></div></div>
            <div className="compliance-list"><div className="compliance-header"><span>WCAG 2.1</span><span>Compliance</span></div><ComplianceRow label="Small text" note="under 24px / 18.66px bold" aa={smallAA} aaa={smallAAA} /><ComplianceRow label="Large text" note="at least 24px / 18.66px bold" aa={largeAA} aaa={largeAAA} /></div>
          </article>

          <article className="tool-card glass-card" id="glass-lab">
            <div className="card-topline"><p className="card-index">02 / Material lab</p><SlidersHorizontal size={18} aria-hidden="true" /></div>
            <div className="section-heading"><div><h2>Glassmorphism<br />generator</h2><div className="live-pill"><span className="live-dot" /> CSS synced</div></div><p>Shape the panel material and watch the filter move across the color spectrum.</p></div>
            <div className="glass-stage" style={{ backgroundImage: `url(${ASSETS.spectrum})` }}><span className="stage-coordinate coord-one">X 045</span><span className="stage-coordinate coord-two">Y 090</span><div className="glass-surface" style={{ background: `rgba(255, 255, 255, ${opacity / 100})`, borderColor: `rgba(255, 255, 255, ${borderOpacity / 100})`, backdropFilter: `blur(${blur}px)`, WebkitBackdropFilter: `blur(${blur}px)` }}><span className="surface-kicker">A11Y GLASS / 01</span><h3>A surface<br />that lets the<br /><i>light through.</i></h3><div className="surface-rule" /><p>Opacity {opacity}% <span>·</span> Blur {blur}px</p></div></div>
            <div className="range-controls" aria-label="Glass effect controls"><RangeControl id="opacity" label="Background opacity" unit="%" value={opacity} min={0} max={100} onChange={setOpacity} /><RangeControl id="blur" label="Backdrop blur" unit="px" value={blur} min={0} max={20} onChange={setBlur} /><RangeControl id="border-opacity" label="Border opacity" unit="%" value={borderOpacity} min={0} max={100} onChange={setBorderOpacity} /></div>
            <div className="code-output"><div className="code-heading"><div><Code2 size={17} aria-hidden="true" /><span>CSS output</span><span className="sync-label"><span /> synced</span></div><button className={`copy-button ${copied ? "copied" : ""}`} type="button" onClick={copyCss}>{copied ? <Check size={15} aria-hidden="true" /> : <Copy size={15} aria-hidden="true" />} {copied ? "Copied" : "Copy CSS"}</button></div><pre aria-label="Generated CSS"><code>{cssCode}</code></pre></div>
            <p className="support-note">The <code>backdrop-filter</code> property is paired with its WebKit fallback for broader browser support.</p>
          </article>
        </section>
      </main>

      <footer className="footer"><span>Built for deliberate design · WCAG 2.1 contrast logic</span><span className="footer-sign"><Check size={14} aria-hidden="true" /> Made for accessible craft</span></footer>
    </div>
  );
}

export { contrastRatio };
