"use client";

import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FileText } from "lucide-react";

interface FileUploaderProps {
  onFileUpload: (file: File) => void;
}

export function FileUploader({ onFileUpload }: FileUploaderProps) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: useCallback(
      (files: File[]) => {
        const file = files[0];
        if (file) onFileUpload(file);
      },
      [onFileUpload]
    ),
    multiple: false,
    noKeyboard: true
  });

  return (
    <Card className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-2">
          <FileText className="h-5 w-5" />
          <h2 className="text-lg font-semibold">Payment Processing</h2>
        </div>
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
            isDragActive
              ? "border-blue-400 bg-blue-50"
              : "border-gray-300 hover:border-gray-400"
          }`}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center gap-4">
            <div className="p-3 bg-gray-100 rounded-full">
              <svg className="w-6 h-6 text-gray-600" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-2">
                Drop your transaction file here
              </p>
              <Button
                variant="secondary"
                className="bg-gray-100 hover:bg-gray-200 text-gray-700"
              >
                Select File
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}