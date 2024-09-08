'use client';

import {FileDrop} from "@/components/file-drop";
import {useState} from "react";
import Papa from 'papaparse'
import {GraphView} from "@/components/graph-view";
import {parseAsArrayOf, parseAsStringEnum, useQueryState} from "nuqs";

type ParsedCombustionCSV = {
  headers: string
  measurements: CombustionMeasurement[]
}

export interface CombustionMeasurement {
  Timestamp: string
  SessionID: string
  SequenceNumber: string

  // Individual sensor readings
  T1: number
  T2: number
  T3: number
  T4: number
  T5: number
  T6: number
  T7: number
  T8: number

  VirtualCoreTemperature: number
  VirtualSurfaceTemperature: number
  VirtualAmbientTemperature: number

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

export enum Sensor {
  t1 = "T1",
  t2 = "T2",
  t3 = "T3",
  t4 = "T4",
  t5 = "T5",
  t6 = "T6",
  t7 = "T7",
  t8 = "T8",

  virtualCoreTemperature = "VirtualCoreTemperature",
  virtualSurfaceTemperature = "VirtualSurfaceTemperature",
  virtualAmbientTemperature = "VirtualAmbientTemperature",
}

export default function Home() {
  const [sensors, setSensors] = useQueryState('sensors',
      parseAsArrayOf(
        parseAsStringEnum<Sensor>(Object.values(Sensor))

      )
      .withDefault([
          Sensor.virtualCoreTemperature,
          Sensor.virtualSurfaceTemperature,
          Sensor.virtualAmbientTemperature,
      ])
  )

  const [parsedCombustionCSV, setParsedCombustionCSV] = useState<ParsedCombustionCSV>();

  const processFile = async (file: File) => {
    const fileContents = await file.text()
    const [headers, csvContents] = fileContents.split('\n\n')

    const { data } = Papa.parse<CombustionMeasurement>(csvContents, { header: true, dynamicTyping: true })

    setParsedCombustionCSV({
      headers,
      measurements: data
    })
  }

  return (
      parsedCombustionCSV ? (
          <div className={"flex flex-col justify-center container"}>
            <GraphView data={parsedCombustionCSV.measurements} sensors={sensors} />
          </div>
          ) : (
          <FileDrop onSelectedFile={processFile} />
      )
  );
}
