import dynamic from 'next/dynamic';

const InventoryContent = dynamic(() => import('../components/pages/InventoryContent'), {
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

export default function Inventory() {
  return <InventoryContent />;
}
