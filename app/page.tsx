"use client";

import { FileUploader } from "@/components/file-uploader";
import { FileList } from "@/components/file-list";
import { useState } from "react";

export type FileStatus = {
  id: string;
  filename: string;
  status: -1 | 0 | 1;
  progress?: string;
};

const INITIAL_FILES = [
  { 
    id: "1", 
    filename: "transactions_2024.csv", 
    status: 0, 
    progress: "Running • 0/1 Complete" 
  },
  { 
    id: "2", 
    filename: "march_payouts.csv", 
    status: 1, 
    progress: "Done • 3/5 Success" 
  },
  { 
    id: "3", 
    filename: "invalid_data.json", 
    status: -1, 
    progress: "File type not compatible" 
  },
];

export default function Home() {
  const [files, setFiles] = useState<FileStatus[]>(INITIAL_FILES);

  const processFile = async (file: File) => {
    const id = crypto.randomUUID();
    
    if (!file.name.toLowerCase().endsWith('.csv')) {
      return {
        id,
        filename: file.name,
        status: -1,
        progress: "File type not compatible"
      };
    }

    try {
      await simulateFileProcessing();
      return {
        id,
        filename: file.name,
        status: 1,
        progress: "Done • 5/5 Success"
      };
    } catch (error) {
      return {
        id,
        filename: file.name,
        status: -1,
        progress: "Upload failed"
      };
    }
  };

  const handleFileUpload = async (file: File) => {
    setFiles(prev => [{
      id: crypto.randomUUID(),
      filename: file.name,
      status: 0,
      progress: "Running • 0/1 Complete"
    }, ...prev]);

    const result = await processFile(file);
    
    setFiles(prev => [
      result,
      ...prev.slice(1)
    ]);
  };

  const simulateFileProcessing = () => {
    return new Promise(resolve => setTimeout(resolve, 2000));
  };

  return (
    <main className="min-h-screen bg-[#f5f9f5] p-8">
      <div className="max-w-3xl mx-auto space-y-6">
        <FileUploader onFileUpload={handleFileUpload} />
        <FileList files={files} />
      </div>
    </main>
  );
}