import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { UserContext} from '../../App';

const PrivateRoute = ({ children, ...rest }) => {

    const { value, value2 } = useContext(UserContext);
    const [logedIn , setLogedIn ] = value2;
    console.log(logedIn.email)
    return (
        <Route
        {...rest}
        render={({ location }) =>
        logedIn.email ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/log-in",
                state: { from: location }
              }}
            />
          )
        }
      />
        
    );
};

export default PrivateRoute;