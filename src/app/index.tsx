import { Image, StyleSheet, Text, View } from "react-native";

export default function Page() {
  return (
    <View style={styles.container}>

      {/* 背景系 */}
      <Image
        source={require("../assets/images/tabIcons/splash/moon.png")}
        style={styles.moon}
      />

      <Image
        source={require("../assets/images/tabIcons/splash/cloud.png")}
        style={styles.cloud}
      />

      {/* テキストまとめ */}
      <View style={styles.textArea}>
        <Text style={styles.title}>モンスターアプリ</Text>

        <Text style={styles.subtitle}>
          感情を食べてモンスターを育てよう
        </Text>

        <Text style={styles.button}>
          はじめる
        </Text>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
  },

  moon: {
    position: "absolute",
    top: 80,
    right: 20,
    width: 160,
    height: 160,
    resizeMode: "contain",
  },

  cloud: {
    position: "absolute",
    top: 160,
    left: 20,
    width: 220,
    height: 120,
    resizeMode: "contain",
  },

  textArea: {
    alignItems: "center",
  },

  title: {
    fontSize: 32,
    fontWeight: "bold",
  },

  subtitle: {
    fontSize: 18,
    marginTop: 20,
    textAlign: "center",
  },

  button: {
    marginTop: 40,
    fontSize: 20,
  },
});