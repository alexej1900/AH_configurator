import { useQuery } from '@apollo/client';
import { introScreen } from '../../gql/index';

export default async function getInitialData() {

  const initialData = await useQuery(introScreen).data?.globalSets[0].welcomeScreen[0];

  return initialData;
}