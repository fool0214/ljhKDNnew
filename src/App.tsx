import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { CartProvider } from './contexts/CartContext';
import { AuthProvider } from './contexts/AuthContext';
import { ToastProvider } from './contexts/ToastContext';
import PublicLayout from './layouts/PublicLayout';
import site from './config/site';
import type { ReactElement, ReactNode } from 'react';

const ShopWrapper = ({ children }: { children: ReactNode }): ReactElement =>
  site.features.shop ? <CartProvider>{children}</CartProvider> : <>{children}</>;

function App(): ReactElement {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <ToastProvider>
            <ShopWrapper>
              <Router>
                <div className="App">
                  <Routes>
                    <Route path="*" element={<PublicLayout />} />
                  </Routes>
                </div>
              </Router>
            </ShopWrapper>
          </ToastProvider>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
