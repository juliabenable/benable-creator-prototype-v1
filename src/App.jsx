import { useState, useEffect } from 'react';
import MobileShell from './shell/MobileShell.jsx';
import CampaignsScreen from './screens/CampaignsScreen.jsx';
import ThankYouTakeover from './components/ThankYouTakeover.jsx';
import {
  DEMO, seedDemoPostcardIfMissing, getPostcard, hasSeen, markSeen,
} from './utils/creatorStorage.js';

export default function App() {
  const [tab, setTab] = useState('campaigns');
  const [takeoverOpen, setTakeoverOpen] = useState(false);

  useEffect(() => { seedDemoPostcardIfMissing(); }, []);

  // Auto-open once when Campaigns is active and the thank-you is unseen.
  useEffect(() => {
    if (tab !== 'campaigns') return;
    if (getPostcard(DEMO.campaignId, DEMO.creatorHandle) &&
        !hasSeen(DEMO.campaignId, DEMO.creatorHandle)) {
      setTakeoverOpen(true);
    }
  }, [tab]);

  const postcard = getPostcard(DEMO.campaignId, DEMO.creatorHandle);

  function dismissTakeover() {
    markSeen(DEMO.campaignId, DEMO.creatorHandle);
    setTakeoverOpen(false);
  }

  return (
    <MobileShell
      title="Campaigns"
      activeTab={tab}
      onSelectTab={setTab}
      overlay={takeoverOpen && postcard && (
        <ThankYouTakeover
          postcard={postcard}
          brandName={DEMO.brandName}
          onDismiss={dismissTakeover}
        />
      )}
    >
      {tab === 'campaigns'
        ? <CampaignsScreen onOpenThankYou={() => setTakeoverOpen(true)} />
        : <div style={{ padding: 20, color: '#999', fontFamily: 'system-ui' }}>Coming soon</div>}
    </MobileShell>
  );
}
