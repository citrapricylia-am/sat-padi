import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";

const Profile = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is logged in
    const userPhone = localStorage.getItem("userPhone");
    if (!userPhone) {
      navigate("/login");
      return;
    }
    
    // Set phone from localStorage (readonly)
    setFormData(prev => ({ ...prev, phone: userPhone }));
    
    // Load existing data if available
    const savedData = localStorage.getItem("profileData");
    if (savedData) {
      const parsed = JSON.parse(savedData);
      setFormData(prev => ({ ...prev, ...parsed, phone: userPhone }));
    }
  }, [navigate]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email) {
      toast({
        title: "Error",
        description: "Nama dan email wajib diisi",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      localStorage.setItem("profileData", JSON.stringify({
        name: formData.name,
        email: formData.email,
        address: formData.address,
      }));
      
      toast({
        title: "Data Tersimpan",
        description: "Profil Anda telah diperbarui",
      });
      setLoading(false);
    }, 1000);
  };

  const startTest = () => {
    if (!formData.name || !formData.email) {
      toast({
        title: "Lengkapi Profil",
        description: "Silakan isi nama dan email terlebih dahulu",
        variant: "destructive",
      });
      return;
    }
    navigate("/test");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-accent/10">
      <Navbar />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto space-y-6">
          <Card className="shadow-lg">
            <CardHeader className="text-center space-y-2">
              <CardTitle className="text-2xl font-bold text-foreground">Profil Peserta</CardTitle>
              <CardDescription>
                Lengkapi data diri Anda sebelum memulai tes SAT RSPO PADI
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nama Lengkap *</Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Masukkan nama lengkap"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      className="focus:ring-primary"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="contoh@email.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className="focus:ring-primary"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Nomor Telepon</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    disabled
                    className="bg-muted cursor-not-allowed"
                  />
                  <p className="text-xs text-muted-foreground">
                    Nomor telepon tidak dapat diubah
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Alamat</Label>
                  <Textarea
                    id="address"
                    placeholder="Masukkan alamat lengkap"
                    value={formData.address}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                    className="focus:ring-primary"
                    rows={3}
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <Button 
                    type="submit" 
                    variant="outline"
                    disabled={loading}
                    className="flex-1"
                  >
                    {loading ? "Menyimpan..." : "Simpan Data"}
                  </Button>
                  
                  <Button 
                    type="button" 
                    variant="hero"
                    size="lg"
                    onClick={startTest}
                    className="flex-1"
                  >
                    Mulai Tes SAT
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          <Card className="bg-accent/5 border-accent/20">
            <CardContent className="pt-6">
              <div className="text-center space-y-2">
                <h3 className="font-semibold text-accent">Informasi Tes</h3>
                <p className="text-sm text-muted-foreground">
                  Tes SAT RSPO PADI terdiri dari beberapa tahap yang akan menguji pemahaman Anda. 
                  Pastikan data profil telah lengkap sebelum memulai.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;