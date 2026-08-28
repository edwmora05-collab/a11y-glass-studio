/**
 * Design: Laboratorio Ottico. Questa pagina combina rigore da strumento scientifico,
 * campioni luminosi su nero minerale e superfici vetro come prova visiva funzionale.
 */
import { useState } from "react";
import {
  Accessibility,
  Check,
  Code2,
  Copy,
  Pipette,
  SlidersHorizontal,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";

const ASSETS = {
  hero: "/manus-storage/a11y-glass-optical-hero_bb7ec2da.jpg",
  texture: "/manus-storage/a11y-glass-ratio-texture_7b64dac1.jpg",
  spectrum: "/manus-storage/a11y-glass-spectrum-canvas_c76cdda0.jpg",
  logo: "/manus-storage/a11y-glass-logo_34b02b8d.png",
};

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
  const lighter = Math.max(luminanceA, luminanceB);
  const darker = Math.min(luminanceA, luminanceB);
  return (lighter + 0.05) / (darker + 0.05);
}

type ComplianceRowProps = {
  label: string;
  note: string;
  aa: boolean;
  aaa: boolean;
};

function ComplianceRow({ label, note, aa, aaa }: ComplianceRowProps) {
  return (
    <div className="compliance-row">
      <div className="compliance-label">
        <span>{label}</span>
        <small>{note}</small>
      </div>
      <div className="compliance-results" aria-label={`${label}: esiti WCAG`}>
        <span className={`standard-badge ${aa ? "pass" : "fail"}`}>
          <b>AA</b>
          {aa ? "Pass" : "Fail"}
        </span>
        <span className={`standard-badge ${aaa ? "pass" : "fail"}`}>
          <b>AAA</b>
          {aaa ? "Pass" : "Fail"}
        </span>
      </div>
    </div>
  );
}

type ColorControlProps = {
  id: string;
  label: string;
  description: string;
  value: string;
  onChange: (value: string) => void;
};

function ColorControl({ id, label, description, value, onChange }: ColorControlProps) {
  const pickerValue = isHex(value) ? value : "#000000";
  return (
    <div className="color-control">
      <div className="field-heading">
        <label htmlFor={`${id}-hex`}>{label}</label>
        <span>{description}</span>
      </div>
      <div className={`color-input-wrap ${!isHex(value) ? "has-error" : ""}`}>
        <input
          id={`${id}-color`}
          className="native-color"
          type="color"
          value={pickerValue}
          aria-label={`Seleziona ${label.toLowerCase()}`}
          onChange={(event) => onChange(event.target.value.toUpperCase())}
        />
        <input
          id={`${id}-hex`}
          className="hex-input"
          value={value}
          maxLength={7}
          spellCheck="false"
          aria-describedby={`${id}-hint`}
          onChange={(event) => onChange(event.target.value.toUpperCase())}
        />
        <span className="color-swatch" style={{ backgroundColor: pickerValue }} aria-hidden="true" />
      </div>
      <span id={`${id}-hint`} className="sr-only">Inserisci un codice esadecimale nel formato #RRGGBB.</span>
    </div>
  );
}

type RangeControlProps = {
  id: string;
  label: string;
  unit: string;
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
};

function RangeControl({ id, label, unit, value, min, max, onChange }: RangeControlProps) {
  const progress = ((value - min) / (max - min)) * 100;
  return (
    <div className="range-control">
      <div className="range-label-line">
        <label htmlFor={id}>{label}</label>
        <output htmlFor={id}>{value}{unit}</output>
      </div>
      <input
        id={id}
        className="range-input"
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        style={{ background: `linear-gradient(to right, #e9ff70 0%, #e9ff70 ${progress}%, rgba(255,255,255,.14) ${progress}%, rgba(255,255,255,.14) 100%)` }}
      />
    </div>
  );
}

