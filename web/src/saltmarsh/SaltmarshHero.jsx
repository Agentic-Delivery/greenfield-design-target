import React from 'react'
import './saltmarsh.css'

/**
 * Saltmarsh landing-page hero.
 * Warm · crafted · calm. A copy column (eyebrow, headline, subhead, one primary
 * CTA, reassurance line) beside a product-image panel (an illustrated bag of
 * small-batch coffee). Single-column on phones, two-column from 860px up.
 */
export function SaltmarshHero() {
  return (
    <div className="sm-page">
      <header className="sm-mast">
        <span className="sm-mark">
          Saltmarsh<span className="sm-mark-dot" aria-hidden="true" />
        </span>
      </header>

      <main className="sm-hero">
        <section className="sm-copy" aria-labelledby="sm-title">
          <p className="sm-eyebrow sm-reveal sm-reveal-1">Small-batch coffee roasters</p>

          <h1 id="sm-title" className="sm-title sm-reveal sm-reveal-2">
            Coffee roasted slowly, <em>by the marsh</em>.
          </h1>

          <p className="sm-sub sm-reveal sm-reveal-3">
            We roast in small batches the week you order — single-origin beans,
            unhurried and full of character. No rush, no shortcuts, just coffee
            worth waking up for.
          </p>

          <div className="sm-actions sm-reveal sm-reveal-4">
            <a className="sm-cta" href="#shop">
              Buy now
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                   stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"
                   strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14" />
                <path d="m13 6 6 6-6 6" />
              </svg>
            </a>
            <span className="sm-reassure">
              <b>Roasted to order</b> · free UK shipping over £30
            </span>
          </div>
        </section>

        <figure className="sm-figure sm-reveal sm-reveal-5">
          <svg viewBox="0 0 360 480" role="img"
               aria-label="A kraft-paper bag of Saltmarsh small-batch coffee">
            {/* soft backdrop disc */}
            <circle className="sm-bag-accent" cx="196" cy="150" r="96" opacity="0.18" />

            {/* bag back fold */}
            <rect x="92" y="96" width="176" height="34" rx="6"
                  fill="oklch(0.46 0.05 56)" />
            {/* bag body — kraft gradient */}
            <defs>
              <linearGradient id="sm-kraft" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="oklch(0.74 0.052 64)" />
                <stop offset="1" stopColor="oklch(0.63 0.058 56)" />
              </linearGradient>
            </defs>
            <rect x="80" y="120" width="200" height="300" rx="16" fill="url(#sm-kraft)" />
            {/* side seam highlight */}
            <rect x="80" y="120" width="14" height="300" rx="7"
                  fill="oklch(0.79 0.045 66)" opacity="0.55" />

            {/* label panel */}
            <rect className="sm-bag-label" x="108" y="186" width="144" height="176" rx="10" />
            <rect className="sm-bag-line" x="108.5" y="186.5" width="143" height="175"
                  rx="9.5" fill="none" strokeWidth="1" />

            {/* wordmark */}
            <text className="sm-bag-ink" x="180" y="232" textAnchor="middle"
                  fontFamily="Spectral, Georgia, serif" fontSize="25" fontWeight="500"
                  letterSpacing="0.5">Saltmarsh</text>
            <text className="sm-bag-soft" x="180" y="252" textAnchor="middle"
                  fontFamily="'Hanken Grotesk', sans-serif" fontSize="8.5" fontWeight="600"
                  letterSpacing="2.4">SMALL-BATCH COFFEE</text>

            {/* divider */}
            <line className="sm-bag-line" x1="128" y1="270" x2="232" y2="270" strokeWidth="1" />

            {/* origin + roast */}
            <text className="sm-bag-soft" x="180" y="296" textAnchor="middle"
                  fontFamily="'Hanken Grotesk', sans-serif" fontSize="9" fontWeight="600"
                  letterSpacing="1.6">ETHIOPIA · GUJI</text>
            <text className="sm-bag-ink" x="180" y="316" textAnchor="middle"
                  fontFamily="'Hanken Grotesk', sans-serif" fontSize="11" fontWeight="700"
                  letterSpacing="1">MEDIUM ROAST</text>

            {/* roast level dots */}
            <g>
              <circle className="sm-bag-accent" cx="156" cy="338" r="4" />
              <circle className="sm-bag-accent" cx="172" cy="338" r="4" />
              <circle className="sm-bag-accent" cx="188" cy="338" r="4" />
              <circle className="sm-bag-line" cx="204" cy="338" r="3.5" fill="none" strokeWidth="1.5" />
            </g>

            {/* a few beans at the base */}
            <g fill="oklch(0.40 0.045 50)">
              <g transform="translate(150 446) rotate(-18)">
                <ellipse cx="0" cy="0" rx="13" ry="8.5" />
                <path d="M0 -8 Q3 0 0 8" stroke="oklch(0.30 0.04 48)" strokeWidth="1.4" fill="none" />
              </g>
              <g transform="translate(186 452) rotate(12)">
                <ellipse cx="0" cy="0" rx="13" ry="8.5" />
                <path d="M0 -8 Q3 0 0 8" stroke="oklch(0.30 0.04 48)" strokeWidth="1.4" fill="none" />
              </g>
              <g transform="translate(214 444) rotate(-8)">
                <ellipse cx="0" cy="0" rx="12" ry="8" />
                <path d="M0 -7.5 Q3 0 0 7.5" stroke="oklch(0.30 0.04 48)" strokeWidth="1.3" fill="none" />
              </g>
            </g>
          </svg>

          <figcaption className="sm-tag">
            <span className="sm-tag-dot" aria-hidden="true" />
            Roasted this week
          </figcaption>
        </figure>
      </main>
    </div>
  )
}
