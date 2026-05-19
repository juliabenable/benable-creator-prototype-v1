export default function FinishedCampaignCard({ brandName, campaignTitle, hasThankYou, onOpenThankYou }) {
  return (
    <div className="fcard">
      <div className="fcard__brandrow">
        <span className="fcard__avatar" aria-hidden="true">{brandName.charAt(0)}</span>
        <span className="fcard__brand">{brandName}</span>
        <span className="fcard__status">Completed</span>
      </div>
      <div className="fcard__title">{campaignTitle}</div>
      <p className="fcard__desc">
        Create a gripping content showcasing our new Bone Broth Collection.
      </p>
      {hasThankYou && (
        <button type="button" className="fcard__thanks" onClick={onOpenThankYou}>
          <span aria-hidden="true">💌</span> Thank-you from {brandName} — tap to open
        </button>
      )}
    </div>
  );
}
