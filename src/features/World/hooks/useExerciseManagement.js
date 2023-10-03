import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { query } from "@utils/graphql/client/GraphQLCLient";
import { queryExercisesByLessonId } from "@utils/graphql/queries/exercise.queries";
import { useRoute } from "@react-navigation/native";
import SimpleSelection from "../components/SimpleSelection";
import Completion from "../components/Completion";
import { Text } from "react-native";
export default useExerciseManagement = () => {
   const [currentIndex, setCurrentIndex] = useState(0);
   const route = useRoute();
   const params = route.params;
   const [isEmpty, setIsEmpty] = useState(false);
   const { data, isLoading, error } = useQuery(["exercises"], () =>
      query(queryExercisesByLessonId, { id: params.lessonId, start: 1, limit: 100 })
   );
   const exercises = isLoading ? [] : data?.exercisesByLesson.exercises.sort((a, b) => a.order - b.order);
   let percentage = ((currentIndex + 1) * 100) / exercises.length;
   const handleNext = () => {
      if (currentIndex < exercises.length - 1) {
         setCurrentIndex(currentIndex + 1);
      }
   };
   const renderExercise = () => {
      if (exercises.length === 0) {
         setIsEmpty(true);
         return <Text style={{ textAlign: "center" }}>No hay ejercicios para esta leccion</Text>;
      }
      const exerciseTypes = {
         simpleSelection: () => (
            <SimpleSelection content={JSON.parse(exercises[currentIndex].attributes.content)} handleNext={handleNext} />
         ),

         completion: () => <Completion content={JSON.parse(exercises[currentIndex].attributes.content)} handleNext={handleNext} />,
      };
      return exerciseTypes[exercises[currentIndex].attributes.type]();
   };

   return {
      isLoading,
      error,
      isEmpty,
      currentExercise: currentIndex,
      percentage,
      renderExercise,
   };
};