"use client";

import { FileDrop } from "@/components/file-drop";
import { useState } from "react";
import Papa from "papaparse";
import { GraphView } from "@/components/graph-view";
import { parseAsArrayOf, parseAsStringEnum, useQueryState } from "nuqs";
import {
  type CombustionMeasurement,
  type ParsedCombustionCSV,
} from "@/types/csv";
import { Sensor } from "@/enums/sensor";

export default function Home() {
  // Get configuration from the query parameters, to enable shareable links
  const [sensors] = useQueryState(
    "sensors",
    parseAsArrayOf(
      parseAsStringEnum<Sensor>(Object.values(Sensor)),
    ).withDefault([
      Sensor.virtualCoreTemperature,
      Sensor.virtualSurfaceTemperature,
      Sensor.virtualAmbientTemperature,
    ]),
  );

  // State management for parsed file
  const [parsedCSV, setParsedCSV] = useState<ParsedCombustionCSV>();

  // Handle file selection or dropped
  const onFileSelected = async (file: File) => {
    const fileContents = await file.text();
    const [headers, csvContents] = fileContents.split("\n\n");

    const { data } = Papa.parse<CombustionMeasurement>(csvContents, {
      header: true,
      dynamicTyping: true,
    });

    setParsedCSV({
      headers,
      measurements: data,
    });
  };

  // If a file has been parsed display it - otherwise show the file picker UI
  return parsedCSV ? (
    <div className={"h-full w-full p-16"}>
      <GraphView data={parsedCSV.measurements} sensors={sensors} />
    </div>
  ) : (
    <FileDrop onFileSelected={onFileSelected} />
  );
}
