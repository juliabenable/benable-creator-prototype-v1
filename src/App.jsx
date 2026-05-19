import { useState } from 'react';
import MobileShell from './shell/MobileShell.jsx';

export default function App() {
  const [tab, setTab] = useState('campaigns');
  return (
    <MobileShell title="Campaigns" activeTab={tab} onSelectTab={setTab}>
      <div style={{ padding: 20, color: '#666', fontFamily: 'system-ui' }}>
        Campaigns content goes here
      </div>
    </MobileShell>
  );
}
