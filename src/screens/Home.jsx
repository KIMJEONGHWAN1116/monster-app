import {
    Image,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import Icon from "react-native-vector-icons/Ionicons";

import colors from "../styles/colors";

export default function Home() {
  return (
    <SafeAreaView style={styles.container}>
      
      {/* Header */}
      <View style={styles.header}>
        <Icon name="menu" size={34} color={colors.pink} />

        <Text style={styles.headerTitle}>マイモンスター</Text>

        <Icon name="notifications-outline" size={30} color={colors.pink} />
      </View>

      {/* line */}
      <View style={styles.line} />

      {/* monster name */}
      <Text style={styles.monsterName}>モンスターの名前</Text>

      {/* stars */}
      <Text style={styles.star1}>⭐</Text>
      <Text style={styles.star2}>⭐</Text>
      <Text style={styles.star3}>⭐</Text>
      <Text style={styles.star4}>⭐</Text>

      {/* monster */}
      <Image
        source={require("../assets/monster.png")}
        style={styles.monster}
      />

      {/* heart bubble */}
      <View style={styles.chatBubble}>
        <Text style={styles.heart}>💗</Text>
      </View>

      {/* status card */}
      <View style={styles.statusCard}>
        <Text style={styles.hungryText}>
          おなか <Text style={styles.percent}>70%</Text>
        </Text>

        <View style={styles.progressBg}>
          <View style={styles.progress} />
        </View>
      </View>

      {/* button */}
      <TouchableOpacity style={styles.feedButton}>
        <Text style={styles.feedText}>それ、食べていい？</Text>
      </TouchableOpacity>

      {/* bottom nav */}
      <View style={styles.bottomNav}>
        <View style={styles.navItem}>
          <Icon name="home" size={28} color={colors.pink} />
          <Text style={styles.navText}>ホーム</Text>
        </View>

        <View style={styles.navItem}>
          <Icon name="book-outline" size={28} color={colors.pink} />
          <Text style={styles.navText}>感情ログ</Text>
        </View>

        <View style={styles.navItem}>
          <Icon name="stats-chart-outline" size={28} color={colors.pink} />
          <Text style={styles.navText}>きろく</Text>
        </View>

        <View style={styles.navItem}>
          <Icon name="bag-handle-outline" size={28} color={colors.pink} />
          <Text style={styles.navText}>ショップ</Text>
        </View>

        <View style={styles.navItem}>
          <Icon name="person-outline" size={28} color={colors.pink} />
          <Text style={styles.navText}>マイページ</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 10,
  },

  headerTitle: {
    color: colors.pink,
    fontSize: 28,
    fontWeight: "700",
  },

  line: {
    height: 1,
    backgroundColor: colors.pink,
    marginTop: 20,
  },

  monsterName: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "700",
    marginTop: 30,
    marginLeft: 30,
  },

  star1: {
    position: "absolute",
    top: 170,
    left: 40,
    fontSize: 26,
  },

  star2: {
    position: "absolute",
    top: 210,
    left: 120,
    fontSize: 24,
  },

  star3: {
    position: "absolute",
    top: 150,
    right: 60,
    fontSize: 30,
  },

  star4: {
    position: "absolute",
    top: 220,
    right: 40,
    fontSize: 26,
  },

  monster: {
    width: 320,
    height: 320,
    resizeMode: "contain",
    alignSelf: "center",
    marginTop: 40,
  },

  chatBubble: {
    position: "absolute",
    right: 40,
    top: 330,
    backgroundColor: "#fff",
    width: 80,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },

  heart: {
    fontSize: 30,
  },

  statusCard: {
    width: "85%",
    alignSelf: "center",
    backgroundColor: colors.card,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: colors.pink,
    padding: 20,
    marginTop: -10,
  },

  hungryText: {
    color: "#fff",
    fontSize: 24,
    marginBottom: 15,
  },

  percent: {
    color: colors.pink,
    fontWeight: "700",
  },

  progressBg: {
    width: "100%",
    height: 20,
    backgroundColor: colors.progressBg,
    borderRadius: 20,
  },

  progress: {
    width: "70%",
    height: 20,
    backgroundColor: colors.pink,
    borderRadius: 20,
  },

  feedButton: {
    width: "80%",
    height: 90,
    backgroundColor: colors.pink,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginTop: 40,
  },

  feedText: {
    color: "#fff",
    fontSize: 34,
    fontWeight: "800",
  },

  bottomNav: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 90,
    borderTopWidth: 1,
    borderTopColor: colors.pink,
    backgroundColor: colors.background,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },

  navItem: {
    alignItems: "center",
  },

  navText: {
    color: colors.pink,
    fontSize: 12,
    marginTop: 5,
  },
});