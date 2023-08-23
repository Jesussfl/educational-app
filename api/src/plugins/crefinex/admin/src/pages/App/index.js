import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { AnErrorOccurred } from "@strapi/helper-plugin";
import pluginId from "../../pluginId";
import LessonPage from "../Lesson/LessonPage";
import ModulesPage from "../Home/ModulesPage";
import ExercisesPage from "../Exercises/ExercisesPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Switch>
        <Route path={`/plugins/${pluginId}`} exact>
          {/* Redirigir desde HomePage a ModulesPage con parámetros de URL */}
          <Redirect to={`/plugins/${pluginId}/modules?page=1&pageSize=10&sort=id:ASC`} />
        </Route>
        <Route path={`/plugins/${pluginId}/lesson/:moduleId`} component={LessonPage} exact />
        <Route path={`/plugins/${pluginId}/exercises/:lessonId`} component={ExercisesPage} exact />
        <Route path={`/plugins/${pluginId}/modules`} component={ModulesPage} exact />

        <Route component={AnErrorOccurred} />
      </Switch>
    </QueryClientProvider>
  );
}

export default App;
