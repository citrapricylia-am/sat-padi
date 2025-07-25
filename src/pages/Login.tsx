import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";

const Login = () => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!phone || !password) {
      toast({
        title: "Error",
        description: "Silakan isi semua field",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    
    // Simulate API call - replace with actual authentication
    setTimeout(() => {
      // Mock login validation
      if (phone === "081234567890" && password === "password") {
        toast({
          title: "Login Berhasil",
          description: "Selamat datang di SAT RSPO PADI",
        });
        localStorage.setItem("userPhone", phone);
        navigate("/profile");
      } else {
        toast({
          title: "Login Gagal",
          description: "Nomor telepon atau password salah",
          variant: "destructive",
        });
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-accent/10">
      <Navbar />
      <div className="container mx-auto px-4 py-12 flex items-center justify-center">
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader className="text-center space-y-2">
            <CardTitle className="text-2xl font-bold text-foreground">Login</CardTitle>
            <CardDescription>
              Masuk ke akun SAT RSPO PADI Anda
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Nomor Telepon</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="081234567890"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="focus:ring-primary"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Masukkan password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="focus:ring-primary"
                />
              </div>

              <Button 
                type="submit" 
                className="w-full" 
                variant="hero"
                size="lg"
                disabled={loading}
              >
                {loading ? "Memproses..." : "Login"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Belum punya akun?{" "}
                <button
                  onClick={() => navigate("/register")}
                  className="text-primary hover:text-primary-dark font-medium underline-offset-4 hover:underline"
                >
                  Daftar sekarang
                </button>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;