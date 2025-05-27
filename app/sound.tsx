import { useEvent } from 'expo';
import { useVideoPlayer, VideoView } from 'expo-video';
import { Button, StyleSheet, View } from 'react-native';

// ローカルの音声ファイルを使用
const soundSource = require('../assets/sounds/pokyun.mp3');

export default function SoundScreen() {
  const player = useVideoPlayer(soundSource, player => {
    player.loop = false;
  });

  const { isPlaying } = useEvent(player, 'playingChange', { isPlaying: player.playing });

  const handlePlay = () => {
    // 再生中でも新しい再生を開始
    player.currentTime = 0; // 音声を最初に戻す
    player.play();
  };

  return (
    <View style={styles.container}>
      <VideoView
        style={styles.video}
        player={player}
        allowsFullscreen={false}
        allowsPictureInPicture={false}
      />
      <Button
        title="再生"
        onPress={handlePlay}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    width: 1,
    height: 1,
    opacity: 0,
  },
});
