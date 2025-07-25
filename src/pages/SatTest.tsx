import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
//import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { ChevronLeft, ChevronRight, Upload, Save } from "lucide-react";

// Mock categories and questions data
const categories = [
  {
    id: "inovasi",
    name: "Inovasi Kebijakan dan Perencanaan",
    questions: [
      {
        id: 1,
        question:
          "Apakah Bapak/Ibu saat ini tergabung dalam kelompok petani yang sudah terdaftar secara hukum, atau sedang dalam proses bergabung?:",
        type: "multiple-choice",
        options: [
          "YA, saya sudah tergabung dalam kelompok petani yang terdaftar secara hukum",
          "TIDAK, saya belum tergabung dalam kelompok petani yang terdaftar secara hukum",
          "SEDANG DALAM PROSES, saya sedang dalam proses bergabung dengan kelompok petani yang terdaftar secara hukum",
        ],
      },
      {
        id: 2,
        question:
          "Jika Bapak/Ibu tergabung dalam kelompok, apakah pengambilan keputusan di kelompok dilakukan secara adil dan terbuka? Jika belum tergabung, apakah Bapak/Ibu memahami pentingnya sistem seperti itu?:",
        type: "multiple-choice",
        options: [
          "YA, pengambilan keputusan di kelompok dilakukan secara adil dan terbuka",
          "TIDAK, pengambilan keputusan di kelompok tidak dilakukan secara adil dan terbuka",
          "SEDANG DALAM PROSES, saya sedang memahami pentingnya sistem pengambilan keputusan yang adil dan terbuka",
        ],
      },
      {
        id: 3,
        question:
          "Apakah kelompok (jika sudah ada) memiliki dokumen tambahan sesuai aturan negara? Jika belum tergabung, apakah Bapak/Ibu mengetahui bahwa hal ini akan dibutuhkan saat proses sertifikasi?",
        type: "multiple-choice",
        options: [
          "YA, kelompok memiliki dokumen tambahan sesuai aturan negara",
          "TIDAK, kelompok tidak memiliki dokumen tambahan sesuai aturan negara",
          "SEDANG DALAM PROSES, saya sedang memahami pentingnya dokumen tambahan sesuai aturan negara",
        ],
      },
      {
        id: 4,
        question:
          "Apakah Bapak/Ibu sudah menandatangani pernyataan komitmen sebagai petani sawit berkelanjutan (Smallholder Declaration)?",
        type: "multiple-choice",
        options: [
          "YA, saya sudah menandatangani pernyataan komitmen",
          "TIDAK, saya belum menandatangani pernyataan komitmen",
          "SEDANG DALAM PROSES, saya sedang dalam proses menandatangani pernyataan komitmen",
        ],
      },
      {
        id: 5,
        question:
          "Apakah Bapak/Ibu bersedia menerapkan praktik pertanian yang baik di kebun sendiri sesuai prinsip RSPO?",
        type: "multiple-choice",
        options: [
          "YA, saya bersedia menerapkan praktik pertanian yang baik",
          "TIDAK, saya tidak bersedia menerapkan praktik pertanian yang baik",
          "SEDANG DALAM PROSES, saya sedang memahami pentingnya praktik pertanian yang baik",
        ],
      },
      {
        id: 6,
        question:
          "Apakah Bapak/Ibu memiliki peta atau titik koordinat kebun, dan dapat menunjukkan bukti hak atas lahan tersebut (misalnya surat, warisan, hak adat)?",
        type: "multiple-choice",
        options: [
          "YA, saya memiliki peta atau titik koordinat kebun dan bukti hak atas lahan",
          "TIDAK, saya tidak memiliki peta atau bukti hak atas lahan",
          "SEDANG DALAM PROSES, saya sedang memahami pentingnya peta dan bukti hak atas lahan",
        ],
      },
      {
        id: 7,
        question:
          "Jika belum memiliki dokumen, apakah Bapak/Ibu sedang dalam proses pengurusan legalisasi hak atas lahan tersebut?",
        type: "multiple-choice",
        options: [
          "YA, saya sedang dalam proses pengurusan legalisasi hak atas lahan",
          "TIDAK, saya tidak sedang dalam proses pengurusan legalisasi hak atas lahan",
          "SEDANG DALAM PROSES, saya sedang memahami pentingnya legalisasi hak atas lahan",
        ],
      },
      {
        id: 8,
        question:
          "Apakah lahan yang Bapak/Ibu miliki tidak berasal dari pengambilalihan milik masyarakat adat, komunitas lokal, atau pengguna lain?",
        type: "multiple-choice",
        options: [
          "YA, lahan saya tidak berasal dari pengambilalihan milik masyarakat adat atau pengguna lain",
          "TIDAK, lahan saya berasal dari pengambilalihan milik masyarakat adat atau pengguna lain",
          "SEDANG DALAM PROSES, saya sedang memahami pentingnya tidak mengambilal lahan dari masyarakat adat atau pengguna lain",
        ],
      },
      {
        id: 9,
        question:
          "Jika pernah mengambil lahan dari orang lain, apakah hal itu dilakukan dengan persetujuan dan tanpa paksaan?",
        type: "multiple-choice",
        options: [
          "YA, pengambilan lahan dilakukan dengan persetujuan dan tanpa paksaan",
          "TIDAK, pengambilan lahan tidak dilakukan dengan persetujuan atau ada paksaan",
          "SEDANG DALAM PROSES, saya sedang memahami pentingnya persetujuan dan tanpa paksaan dalam pengambilan lahan",
        ],
      },
      {
        id: 10,
        question:
          "Apakah Bapak/Ibu mengetahui apa itu persetujuan bebas, didahului, dan diinformasikan (FPIC)?",
        type: "multiple-choice",
        options: [
          "YA, saya mengetahui apa itu FPIC",
          "TIDAK, saya tidak mengetahui apa itu FPIC",
          "SEDANG DALAM PROSES, saya sedang memahami pentingnya FPIC",
        ],
      },
      {
        id: 11,
        question:
          "Apakah kebun Bapak/Ibu sedang dalam sengketa atau konflik dengan masyarakat lain?",
        type: "multiple-choice",
        options: [
          "YA, kebun saya sedang dalam sengketa atau konflik",
          "TIDAK, kebun saya tidak sedang dalam sengketa atau konflik",
          "SEDANG DALAM PROSES, saya sedang memahami pentingnya menghindari sengketa atau konflik",
        ],
      },
      {
        id: 12,
        question:
          "Jika ya, apakah Bapak/Ibu bersedia untuk menyelesaikannya melalui cara yang adil dan disepakati semua pihak?",
        type: "multiple-choice",
        options: [
          "YA, saya bersedia menyelesaikan sengketa atau konflik secara adil",
          "TIDAK, saya tidak bersedia menyelesaikan sengketa atau konflik secara adil",
          "SEDANG DALAM PROSES, saya sedang memahami pentingnya penyelesaian sengketa atau konflik secara adil",
        ],
      },
      {
        id: 13,
        question:
          "Jika tidak ada sengketa, apakah Bapak/Ibu memiliki bukti atau kesaksian bahwa lahan tersebut diterima oleh masyarakat sekitar?",
        type: "multiple-choice",
        options: [
          "YA, saya memiliki bukti atau kesaksian bahwa lahan diterima oleh masyarakat sekitar",
          "TIDAK, saya tidak memiliki bukti atau kesaksian tersebut",
          "SEDANG DALAM PROSES, saya sedang memahami pentingnya bukti atau kesaksian penerimaan lahan",
        ],
      },
      {
        id: 14,
        question:
          "Apakah kebun Bapak/Ibu tidak berada di kawasan taman nasional, hutan lindung, atau kawasan konservasi lain?",
        type: "multiple-choice",
        options: [
          "YA, kebun saya tidak berada di kawasan taman nasional atau hutan lindung",
          "TIDAK, kebun saya berada di kawasan taman nasional atau hutan lindung",
          "SEDANG DALAM PROSES, saya sedang memahami pentingnya tidak berada di kawasan konservasi",
        ],
      },
      {
        id: 15,
        question:
          "Apakah Bapak/Ibu mengetahui bahwa kebun tidak boleh berada di dalam wilayah yang dilindungi secara hukum?",
        type: "multiple-choice",
        options: [
          "YA, saya mengetahui bahwa kebun tidak boleh berada di wilayah yang dilindungi",
          "TIDAK, saya tidak mengetahui hal tersebut",
          "SEDANG DALAM PROSES, saya sedang memahami pentingnya tidak berada di wilayah yang dilindungi",
        ],
      },
      {
        id: 16,
        question:
          "Apakah Bapak/Ibu memiliki rencana membuka kebun baru dalam waktu dekat?",
        type: "multiple-choice",
        options: [
          "YA, saya memiliki rencana membuka kebun baru",
          "TIDAK, saya tidak memiliki rencana membuka kebun baru",
          "SEDANG DALAM PROSES, saya sedang memahami pentingnya rencana membuka kebun baru",
        ],
        conditionalQuestions: {
          "Tidak, saya tidak memiliki rencana membuka kebun baru": {
            id: 16.1,
            question:
              "Jika ya, apakah Bapak/Ibu memahami bahwa tidak boleh membuka lahan dari masyarakat tanpa persetujuan mereka?",
            type: "multiple-choice",
            options: [
              "YA, saya memahami bahwa tidak boleh membuka lahan dari masyarakat tanpa persetujuan",
              "TIDAK, saya tidak memahami hal tersebut",
              "SEDANG DALAM PROSES, saya sedang memahami pentingnya persetujuan masyarakat sebelum membuka lahan baru",
            ],
          },
        },
      },
    ],
  },
];

