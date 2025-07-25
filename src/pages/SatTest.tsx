import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { ChevronLeft, ChevronRight, Upload, Save } from "lucide-react";

// Mock questions data
const questions = [
  {
    id: 1,
    question: "Apa yang Anda ketahui tentang prinsip-prinsip dasar RSPO (Roundtable on Sustainable Palm Oil)?",
    type: "multiple-choice",
    options: [
      "Standar keberlanjutan untuk industri kelapa sawit",
      "Organisasi perdagangan internasional", 
      "Metode penanaman kelapa sawit",
      "Sistem sertifikasi organik"
    ]
  },
  {
    id: 2,
    question: "Jelaskan pemahaman Anda tentang praktik-praktik berkelanjutan dalam perkebunan kelapa sawit",
    type: "multiple-choice",
    options: [
      "Menggunakan pestisida sebanyak mungkin",
      "Konservasi biodiversitas dan pengelolaan limbah yang baik",
      "Ekspansi lahan tanpa batas",
      "Fokus hanya pada produktivitas"
    ]
  },
  {
    id: 3,
    question: "Upload dokumen sertifikat atau pengalaman kerja terkait (jika ada)",
    type: "file-upload",
    options: []
  },
  {
    id: 4,
    question: "Bagaimana Anda akan menangani konflik dengan masyarakat lokal dalam konteks perkebunan?",
    type: "multiple-choice", 
    options: [
      "Mengabaikan keluhan masyarakat",
      "Dialog terbuka dan mencari solusi bersama",
      "Menggunakan pendekatan hukum secara langsung",
      "Memindahkan masyarakat ke tempat lain"
    ]
  },
  {
    id: 5,
    question: "Upload dokumen pendukung lainnya (opsional)",
    type: "file-upload",
    options: []
  }
];

const SatTest = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [uploadedFiles, setUploadedFiles] = useState<Record<number, File>>({});
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

    // Load saved answers from localStorage
    const savedAnswers = localStorage.getItem("testAnswers");
    if (savedAnswers) {
      setAnswers(JSON.parse(savedAnswers));
    }
  }, [navigate]);

  const currentQuestion = questions[currentStep];
  const progress = ((currentStep + 1) / questions.length) * 100;

  const handleAnswerChange = (value: string) => {
    const newAnswers = { ...answers, [currentQuestion.id]: value };
    setAnswers(newAnswers);
  };

  const handleFileUpload = (file: File) => {
    setUploadedFiles(prev => ({ ...prev, [currentQuestion.id]: file }));
    // For demo purposes, just store the file name as answer
    handleAnswerChange(file.name);
  };

  const saveDraft = () => {
    localStorage.setItem("testAnswers", JSON.stringify(answers));
    toast({
      title: "Draft Tersimpan",
      description: "Jawaban Anda telah disimpan sebagai draft",
    });
  };

  const nextStep = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Final step - go to consent
      localStorage.setItem("testAnswers", JSON.stringify(answers));
      navigate("/consent");
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const canProceed = () => {
    if (currentQuestion.type === "file-upload") {
      // File upload is optional for some questions
      return true;
    }
    return answers[currentQuestion.id];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-accent/10">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">SAT RSPO PADI</h1>
            <p className="text-muted-foreground">Sustainable Agriculture Test - RSPO PADI Assessment</p>
          </div>

          {/* Progress */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-foreground">
                Pertanyaan {currentStep + 1} dari {questions.length}
              </span>
              <span className="text-sm text-muted-foreground">
                {Math.round(progress)}% selesai
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Question Card */}
          <Card className="shadow-lg mb-8">
            <CardHeader>
              <CardTitle className="text-xl text-foreground">
                {currentQuestion.question}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {currentQuestion.type === "multiple-choice" && (
                <RadioGroup
                  value={answers[currentQuestion.id] || ""}
                  onValueChange={handleAnswerChange}
                  className="space-y-3"
                >
                  {currentQuestion.options.map((option, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <RadioGroupItem 
                        value={option} 
                        id={`option-${index}`}
                        className="text-primary"
                      />
                      <Label 
                        htmlFor={`option-${index}`} 
                        className="flex-1 cursor-pointer text-foreground"
                      >
                        {option}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              )}

              {currentQuestion.type === "file-upload" && (
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                    <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                    <Label htmlFor="file-upload" className="cursor-pointer">
                      <span className="text-primary font-medium">Klik untuk upload file</span>
                      <span className="text-muted-foreground"> atau drag & drop</span>
                    </Label>
                    <Input
                      id="file-upload"
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleFileUpload(file);
                      }}
                      className="hidden"
                    />
                    <p className="text-xs text-muted-foreground mt-2">
                      PDF, DOC, DOCX (Max 10MB)
                    </p>
                  </div>
                  
                  {answers[currentQuestion.id] && (
                    <div className="bg-accent/10 p-3 rounded border border-accent/20">
                      <p className="text-sm text-foreground">
                        File terupload: <span className="font-medium">{answers[currentQuestion.id]}</span>
                      </p>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 0}
              className="flex items-center space-x-2"
            >
              <ChevronLeft className="h-4 w-4" />
              <span>Sebelumnya</span>
            </Button>

            <Button
              variant="outline"
              onClick={saveDraft}
              className="flex items-center space-x-2"
            >
              <Save className="h-4 w-4" />
              <span>Simpan Draft</span>
            </Button>

            <Button
              variant="hero"
              onClick={nextStep}
              disabled={!canProceed()}
              className="flex items-center space-x-2"
            >
              <span>{currentStep === questions.length - 1 ? "Selesai" : "Lanjut"}</span>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SatTest;