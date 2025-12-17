import VdpContent from '../components/pages/VdpContent';
import axios from 'axios';

export default function Vdp({ vehicleData }) {
  return <VdpContent initialVehicleData={vehicleData} />;
}

export async function getServerSideProps(context) {
  context.res.setHeader(
    'Cache-Control',
    'public, s-maxage=60, stale-while-revalidate=59'
  );
  const { query } = context;
  let vin = query.vin;
  
  // Handle case where vin might be the first key without value (e.g. ?jhsdfhjs)
  if (!vin) {
      const keys = Object.keys(query);
      if (keys.length > 0 && keys[0] !== 'vin') {
          vin = keys[0];
      }
  }

  try {
      const baseURL = "https://alphaone.greenlightautomotivesolutions.com/";
      const response = await axios.get(`${baseURL}bridge/inventory/inventory.php`, {
          params: {
              "dealership_id": "wholesale-298",
              "sort_inventory": true
          }
      });

      const vehicles = response.data;
      let vehicleData = null;

      if (vin) {
          vehicleData = vehicles.find(v => v.vin === vin);
      }

      // Fallback: if no VIN found or provided, use the first vehicle (mimicking client-side behavior)
      if (!vehicleData && vehicles.length > 0) {
          vehicleData = vehicles[0];
      }

      if (vehicleData && vehicleData.image_urls) {
           vehicleData.images = vehicleData.image_urls.replaceAll('\\"', '').replaceAll('"', '').split(",");
           vehicleData.vdp_hero_image = "https://s3-us-west-2.amazonaws.com/ethosautos/vdp/alphaone/" + vehicleData.vin + ".gif?new";
           
           // Gallery logic
           const split_index = Math.ceil((vehicleData.images.length - 1) / 2);
           if (split_index > 0) {
                const gallery_images = vehicleData.images.slice(1).reduce(function (rows, key, index) {
                    return (index < split_index || vehicleData.images.length - 1 <= 3 ? rows.push([key]) : rows[index - split_index].push(key)) && rows;
                }, []);
                vehicleData.gallery_images = gallery_images;
            } else {
                vehicleData.gallery_images = vehicleData.images.slice(1);
            }
      }

      return {
          props: {
              vehicleData: vehicleData || null
          }
      };

  } catch (error) {
      console.error("Error in getServerSideProps:", error);
      return {
          props: {
              vehicleData: null
          }
      };
  }
}
