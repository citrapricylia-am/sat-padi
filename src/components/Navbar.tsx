import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  return (
    <nav className="bg-background/95 backdrop-blur-sm border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div 
          className="flex items-center space-x-2 cursor-pointer"
          onClick={() => navigate('/')}
        >
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-lg">SAT</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">SAT RSPO PADI</h1>
            <p className="text-xs text-muted-foreground">Readiness Assessment Test</p>
          </div>
        </div>

        {!isAuthPage && (
          <div className="flex items-center space-x-3">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => navigate('/login')}
            >
              Login
            </Button>
            <Button 
              variant="hero" 
              size="sm"
              onClick={() => navigate('/register')}
            >
              Daftar
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;