import { useState, useEffect } from 'react';
import MobileShell from './shell/MobileShell.jsx';
import { seedDemoPostcardIfMissing } from './utils/creatorStorage.js';

export default function App() {
  const [tab, setTab] = useState('campaigns');
  useEffect(() => { seedDemoPostcardIfMissing(); }, []);
  return (
    <MobileShell title="Campaigns" activeTab={tab} onSelectTab={setTab}>
      <div style={{ padding: 20, color: '#666', fontFamily: 'system-ui' }}>
        Campaigns content goes here
      </div>
    </MobileShell>
  );
}
