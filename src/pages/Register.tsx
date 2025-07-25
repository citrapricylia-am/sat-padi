import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";

const Register = () => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!phone || !password || !confirmPassword) {
      toast({
        title: "Error",
        description: "Silakan isi semua field",
        variant: "destructive",
      });
      return;
    }

    if (password !== confirmPassword) {
      toast({
        title: "Error",
        description: "Konfirmasi password tidak sesuai",
        variant: "destructive",
      });
      return;
    }

    if (password.length < 6) {
      toast({
        title: "Error", 
        description: "Password minimal 6 karakter",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    
    // Simulate API call - replace with actual registration
    setTimeout(() => {
      // Mock phone validation - assume phone already exists
      if (phone === "081234567890") {
        toast({
          title: "Registrasi Gagal",
          description: "Nomor telepon sudah terdaftar",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Registrasi Berhasil",
          description: "Akun Anda telah dibuat. Silakan login.",
        });
        navigate("/login");
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
            <CardTitle className="text-2xl font-bold text-foreground">Daftar</CardTitle>
            <CardDescription>
              Buat akun baru untuk mengikuti SAT RSPO PADI
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
                <p className="text-xs text-muted-foreground">
                  Nomor telepon akan digunakan sebagai ID login
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Minimal 6 karakter"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="focus:ring-primary"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Konfirmasi Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Ulangi password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
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
                {loading ? "Memproses..." : "Daftar"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Sudah punya akun?{" "}
                <button
                  onClick={() => navigate("/login")}
                  className="text-primary hover:text-primary-dark font-medium underline-offset-4 hover:underline"
                >
                  Login di sini
                </button>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Register;