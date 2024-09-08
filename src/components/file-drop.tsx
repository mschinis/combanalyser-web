"use client";

import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Upload } from "lucide-react";

interface FileDropProps {
  onFileSelected: (file: File) => void;
}

export function FileDrop({ onFileSelected }: FileDropProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles[0]) {
        onFileSelected(acceptedFiles[0]);
      }
    },
    [onFileSelected],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "text/csv": [".csv"],
    },
    multiple: false,
  });

  return (
    <div className="flex items-center justify-center h-full w-full p-4">
      <div
        {...getRootProps()}
        className={`flex items-center justify-center w-full h-full rounded-lg border-4 border-dashed transition-colors duration-300 ease-in-out cursor-pointer ${
          isDragActive ? "border-primary bg-primary/10" : "border-gray-300"
        }`}
      >
        <input {...getInputProps()} className="hidden" />
        <div className="text-center">
          <Upload
            className={`mx-auto h-12 w-12 mb-4 ${
              isDragActive ? "text-primary" : "text-gray-400"
            }`}
          />
          <>
            <p className="text-lg font-medium text-gray-900">
              Drop your CSV file here, or click to select
            </p>
            <p className="mt-2 text-sm text-gray-500">
              Only valid Combustion Inc CSV files are accepted
            </p>
            <p className="mt-2 text-sm">
              <a
                className={"mt-6 z-40"}
                href="/combustion_kamado_chicken_example.csv"
                onClick={(e) => e.stopPropagation()}
              >
                Download example file
              </a>
            </p>
          </>
        </div>
      </div>
    </div>
  );
}
