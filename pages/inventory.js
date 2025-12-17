import InventoryContent from '../components/pages/InventoryContent';
import { processVehicleData } from '../utils/vehicleProcessing';

export default function Inventory({ initialData }) {
  return <InventoryContent initialData={initialData} />;
}

export async function getStaticProps() {
  try {
    const res = await fetch('https://alphaone.greenlightautomotivesolutions.com/bridge/inventory/inventory.php?dealership_id=wholesale-298&sort_inventory=true');
    const data = await res.json();
    const processedData = processVehicleData(data);

    return {
      props: {
        initialData: processedData,
      },
      revalidate: 60, // Revalidate every 60 seconds
    };
  } catch (error) {
    console.error('Error fetching inventory data:', error);
    return {
      props: {
        initialData: null,
      },
      revalidate: 60,
    };
  }
}
