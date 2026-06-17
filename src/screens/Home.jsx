import { useRef, useState } from "react";
import {
  Feather,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import LottieView from "lottie-react-native";
import {
  Animated,
  PanResponder,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Home() {
  const [isBlinking, setIsBlinking] = useState(false);
  const [motion, setMotion] = useState("");

  const blinkRef = useRef(null);

  const translateY = useRef(new Animated.Value(0)).current;
  const scaleX = useRef(new Animated.Value(1)).current;
  const scaleY = useRef(new Animated.Value(1)).current;

  const resetTransform = () => {
    translateY.setValue(0);
    scaleX.setValue(1);
    scaleY.setValue(1);
  };

  const handleBlink = () => {
    if (isBlinking || motion !== "") return;

    setIsBlinking(true);

    setTimeout(() => {
      blinkRef.current?.reset();
      blinkRef.current?.play();
    }, 0);

    // blink 끝난 뒤 원래 얼굴로 복귀
    setTimeout(() => {
      setIsBlinking(false);
    }, 700);
  };

  const runJump = () => {
    if (motion !== "" || isBlinking) return;

    setMotion("jump");
    resetTransform();

    Animated.sequence([
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: -90,
          duration: 220,
          useNativeDriver: true,
        }),
        Animated.timing(scaleX, {
          toValue: 1.04,
          duration: 220,
          useNativeDriver: true,
        }),
        Animated.timing(scaleY, {
          toValue: 0.96,
          duration: 220,
          useNativeDriver: true,
        }),
      ]),

      Animated.parallel([
        Animated.timing(translateY, {
          toValue: 0,
          duration: 180,
          useNativeDriver: true,
        }),
        Animated.timing(scaleX, {
          toValue: 0.96,
          duration: 180,
          useNativeDriver: true,
        }),
        Animated.timing(scaleY, {
          toValue: 1.06,
          duration: 180,
          useNativeDriver: true,
        }),
      ]),

      Animated.parallel([
        Animated.timing(translateY, {
          toValue: -25,
          duration: 130,
          useNativeDriver: true,
        }),
        Animated.timing(scaleX, {
          toValue: 1.02,
          duration: 130,
          useNativeDriver: true,
        }),
        Animated.timing(scaleY, {
          toValue: 0.98,
          duration: 130,
          useNativeDriver: true,
        }),
      ]),

      Animated.parallel([
        Animated.timing(translateY, {
          toValue: 0,
          duration: 160,
          useNativeDriver: true,
        }),
        Animated.timing(scaleX, {
          toValue: 1,
          duration: 160,
          useNativeDriver: true,
        }),
        Animated.timing(scaleY, {
          toValue: 1,
          duration: 160,
          useNativeDriver: true,
        }),
      ]),
    ]).start(() => {
      setMotion("");
      resetTransform();
    });
  };

  const runSquash = () => {
    if (motion !== "" || isBlinking) return;

    setMotion("squash");
    resetTransform();

    Animated.sequence([
      Animated.parallel([
        Animated.timing(scaleX, {
          toValue: 1.16,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(scaleY, {
          toValue: 0.78,
          duration: 250,
          useNativeDriver: true,
        }),
      ]),

      // 찌그러진 상태 유지
      Animated.delay(1000),

      Animated.parallel([
        Animated.timing(scaleX, {
          toValue: 0.96,
          duration: 120,
          useNativeDriver: true,
        }),
        Animated.timing(scaleY, {
          toValue: 1.08,
          duration: 120,
          useNativeDriver: true,
        }),
      ]),

      Animated.parallel([
        Animated.timing(scaleX, {
          toValue: 1.04,
          duration: 90,
          useNativeDriver: true,
        }),
        Animated.timing(scaleY, {
          toValue: 0.96,
          duration: 90,
          useNativeDriver: true,
        }),
      ]),

      Animated.parallel([
        Animated.timing(scaleX, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(scaleY, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }),
      ]),
    ]).start(() => {
      setTimeout(() => {
        setMotion("");
        resetTransform();
      }, 200);
    });
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,

      onMoveShouldSetPanResponder: (_, gestureState) => {
        return Math.abs(gestureState.dy) > 8;
      },

      onPanResponderRelease: (_, gestureState) => {
        const diffY = gestureState.dy;

        // 터치
        if (Math.abs(diffY) < 10) {
          handleBlink();
          return;
        }

        // 위로 쓸어올림
        if (diffY < -50) {
          runJump();
          return;
        }

        // 아래로 쓸어내림
        if (diffY > 50) {
          runSquash();
        }
      },

      onPanResponderTerminate: () => {
        resetTransform();
        setMotion("");
      },
    })
  ).current;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <Feather name="menu" size={34} color="#f7c7d3" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>マイモンスター</Text>

        <TouchableOpacity>
          <Ionicons
            name="notifications-outline"
            size={30}
            color="#f7c7d3"
          />
        </TouchableOpacity>
      </View>

      <View style={styles.line} />

      <View style={styles.content}>
        <Text style={styles.monsterName}>モンスターの名前</Text>

        <View style={styles.starsContainer}>
          <Text style={[styles.star, styles.star1]}>✦</Text>
          <Text style={[styles.star, styles.star2]}>✦</Text>
          <Text style={styles.starBig}>✦</Text>
          <Text style={[styles.star, styles.star3]}>✦</Text>
          <Text style={[styles.star, styles.star4]}>✦</Text>
          <Text style={[styles.star, styles.star5]}>✦</Text>
        </View>

        {/* 몬스터가 차지하는 레이아웃 공간 */}
        <View style={styles.monsterArea}>
          {/* 실제 크게 보이는 몬스터 */}
          <Animated.View
            {...panResponder.panHandlers}
            style={[
              styles.monsterWrap,
              {
                transform: [{ translateY }, { scaleX }, { scaleY }],
              },
            ]}
          >
            {/* 몸통 + 팔 흔들기 */}
            <View
              pointerEvents="none"
              style={[styles.monsterLayer, styles.bodyLayer]}
            >
              <LottieView
                source={require("../assets/lottie/monster_body_idle.json")}
                autoPlay
                loop
                style={styles.lottieFill}
              />
            </View>

            {/* 기본 얼굴 */}
            {!isBlinking && motion !== "squash" && (
              <View
                pointerEvents="none"
                style={[styles.monsterLayer, styles.faceLayer]}
              >
                <LottieView
                  source={require("../assets/lottie/monster_face_idle.json")}
                  autoPlay
                  loop
                  style={styles.lottieFill}
                />
              </View>
            )}

            {/* 터치했을 때 눈 깜빡임 */}
            {isBlinking && (
              <View
                pointerEvents="none"
                style={[styles.monsterLayer, styles.faceLayer]}
              >
                <LottieView
                  ref={blinkRef}
                  source={require("../assets/lottie/monster_face_blink.json")}
                  autoPlay
                  loop={false}
                  style={styles.lottieFill}
                />
              </View>
            )}

            {/* 아래로 쓸어내렸을 때 찌그러진 표정 */}
            {motion === "squash" && !isBlinking && (
              <View
                pointerEvents="none"
                style={[styles.monsterLayer, styles.faceLayer]}
              >
                <LottieView
                  source={require("../assets/lottie/monster_face_squash.json")}
                  autoPlay
                  loop
                  style={styles.lottieFill}
                />
              </View>
            )}
          </Animated.View>
        </View>

        <View style={styles.heartBubble}>
          <Text style={styles.heart}>💗</Text>
        </View>

        <View style={styles.statusBox}>
          <Text style={styles.statusText}>おなか 70%</Text>

          <View style={styles.progressBar}>
            <View style={styles.progressFill} />
          </View>
        </View>

        <TouchableOpacity style={styles.feedButton}>
          <Text style={styles.feedButtonText}>それ、食べていい？</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="home" size={28} color="#f7a9bc" />
          <Text style={styles.navTextActive}>ホーム</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <MaterialCommunityIcons
            name="notebook-heart-outline"
            size={28}
            color="#c88ea4"
          />
          <Text style={styles.navText}>感情ログ</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="stats-chart-outline" size={28} color="#c88ea4" />
          <Text style={styles.navText}>きろく</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="bag-outline" size={28} color="#c88ea4" />
          <Text style={styles.navText}>ショップ</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="person-outline" size={28} color="#c88ea4" />
          <Text style={styles.navText}>マイページ</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#171d4b",
    overflow: "hidden",
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 18,
    paddingBottom: 18,
  },

  headerTitle: {
    color: "#f7c7d3",
    fontSize: 34,
    fontWeight: "700",
  },

  line: {
    height: 1.5,
    backgroundColor: "#d6a8b7",
    opacity: 0.7,
  },

  content: {
    flex: 1,
    alignItems: "center",
    paddingTop: 30,
  },

  monsterName: {
    color: "#ffffff",
    fontSize: 32,
    fontWeight: "700",
    alignSelf: "flex-start",
    marginLeft: 34,
    marginBottom: 10,
  },

  starsContainer: {
    position: "absolute",
    top: 100,
    width: "100%",
    height: 200,
  },

  star: {
    position: "absolute",
    color: "#fff6d5",
    fontSize: 34,
    textShadowColor: "#fff6d5",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 18,
  },

  star1: {
    top: 30,
    left: 40,
  },

  star2: {
    top: 90,
    left: 90,
  },

  star3: {
    top: 80,
    right: 45,
  },

  star4: {
    top: 150,
    left: 55,
  },

  star5: {
    top: 145,
    right: 90,
  },

  starBig: {
    position: "absolute",
    color: "#fff6d5",
    fontSize: 48,
    textShadowColor: "#fff6d5",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 22,
    top: 0,
    right: 80,
  },

  // 레이아웃 공간 확보용 박스
  monsterArea: {
    width: 310,
    height: 310,
    marginTop: 70,
    alignItems: "center",
    justifyContent: "center",
    overflow: "visible",
    zIndex: 5,
  },

  // 실제 크게 보이는 몬스터
  monsterWrap: {
    position: "absolute",
    width: 700,
    height: 700,
    zIndex: 5,
  },

  monsterLayer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },

  bodyLayer: {
    zIndex: 1,
  },

  faceLayer: {
    zIndex: 2,
  },

  lottieFill: {
    width: "100%",
    height: "100%",
  },

  heartBubble: {
    position: "absolute",
    right: 40,
    top: 280,
    width: 90,
    height: 70,
    backgroundColor: "#ffffff",
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },

  heart: {
    fontSize: 36,
  },

  statusBox: {
    width: "86%",
    borderWidth: 2,
    borderColor: "#f3bcc8",
    borderRadius: 28,
    padding: 22,
    marginTop: 20,
    backgroundColor: "#232b61",
  },

  statusText: {
    color: "#ffd4de",
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 16,
  },

  progressBar: {
    width: "100%",
    height: 24,
    backgroundColor: "#51527c",
    borderRadius: 30,
    overflow: "hidden",
  },

  progressFill: {
    width: "74%",
    height: "100%",
    backgroundColor: "#f5c6d2",
    borderRadius: 30,
  },

  feedButton: {
    width: "74%",
    height: 92,
    backgroundColor: "#efb5c5",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 36,
  },

  feedButtonText: {
    color: "#ffffff",
    fontSize: 30,
    fontWeight: "800",
  },

  bottomNav: {
    height: 100,
    borderTopWidth: 1.5,
    borderColor: "#d6a8b7",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#171d4b",
  },

  navItem: {
    alignItems: "center",
    justifyContent: "center",
  },

  navText: {
    color: "#c88ea4",
    marginTop: 4,
    fontSize: 14,
    fontWeight: "600",
  },

  navTextActive: {
    color: "#f7a9bc",
    marginTop: 4,
    fontSize: 14,
    fontWeight: "700",
  },
});