import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
    uri: 'https://ah.immokonfigurator.ch/api',
    cache: new InMemoryCache({resultCaching: true}),
});

export default client; 