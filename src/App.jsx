import { useState, useEffect } from 'react';
import MobileShell from './shell/MobileShell.jsx';
import CampaignsScreen from './screens/CampaignsScreen.jsx';
import { seedDemoPostcardIfMissing } from './utils/creatorStorage.js';

export default function App() {
  const [tab, setTab] = useState('campaigns');
  useEffect(() => { seedDemoPostcardIfMissing(); }, []);
  return (
    <MobileShell title="Campaigns" activeTab={tab} onSelectTab={setTab}>
      {tab === 'campaigns'
        ? <CampaignsScreen onOpenThankYou={() => {}} />
        : <div style={{ padding: 20, color: '#999', fontFamily: 'system-ui' }}>Coming soon</div>}
    </MobileShell>
  );
}