export default function Home() {
  const [textColor, setTextColor] = useState("#F6F7F1");
  const [backgroundColor, setBackgroundColor] = useState("#1B2229");
  const [opacity, setOpacity] = useState(18);
  const [blur, setBlur] = useState(12);
  const [borderOpacity, setBorderOpacity] = useState(34);

  const validTextColor = isHex(textColor) ? textColor : "#F6F7F1";
  const validBackgroundColor = isHex(backgroundColor) ? backgroundColor : "#1B2229";
  const ratio = contrastRatio(validTextColor, validBackgroundColor);
  const ratioPercent = Math.min((ratio / 21) * 100, 100);
  const formattedRatio = `${ratio.toFixed(2)}:1`;
  const smallAA = ratio >= 4.5;
  const smallAAA = ratio >= 7;
  const largeAA = ratio >= 3;
  const largeAAA = ratio >= 4.5;
  const cssCode = `.glass-panel {
  background: rgba(255, 255, 255, ${(opacity / 100).toFixed(2)});
  border: 1px solid rgba(255, 255, 255, ${(borderOpacity / 100).toFixed(2)});
  backdrop-filter: blur(${blur}px);
  -webkit-backdrop-filter: blur(${blur}px);
}`;

  const copyCss = async () => {
    try {
      await navigator.clipboard.writeText(cssCode);
      toast.success("CSS copiato negli appunti", { description: "Pronto da incollare nel tuo progetto." });
    } catch {
      const fallback = document.createElement("textarea");
      fallback.value = cssCode;
      fallback.style.position = "fixed";
      fallback.style.opacity = "0";
      document.body.appendChild(fallback);
      fallback.select();
      document.execCommand("copy");
      document.body.removeChild(fallback);
      toast.success("CSS copiato negli appunti");
    }
  };

  return (
    <div className="studio-shell">
      <header className="topbar">
        <a className="brand" href="#studio" aria-label="A11y Glass Studio, torna all'inizio">
          <img src={ASSETS.logo} alt="" className="brand-mark" />
          <span>A11y <i>Glass</i> Studio</span>
        </a>
        <div className="topbar-status">
          <span className="status-dot" aria-hidden="true" />
          <span>WCAG 2.1 calibrated</span>
        </div>
      </header>

      <main id="studio">
        <section className="hero" style={{ backgroundImage: `linear-gradient(90deg, #0b0d10 14%, rgba(11,13,16,.92) 41%, rgba(11,13,16,.15) 100%), url(${ASSETS.hero})` }}>
          <div className="hero-copy">
            <p className="eyebrow"><Sparkles size={14} aria-hidden="true" /> Studio per superfici accessibili</p>
            <h1>Leggi la luce.<br /><em>Progetta il vetro.</em></h1>
            <p className="hero-text">Calibra contrasti verificati WCAG e trasforma un effetto glassmorphism in CSS pronto per la produzione.</p>
          </div>
          <div className="hero-scale" aria-hidden="true">
            <span>01</span><span className="scale-line" /><span>21:1</span>
          </div>
        </section>

        <section className="workspace" aria-label="Strumenti di accessibilità e glassmorphism">
          <article className="tool-card contrast-card">
            <div className="card-topline">
              <p className="card-index">01 / Contrast lab</p>
              <Accessibility size={18} aria-hidden="true" />
            </div>
            <div className="section-heading">
              <h2>Color contrast<br />checker</h2>
              <p>Verifica testo e sfondo con la formula WCAG per luminanza relativa.</p>
            </div>

            <div className="contrast-workbench" style={{ backgroundImage: `linear-gradient(rgba(12,15,18,.76), rgba(12,15,18,.94)), url(${ASSETS.texture})` }}>
              <div className="color-controls">
                <ColorControl id="text" label="Text color" description="Colore testo" value={textColor} onChange={setTextColor} />
                <div className="control-divider" aria-hidden="true"><Pipette size={16} /></div>
                <ColorControl id="background" label="Background color" description="Colore sfondo" value={backgroundColor} onChange={setBackgroundColor} />
              </div>

              <div className="contrast-result-area">
                <div className="ratio-dial" style={{ background: `conic-gradient(#e9ff70 ${ratioPercent}%, rgba(255,255,255,.10) ${ratioPercent}% 100%)` }}>
                  <div className="ratio-dial-inner"><strong>{formattedRatio}</strong><span>Contrast ratio</span></div>
                </div>
                <p className="ratio-note">Il massimo misurabile è <b>21:1</b></p>
              </div>

              <div className="type-preview" style={{ color: validTextColor, backgroundColor: validBackgroundColor }}>
                <span>LIVE TYPE SAMPLE</span>
                <p>Il design è più chiaro quando ogni parola resta leggibile.</p>
                <small>Regular text / 16px · Large text / 24px bold</small>
              </div>
            </div>

            <div className="compliance-list">
              <div className="compliance-header"><span>WCAG 2.1</span><span>Conformità</span></div>
              <ComplianceRow label="Testo piccolo" note="inferiore a 24px / 18.66px bold" aa={smallAA} aaa={smallAAA} />
              <ComplianceRow label="Testo grande" note="almeno 24px / 18.66px bold" aa={largeAA} aaa={largeAAA} />
            </div>
          </article>

          <article className="tool-card glass-card">
            <div className="card-topline">
              <p className="card-index">02 / Material lab</p>
              <SlidersHorizontal size={18} aria-hidden="true" />
            </div>
            <div className="section-heading">
              <h2>Glassmorphism<br />generator</h2>
              <p>Affina la materia del pannello e osserva il filtro sullo spettro colore.</p>
            </div>

            <div className="glass-stage" style={{ backgroundImage: `url(${ASSETS.spectrum})` }}>
              <span className="stage-coordinate coord-one">X 045</span>
              <span className="stage-coordinate coord-two">Y 090</span>
              <div
                className="glass-surface"
                style={{
                  background: `rgba(255, 255, 255, ${opacity / 100})`,
                  borderColor: `rgba(255, 255, 255, ${borderOpacity / 100})`,
                  backdropFilter: `blur(${blur}px)`,
                  WebkitBackdropFilter: `blur(${blur}px)`,
                }}
              >
                <span className="surface-kicker">A11Y GLASS / 01</span>
                <h3>Una superficie<br />che lascia passare<br /><i>la luce.</i></h3>
                <div className="surface-rule" />
                <p>Opacity {opacity}% <span>·</span> Blur {blur}px</p>
              </div>
            </div>

            <div className="range-controls" aria-label="Controlli effetto vetro">
              <RangeControl id="opacity" label="Background opacity" unit="%" value={opacity} min={0} max={100} onChange={setOpacity} />
              <RangeControl id="blur" label="Backdrop blur" unit="px" value={blur} min={0} max={20} onChange={setBlur} />
              <RangeControl id="border-opacity" label="Border opacity" unit="%" value={borderOpacity} min={0} max={100} onChange={setBorderOpacity} />
            </div>

            <div className="code-output">
              <div className="code-heading">
                <div><Code2 size={17} aria-hidden="true" /><span>CSS output</span></div>
                <button className="copy-button" type="button" onClick={copyCss}>
                  <Copy size={15} aria-hidden="true" /> Copia CSS
                </button>
              </div>
              <pre aria-label="Codice CSS generato"><code>{cssCode}</code></pre>
            </div>
          </article>
        </section>
      </main>

      <footer className="footer">
        <span>Conforme agli algoritmi WCAG 2.1</span>
        <span className="footer-sign"><Check size={14} aria-hidden="true" /> Made for deliberate design</span>
      </footer>
    </div>
  );
}
