import { useQuery } from '@apollo/client';
import { mainSettings } from '../../gql/index';

export default async function getSettings() {

  const data = await useQuery(mainSettings).data;
  const settings = data?.globalSets[0].settings[0];
  const roomsTitle = data?.entries.filter((item) => item.title).map((room) => room.title);
  const roomsSlug = data?.entries.filter((item) => item.slug).map((room) => room.slug);

  return {settings, roomsTitle, roomsSlug};
}
