import { useQuery } from '@apollo/client';
import { typePage } from '../../gql/index';

export default async function checkIsStylePageExist() {
  const { data } = useQuery(typePage);
  const isStylePageExist = data?.entry?.styles.length > 0;
  return isStylePageExist;
}
