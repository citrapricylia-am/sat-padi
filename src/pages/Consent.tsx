import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { FileCheck, Shield, Users, Leaf } from "lucide-react";

const Consent = () => {
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is logged in and has completed the test
    const userPhone = localStorage.getItem("userPhone");
    const testAnswers = localStorage.getItem("testAnswers");
    
    if (!userPhone || !testAnswers) {
      navigate("/login");
      return;
    }
  }, [navigate]);

  const handleSubmit = async () => {
    if (!agreed) {
      toast({
        title: "Persetujuan Diperlukan",
        description: "Anda harus menyetujui syarat dan ketentuan untuk melanjutkan",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    // Simulate processing and result calculation
    setTimeout(() => {
      // Calculate mock score based on answers
      const answers = JSON.parse(localStorage.getItem("testAnswers") || "{}");
      const totalQuestions = Object.keys(answers).length;
      const score = Math.floor(Math.random() * 40) + 60; // Random score between 60-100
      
      // Store result
      const result = {
        score,
        totalQuestions,
        completedAt: new Date().toISOString(),
        level: score >= 85 ? "Excellent" : score >= 70 ? "Good" : "Needs Improvement"
      };
      
      localStorage.setItem("testResult", JSON.stringify(result));
      
      toast({
        title: "Tes Selesai",
        description: "Hasil tes Anda sudah tersedia",
      });
      
      navigate("/results");
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-accent/10">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Persetujuan & Syarat Ketentuan</h1>
            <p className="text-muted-foreground">Mohon baca dan setujui syarat ketentuan berikut sebelum melihat hasil tes</p>
          </div>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileCheck className="h-6 w-6 text-primary" />
                <span>Syarat dan Ketentuan SAT RSPO PADI</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Shield className="h-5 w-5 text-accent mt-1" />
                    <div>
                      <h3 className="font-semibold text-foreground">Kerahasiaan Data</h3>
                      <p className="text-sm text-muted-foreground">
                        Data pribadi dan hasil tes Anda akan dijaga kerahasiaannya sesuai dengan standar privasi yang berlaku.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Users className="h-5 w-5 text-accent mt-1" />
                    <div>
                      <h3 className="font-semibold text-foreground">Penggunaan Data</h3>
                      <p className="text-sm text-muted-foreground">
                        Hasil tes akan digunakan untuk keperluan evaluasi dan pengembangan program SAT RSPO PADI.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Leaf className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <h3 className="font-semibold text-foreground">Komitmen Berkelanjutan</h3>
                      <p className="text-sm text-muted-foreground">
                        Dengan mengikuti tes ini, Anda menunjukkan komitmen terhadap praktik pertanian berkelanjutan.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <FileCheck className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <h3 className="font-semibold text-foreground">Validitas Hasil</h3>
                      <p className="text-sm text-muted-foreground">
                        Hasil tes berlaku untuk periode tertentu dan dapat digunakan sebagai referensi kompetensi.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="bg-accent/5 p-4 rounded-lg border border-accent/20">
                <h3 className="font-semibold text-foreground mb-2">Ketentuan Khusus:</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Hasil tes bersifat rahasia dan hanya dapat diakses oleh peserta yang bersangkutan</li>
                  <li>• Data yang diberikan harus akurat dan dapat dipertanggungjawabkan</li>
                  <li>• Tes ini merupakan bagian dari program pengembangan kapasitas RSPO PADI</li>
                  <li>• Hasil dapat digunakan untuk keperluan sertifikasi atau pengembangan karir</li>
                </ul>
              </div>

              <div className="flex items-center space-x-3 p-4 bg-primary/5 rounded-lg border border-primary/20">
                <Checkbox
                  id="consent"
                  checked={agreed}
                  onCheckedChange={(checked) => setAgreed(checked as boolean)}
                  className="border-primary"
                />
                <Label 
                  htmlFor="consent" 
                  className="text-sm text-foreground cursor-pointer"
                >
                  Saya telah membaca, memahami, dan menyetujui semua syarat dan ketentuan di atas. 
                  Saya bersedia memberikan data yang akurat dan menggunakan hasil tes sesuai dengan ketentuan yang berlaku.
                </Label>
              </div>

              <div className="flex justify-center pt-4">
                <Button
                  variant="hero"
                  size="lg"
                  onClick={handleSubmit}
                  disabled={!agreed || loading}
                  className="px-12"
                >
                  {loading ? "Memproses Hasil..." : "Setuju & Lihat Hasil"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Consent;