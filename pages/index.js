import CloudLayout from '../components/CloudLayout';

function HomePage() {
  return (
    <div>
      {/* Your homepage content here */}
    </div>
  );
}

export default function Home() {
  return (
    <CloudLayout>
      <HomePage />
    </CloudLayout>
  );
}
