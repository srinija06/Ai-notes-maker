import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Upload, FileVideo, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface FileUploadProps {
  onFileSelect: (file: File) => void;
}

export function FileUpload({ onFileSelect }: FileUploadProps) {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setSelectedFile(file);
      onFileSelect(file);
    }
  }, [onFileSelect]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      onFileSelect(file);
    }
  }, [onFileSelect]);

  const supportedFormats = [
    { name: "PDF", icon: FileText, color: "text-red-500" },
    { name: "Images", icon: FileVideo, color: "text-green-500" },
    { name: "Text", icon: FileText, color: "text-blue-500" },
  ];

  return (
    <Card className="border-dashed border-2 border-border hover:border-primary/50 transition-colors">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center space-x-2">
          <Upload className="w-5 h-5" />
          <span>Upload Learning Material</span>
        </CardTitle>
        <CardDescription>
          Upload a PDF, image, or text file to generate AI-powered notes and quizzes
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div
          className={cn(
            "relative border-2 border-dashed rounded-lg p-8 text-center transition-colors",
            dragActive
              ? "border-primary bg-primary/5"
              : "border-border hover:border-primary/50"
          )}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            type="file"
            accept=".pdf,.txt,.png,.jpg,.jpeg,.gif"
            onChange={handleFileInput}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          
          {selectedFile ? (
            <div className="space-y-3">
              <div className="w-12 h-12 bg-success/10 rounded-lg mx-auto flex items-center justify-center">
                <FileText className="w-6 h-6 text-success" />
              </div>
              <div>
                <p className="font-medium text-success">File Selected!</p>
                <p className="text-sm text-muted-foreground">{selectedFile.name}</p>
              </div>
              <Button variant="success" size="sm">
                Process File
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg mx-auto flex items-center justify-center">
                <Plus className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-lg font-medium">Drop your file here</p>
                <p className="text-muted-foreground">or click to browse</p>
              </div>
              <div className="flex justify-center space-x-6">
                {supportedFormats.map((format) => (
                  <div key={format.name} className="flex flex-col items-center space-y-1">
                    <format.icon className={cn("w-6 h-6", format.color)} />
                    <span className="text-xs text-muted-foreground">{format.name}</span>
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