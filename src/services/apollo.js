import Vue from 'vue'

import VueApollo from "vue-apollo";
import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";


import { split } from 'apollo-link'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'


const httpLink = new HttpLink({
  uri: "https://on-fawn-52.hasura.app/v1/graphql",
  headers: {
    'x-hasura-admin-secret': 'zgdyehkokpdzguwzyizymhrwayvxongi'
  }
});

const wsLink = new WebSocketLink({
  uri: "wss://on-fawn-52.hasura.app/v1/graphql",
  options: {
    reconnect: true,
    timeout: 30000,
    connectionParams() {
      return {
        headers: {
          'x-hasura-admin-secret': 'zgdyehkokpdzguwzyizymhrwayvxongi'
        }
      }
    }
  }
})

const link = split(({ query }) => {
  const { kind, operation } = getMainDefinition(query)
  return kind === 'OperationDefinition' && operation === 'subscription'
}, wsLink, httpLink)



const apolloClient = new ApolloClient({
    link: link,
    cache: new InMemoryCache()
  });
  
  Vue.use(VueApollo);

  const apolloProvider = new VueApollo({
    defaultClient: apolloClient,
    defaultOptions: {
      $loadingKey: "loading"
    }
  });

  export {
    apolloProvider
  }