const SatTest = () => {
  const [activeCategory, setActiveCategory] = useState(categories[0].id);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [uploadedFiles, setUploadedFiles] = useState<Record<number, File>>({});
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is logged in
    const userPhone = localStorage.getItem("userPhone");
    if (!userPhone) {
      navigate("/login");
      return;
    }

    // Load saved answers from localStorage
    const savedAnswers = localStorage.getItem("testAnswers");
    if (savedAnswers) {
      setAnswers(JSON.parse(savedAnswers));
    }
  }, [navigate]);

  const currentCategory = categories.find((cat) => cat.id === activeCategory);
  const totalQuestions = categories.reduce(
    (acc, cat) => acc + cat.questions.length,
    0
  );
  const answeredQuestions = Object.keys(answers).length;
  // const progress = (answeredQuestions / totalQuestions) * 100;

  const handleAnswerChange = (questionId: number, value: string) => {
    const newAnswers = { ...answers, [questionId]: value };
    setAnswers(newAnswers);
  };

  const handleFileUpload = (questionId: number, file: File) => {
    setUploadedFiles((prev) => ({ ...prev, [questionId]: file }));
    // For demo purposes, just store the file name as answer
    handleAnswerChange(questionId, file.name);
  };

  const saveDraft = () => {
    localStorage.setItem("testAnswers", JSON.stringify(answers));
    toast({
      title: "Draft Tersimpan",
      description: "Jawaban Anda telah disimpan sebagai draft",
    });
  };

  const handleFinish = () => {
    localStorage.setItem("testAnswers", JSON.stringify(answers));
    navigate("/consent");
  };

  const allQuestionsAnswered = () => {
    const allQuestions = categories.flatMap((cat) => cat.questions);
    return allQuestions.every((q) => q.type === "file-upload" || answers[q.id]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-accent/10">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              SAT RSPO PADI
            </h1>
            <p className="text-muted-foreground">
              Self Assessment Tools - RSPO PADI Assessment
            </p>
          </div>

          {/* Progress 
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-foreground">
                {answeredQuestions} dari {totalQuestions} pertanyaan terjawab
              </span>
              <span className="text-sm text-muted-foreground">
                {Math.round(progress)}% selesai
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Category Buttons */}
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={activeCategory === category.id ? "default" : "outline"}
                onClick={() => setActiveCategory(category.id)}
                className="text-sm"
              >
                {category.name}
              </Button>
            ))}
          </div>

          {/* Questions for Active Category */}
          {currentCategory && (
            <Card className="shadow-lg mb-8">
              <CardHeader>
                <CardTitle className="text-xl text-foreground">
                  {currentCategory.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-8">
                {currentCategory.questions.map((question, questionIndex) => (
                  <div key={question.id} className="space-y-4">
                    <h3 className="text-lg font-medium text-foreground">
                      {questionIndex + 1}. {question.question}
                    </h3>

                    {question.type === "multiple-choice" && (
                      <RadioGroup
                        value={answers[question.id] || ""}
                        onValueChange={(value) =>
                          handleAnswerChange(question.id, value)
                        }
                        className="space-y-3"
                      >
                        {question.options.map((option, optionIndex) => (
                          <div
                            key={optionIndex}
                            className="flex items-start space-x-3"
                          >
                            <RadioGroupItem
                              value={option}
                              id={`q${question.id}-option-${optionIndex}`}
                              className="mt-1 text-primary"
                            />
                            <Label
                              htmlFor={`q${question.id}-option-${optionIndex}`}
                              className="flex-1 cursor-pointer text-foreground leading-relaxed"
                            >
                              {option}
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                    )}

                    {question.type === "file-upload" && (
                      <div className="space-y-4">
                        <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                          <Upload className="mx-auto h-8 w-8 text-muted-foreground mb-3" />
                          <Label
                            htmlFor={`file-upload-${question.id}`}
                            className="cursor-pointer"
                          >
                            <span className="text-primary font-medium">
                              Klik untuk upload file
                            </span>
                            <span className="text-muted-foreground">
                              {" "}
                              atau drag & drop
                            </span>
                          </Label>
                          <Input
                            id={`file-upload-${question.id}`}
                            type="file"
                            accept=".pdf,.doc,.docx"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) handleFileUpload(question.id, file);
                            }}
                            className="hidden"
                          />
                          <p className="text-xs text-muted-foreground mt-2">
                            * Maksimal 5 file. Dokumen ini mendukung jawaban
                            Anda (jika ada)
                          </p>
                        </div>

                        {answers[question.id] && (
                          <div className="bg-accent/10 p-3 rounded border border-accent/20">
                            <p className="text-sm text-foreground">
                              File terupload:{" "}
                              <span className="font-medium">
                                {answers[question.id]}
                              </span>
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Action Buttons */}
          <div className="flex justify-between items-center">
            <Button
              variant="outline"
              onClick={saveDraft}
              className="flex items-center space-x-2"
            >
              <Save className="h-4 w-4" />
              <span>Simpan</span>
            </Button>

            <div className="flex space-x-4">
              <Button
                variant="outline"
                onClick={handleFinish}
                className="flex items-center space-x-2"
              >
                <span>Selanjutnya</span>
                <ChevronRight className="h-4 w-4" />
              </Button>

              <Button
                variant="hero"
                onClick={handleFinish}
                disabled={!allQuestionsAnswered()}
                className="flex items-center space-x-2"
              >
                <span>Keluar</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SatTest;
