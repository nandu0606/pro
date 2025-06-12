import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import StoryPage from "@/pages/StoryPage";
import QuizzesPage from "@/pages/QuizzesPage";
import QuizPage from "@/pages/QuizPage";
import ForumsPage from "@/pages/ForumsPage";
import ForumThreadsPage from "@/pages/ForumThreadsPage";
import ThreadDetailPage from "@/pages/ThreadDetailPage";
import AchievementsPage from "@/pages/AchievementsPage";
import UserProfilePage from "@/pages/UserProfilePage";
import VRExperiencePage from "@/pages/VRExperiencePage";
import FontLoader from "@/components/ui/font-loader";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/story/:id" component={StoryPage} />
      <Route path="/quizzes" component={QuizzesPage} />
      <Route path="/quiz/:id" component={QuizPage} />
      <Route path="/forums" component={ForumsPage} />
      <Route path="/forums/:id" component={ForumThreadsPage} />
      <Route path="/threads/:id" component={ThreadDetailPage} />
      <Route path="/achievements" component={AchievementsPage} />
      <Route path="/profile" component={UserProfilePage} />
      <Route path="/vr" component={VRExperiencePage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <FontLoader />
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
