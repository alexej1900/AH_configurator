import { useQuery } from '@apollo/client';
import { bathImages, kitchenImages, livingRoomImages, roomImages } from '../../gql/index';

export default  function getImages(room) {

  let images;
  
  // If images are uploaded in one folder ---------------
  return images = useQuery(roomImages).data?.assets;

  // If images are uploaded in different folders --------

  //  switch(room) {
  //     case 'wohnraum':
  //       return images = useQuery(livingRoomImages).data?.assets.filter((asset) => asset.title !== undefined);
  //     case 'küche':
  //       return images = useQuery(kitchenImages).data?.assets.filter((asset) => asset.title !== undefined);
  //     case 'bathroom':
  //       return images = useQuery(bathImages).data?.assets.filter((asset) => asset.title !== undefined);
  //     default:
  //   }
}
