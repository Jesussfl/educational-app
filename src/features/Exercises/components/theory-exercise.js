import React, { useEffect } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { Colors } from "@utils/Theme";
import SectionContentHTML from "@features/World/components/section-theory";
import { speak } from "../helpers/speak";

const TheoryExercise = ({ content }) => {
  const theory = content.theory || "";
  const stripHtmlTags = (html) => {
    // Elimina las etiquetas HTML utilizando regex

    return html.replace(/(<([^>]+)>)/gi, "");
  };

  useEffect(() => {
    const textWithoutHtml = stripHtmlTags(theory);
    console.log(textWithoutHtml);
    speak(textWithoutHtml);
  }, []);
  return (
    <ScrollView style={styles.PageContainer}>
      <View style={styles.header}>
        <Text style={styles.title}>{content.title}</Text>
        <View style={styles.detailsContainer}>
          <Text style={styles.details}>Lee detenidamente</Text>
        </View>
      </View>

      <View style={styles.content}>
        <SectionContentHTML html={theory || ""} />
      </View>
    </ScrollView>
  );
};

export default TheoryExercise;

const styles = StyleSheet.create({
  header: {
    padding: 16,
    gap: 16,
  },
  title: {
    fontSize: 24,
    fontFamily: "Sora-SemiBold",
    lineHeight: 32,
    color: Colors.gray_600,
    textAlign: "center",
  },
  description: {
    fontFamily: "Sora-Regular",
    fontSize: 16,
    lineHeight: 24,
    color: Colors.gray_400,
    textAlign: "center",
  },
  headline: {
    fontSize: 15,
    fontFamily: "Sora-SemiBold",
    lineHeight: 20,
    color: Colors.gray_300,
    textAlign: "center",
  },
  detailsContainer: {
    flexDirection: "row",
    gap: 8,
    alignSelf: "center",
  },
  details: {
    fontSize: 14,
    fontFamily: "Sora-Regular",
    lineHeight: 20,
    color: Colors.gray_300,
    textAlign: "center",
  },
  PageContainer: {
    marginTop: 32,
  },
  actions: {
    alignSelf: "center",
    width: "50%",
    paddingHorizontal: 16,
  },
  content: {
    padding: 24,
  },
});
