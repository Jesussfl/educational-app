import React from "react";
import { StyleSheet, View, Image } from "react-native";
import { Key } from "iconsax-react-native";

import { Button } from "@components";
import { useLessonStore } from "@stores/useLessonStore";
import { Colors } from "@utils/Theme";
import { useScrollStore } from "@stores/useScrollStore";
const Exam = ({ isLast, id, isCompleted, isLocked, description, scrollHandler, sectionIndex }) => {
  const { addLessonId, addLessonStatus, onOpen, addIsLastLesson, addLessonType, addLessonDescription } = useLessonStore((state) => state);
  const { addCurrentCoords } = useScrollStore();

  const isCurrent = !isCompleted && !isLocked;
  return (
    <View
      style={styles.bottomContainer}
      onLayout={(event) => {
        if (isCurrent) {
          const layout = event.nativeEvent.layout;
          addCurrentCoords(layout.y + 20);
        }
      }}
    >
      <Image source={require("../../../../assets/Door.png")} style={styles.image} />
      <Button
        text={isCompleted ? "Completado" : "Siguiente Sección"}
        disabled={isLocked}
        variant={isCompleted ? "success" : isLocked ? "secondary" : "primary"}
        rightIcon={<Key size={20} variant="Bold" color={isCompleted ? "#fff" : isLocked ? Colors.gray_300 : "#fff"} />}
        onPress={() => {
          addLessonType("exam");
          addLessonId(id);
          addLessonStatus(isLocked ? "locked" : isCompleted ? "completed" : "unlocked");
          addLessonDescription(description);
          if (isLast) {
            addIsLastLesson(true);
          } else {
            addIsLastLesson(false);
          }
          onOpen();
        }}
      />
    </View>
  );
};

export default Exam;

const styles = StyleSheet.create({
  container: {
    gap: 28,
    alignItems: "center",
    flexDirection: "column-reverse",
  },
  giftImage: {
    width: 150,
    height: 150,
    marginVertical: 16,
  },
  image: {
    width: 200,
    height: 200,
    marginVertical: 16,
    alignSelf: "center",
  },
});
