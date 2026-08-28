# Direzione creativa — A11y Glass Studio

## Tre direzioni esplorate

| Tema | Breve introduzione | Probabilità |
| --- | --- | ---: |
| **Laboratorio Ottico** | Un banco strumenti digitale notturno, dove i controlli WCAG e la materia vetro diventano misurazioni luminose, nette e tattili. | 0.07 |
| **Archivio Editoriale** | Una composizione da rivista di design, calda e tipografica, con campioni colore trattati come reperti di una collezione. | 0.03 |
| **Cromia Brutalista** | Pannelli ad alto contrasto e geometrie tipografiche assertive per rendere la conformità una scelta visiva esplicita. | 0.09 |

## Approccio scelto: Laboratorio Ottico

### Design Movement

**Experimental editorial design** contaminato da strumenti di laboratorio ottico: una UI scura, precisa e sofisticata che rende i valori di accessibilità immediatamente leggibili senza sembrare un cruscotto generico.

### Core Principles

1. **Precisione visibile:** misure, soglie e valori sono la struttura visiva dell'interfaccia.
2. **Contrasto intenzionale:** grandi aree antracite fanno emergere campioni luminosi, risultati e call-to-action.
3. **Materia digitale:** trasparenze, reticoli e sfocature sono usati come esempi funzionali, non come decorazione gratuita.
4. **Composizione asimmetrica:** una colonna di lettura e un'area laboratorio dominano il desktop, evitando carte identiche e griglie anonime.

### Color Philosophy

La base in **nero minerale** richiama una camera oscura e riduce l'affaticamento visivo. Il grigio-argento organizza la gerarchia, mentre il giallo-verde elettrico segnala gli elementi azionabili e le conformità positive senza ricorrere al convenzionale verde “semaforo”. Il corallo resta riservato alle soglie non soddisfatte.

### Layout Paradigm

La pagina opera come una **striscia di strumenti**: una testata essenziale porta al grande risultato di contrasto; sotto, due laboratori di altezza differente si affiancano. Il checker privilegia una lettura verticale della conformità; il generatore vetro si sviluppa invece in un palco colorato con i controlli sul bordo. Su mobile gli strumenti diventano una sequenza con anteprima prima dei controlli, così il risultato resta sempre contestuale.

### Signature Elements

1. **Anello di rapporto:** un quadrante circolare segmentato che rende il contrast ratio riconoscibile a colpo d'occhio.
2. **Reticolo ottico:** griglia sottilissima e cerchi di messa a fuoco nelle superfici di anteprima.
3. **Linee di calibrazione:** etichette monospace e tacche di misura che collegano slider, valori e output CSS.

### Interaction Philosophy

Ogni gesto deve produrre una trasformazione istantanea, leggibile e causale: cambiare un colore aggiorna il quadrante, la preview e quattro esiti WCAG; muovere uno slider modifica il pannello vetro e il codice nella stessa frazione di secondo. Il focus da tastiera è brillante e inequivocabile.

### Animation

Le micro-interazioni usano un'easing deciso `cubic-bezier(0.23, 1, 0.32, 1)`. I pannelli entrano con una breve dissolvenza e traslazione verticale; indicatori e badge cambiano colore senza animazioni appariscenti. I pulsanti reagiscono in 160ms con una riduzione a `scale(0.97)` al click. Le animazioni non essenziali rispettano `prefers-reduced-motion`.

### Typography System

**Space Grotesk** è il carattere display, usato per titoli, valori e label principali con pesi 500–700. **DM Mono** accompagna codici HEX, misure, soglie e output CSS. Titoli brevi, leggermente serrati; testi esplicativi più ariosi; maiuscoletto monospace per i metadati.

### Brand Essence

**Uno studio ottico per designer che vogliono verificare l'accessibilità e costruire superfici vetro con criteri, non per tentativi.**

Personalità: **metodica**, **luminosa**, **contemporanea**.

### Brand Voice

La voce è concisa, competente e operativa; evita superlativi e spiega l'esito senza colpevolizzare l'utente.

> “Leggi la luce prima di scegliere il colore.”

> “Il vetro è pronto. Ora rendilo leggibile.”

### Wordmark & Logo

Il segno è una **lente quadrata spezzata**: due piani traslucidi sfalsati attraversati da un'apertura circolare; allude a contrasto, sovrapposizione e calibrazione. Il wordmark affianca il segno in Space Grotesk semibold con una “A” stilizzata a taglio obliquo.

### Signature Brand Color

**Citrino Elettrico — `#E9FF70`**. È il colore proprietario per focus, valori primari e azioni esplicite.
