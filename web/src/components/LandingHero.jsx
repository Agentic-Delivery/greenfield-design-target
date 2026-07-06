import React from 'react'

/**
 * Marginalia-branded landing hero for tide·now.
 * One screen: a strong headline, one supporting line, a single primary CTA.
 */
export function LandingHero({ onEnter }) {
  return (
    <main className="mg-hero">
      <div className="mg-hero__mast" aria-label="tide·now">
        tide<b>·</b>now
      </div>

      <section className="mg-hero__stage">
        <span className="mg-hero__eyebrow">Holy Island Causeway</span>

        <h1 className="mg-hero__headline">
          Cross when the tide <em>lets&nbsp;you</em>.
        </h1>

        <p className="mg-hero__support">
          Live tide readings for the Holy Island crossing, so you set off at the
          right hour and get home dry.
        </p>

        <button type="button" className="mg-hero__cta" onClick={onEnter}>
          Check today&rsquo;s crossing
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.25"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M5 12h14" />
            <path d="m13 6 6 6-6 6" />
          </svg>
        </button>
      </section>

      <p className="mg-hero__foot">
        <svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.25"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M2 12h3l2-6 4 14 3-9 2 4h6" />
        </svg>
        Updated from the live tide feed
      </p>
    </main>
  )
}
