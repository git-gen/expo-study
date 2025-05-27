import { Link } from 'expo-router';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';

export default function NativeWind() {
  return (
    <ScrollView className="flex-1 bg-gray-100">
      {/* ヘッダーセクション */}
      <View className="bg-blue-600 p-6">
        <Text className="text-3xl font-bold text-white mb-2">NativeWind Demo</Text>
        <Text className="text-blue-100">NativeWindで適当にUIを作ってみる</Text>
      </View>

      {/* カードセクション */}
      <View className="p-4">
        <View className="bg-white rounded-xl shadow-lg p-4 mb-4">
          <Image
            source={{ uri: 'https://picsum.photos/400/200' }}
            className="w-full h-48 rounded-lg mb-4"
          />
          <Text className="text-xl font-bold text-gray-800 mb-2">大カード</Text>
          <Text className="text-gray-600 mb-4">
            大カードの説明
          </Text>
          <TouchableOpacity className="bg-blue-500 py-2 px-4 rounded-lg">
            <Text className="text-white font-semibold text-center">詳細を見る</Text>
          </TouchableOpacity>
        </View>

        {/* 機能紹介セクション */}
        <View className="flex-row flex-wrap justify-between">
          {['小カード1', '小カード2', '小カード3'].map((feature, index) => (
            <View key={index} className="bg-white rounded-lg p-4 mb-4 w-[48%] shadow">
              <View className="bg-blue-100 w-12 h-12 rounded-full items-center justify-center mb-3">
                <Text className="text-blue-600 text-xl">😄</Text>
              </View>
              <Text className="font-bold text-gray-800 mb-1">{feature}</Text>
              <Text className="text-gray-600 text-sm">
                {feature}詳細
              </Text>
            </View>
          ))}
        </View>

        {/* ボタンセクション */}
        <View className="mt-6 space-y-3">
          <TouchableOpacity className="bg-gradient-to-r from-blue-500 to-purple-500 p-4 rounded-lg">
            <Text className="text-white font-bold text-center">グラデーションボタン</Text>
          </TouchableOpacity>
          <TouchableOpacity className="border-2 border-blue-500 p-4 rounded-lg">
            <Text className="text-blue-500 font-bold text-center">アウトラインボタン</Text>
          </TouchableOpacity>
        </View>

        {/* フッター */}
        <View className="mt-8 bg-gray-800 rounded-xl p-6">
          <Text className="text-white text-lg font-bold mb-2">Installation with Expo</Text>
          <View className="space-y-2">
            {[
              'Install Nativewind',
              'Setup Tailwind CSS',
              'Add the Babel preset',
              'Modify your metro.config.js',
              'Import your CSS file',
              'Modify your app.json',
              'TypeScript (optional)'
            ].map((feature, index) => (
              <View key={index} className="flex-row items-center">
                <Text className="text-green-400 mr-2">✓</Text>
                <Text className="text-gray-300">{feature}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>

      {/* ホームに戻るリンク */}
      <Link href="/" className="m-4">
        <Text className="text-blue-500 text-center">ホームに戻る</Text>
      </Link>
    </ScrollView>
  );
}
