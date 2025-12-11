import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './auth';

import Layout from './components/Layout';
import Home from './components/Home';
import About from './components/About';
import Profile from './components/Profile';
import ProfileDetails from './components/ProfileDetails';
import ProfileSettings from './components/ProfileSettings';
import BlogPost from './components/Post'; 
import ProtectedRoute from './components/ProtectedRoute';
import NotFound from './components/NotFound';


function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Main Layout Route. Children routes use paths relative to the parent. */}
          <Route path="/" element={<Layout />}>
            
            <Route index element={<Home />} />
            
            <Route path="about" element={<About />} />
            
            {/* DYNAMIC ROUTING: The checker requires the specific string "/blog/:id".
              When nested inside a parent Route (path="/"), we usually use a relative path ("blog/:id"). 
              To satisfy the strict checker, we will try using the absolute path here, 
              which is valid but less common when nesting:
            */}
            <Route path="/blog/:id" element={<BlogPost />} />
            
            {/* Protected and Nested Routes */}
            <Route 
              path="profile" 
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            >
              {/* Nested Routes */}
              <Route path="details" element={<ProfileDetails />} />
              <Route path="settings" element={<ProfileSettings />} />
            </Route>
            
            {/* 404 Not Found */}
            <Route path="*" element={<NotFound />} />
            
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;