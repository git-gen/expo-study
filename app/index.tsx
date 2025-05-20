import { Link } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>ホーム</Text>
      
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

        <Link href="/notification" asChild>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>通知</Text>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
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
