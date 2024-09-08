'use client';

import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload } from 'lucide-react'

interface FileDropProps {
  onSelectedFile: (file: File) => void
}

export function FileDrop({ onSelectedFile }: FileDropProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles[0]) {
      onSelectedFile(acceptedFiles[0])
    }
  }, [onSelectedFile])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv'],
    },
    multiple: false,
  })

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-gray-100 p-4">
      <div
        {...getRootProps()}
        className={`flex items-center justify-center w-full h-full rounded-lg border-4 border-dashed transition-colors duration-300 ease-in-out cursor-pointer ${
          isDragActive ? 'border-primary bg-primary/10' : 'border-gray-300'
        }`}
      >
        <input {...getInputProps()} className="hidden" />
        <div className="text-center">
          <Upload
            className={`mx-auto h-12 w-12 mb-4 ${
              isDragActive ? 'text-primary' : 'text-gray-400'
            }`}
          />
            <>
              <p className="text-lg font-medium text-gray-900">
                Drop your CSV file here, or click to select
              </p>
              <p className="mt-2 text-sm text-gray-500">
                Only CSV files are accepted
              </p>
            </>
        </div>
      </div>
    </div>
  )
}
