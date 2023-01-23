import { useQuery } from '@apollo/client';
import { mainSettings } from '../../gql/index';

export default async function getSettings() {

  const data = await useQuery(mainSettings).data;
  const settings = data?.globalSets[0].settings[0];
  const rooms = data?.entries.filter((item) => item.title).map((room) => room.title);

  return {settings, rooms};
}
