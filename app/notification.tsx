import { useMemo } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

type NotificationType = 'message' | 'system' | 'news';

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
}

// 通知の種類とメッセージのテンプレート
const notificationTemplates: Record<NotificationType, string[]> = {
  message: [
    '田中さんからメッセージが届きました',
    '佐藤さんからメッセージが届きました',
    '鈴木さんからメッセージが届きました',
    '高橋さんからメッセージが届きました',
  ],
  system: [
    'アプリのアップデートが利用可能です',
    'システムメンテナンスのお知らせ',
    '新機能が追加されました',
    'バグ修正が完了しました',
  ],
  news: [
    '新しいコンテンツが追加されました',
    '限定キャンペーンが始まりました',
    'おすすめコンテンツが更新されました',
    '人気コンテンツが更新されました',
  ],
};

// 時間の表示テンプレート
const timeTemplates = [
  '1分前',
  '5分前',
  '10分前',
  '30分前',
  '1時間前',
  '2時間前',
  '3時間前',
  '5時間前',
  '10時間前',
  '1日前',
  '2日前',
  '3日前',
];

// ランダムな通知を生成する関数
const generateRandomNotifications = (): Notification[] => {
  const notifications: Notification[] = [];
  const types: NotificationType[] = ['message', 'system', 'news'];

  for (let i = 0; i < 30; i++) {
    const type = types[Math.floor(Math.random() * types.length)];
    const messages = notificationTemplates[type];
    const message = messages[Math.floor(Math.random() * messages.length)];
    const time = timeTemplates[Math.floor(Math.random() * timeTemplates.length)];

    notifications.push({
      id: String(i + 1),
      title: type === 'message' ? '新しいメッセージ' :
             type === 'system' ? 'システム通知' : 'お知らせ',
      message,
      time,
    });
  }

  // 時間順にソート
  return notifications.sort((a, b) => {
    const timeOrder = timeTemplates.indexOf(a.time) - timeTemplates.indexOf(b.time);
    return timeOrder;
  });
};

export default function Notification() {
  // useMemoを使用して、コンポーネントの再レンダリング時に通知を再生成しないようにする
  const notifications = useMemo(() => generateRandomNotifications(), []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>通知</Text>
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.notificationItem}>
            <Text style={styles.notificationTitle}>{item.title}</Text>
            <Text style={styles.notificationMessage}>{item.message}</Text>
            <Text style={styles.notificationTime}>{item.time}</Text>
          </View>
        )}
      />
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
  notificationItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  notificationMessage: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  notificationTime: {
    fontSize: 12,
    color: '#999',
  },
});
