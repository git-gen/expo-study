import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

interface ProfileData {
  username: string;
  email: string;
  bio: string;
}

const STORAGE_KEY = '@profile_data';

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState('山田太郎');
  const [email, setEmail] = useState('yamada@example.com');
  const [bio, setBio] = useState('こんにちは！私は山田太郎です。');

  // プロフィールデータの読み込み
  useEffect(() => {
    loadProfileData();
  }, []);

  const loadProfileData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
      if (jsonValue != null) {
        const data: ProfileData = JSON.parse(jsonValue);
        setUsername(data.username);
        setEmail(data.email);
        setBio(data.bio);
      }
    } catch (error) {
      console.error('プロフィールデータの読み込みに失敗しました:', error);
      Alert.alert('エラー', 'プロフィールデータの読み込みに失敗しました');
    }
  };

  const handleSave = async () => {
    try {
      const profileData: ProfileData = {
        username,
        email,
        bio,
      };

      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(profileData));
      setIsEditing(false);
      Alert.alert('成功', 'プロフィールを保存しました');
    } catch (error) {
      console.error('プロフィールの保存に失敗しました:', error);
      Alert.alert('エラー', 'プロフィールの保存に失敗しました');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>プロフィール</Text>
        <TouchableOpacity 
          style={styles.editButton}
          onPress={() => setIsEditing(!isEditing)}
        >
          <Text style={styles.editButtonText}>
            {isEditing ? 'キャンセル' : '編集'}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.form}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>ユーザー名</Text>
          {isEditing ? (
            <TextInput
              style={styles.input}
              value={username}
              onChangeText={setUsername}
              placeholder="ユーザー名を入力"
            />
          ) : (
            <Text style={styles.value}>{username}</Text>
          )}
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>メールアドレス</Text>
          {isEditing ? (
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="メールアドレスを入力"
              keyboardType="email-address"
            />
          ) : (
            <Text style={styles.value}>{email}</Text>
          )}
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>自己紹介</Text>
          {isEditing ? (
            <TextInput
              style={[styles.input, styles.bioInput]}
              value={bio}
              onChangeText={setBio}
              placeholder="自己紹介を入力"
              multiline
              numberOfLines={4}
            />
          ) : (
            <Text style={styles.value}>{bio}</Text>
          )}
        </View>

        {isEditing && (
          <TouchableOpacity 
            style={styles.saveButton}
            onPress={handleSave}
          >
            <Text style={styles.saveButtonText}>保存</Text>
          </TouchableOpacity>
        )}
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  editButton: {
    padding: 8,
  },
  editButtonText: {
    color: '#007AFF',
    fontSize: 16,
  },
  profileImageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  changePhotoButton: {
    position: 'absolute',
    bottom: 0,
    right: '35%',
    backgroundColor: '#007AFF',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    gap: 20,
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  value: {
    fontSize: 18,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  bioInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  saveButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 