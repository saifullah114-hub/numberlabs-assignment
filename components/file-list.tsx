"use client";

import { FileStatus } from "@/app/page";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle, Loader2, FileText, Info } from "lucide-react";
import { useFileUploader } from "@/hooks/use-file-uploader";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface FileListProps {
  files: FileStatus[];
}

const FAILED_FILES: { [key: string]: string[] } = {
  "march_payouts.csv": [
    "transactions/batch_1_march.csv",
    "transactions/batch_2_march.csv"
  ]
};


export function FileList({ files }: FileListProps) {
  const { triggerFileUpload } = useFileUploader();

  const getStatusDetails = (status: number, progress?: string) => {
    return (
      {
        1: {
          icon: <CheckCircle2 className="h-5 w-5 text-green-500" />,
          text: "Upload Complete",
          variant: "success",
        },
        0: {
          icon: <Loader2 className="h-5 w-5 text-blue-500 animate-spin" />,
          text: "Processing File",
          variant: "loading",
        },
        [-1]: {
          icon: <XCircle className="h-5 w-5 text-red-500" />,
          text: "Upload Failed",
          variant: "error",
        },
      }[status] || null // Add a fallback value, like null
    );
  };

  const getFailedEntries = (filename: string, progress?: string) => {
    if (!progress?.includes("Success")) return null;
    
    const [, count] = progress.split("•").map(s => s.trim());
    const [success, total] = count.split("/").map(Number);
    
    if (success === total) return null;
    return FAILED_FILES[filename] || null;
  };

  return (
    <div className="space-y-4">
      {files.map((file) => {
        const details = getStatusDetails(file.status);
        if (!details) {
          // Handle the case where details are undefined
          return null;
        }
        const failedEntries = getFailedEntries(file.filename, file.progress);
        
        return (
          <Card
            key={file.id}
            className={`p-6 ${
              file.status === -1
                ? "border-red-200 bg-red-50"
                : file.status === 1
                ? "border-green-200 bg-green-50"
                : ""
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-5 h-5">
                  {file.status === 0 ? (
                    <FileText className="h-5 w-5 text-gray-500" />
                  ) : (
                    details.icon
                  )}
                </div>
                <div>
                  <h3 className="font-medium">{details.text}</h3>
                  <p className="text-sm text-gray-600">{file.filename}</p>
                  <div className="flex items-center gap-1">
                    {file.progress && (
                      <p className="text-sm text-gray-500 mt-1">
                        {file.progress}
                      </p>
                    )}
                    {failedEntries && (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <button className="inline-flex items-center justify-center rounded-full w-4 h-4 bg-gray-200 mt-1">
                              <Info className="h-3 w-3 text-gray-600" />
                            </button>
                          </TooltipTrigger>
                          <TooltipContent className="bg-gray-900 text-white p-3 rounded-lg shadow-lg max-w-xs">
                            <p className="font-medium mb-2">Failed Entries</p>
                            <ul className="space-y-1">
                              {failedEntries.map((entry, index) => (
                                <li key={index} className="flex items-start gap-2">
                                  <FileText className="h-4 w-4 mt-0.5 flex-shrink-0" />
                                  <span className="text-sm">{entry}</span>
                                </li>
                              ))}
                            </ul>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="text-sm"
                >
                  View Details
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-sm"
                  onClick={triggerFileUpload}
                >
                  New Upload
                </Button>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}