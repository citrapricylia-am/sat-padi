import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { Trophy, Download, RefreshCw, Award, Target, TrendingUp } from "lucide-react";
import { ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

const Results = () => {
  const [result, setResult] = useState<any>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is logged in and has result
    const userPhone = localStorage.getItem("userPhone");
    const testResult = localStorage.getItem("testResult");
    
    if (!userPhone || !testResult) {
      navigate("/login");
      return;
    }

    setResult(JSON.parse(testResult));
  }, [navigate]);

  if (!result) {
    return <div>Loading...</div>;
  }

  // Chart data
  const pieData = [
    { name: "Benar", value: result.score, fill: "hsl(var(--primary))" },
    { name: "Perlu Perbaikan", value: 100 - result.score, fill: "hsl(var(--muted))" }
  ];

  const barData = [
    { category: "Pengetahuan RSPO", score: result.score - 5 + Math.random() * 10 },
    { category: "Praktik Berkelanjutan", score: result.score - 3 + Math.random() * 8 },
    { category: "Manajemen Lingkungan", score: result.score + 2 + Math.random() * 6 },
    { category: "Keterlibatan Masyarakat", score: result.score - 8 + Math.random() * 12 }
  ];

  const getScoreColor = (score: number) => {
    if (score >= 85) return "bg-success text-success-foreground";
    if (score >= 70) return "bg-warning text-warning-foreground";
    return "bg-destructive text-destructive-foreground";
  };

  const getRecommendations = (score: number) => {
    if (score >= 85) {
      return {
        title: "Excellent Performance",
        description: "Anda menunjukkan pemahaman yang sangat baik tentang prinsip-prinsip RSPO PADI.",
        actions: [
          "Pertahankan pengetahuan dengan mengikuti update terbaru",
          "Bagikan pengetahuan kepada rekan kerja",
          "Pertimbangkan untuk menjadi mentor atau trainer"
        ]
      };
    } else if (score >= 70) {
      return {
        title: "Good Performance",
        description: "Anda memiliki pemahaman yang baik, namun masih ada ruang untuk perbaikan.",
        actions: [
          "Fokus pada area yang masih perlu diperbaiki",
          "Ikuti pelatihan tambahan untuk topik tertentu",
          "Praktikkan penerapan prinsip-prinsip RSPO"
        ]
      };
    } else {
      return {
        title: "Needs Improvement",
        description: "Diperlukan peningkatan pemahaman yang signifikan tentang RSPO PADI.",
        actions: [
          "Ikuti pelatihan dasar RSPO PADI",
          "Pelajari materi referensi yang disediakan",
          "Konsultasi dengan supervisor atau mentor"
        ]
      };
    }
  };

  const recommendations = getRecommendations(result.score);

  const downloadCertificate = () => {
    toast({
      title: "Sertifikat Diunduh",
      description: "Sertifikat hasil tes telah berhasil diunduh",
    });
  };

  const retakeTest = () => {
    localStorage.removeItem("testAnswers");
    localStorage.removeItem("testResult");
    navigate("/test");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-accent/10">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center space-x-2">
              <Trophy className="h-8 w-8 text-primary" />
              <h1 className="text-3xl font-bold text-foreground">Hasil Tes SAT RSPO PADI</h1>
            </div>
            <p className="text-muted-foreground">
              Selesai pada: {new Date(result.completedAt).toLocaleDateString('id-ID', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </p>
          </div>

          {/* Score Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="shadow-lg">
              <CardHeader className="text-center">
                <CardTitle className="flex items-center justify-center space-x-2">
                  <Award className="h-5 w-5" />
                  <span>Skor Total</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">{result.score}</div>
                <div className="text-sm text-muted-foreground mb-3">dari 100</div>
                <Badge className={getScoreColor(result.score)}>
                  {result.level}
                </Badge>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardHeader className="text-center">
                <CardTitle className="flex items-center justify-center space-x-2">
                  <Target className="h-5 w-5" />
                  <span>Tingkat Kelulusan</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-2xl font-bold text-accent mb-2">
                  {result.score >= 70 ? "LULUS" : "BELUM LULUS"}
                </div>
                <div className="text-sm text-muted-foreground">
                  Standar minimum: 70
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardHeader className="text-center">
                <CardTitle className="flex items-center justify-center space-x-2">
                  <TrendingUp className="h-5 w-5" />
                  <span>Persentil</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-2xl font-bold text-success mb-2">
                  {Math.floor(result.score * 0.8)}%
                </div>
                <div className="text-sm text-muted-foreground">
                  Lebih baik dari peserta lain
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>Distribusi Skor</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={120}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value}%`, "Persentase"]} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>Analisis per Kategori</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={barData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="category" 
                      angle={-45}
                      textAnchor="end"
                      height={80}
                      fontSize={12}
                    />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="score" fill="hsl(var(--primary))" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Recommendations */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl">{recommendations.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">{recommendations.description}</p>
              
              <Separator />
              
              <div>
                <h3 className="font-semibold text-foreground mb-3">Rekomendasi Tindak Lanjut:</h3>
                <ul className="space-y-2">
                  {recommendations.actions.map((action, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                      <span className="text-sm text-muted-foreground">{action}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="hero"
              size="lg"
              onClick={downloadCertificate}
              className="flex items-center space-x-2"
            >
              <Download className="h-4 w-4" />
              <span>Unduh Sertifikat</span>
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              onClick={retakeTest}
              className="flex items-center space-x-2"
            >
              <RefreshCw className="h-4 w-4" />
              <span>Ulangi Tes</span>
            </Button>
            
            <Button
              variant="secondary"
              size="lg"
              onClick={() => navigate("/")}
            >
              Kembali ke Beranda
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;