import { Link } from "expo-router";
import { useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSettingStore } from "../store/useSettingStore";

export default function Index() {
  const { darkMode, notification, initializeSettings } = useSettingStore();

  useEffect(() => {
    initializeSettings();
  }, []);

  return (
    <View style={[styles.container, darkMode && styles.darkContainer]}>
      <Text style={[styles.title, darkMode && styles.darkText]}>ホーム</Text>
      <Text style={[styles.modeText, darkMode && styles.darkText]}>
        現在のモード: {darkMode ? 'ダークモード' : 'ライトモード'}
      </Text>

      <View style={styles.buttonContainer}>
        <Link href="/profile" asChild>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>プロフィール</Text>
          </TouchableOpacity>
        </Link>

        <Link href="/setting" asChild>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>設定</Text>
          </TouchableOpacity>
        </Link>

        {notification && (
          <Link href="/notification" asChild>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>通知</Text>
            </TouchableOpacity>
          </Link>
        )}

        <Link href="/nativewind" asChild>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>NativeWind</Text>
          </TouchableOpacity>
        </Link>

        <Link href="/quiz" asChild>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>クイズ</Text>
          </TouchableOpacity>
        </Link>

        <Link href="/sound" asChild>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>サウンド</Text>
          </TouchableOpacity>
        </Link>

        <Link href="/save-data" asChild>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>セーブデータ</Text>
          </TouchableOpacity>
        </Link>
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
    textAlign: 'center',
  },
  darkText: {
    color: '#fff',
  },
  modeText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    color: '#666',
  },
  buttonContainer: {
    gap: 15,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
