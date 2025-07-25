import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { BookOpen, Award, Users, Leaf, ChevronRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import heroImage from "@/assets/farmer-set.png";

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: BookOpen,
      title: "Tes Komprehensif",
      description:
        "Evaluasi mendalam tentang pemahaman prinsip-prinsip RSPO PADI",
    },
    {
      icon: Award,
      title: "Sertifikasi Resmi",
      description:
        "Dapatkan sertifikat yang diakui untuk kompetensi berkelanjutan",
    },
    {
      icon: Users,
      title: "Pengembangan Kapasitas",
      description: "Tingkatkan kemampuan dalam praktik pertanian berkelanjutan",
    },
    {
      icon: Leaf,
      title: "Komitmen Berkelanjutan",
      description:
        "Berkontribusi pada masa depan pertanian yang lebih berkelanjutan",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-accent/10">
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
                  SAT RSPO PADI
                  <span className="block text-3xl md:text-4xl text-primary">
                    Sustainable Agriculture Test
                  </span>
                </h1>
                <p className="text-lg text-muted-foreground max-w-lg">
                  Platform tes dan evaluasi untuk mengukur pemahaman tentang
                  praktik pertanian berkelanjutan sesuai standar RSPO
                  (Roundtable on Sustainable Palm Oil).
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  variant="hero"
                  size="xl"
                  onClick={() => navigate("/register")}
                  className="group"
                >
                  Mulai Tes Sekarang
                  <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button
                  variant="outline"
                  size="xl"
                  onClick={() => navigate("/login")}
                >
                  Sudah Punya Akun?
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={heroImage}
                  alt="SAT RSPO PADI Hero"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
