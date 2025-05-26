import { Link } from 'expo-router';
import { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming
} from 'react-native-reanimated';

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

const questions = [
  {
    question: "React Nativeの開発元は？",
    options: [
      "Google",
      "Facebook",
      "Microsoft",
      "Apple"
    ],
    correctAnswer: 1
  },
  {
    question: "Expoの特徴として正しいのは？",
    options: [
      "iOSのみ対応",
      "Androidのみ対応",
      "クロスプラットフォーム対応",
      "Webのみ対応"
    ],
    correctAnswer: 2
  },
  {
    question: "NativeWindは何のスタイリングを提供する？",
    options: [
      "CSS Modules",
      "Styled Components",
      "Tailwind CSS",
      "CSS-in-JS"
    ],
    correctAnswer: 2
  }
];

export default function QuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const shakeAnimation = useSharedValue(0);
  const scaleAnimation = useSharedValue(1);

  const shakeStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: shakeAnimation.value },
        { scale: scaleAnimation.value }
      ]
    };
  });

  const handleAnswer = (index: number) => {
    setSelectedAnswer(index);
    const isCorrect = index === questions[currentQuestion].correctAnswer;

    if (isCorrect) {
      setScore(score + 1);
      scaleAnimation.value = withSequence(
        withSpring(1.1),
        withSpring(1)
      );
    } else {
      shakeAnimation.value = withSequence(
        withTiming(-10, { duration: 100 }),
        withTiming(10, { duration: 100 }),
        withTiming(-10, { duration: 100 }),
        withTiming(10, { duration: 100 }),
        withTiming(0, { duration: 100 })
      );
    }

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
      } else {
        setShowResult(true);
      }
    }, 1000);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setSelectedAnswer(null);
  };

  if (showResult) {
    return (
      <View className="flex-1 bg-gray-100 p-6 justify-center">
        <View className="bg-white rounded-xl p-6 shadow-lg">
          <Text className="text-2xl font-bold text-center mb-4">クイズ結果</Text>
          <Text className="text-xl text-center mb-6">
            スコア: {score}/{questions.length}
          </Text>
          <TouchableOpacity
            onPress={resetQuiz}
            className="bg-blue-500 py-3 rounded-lg"
          >
            <Text className="text-white text-center font-bold">もう一度挑戦</Text>
          </TouchableOpacity>
          <Link href="/" className="mt-4">
            <Text className="text-blue-500 text-center">ホームに戻る</Text>
          </Link>
        </View>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-gray-100">
      <View className="p-6">
        {/* プログレスバー */}
        <View className="bg-gray-200 rounded-full h-2 mb-6">
          <View
            className="bg-blue-500 rounded-full h-2"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          />
        </View>

        {/* 問題 */}
        <View className="bg-white rounded-xl p-6 shadow-lg mb-6">
          <Text className="text-lg font-bold mb-2">
            問題 {currentQuestion + 1}/{questions.length}
          </Text>
          <Text className="text-xl text-gray-800">
            {questions[currentQuestion].question}
          </Text>
        </View>

        {/* 選択肢 */}
        <View className="grid grid-cols-2 gap-4">
          {questions[currentQuestion].options.map((option, index) => (
            <AnimatedTouchable
              key={index}
              onPress={() => handleAnswer(index)}
              style={selectedAnswer === index ? shakeStyle : undefined}
              disabled={selectedAnswer !== null}
            >
              <View className={`bg-white rounded-xl p-4 shadow-lg h-32 justify-center items-center ${
                selectedAnswer === index
                  ? index === questions[currentQuestion].correctAnswer
                    ? 'bg-green-500'
                    : 'bg-red-500'
                  : ''
              }`}>
                <Text
                  className={`text-center font-semibold text-lg ${
                    selectedAnswer === index ? 'text-white' : 'text-gray-800'
                  }`}
                >
                  {option}
                </Text>
              </View>
            </AnimatedTouchable>
          ))}
        </View>

        {/* スコア表示 */}
        <View className="mt-6 bg-white rounded-xl p-4 shadow">
          <Text className="text-center text-gray-800">
            現在のスコア: {score}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}
