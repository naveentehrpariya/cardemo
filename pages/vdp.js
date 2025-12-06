import dynamic from 'next/dynamic';

const VdpContent = dynamic(() => import('../components/pages/VdpContent'), {
  ssr: false,
  loading: () => (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '100vh',
      background: '#000'
    }}>
      <div style={{ color: '#fff' }}>Loading...</div>
    </div>
  )
});

export default function Vdp() {
  return <VdpContent />;
}
