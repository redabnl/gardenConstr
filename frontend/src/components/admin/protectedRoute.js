import React from 'react';
import { Route, Redirect } from 'react-router-dom';

function ProtectedRoute({ component: Component, ...rest }) {
  const isAuthenticated = !!localStorage.getItem('admin_token');  // Check if token exists

  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to="api/admin/login" />  // Redirect to login if not authenticated
        )
      }
    />
  );
}

export default ProtectedRoute;
