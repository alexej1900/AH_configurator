import Header from './header';
import client from "../../apollo/apollo-client";
import {ApolloProvider} from '@apollo/client';

function Layout({children}) {
    return (
        <ApolloProvider client={client}>
            <Header />
            {children}
        </ApolloProvider>
    )
}
export default Layout;

  