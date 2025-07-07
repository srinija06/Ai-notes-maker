import { useState, useCallback } from "react";
import * as pdfjsLib from 'pdfjs-dist';
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker?worker';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Upload, FileVideo, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface FileUploadProps {
  onFileSelect: (file: File, text: string) => void;
}

export function FileUpload({ onFileSelect }: FileUploadProps) {
  const [error, setError] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [showOptions, setShowOptions] = useState(false);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const extractText = async (file: File) => {
    try {
      if (file.type === 'application/pdf') {
        // Import pdfjs-dist properly for Vite
      (pdfjsLib as any).GlobalWorkerOptions.workerPort = new pdfjsWorker();
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        let text = '';
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const content = await page.getTextContent();
          text += content.items
            .map((item) => ('str' in item ? item.str : ''))
            .join(' ') + '\n';
        }
        return text;
      } else if (file.type.startsWith('text/')) {
        return await file.text();
      } else {
        return '[Image or unsupported file type]';
      }
    } catch (err: any) {
      setError('Failed to extract text from file: ' + (err?.message || 'Unknown error'));
      return '';
    }
  };

  const handleDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setSelectedFile(file);
      const text = await extractText(file);
      onFileSelect(file, text);
      setShowOptions(true);
    }
  }, [onFileSelect]);

  const handleFileInput = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      const text = await extractText(file);
      if (text) {
        onFileSelect(file, text);
        setShowOptions(true);
      }
    }
  }, [onFileSelect]);

  const supportedFormats = [
    { name: "PDF", icon: FileText, color: "text-red-500" },
    { name: "Images", icon: FileVideo, color: "text-green-500" },
    { name: "Text", icon: FileText, color: "text-blue-500" },
  ];

  return (
    <Card className="border-dashed border-2 border-border hover:border-primary/50 transition-colors max-w-2xl mx-auto min-h-[420px] flex flex-col justify-center">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center space-x-2">
          <Upload className="w-7 h-7" />
          <span className="text-2xl">Upload Learning Material</span>
        </CardTitle>
        <CardDescription>
          Upload a PDF, image, or text file to generate AI-powered notes and quizzes
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div
          className={cn(
            "relative border-2 border-dashed rounded-lg p-12 text-center transition-colors",
            dragActive
              ? "border-primary bg-primary/5"
              : "border-border hover:border-primary/50"
          )}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <label className="block cursor-pointer">
            <input
              type="file"
              accept=".pdf,.txt,.png,.jpg,.jpeg,.gif"
              onChange={handleFileInput}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              tabIndex={0}
            />
            <span className="inline-block px-4 py-2 bg-primary text-white rounded shadow hover:bg-primary/80 mb-4">Click to select a file</span>
          </label>
          {error && <div className="text-red-500 mt-2">{error}</div>}
          {selectedFile && showOptions ? (
            <div className="space-y-6">
              <div className="w-14 h-14 bg-success/10 rounded-lg mx-auto flex items-center justify-center">
                <FileText className="w-8 h-8 text-success" />
              </div>
              <div>
                <p className="font-semibold text-success text-lg">File Selected!</p>
                <p className="text-base text-muted-foreground">{selectedFile.name}</p>
              </div>
              <div className="flex flex-wrap justify-center gap-4 mt-6">
                <Button variant="outline" className="min-w-[120px]">Short Notes</Button>
                <Button variant="outline" className="min-w-[120px]">Mind Map</Button>
                <Button variant="outline" className="min-w-[120px]">Quiz</Button>
                <Button variant="outline" className="min-w-[120px]">Doubt</Button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="w-14 h-14 bg-primary/10 rounded-lg mx-auto flex items-center justify-center">
                <Plus className="w-8 h-8 text-primary" />
              </div>
              <div>
                <p className="text-xl font-medium">Drop your file here</p>
                <p className="text-muted-foreground">or click to browse</p>
              </div>
              <div className="flex justify-center space-x-8 mt-2">
                {supportedFormats.map((format) => (
                  <div key={format.name} className="flex flex-col items-center space-y-1">
                    <format.icon className={cn("w-7 h-7", format.color)} />
                    <span className="text-sm text-muted-foreground">{format.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}