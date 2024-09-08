export interface ParsedCombustionCSV {
    headers: string;
    measurements: CombustionMeasurement[];
}

export interface CombustionMeasurement {
    Timestamp: string;
    SessionID: string;
    SequenceNumber: string;

    // Individual sensor readings
    T1: number;
    T2: number;
    T3: number;
    T4: number;
    T5: number;
    T6: number;
    T7: number;
    T8: number;

    VirtualCoreTemperature: number;
    VirtualSurfaceTemperature: number;
    VirtualAmbientTemperature: number;

    EstimatedCoreTemperature: string;
    PredictionSetPoint: string;
    VirtualCoreSensor: string;
    VirtualSurfaceSensor: string;
    VirtualAmbientSensor: string;
    PredictionState: string;
    PredictionMode: string;
    PredictionType: string;
    PredictionValueSeconds: string;
}
