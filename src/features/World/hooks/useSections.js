import { useAuthContext } from "@contexts/auth.context";
import useAuthStore from "@stores/useAuthStore";
import { useQueries } from "@tanstack/react-query";
import { query } from "@utils/graphql";
import { queryLessonsCompletedByUser } from "@utils/graphql/queries/lessonsCompleted.queries";
import { querySectionsByWorldId } from "@utils/graphql/queries/section.queries";
import { useEffect, useState } from "react";

export const useSections = () => {
  const [sections, setSections] = useState([]);
  const [currentWorld, setCurrentWorld] = useState(null);
  const [completedLessons, setCompletedLessons] = useState([]);
  const [error, setError] = useState(null);

  const { user } = useAuthStore();
  const [sectionsData, completedLessonsData] = useQueries({
    queries: [
      {
        queryKey: ["sections", user.current_world?.data?.id],
        queryFn: () => query(querySectionsByWorldId, { id: user.current_world?.data?.id, start: 1, limit: 100 }),
      },
      {
        queryKey: ["lessons_completed", user.id],
        queryFn: () => query(queryLessonsCompletedByUser, { id: user.id, start: 1, limit: 1000 }),
      },
    ],
  });

  useEffect(() => {
    if (sectionsData.isSuccess && completedLessonsData.isSuccess) {
      setSections(sectionsData.data.sectionsByWorld.sections);
      setCompletedLessons(completedLessonsData.data.lessonsCompletedByUser.lessonsCompleted);
      setCurrentWorld(sectionsData.data.sectionsByWorld.world);
    }

    if (sectionsData.isError || completedLessonsData.isError) {
      setError(sectionsData.error || completedLessonsData.error);
    }
  }, [sectionsData, completedLessonsData]);

  return { sections, currentWorld, completedLessons, isLoading: sectionsData.isLoading || completedLessonsData.isLoading, error };
};
