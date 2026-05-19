import { useEffect, useState } from 'react';
import PolaroidPostcard from './PolaroidPostcard.jsx';
import { DEMO } from '../utils/creatorStorage.js';

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// phase: 'sealed' | 'opening' | 'revealed' | 'dismissed'
export default function ThankYouTakeover({ postcard, brandName, onDismiss }) {
  const reduced = prefersReducedMotion();
  const [phase, setPhase] = useState(reduced ? 'revealed' : 'sealed');
  const [scrimIn, setScrimIn] = useState(false);

  useEffect(() => {
    const r = requestAnimationFrame(() => setScrimIn(true));
    return () => cancelAnimationFrame(r);
  }, []);

  function openEnvelope() {
    if (phase !== 'sealed') return;
    setPhase('opening');
    window.setTimeout(() => setPhase('revealed'), 650);
  }

  function dismiss() {
    setPhase('dismissed');
    setScrimIn(false);
    window.setTimeout(onDismiss, 320);
  }

  return (
    <div className={'tyt-scrim' + (scrimIn ? ' tyt-scrim--in' : '')} role="dialog" aria-modal="true">
      <div className={'tyt-stage tyt--' + phase}>
        <button
          type="button"
          className="tyt-envelope"
          onClick={openEnvelope}
          aria-label={phase === 'sealed' ? `Open the thank-you from ${brandName}` : 'Thank-you postcard'}
        >
          <span className="tyt-env-back" aria-hidden="true" />
          <span className="tyt-polaroid-wrap" aria-hidden={phase !== 'revealed'}>
            <PolaroidPostcard
              thumbnailUrl={postcard.thumbnailUrl}
              platform={postcard.platform}
              brandName={brandName}
              message={postcard.message}
              signoff={postcard.signoff}
            />
          </span>
          <span className="tyt-env-front" aria-hidden="true" />
          <span className="tyt-env-flap" aria-hidden="true" />
          <span className="tyt-seal" aria-hidden="true">♥</span>
          {[...Array(10)].map((_, i) => (
            <span key={i} className={'tyt-cp tyt-cp--' + (i + 1)} aria-hidden="true" />
          ))}
        </button>

        <p className="tyt-caption">
          {phase === 'sealed'
            ? `${brandName} sent you a thank-you`
            : phase === 'revealed'
              ? 'A little something from the team 💛'
              : ' '}
        </p>
        {phase === 'revealed' && (
          <button type="button" className="tyt-done" onClick={dismiss}>Done</button>
        )}
        {phase === 'sealed' && (
          <button type="button" className="tyt-skip" onClick={dismiss}>Maybe later</button>
        )}
      </div>
    </div>
  );
}
