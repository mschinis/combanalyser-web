"use client";

import { FileDrop } from "@/components/file-drop";
import { Suspense, useMemo, useState } from "react";
import Papa from "papaparse";
import { TemperatureChart } from "@/components/temperature-chart";
import { parseAsArrayOf, parseAsStringEnum, useQueryState } from "nuqs";
import {
  type CombustionMeasurement,
  type ParsedCombustionCSV,
} from "@/types/csv";
import { Sensor } from "@/enums/sensor";
import { TemperatureUnit } from "@/enums/temperature-unit";
import { convertCelsiusToFahrenheit } from "@/utils/temperature";
import GraphView from "@/components/graph-view";

export default function Home() {
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
    <Suspense>
      <GraphView data={parsedCSV.measurements} />
    </Suspense>
  ) : (
    <FileDrop onFileSelected={onFileSelected} />
  );
}
