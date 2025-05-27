import { useVideoPlayer, VideoView } from 'expo-video';
import { createContext, useContext, useState } from 'react';
import { Platform } from 'react-native';

type BGMContextType = {
  isPlaying: boolean;
  toggleBGM: () => void;
};

const BGMContext = createContext<BGMContextType | null>(null);

export function BGMProvider({ children }: { children: React.ReactNode }) {
  // Webでない場合のみBGMを有効化
  const isNotWeb = Platform.OS !== 'web';
  const [isPlaying, setIsPlaying] = useState(true);

  // Webでない場合のみプレーヤーを初期化
  const player = isNotWeb
    ? useVideoPlayer(require('../../assets/sounds/bgm.mp3'), player => {
        console.log('BGM useVideoPlayer: 初期化コールバック');
        player.loop = true;
        player.play();
        console.log('BGM play() called (初期化)');
      })
    : null;

  const toggleBGM = () => {
    if (!isNotWeb || !player) return;

    if (isPlaying) {
      player.pause();
      console.log('BGM pause() called (toggle)');
    } else {
      player.play();
      console.log('BGM play() called (toggle)');
    }
    setIsPlaying(!isPlaying);
  };

  // Webでない場合のみVideoViewを表示
  return (
    <BGMContext.Provider value={{ isPlaying, toggleBGM }}>
      {isNotWeb && player && (
        <VideoView
          style={{ width: 1, height: 1, opacity: 0 }}
          player={player}
          allowsFullscreen={false}
          allowsPictureInPicture={false}
        />
      )}
      {children}
    </BGMContext.Provider>
  );
}

export function useBGM() {
  const context = useContext(BGMContext);
  if (!context) {
    throw new Error('useBGM must be used within a BGMProvider');
  }
  return context;
}
