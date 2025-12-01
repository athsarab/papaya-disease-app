import { Platform } from 'react-native';
import { PapayaResult } from '../types';
import { BASE_URL } from '../config';

export const analyzeLeafImage = async (fileUri: string): Promise<PapayaResult> => {
  const formData = new FormData();
  const fileName = fileUri.split('/').pop() ?? 'leaf.jpg';
  const fileType = fileName.split('.').pop() ?? 'jpg';

  formData.append('file', {
    uri: Platform.OS === 'android' ? fileUri : fileUri.replace('file://', ''),
    name: fileName,
    type: `image/${fileType}`,
  } as unknown as Blob);

  const response = await fetch(`${BASE_URL}/predict`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
    },
    body: formData,
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || 'Prediction failed. Please try again.');
  }

  return (await response.json()) as PapayaResult;
};
