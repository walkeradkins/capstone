import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoginForm from './Components/auth/LoginForm';
import SignUpForm from './Components/auth/SignUpForm';
import NavBar from './Components/NavBar';
import ProtectedRoute from './Components/auth/ProtectedRoute';
import { authenticate } from './store/session';
import { Home, Workspace, PageNotFound } from './Pages'

function App() {
  const [loaded, setLoaded] = useState(false);
  const user = useSelector(state => state.session.user)
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      {user &&
        <NavBar loaded={loaded} />
      }
      <Switch>
        <Route path='/login' exact>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact>
          <SignUpForm />
        </Route>
        <ProtectedRoute path='/b/:workspaceId' exact >
          <Workspace user={user} />
        </ProtectedRoute>
        <ProtectedRoute path='/' exact>
          <Home user={user} />
        </ProtectedRoute>
        <Route>
          <PageNotFound />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
