'use client';

import {FileDrop} from "@/components/file-drop";
import {useState} from "react";
import Papa from 'papaparse'
import {GraphView} from "@/components/graph-view";

type ParsedCombustionCSV = {
  headers: string
  measurements: CombustionMeasurement[]
}

export interface CombustionMeasurement {
  Timestamp: string
  SessionID: string
  SequenceNumber: string

  // Individual sensor readings
  T1: string
  T2: string
  T3: string
  T4: string
  T5: string
  T6: string
  T7: string
  T8: string

  VirtualCoreTemperature: string
  VirtualSurfaceTemperature: string
  VirtualAmbientTemperature: string
  EstimatedCoreTemperature: string
  PredictionSetPoint: string
  VirtualCoreSensor: string
  VirtualSurfaceSensor: string
  VirtualAmbientSensor: string
  PredictionState: string
  PredictionMode: string
  PredictionType: string
  PredictionValueSeconds: string
}

export default function Home() {
  const [parsedCombustionCSV, setParsedCombustionCSV] = useState<ParsedCombustionCSV>();

  const processFile = async (file: File) => {
    const fileContents = await file.text()
    const [headers, csvContents] = fileContents.split('\n\n')

    const { data } = Papa.parse<CombustionMeasurement>(csvContents, { header: true })

    setParsedCombustionCSV({
      headers,
      measurements: data
    })
  }

  return (
      parsedCombustionCSV ? (
          <GraphView data={parsedCombustionCSV.measurements} />
          ) : (
          <FileDrop onSelectedFile={processFile} />
      )
  );
}
