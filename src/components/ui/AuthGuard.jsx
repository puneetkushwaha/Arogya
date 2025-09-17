import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const AuthGuard = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  // Public routes that don't require authentication
  const publicRoutes = ['/user-login', '/user-registration'];

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = () => {
    try {
      // Check for authentication token in localStorage
      const authToken = localStorage.getItem('arogyaplus_auth_token');
      const userSession = localStorage.getItem('arogyaplus_user_session');
      
      if (authToken && userSession) {
        // Validate token expiry
        const sessionData = JSON.parse(userSession);
        const currentTime = new Date()?.getTime();
        
        if (sessionData?.expiresAt && currentTime < sessionData?.expiresAt) {
          setIsAuthenticated(true);
        } else {
          // Session expired, clear storage
          localStorage.removeItem('arogyaplus_auth_token');
          localStorage.removeItem('arogyaplus_user_session');
          setIsAuthenticated(false);
        }
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('Auth check error:', error);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 emergency-pulse">
            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
          <p className="text-text-secondary font-medium">Verifying your session...</p>
        </div>
      </div>
    );
  }

  // Check if current route is public
  const isPublicRoute = publicRoutes?.includes(location?.pathname);

  // If user is not authenticated and trying to access protected route
  if (!isAuthenticated && !isPublicRoute) {
    return <Navigate to="/user-login" state={{ from: location }} replace />;
  }

  // If user is authenticated and trying to access login/registration
  if (isAuthenticated && isPublicRoute) {
    return <Navigate to="/health-dashboard" replace />;
  }

  // Render children for valid access
  return children;
};

export default AuthGuard;