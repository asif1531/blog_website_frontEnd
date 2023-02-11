import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import LoginRegister from './components/LoginRegister';
import { useState, useEffect } from 'react';
import { AuthContext } from './auth';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BlogsView from './components/BlogsView';
import { PrivateRoute } from './PrivateRoute';
import { RedirectForLogin } from './RedirectForLogin';

function App() {
const [userEmaillId, setUserEmailId] = useState(null);
const [authToken, setAuthToken] = useState(null);
const [userId, setUserId] = useState(null);

const getUserDetailsFromLocalStorage = () => {
  let emailData = localStorage.getItem('userEmailId');
  let authTokenData = localStorage.getItem('authToken');
  let userIdData = localStorage.getItem('userId');

  setUserEmailId(emailData);
  setAuthToken(authTokenData);
  setUserId(userIdData);
}

useEffect(() => {
  getUserDetailsFromLocalStorage();
}, [])


  return (
    <div className="App">
         <AuthContext.Provider
         value={{
          userEmaillId,
          authToken,
          userId,
          setUserEmailId,
          setAuthToken,
          setUserId
         }}>
           <Header/>
          <Router>
              <Routes>
                <Route exact path='/' element={
                  <RedirectForLogin>
                    <LoginRegister/>
                  </RedirectForLogin>
                }/>
                <Route exact path='/blogs' element={
                  <PrivateRoute>
                    <BlogsView/>
                  </PrivateRoute>
                }/>
              </Routes>
          </Router>
         </AuthContext.Provider>
        
    
        
     
    </div>
  );
}

export default App;
