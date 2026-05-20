import { useState } from 'react';
import EmptyState from './EmptyState.jsx';
import WallScreen from './WallScreen.jsx';
import { DEMO, getPostcard, getPrivateNote } from '../utils/creatorStorage.js';

const SUBTABS = ['New', 'Active', 'Finished'];

function formatSentAt(iso) {
  return new Date(iso).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

export default function CampaignsScreen() {
  const [sub, setSub] = useState('Finished');
  const postcard = getPostcard(DEMO.campaignId, DEMO.creatorHandle);
  const privateNote = getPrivateNote(DEMO.campaignId, DEMO.creatorHandle);

  return (
    <div className="campaigns">
      <div className="subtabs" role="tablist" aria-label="Campaign status">
        {SUBTABS.map((t) => (
          <button
            key={t}
            role="tab"
            aria-selected={sub === t}
            className={'subtabs__item' + (sub === t ? ' subtabs__item--active' : '')}
            onClick={() => setSub(t)}
          >
            {t}
          </button>
        ))}
      </div>
      <div className="campaigns__body campaigns__body--wall">
        {sub === 'New' && <EmptyState kind="new" />}
        {sub === 'Active' && <EmptyState kind="active" />}
        {sub === 'Finished' && (
          postcard
            ? <WallScreen
                brandName={DEMO.brandName}
                campaignTitle={DEMO.campaignTitle}
                postcard={postcard}
                post={DEMO.post}
                privateNote={privateNote}
                sentAtLabel={formatSentAt(postcard.sentAt)}
              />
            : <EmptyState kind="finished" />
        )}
      </div>
    </div>
  );
}
