import PolaroidPostcard from './components/PolaroidPostcard.jsx';

export default function App() {
  return (
    <div style={{ minHeight: '100%', display: 'grid', placeItems: 'center', background: '#222' }}>
      <PolaroidPostcard
        thumbnailUrl={`${import.meta.env.BASE_URL}sample-post.svg`}
        platform="Instagram Reel"
        brandName="Pikora"
        message="this made our whole week — thank you for the magic ✨"
        signoff="— the Pikora team"
      />
    </div>
  );
}
