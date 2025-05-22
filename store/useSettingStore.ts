import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';

interface SettingData {
  notification: boolean;
  darkMode: boolean;
  locationTracking: boolean;
  analytics: boolean;
}

interface SettingState extends SettingData {
  initializeSettings: () => Promise<void>;
  updateSetting: <K extends keyof SettingData>(key: K, value: SettingData[K]) => Promise<void>;
}

const STORAGE_KEY = '@setting_data';

const defaultSettings: SettingData = {
  notification: true,
  darkMode: false,
  locationTracking: false,
  analytics: true,
};

export const useSettingStore = create<SettingState>((set) => ({
  ...defaultSettings,
  initializeSettings: async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
      if (jsonValue != null) {
        const data = JSON.parse(jsonValue);
        set(data);
      }
    } catch (error) {
      console.error('設定の初期化に失敗しました:', error);
    }
  },
  updateSetting: async (key, value) => {
    try {
      const currentData = await AsyncStorage.getItem(STORAGE_KEY);
      const settings: SettingData = currentData ? JSON.parse(currentData) : defaultSettings;
      settings[key] = value;
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
      set({ [key]: value });
    } catch (error) {
      console.error('設定の更新に失敗しました:', error);
    }
  },
}));
