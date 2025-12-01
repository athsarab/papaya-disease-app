export type PapayaDisease =
  | 'Anthracnose'
  | 'Curl'
  | 'Healthy'
  | 'Mite disease'
  | 'Ringspot'
  | 'NotPapaya';

export type PapayaSeverity = 'mild' | 'moderate' | 'severe' | 'unknown';

export interface PapayaResult {
  disease: PapayaDisease;
  disease_confidence: number;
  severity: PapayaSeverity;
  severity_confidence: number;
}

export interface HistoryItem {
  id: string;
  imageUri?: string;
  capturedAt: string;
  result: PapayaResult;
}

export type LanguageCode = 'en' | 'si';
export type ThemePreference = 'system' | 'light' | 'dark';
