import { useState } from 'react';
import EmptyState from './EmptyState.jsx';
import FinishedCampaignCard from './FinishedCampaignCard.jsx';
import { DEMO, getPostcard } from '../utils/creatorStorage.js';

const SUBTABS = ['New', 'Active', 'Finished'];

export default function CampaignsScreen({ onOpenThankYou }) {
  const [sub, setSub] = useState('Finished');
  const hasThankYou = !!getPostcard(DEMO.campaignId, DEMO.creatorHandle);

  return (
    <div className="campaigns">
      <div className="subtabs" role="tablist">
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
      <div className="campaigns__body">
        {sub === 'New' && <EmptyState kind="new" />}
        {sub === 'Active' && <EmptyState kind="active" />}
        {sub === 'Finished' && (
          <FinishedCampaignCard
            brandName={DEMO.brandName}
            campaignTitle={DEMO.campaignTitle}
            hasThankYou={hasThankYou}
            onOpenThankYou={onOpenThankYou}
          />
        )}
      </div>
    </div>
  );
}
