import { useEffect } from 'react';
import { Alert, StyleSheet, Switch, Text, View } from 'react-native';
import { useSettingStore } from '../store/useSettingStore';

type SettingKey = 'notification' | 'darkMode' | 'locationTracking' | 'analytics';

export default function Setting() {
  const {
    notification,
    darkMode,
    locationTracking,
    analytics,
    initializeSettings,
    updateSetting,
  } = useSettingStore();

  useEffect(() => {
    initializeSettings();
  }, []);

  const handleSettingChange = async (key: SettingKey, value: boolean) => {
    try {
      await updateSetting(key, value);
    } catch (error) {
      Alert.alert('エラー', '設定の更新に失敗しました');
    }
  };

  return (
    <View style={[styles.container, darkMode && styles.darkContainer]}>
      <Text style={[styles.title, darkMode && styles.darkText]}>設定</Text>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, darkMode && styles.darkText]}>一般</Text>
        <View style={styles.settingItem}>
          <Text style={[styles.settingLabel, darkMode && styles.darkText]}>通知</Text>
          <Switch
            value={notification}
            onValueChange={(value) => handleSettingChange('notification', value)}
          />
        </View>

        <View style={styles.settingItem}>
          <Text style={[styles.settingLabel, darkMode && styles.darkText]}>ダークモード</Text>
          <Switch
            value={darkMode}
            onValueChange={(value) => handleSettingChange('darkMode', value)}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, darkMode && styles.darkText]}>プライバシー</Text>
        <View style={styles.settingItem}>
          <Text style={[styles.settingLabel, darkMode && styles.darkText]}>位置情報の追跡</Text>
          <Switch
            value={locationTracking}
            onValueChange={(value) => handleSettingChange('locationTracking', value)}
          />
        </View>

        <View style={styles.settingItem}>
          <Text style={[styles.settingLabel, darkMode && styles.darkText]}>アナリティクス</Text>
          <Switch
            value={analytics}
            onValueChange={(value) => handleSettingChange('analytics', value)}
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
  darkContainer: {
    backgroundColor: '#1a1a1a',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  darkText: {
    color: '#fff',
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
