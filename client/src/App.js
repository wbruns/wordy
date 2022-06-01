import React from 'react';
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';

import Profile from './pages/Profile';
import Game from './pages/Game';
import Home from './pages/Home';
import Login from './pages/Login';
import NoMatch from './pages/NoMatch';
import Signup from './pages/Signup';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={ client }>
      <Router>
          <div className='flex-column'>
            <Header />
            <div className='container'>
              <Routes>
                <Route
                  path="/"
                  element={<Home />}
                />
                <Route
                  path="/game"
                  element={<Game />}
                />
                <Route
                  path="/login"
                  element={<Login />}
                />
                <Route
                  path="/signup"
                  element={<Signup />}
                />
                <Route
                  path="/profile"
                  element={<Profile />}
                />

                <Route
                  path="*"
                  element={<NoMatch />}
                />
              </Routes>
            </div>
            <Footer />
          </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;