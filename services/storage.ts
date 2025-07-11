import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveToStorage = async (key: string, data: any): Promise<void> => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Erreur de sauvegarde pour la clé "${key}":`, error);
  }
};

export const loadFromStorage = async (key: string): Promise<any | null> => {
  try {
    const stored = await AsyncStorage.getItem(key);
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    console.error(`Erreur de chargement pour la clé "${key}":`, error);
    return null;
  }
};

export const clearStorage = async (key: string): Promise<void> => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error(`Erreur de suppression pour la clé "${key}":`, error);
  }
};
