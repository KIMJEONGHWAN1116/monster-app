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
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

export default function Home() {
  const insets = useSafeAreaInsets();
  const { width, height } = useWindowDimensions();

  const [isBlinking, setIsBlinking] = useState(false);
  const [motion, setMotion] = useState("");

  const blinkRef = useRef(null);

  const translateY = useRef(new Animated.Value(0)).current;
  const scaleX = useRef(new Animated.Value(1)).current;
  const scaleY = useRef(new Animated.Value(1)).current;

  const isSmallScreen = height < 760;
  const isVerySmallScreen = height < 700;

  const monsterAreaSize = isVerySmallScreen
    ? Math.min(width * 0.58, 230)
    : isSmallScreen
    ? Math.min(width * 0.66, 270)
    : Math.min(width * 0.74, 310);

  const monsterLottieSize = monsterAreaSize * 2.25;

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
          toValue: isSmallScreen ? -60 : -90,
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
          toValue: isSmallScreen ? -16 : -25,
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

        if (Math.abs(diffY) < 10) {
          handleBlink();
          return;
        }

        if (diffY < -50) {
          runJump();
          return;
        }

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
    <SafeAreaView style={styles.container} edges={["left", "right"]}>
      <View style={styles.header}>
        <TouchableOpacity>
          <Feather name="menu" size={34} color="#f7c7d3" />
        </TouchableOpacity>

        <Text
          style={[
            styles.headerTitle,
            {
              fontSize: isSmallScreen ? 28 : 34,
            },
          ]}
        >
          マイモンスター
        </Text>

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
        <Text
          style={[
            styles.monsterName,
            {
              fontSize: isSmallScreen ? 25 : 32,
              marginTop: isSmallScreen ? 14 : 26,
              marginBottom: isSmallScreen ? 0 : 8,
            },
          ]}
        >
          モンスターの名前
        </Text>

        <View
          style={[
            styles.starsContainer,
            {
              top: isSmallScreen ? 68 : 105,
            },
          ]}
        >
          <Text style={[styles.star, styles.star1]}>✦</Text>
          <Text style={[styles.star, styles.star2]}>✦</Text>
          <Text style={styles.starBig}>✦</Text>
          <Text style={[styles.star, styles.star3]}>✦</Text>
          <Text style={[styles.star, styles.star4]}>✦</Text>
          <Text style={[styles.star, styles.star5]}>✦</Text>
        </View>

        <View
          style={[
            styles.monsterArea,
            {
              width: monsterAreaSize,
              height: monsterAreaSize,
              marginTop: isVerySmallScreen ? 10 : isSmallScreen ? 20 : 48,
            },
          ]}
        >
          <Animated.View
            {...panResponder.panHandlers}
            style={[
              styles.monsterWrap,
              {
                width: monsterLottieSize,
                height: monsterLottieSize,
                transform: [{ translateY }, { scaleX }, { scaleY }],
              },
            ]}
          >
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

        <View
          style={[
            styles.heartBubble,
            {
              right: width * 0.1,
              top: isVerySmallScreen ? 190 : isSmallScreen ? 220 : 280,
              width: isSmallScreen ? 76 : 90,
              height: isSmallScreen ? 58 : 70,
            },
          ]}
        >
          <Text
            style={[
              styles.heart,
              {
                fontSize: isSmallScreen ? 30 : 36,
              },
            ]}
          >
            💗
          </Text>
        </View>

        <View
          style={[
            styles.statusBox,
            {
              padding: isVerySmallScreen ? 13 : isSmallScreen ? 15 : 20,
              marginTop: isVerySmallScreen ? 6 : isSmallScreen ? 10 : 18,
            },
          ]}
        >
          <Text
            style={[
              styles.statusText,
              {
                fontSize: isSmallScreen ? 20 : 24,
                marginBottom: isSmallScreen ? 9 : 14,
              },
            ]}
          >
            おなか 70%
          </Text>

          <View
            style={[
              styles.progressBar,
              {
                height: isSmallScreen ? 18 : 24,
              },
            ]}
          >
            <View style={styles.progressFill} />
          </View>
        </View>

        <TouchableOpacity
          style={[
            styles.feedButton,
            {
              height: isVerySmallScreen ? 56 : isSmallScreen ? 64 : 76,
              marginTop: isVerySmallScreen ? 10 : isSmallScreen ? 14 : 24,
              marginBottom: isVerySmallScreen ? 6 : 10,
            },
          ]}
        >
          <Text
            style={[
              styles.feedButtonText,
              {
                fontSize: isVerySmallScreen ? 20 : isSmallScreen ? 22 : 26,
              },
            ]}
          >
            それ、食べていい？
          </Text>
        </TouchableOpacity>
      </View>

      <View
        style={[
          styles.bottomNav,
          {
            height: isSmallScreen ? 74 + insets.bottom : 86 + insets.bottom,
            paddingBottom: insets.bottom,
          },
        ]}
      >
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="home" size={26} color="#f7a9bc" />
          <Text style={styles.navTextActive}>ホーム</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <MaterialCommunityIcons
            name="notebook-heart-outline"
            size={26}
            color="#c88ea4"
          />
          <Text style={styles.navText}>感情ログ</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="stats-chart-outline" size={26} color="#c88ea4" />
          <Text style={styles.navText}>きろく</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="bag-outline" size={26} color="#c88ea4" />
          <Text style={styles.navText}>ショップ</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="person-outline" size={26} color="#c88ea4" />
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
    paddingTop: 12,
    paddingBottom: 12,
  },

  headerTitle: {
    color: "#f7c7d3",
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
    position: "relative",
    overflow: "hidden",
  },

  monsterName: {
    color: "#ffffff",
    fontWeight: "700",
    alignSelf: "flex-start",
    marginLeft: 34,
  },

  starsContainer: {
    position: "absolute",
    width: "100%",
    height: 220,
    zIndex: 1,
  },

  star: {
    position: "absolute",
    color: "#fff6d5",
    fontSize: 32,
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
    fontSize: 46,
    textShadowColor: "#fff6d5",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 22,
    top: 0,
    right: 80,
  },

  monsterArea: {
    alignItems: "center",
    justifyContent: "center",
    overflow: "visible",
    zIndex: 5,
  },

  monsterWrap: {
    position: "absolute",
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
    backgroundColor: "#ffffff",
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },

  heart: {},

  statusBox: {
    width: "86%",
    borderWidth: 2,
    borderColor: "#f3bcc8",
    borderRadius: 26,
    backgroundColor: "#232b61",
    zIndex: 20,
  },

  statusText: {
    color: "#ffd4de",
    fontWeight: "600",
  },

  progressBar: {
    width: "100%",
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
    backgroundColor: "#efb5c5",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 20,
  },

  feedButtonText: {
    color: "#ffffff",
    fontWeight: "800",
  },

  bottomNav: {
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
    flex: 1,
  },

  navText: {
    color: "#c88ea4",
    marginTop: 3,
    fontSize: 12,
    fontWeight: "600",
  },

  navTextActive: {
    color: "#f7a9bc",
    marginTop: 3,
    fontSize: 12,
    fontWeight: "700",
  },
});