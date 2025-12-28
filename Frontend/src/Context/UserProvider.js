import React from 'react'
import {UserContext} from './Usercontext'
const UserProvider = ({children}) => {
 const [userData, setUserData] = React.useState(null);
 localStorage.setItem("userData", JSON.stringify(userData));
  return (
  <UserContext.Provider value={{userData, setUserData}}>
    {children}
  </UserContext.Provider>
  );
};

export default  UserProvider;