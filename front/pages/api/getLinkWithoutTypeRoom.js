import { useQuery } from '@apollo/client';
import { mainSettings } from '../../gql/index';

export default async function getLinkWithoutTypeRoom() {
  const link = await useQuery(mainSettings).data?.entries[0].title?.toLowerCase();
  return link;
}
