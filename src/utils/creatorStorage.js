// Brand-compatible persistence. The KEY and the per-entry `postcard` shape are
// intentionally identical to benable-brand-prototype-v4 so a later iteration
// can read real brand-sent thank-yous with no refactor. The `seen` flag and
// the demo seed are creator-app-local and never written into the brand shape.

const STORAGE_KEY = 'benable.creatorActions.v3';
const SEEN_PREFIX = 'benable.creator.seen.';

// The single demo collab. campaignId/handle double as the storage key parts.
export const DEMO = {
  campaignId: 'pikora-bone-broth',
  creatorHandle: '@rmtfka',
  brandName: 'Pikora',
  campaignTitle: 'Instant Beef Bone Broth',
  campaignDesc: 'Create gripping content showcasing our new Bone Broth Collection.',
  // Byte-identical to the brand app's persisted record (it stores exactly
  // { style, message, signoff, sentAt } — see brand CreatorHubModal). The
  // photo + platform tag are NOT stored on the postcard there; they come
  // from campaign post data at render time, so we keep them on `post` below.
  postcard: {
    style: 'polaroid',
    message: 'this made our whole week — thank you for the magic ✨',
    signoff: '— the Pikora team',
    sentAt: '2026-05-14T17:00:00.000Z',
  },
  // Optional private handwritten note the brand sent alongside the polaroid.
  // Creator-introduced field today; a future brand-app iteration writes this
  // alongside `postcard`. Not part of the byte-compat postcard core.
  privateNote: {
    message: "p.s. the way you opened the reel — totally disarming. that's exactly the energy we hoped someone would bring to this. excited to make more.",
    signoff: 'xx Ana, founder',
    sentAt: '2026-05-14T17:00:00.000Z',
  },
  // Campaign post media (NOT persisted in the shared store). In the
  // connect-later iteration this is sourced from real post data, exactly
  // as the brand app does — so the takeover needs no refactor.
  post: {
    platform: 'Instagram Reel',
    thumbnailUrl: 'https://benable-followers.s3.amazonaws.com/ig-siennapierre-reel-3207770097225833451-full.jpg',
  },
};

function readAll() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
  } catch {
    return {};
  }
}
function writeAll(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}
function makeKey(campaignId, creatorHandle) {
  return `${campaignId}::${creatorHandle}`;
}

export function getPostcard(campaignId, creatorHandle) {
  const entry = readAll()[makeKey(campaignId, creatorHandle)];
  return (entry && entry.postcard) || null;
}

export function getPrivateNote(campaignId, creatorHandle) {
  const entry = readAll()[makeKey(campaignId, creatorHandle)];
  return (entry && entry.privateNote) || null;
}

// Seed the demo postcard only if NO entry exists for this key yet. This
// preserves any real brand-written entry untouched (the connect-later goal):
// if the brand app already wrote this key for any reason, we never fabricate
// a demo postcard over it.
export function seedDemoPostcardIfMissing() {
  const all = readAll();
  const key = makeKey(DEMO.campaignId, DEMO.creatorHandle);
  if (!all[key]) {
    all[key] = { postcard: DEMO.postcard, privateNote: DEMO.privateNote };
    writeAll(all);
  }
}

export function hasSeen(campaignId, creatorHandle) {
  return localStorage.getItem(SEEN_PREFIX + makeKey(campaignId, creatorHandle)) === '1';
}
export function markSeen(campaignId, creatorHandle) {
  localStorage.setItem(SEEN_PREFIX + makeKey(campaignId, creatorHandle), '1');
}

// Demo reset: remove ONLY the demo entry + its seen flag (never other
// entries — stays non-destructive for the connect-later scenario), then
// re-seed so the takeover auto-plays again on next Campaigns mount.
export function resetDemo() {
  const all = readAll();
  delete all[makeKey(DEMO.campaignId, DEMO.creatorHandle)];
  writeAll(all);
  localStorage.removeItem(SEEN_PREFIX + makeKey(DEMO.campaignId, DEMO.creatorHandle));
  seedDemoPostcardIfMissing();
}
