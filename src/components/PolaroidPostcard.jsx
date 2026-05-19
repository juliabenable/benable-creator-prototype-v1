/**
 * Polaroid thank-you postcard: creator's post photo + handwritten caption
 * + brand sign-off, taped at the top with a slight tilt.
 * Ported from benable-brand-prototype-v4 (polaroid variant only).
 */
export default function PolaroidPostcard({ thumbnailUrl, platform, brandName, message, signoff }) {
  return (
    <div className="pc pc-polaroid">
      <div className="pc-polaroid__tape" />
      <div
        className="pc-polaroid__photo"
        style={thumbnailUrl ? { backgroundImage: `url(${thumbnailUrl})` } : undefined}
      >
        {platform && (
          <span className="pc-polaroid__platform-tag">{platformIcon(platform)} {platform}</span>
        )}
      </div>
      <div className="pc-polaroid__caption">{message || 'we love what you made!'}</div>
      <div className="pc-polaroid__signoff">{signoff || `from ${brandName}`}</div>
    </div>
  );
}

function platformIcon(platform) {
  const p = platform.toLowerCase();
  if (p.includes('reel') || p.includes('instagram')) return '▶';
  if (p.includes('tiktok')) return '♪';
  if (p.includes('stor')) return '○';
  return '▶';
}
