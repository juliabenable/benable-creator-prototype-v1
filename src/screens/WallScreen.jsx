import { useState } from 'react';
import PolaroidPostcard from '../components/PolaroidPostcard.jsx';
import PolaroidBackNote from '../components/PolaroidBackNote.jsx';

export default function WallScreen({ brandName, campaignTitle, postcard, post, privateNote, sentAtLabel }) {
  const [flipped, setFlipped] = useState(false);
  const canFlip = !!privateNote;

  function handleTap() {
    if (canFlip) setFlipped((f) => !f);
  }

  return (
    <div className="wall">
      <div className="wall__pin-area">
        <button
          type="button"
          className={'wall__card' + (flipped ? ' wall__card--flipped' : '') + (canFlip ? '' : ' wall__card--no-flip')}
          onClick={handleTap}
          aria-label={canFlip ? (flipped ? 'Flip back to the polaroid' : `Read the private note from ${brandName}`) : `Polaroid from ${brandName}`}
        >
          <span className="wall__face wall__face--front">
            <PolaroidPostcard
              thumbnailUrl={post.thumbnailUrl}
              platform={post.platform}
              brandName={brandName}
              message={postcard.message}
              signoff={postcard.signoff}
            />
          </span>
          <span className="wall__face wall__face--back">
            {privateNote && (
              <PolaroidBackNote
                brandName={brandName}
                message={privateNote.message}
                signoff={privateNote.signoff}
              />
            )}
          </span>
        </button>
      </div>
      <p className="wall__caption">
        From {brandName} · {campaignTitle} · {sentAtLabel}
        {canFlip && <span className="wall__caption-hint"> · tap polaroid for a private note</span>}
      </p>
    </div>
  );
}
