import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { Alert, StyleSheet, Switch, Text, View } from 'react-native';

interface SettingData {
  notification: boolean;
  darkMode: boolean;
  locationTracking: boolean;
  analytics: boolean;
}

const STORAGE_KEY = '@setting_data';

export default function Setting() {
  const [notification, setNotification] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [locationTracking, setLocationTracking] = useState(false);
  const [analytics, setAnalytics] = useState(true);

  // 設定データの読み込み
  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
      if (jsonValue != null) {
        const data: SettingData = JSON.parse(jsonValue);
        setNotification(data.notification);
        setDarkMode(data.darkMode);
        setLocationTracking(data.locationTracking);
        setAnalytics(data.analytics);
      }
    } catch (error) {
      console.error('設定の読み込みに失敗しました:', error);
      Alert.alert('エラー', '設定の読み込みに失敗しました');
    }
  };

  // 設定の保存
  const saveSettings = async (key: keyof SettingData, value: boolean) => {
    try {
      const currentData = await AsyncStorage.getItem(STORAGE_KEY);
      const settings: SettingData = currentData ? JSON.parse(currentData) : {
        notification: true,
        darkMode: false,
        locationTracking: false,
        analytics: true,
      };

      settings[key] = value;
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch (error) {
      console.error('設定の保存に失敗しました:', error);
      Alert.alert('エラー', '設定の保存に失敗しました');
    }
  };

  const handleNotificationChange = (value: boolean) => {
    setNotification(value);
    saveSettings('notification', value);
  };

  const handleDarkModeChange = (value: boolean) => {
    setDarkMode(value);
    saveSettings('darkMode', value);
  };

  const handleLocationTrackingChange = (value: boolean) => {
    setLocationTracking(value);
    saveSettings('locationTracking', value);
  };

  const handleAnalyticsChange = (value: boolean) => {
    setAnalytics(value);
    saveSettings('analytics', value);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>設定</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>一般</Text>
        <View style={styles.settingItem}>
          <Text style={styles.settingLabel}>通知</Text>
          <Switch
            value={notification}
            onValueChange={handleNotificationChange}
          />
        </View>

        <View style={styles.settingItem}>
          <Text style={styles.settingLabel}>ダークモード</Text>
          <Switch
            value={darkMode}
            onValueChange={handleDarkModeChange}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>プライバシー</Text>
        <View style={styles.settingItem}>
          <Text style={styles.settingLabel}>位置情報の追跡</Text>
          <Switch
            value={locationTracking}
            onValueChange={handleLocationTrackingChange}
          />
        </View>

        <View style={styles.settingItem}>
          <Text style={styles.settingLabel}>アナリティクス</Text>
          <Switch
            value={analytics}
            onValueChange={handleAnalyticsChange}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#666',
    marginBottom: 10,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  settingLabel: {
    fontSize: 16,
    color: '#333',
  },
});
