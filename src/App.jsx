import { useState, useEffect } from 'react';
import MobileShell from './shell/MobileShell.jsx';
import CampaignsScreen from './screens/CampaignsScreen.jsx';
import PlaceholderTab from './screens/PlaceholderTab.jsx';
import ThankYouTakeover from './components/ThankYouTakeover.jsx';
import ResetFab from './components/ResetFab.jsx';
import {
  DEMO, seedDemoPostcardIfMissing, getPostcard, hasSeen, markSeen,
} from './utils/creatorStorage.js';

const TAB_LABELS = { home: 'Home', discover: 'Discover', profile: 'Profile' };

export default function App() {
  const [tab, setTab] = useState('campaigns');
  const [takeoverOpen, setTakeoverOpen] = useState(false);

  useEffect(() => { seedDemoPostcardIfMissing(); }, []);

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
      title={tab === 'campaigns' ? 'Campaigns' : TAB_LABELS[tab]}
      activeTab={tab}
      onSelectTab={setTab}
      overlay={takeoverOpen && postcard && (
        <ThankYouTakeover
          postcard={postcard}
          post={DEMO.post}
          brandName={DEMO.brandName}
          onDismiss={dismissTakeover}
        />
      )}
      fab={<ResetFab />}
    >
      {tab === 'campaigns'
        ? <CampaignsScreen />
        : <PlaceholderTab label={TAB_LABELS[tab]} />}
    </MobileShell>
  );
}
