import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type KeyValuePair = [string, string | null];

export default function SaveData() {
  const [storageContent, setStorageContent] = useState<KeyValuePair[]>([]);

  const loadStorageContent = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const result = await AsyncStorage.multiGet(keys);
      setStorageContent(result as KeyValuePair[]);
    } catch (error) {
      console.error('AsyncStorageの読み込みに失敗しました:', error);
    }
  };

  const removeKey = async (key: string) => {
    try {
      await AsyncStorage.removeItem(key);
      await loadStorageContent();
      Alert.alert('成功', `${key}を削除しました`);
    } catch (error) {
      console.error('データの削除に失敗しました:', error);
      Alert.alert('エラー', 'データの削除に失敗しました');
    }
  };

  useEffect(() => {
    loadStorageContent();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>AsyncStorageの内容</Text>
      {storageContent.map(([key, value]) => (
        <View key={key} style={styles.item}>
          <View style={styles.itemContent}>
            <Text style={styles.key}>{key}</Text>
            <Text style={styles.value}>{value}</Text>
          </View>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => removeKey(key)}
          >
            <Text style={styles.deleteButtonText}>削除</Text>
          </TouchableOpacity>
        </View>
      ))}
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
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  itemContent: {
    flex: 1,
  },
  key: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  value: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  deleteButton: {
    backgroundColor: '#ff4444',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 5,
    marginLeft: 10,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 14,
  },
});
