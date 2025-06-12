import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertUserPreferencesSchema, 
  insertStoryInteractionSchema, 
  insertRelatedStorySchema,
  insertDiscussionForumSchema,
  insertDiscussionThreadSchema,
  insertDiscussionCommentSchema,
  insertUserProgressSchema,
  insertUserPointsSchema
} from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes for Stories
  app.get("/api/stories", async (req, res) => {
    try {
      const stories = await storage.getAllStories();
      res.json(stories);
    } catch (error) {
      res.status(500).json({ message: "Failed to retrieve stories" });
    }
  });

  app.get("/api/stories/featured", async (req, res) => {
    try {
      const featuredStories = await storage.getFeaturedStories();
      res.json(featuredStories);
    } catch (error) {
      res.status(500).json({ message: "Failed to retrieve featured stories" });
    }
  });

  app.get("/api/stories/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid story ID" });
      }
      
      const story = await storage.getStoryById(id);
      if (!story) {
        return res.status(404).json({ message: "Story not found" });
      }
      
      res.json(story);
    } catch (error) {
      res.status(500).json({ message: "Failed to retrieve story" });
    }
  });

  app.get("/api/stories/category/:category", async (req, res) => {
    try {
      const { category } = req.params;
      const stories = await storage.getStoriesByCategory(category);
      res.json(stories);
    } catch (error) {
      res.status(500).json({ message: "Failed to retrieve stories by category" });
    }
  });

  app.get("/api/search", async (req, res) => {
    try {
      const query = req.query.q as string;
      if (!query) {
        return res.status(400).json({ message: "Search query is required" });
      }
      
      const results = await storage.searchStories(query);
      res.json(results);
    } catch (error) {
      res.status(500).json({ message: "Failed to search stories" });
    }
  });

  // API routes for Deities
  app.get("/api/deities", async (req, res) => {
    try {
      const deities = await storage.getAllDeities();
      res.json(deities);
    } catch (error) {
      res.status(500).json({ message: "Failed to retrieve deities" });
    }
  });

  app.get("/api/deities/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid deity ID" });
      }
      
      const deity = await storage.getDeityById(id);
      if (!deity) {
        return res.status(404).json({ message: "Deity not found" });
      }
      
      res.json(deity);
    } catch (error) {
      res.status(500).json({ message: "Failed to retrieve deity" });
    }
  });

  // API routes for Epics
  app.get("/api/epics", async (req, res) => {
    try {
      const epics = await storage.getAllEpics();
      res.json(epics);
    } catch (error) {
      res.status(500).json({ message: "Failed to retrieve epics" });
    }
  });

  app.get("/api/epics/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid epic ID" });
      }
      
      const epic = await storage.getEpicById(id);
      if (!epic) {
        return res.status(404).json({ message: "Epic not found" });
      }
      
      res.json(epic);
    } catch (error) {
      res.status(500).json({ message: "Failed to retrieve epic" });
    }
  });

  // API routes for Quizzes
  app.get("/api/quizzes", async (req, res) => {
    try {
      const quizzes = await storage.getAllQuizzes();
      res.json(quizzes);
    } catch (error) {
      res.status(500).json({ message: "Failed to retrieve quizzes" });
    }
  });

  app.get("/api/quizzes/category/:category", async (req, res) => {
    try {
      const { category } = req.params;
      const quizzes = await storage.getQuizzesByCategory(category);
      res.json(quizzes);
    } catch (error) {
      res.status(500).json({ message: "Failed to retrieve quizzes by category" });
    }
  });

  app.get("/api/quizzes/difficulty/:difficulty", async (req, res) => {
    try {
      const { difficulty } = req.params;
      const quizzes = await storage.getQuizzesByDifficulty(difficulty);
      res.json(quizzes);
    } catch (error) {
      res.status(500).json({ message: "Failed to retrieve quizzes by difficulty" });
    }
  });

  app.get("/api/quizzes/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid quiz ID" });
      }
      
      const quiz = await storage.getQuizById(id);
      if (!quiz) {
        return res.status(404).json({ message: "Quiz not found" });
      }
      
      res.json(quiz);
    } catch (error) {
      res.status(500).json({ message: "Failed to retrieve quiz" });
    }
  });

  // API routes for Quiz Questions
  app.get("/api/quizzes/:quizId/questions", async (req, res) => {
    try {
      const quizId = parseInt(req.params.quizId);
      if (isNaN(quizId)) {
        return res.status(400).json({ message: "Invalid quiz ID" });
      }
      
      const questions = await storage.getQuestionsByQuizId(quizId);
      res.json(questions);
    } catch (error) {
      res.status(500).json({ message: "Failed to retrieve quiz questions" });
    }
  });

  app.get("/api/questions/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid question ID" });
      }
      
      const question = await storage.getQuestionById(id);
      if (!question) {
        return res.status(404).json({ message: "Question not found" });
      }
      
      res.json(question);
    } catch (error) {
      res.status(500).json({ message: "Failed to retrieve question" });
    }
  });

  // API routes for User Preferences
  app.get("/api/users/:userId/preferences", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      if (isNaN(userId)) {
        return res.status(400).json({ message: "Invalid user ID" });
      }
      
      const preferences = await storage.getUserPreferences(userId);
      if (!preferences) {
        return res.status(404).json({ message: "User preferences not found" });
      }
      
      res.json(preferences);
    } catch (error) {
      res.status(500).json({ message: "Failed to retrieve user preferences" });
    }
  });

  app.post("/api/users/:userId/preferences", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      if (isNaN(userId)) {
        return res.status(400).json({ message: "Invalid user ID" });
      }

      // Validate the request body
      const parsedBody = insertUserPreferencesSchema.safeParse({
        ...req.body,
        userId
      });
      
      if (!parsedBody.success) {
        return res.status(400).json({ message: "Invalid preferences data", errors: parsedBody.error.errors });
      }
      
      // Check if preferences already exist for this user
      const existingPrefs = await storage.getUserPreferences(userId);
      
      let preferences;
      if (existingPrefs) {
        // Update existing preferences
        preferences = await storage.updateUserPreference(existingPrefs.id, parsedBody.data);
      } else {
        // Create new preferences
        preferences = await storage.createUserPreference(parsedBody.data);
      }
      
      res.status(201).json(preferences);
    } catch (error) {
      res.status(500).json({ message: "Failed to save user preferences" });
    }
  });

  // API routes for Story Interactions
  app.get("/api/users/:userId/interactions", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      if (isNaN(userId)) {
        return res.status(400).json({ message: "Invalid user ID" });
      }
      
      const interactions = await storage.getStoryInteractionsByUser(userId);
      res.json(interactions);
    } catch (error) {
      res.status(500).json({ message: "Failed to retrieve user interactions" });
    }
  });

  app.get("/api/stories/:storyId/interactions", async (req, res) => {
    try {
      const storyId = parseInt(req.params.storyId);
      if (isNaN(storyId)) {
        return res.status(400).json({ message: "Invalid story ID" });
      }
      
      const interactions = await storage.getStoryInteractionsByStory(storyId);
      res.json(interactions);
    } catch (error) {
      res.status(500).json({ message: "Failed to retrieve story interactions" });
    }
  });

  app.post("/api/interactions", async (req, res) => {
    try {
      // Validate the request body
      const parsedBody = insertStoryInteractionSchema.safeParse(req.body);
      
      if (!parsedBody.success) {
        return res.status(400).json({ message: "Invalid interaction data", errors: parsedBody.error.errors });
      }
      
      const interaction = await storage.createStoryInteraction(parsedBody.data);
      res.status(201).json(interaction);
    } catch (error) {
      res.status(500).json({ message: "Failed to save interaction" });
    }
  });

  // API routes for Related Stories
  app.get("/api/stories/:storyId/related", async (req, res) => {
    try {
      const storyId = parseInt(req.params.storyId);
      if (isNaN(storyId)) {
        return res.status(400).json({ message: "Invalid story ID" });
      }
      
      const relatedEntries = await storage.getRelatedStories(storyId);
      
      // Get the actual story objects
      const relatedStories = await Promise.all(
        relatedEntries.map(async (entry) => {
          const story = await storage.getStoryById(entry.relatedStoryId);
          return {
            ...entry,
            story
          };
        })
      );
      
      res.json(relatedStories);
    } catch (error) {
      res.status(500).json({ message: "Failed to retrieve related stories" });
    }
  });

  app.post("/api/stories/related", async (req, res) => {
    try {
      // Validate the request body
      const parsedBody = insertRelatedStorySchema.safeParse(req.body);
      
      if (!parsedBody.success) {
        return res.status(400).json({ message: "Invalid related story data", errors: parsedBody.error.errors });
      }
      
      const relatedStory = await storage.createRelatedStory(parsedBody.data);
      res.status(201).json(relatedStory);
    } catch (error) {
      res.status(500).json({ message: "Failed to save related story" });
    }
  });

  // API routes for Recommendations
  app.get("/api/users/:userId/recommendations", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      if (isNaN(userId)) {
        return res.status(400).json({ message: "Invalid user ID" });
      }
      
      const limit = req.query.limit ? parseInt(req.query.limit as string) : undefined;
      
      const recommendations = await storage.getRecommendedStories(userId, limit);
      res.json(recommendations);
    } catch (error) {
      res.status(500).json({ message: "Failed to retrieve recommendations" });
    }
  });

  // API routes for Discussion Forums
  app.get("/api/forums", async (req, res) => {
    try {
      const forums = await storage.getAllForums();
      res.json(forums);
    } catch (error) {
      res.status(500).json({ message: "Failed to retrieve forums" });
    }
  });

  app.get("/api/forums/category/:category", async (req, res) => {
    try {
      const { category } = req.params;
      const forums = await storage.getForumsByCategory(category);
      res.json(forums);
    } catch (error) {
      res.status(500).json({ message: "Failed to retrieve forums by category" });
    }
  });

  app.get("/api/forums/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid forum ID" });
      }
      
      const forum = await storage.getForumById(id);
      if (!forum) {
        return res.status(404).json({ message: "Forum not found" });
      }
      
      res.json(forum);
    } catch (error) {
      res.status(500).json({ message: "Failed to retrieve forum" });
    }
  });

  app.post("/api/forums", async (req, res) => {
    try {
      const parsedBody = insertDiscussionForumSchema.safeParse(req.body);
      if (!parsedBody.success) {
        return res.status(400).json({ message: "Invalid forum data", errors: parsedBody.error.errors });
      }
      
      const forum = await storage.createForum(parsedBody.data);
      res.status(201).json(forum);
    } catch (error) {
      res.status(500).json({ message: "Failed to create forum" });
    }
  });

  // API routes for Discussion Threads
  app.get("/api/forums/:forumId/threads", async (req, res) => {
    try {
      const forumId = parseInt(req.params.forumId);
      if (isNaN(forumId)) {
        return res.status(400).json({ message: "Invalid forum ID" });
      }
      
      const threads = await storage.getThreadsByForumId(forumId);
      res.json(threads);
    } catch (error) {
      res.status(500).json({ message: "Failed to retrieve threads" });
    }
  });

  app.get("/api/threads/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid thread ID" });
      }
      
      const thread = await storage.getThreadById(id);
      if (!thread) {
        return res.status(404).json({ message: "Thread not found" });
      }
      
      // Increment view count
      const updatedThread = await storage.incrementThreadViewCount(id);
      res.json(updatedThread);
    } catch (error) {
      res.status(500).json({ message: "Failed to retrieve thread" });
    }
  });

  app.get("/api/users/:userId/threads", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      if (isNaN(userId)) {
        return res.status(400).json({ message: "Invalid user ID" });
      }
      
      const threads = await storage.getThreadsByUser(userId);
      res.json(threads);
    } catch (error) {
      res.status(500).json({ message: "Failed to retrieve user threads" });
    }
  });

  app.post("/api/threads", async (req, res) => {
    try {
      const parsedBody = insertDiscussionThreadSchema.safeParse(req.body);
      if (!parsedBody.success) {
        return res.status(400).json({ message: "Invalid thread data", errors: parsedBody.error.errors });
      }
      
      const thread = await storage.createThread(parsedBody.data);
      res.status(201).json(thread);
    } catch (error) {
      res.status(500).json({ message: "Failed to create thread" });
    }
  });

  // API routes for Discussion Comments
  app.get("/api/threads/:threadId/comments", async (req, res) => {
    try {
      const threadId = parseInt(req.params.threadId);
      if (isNaN(threadId)) {
        return res.status(400).json({ message: "Invalid thread ID" });
      }
      
      const comments = await storage.getCommentsByThreadId(threadId);
      res.json(comments);
    } catch (error) {
      res.status(500).json({ message: "Failed to retrieve comments" });
    }
  });

  app.get("/api/comments/:commentId/replies", async (req, res) => {
    try {
      const commentId = parseInt(req.params.commentId);
      if (isNaN(commentId)) {
        return res.status(400).json({ message: "Invalid comment ID" });
      }
      
      const replies = await storage.getCommentReplies(commentId);
      res.json(replies);
    } catch (error) {
      res.status(500).json({ message: "Failed to retrieve comment replies" });
    }
  });

  app.post("/api/comments", async (req, res) => {
    try {
      const parsedBody = insertDiscussionCommentSchema.safeParse(req.body);
      if (!parsedBody.success) {
        return res.status(400).json({ message: "Invalid comment data", errors: parsedBody.error.errors });
      }
      
      const comment = await storage.createComment(parsedBody.data);
      res.status(201).json(comment);
    } catch (error) {
      res.status(500).json({ message: "Failed to create comment" });
    }
  });

  // API routes for User Progress
  app.get("/api/users/:userId/progress", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      if (isNaN(userId)) {
        return res.status(400).json({ message: "Invalid user ID" });
      }
      
      const progress = await storage.getUserProgressOverview(userId);
      res.json(progress);
    } catch (error) {
      res.status(500).json({ message: "Failed to retrieve user progress" });
    }
  });

  app.get("/api/users/:userId/progress/:storyId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const storyId = parseInt(req.params.storyId);
      if (isNaN(userId) || isNaN(storyId)) {
        return res.status(400).json({ message: "Invalid user ID or story ID" });
      }
      
      const progress = await storage.getUserProgressByStory(userId, storyId);
      if (!progress) {
        return res.status(404).json({ message: "Progress not found" });
      }
      
      res.json(progress);
    } catch (error) {
      res.status(500).json({ message: "Failed to retrieve story progress" });
    }
  });

  app.post("/api/progress", async (req, res) => {
    try {
      const parsedBody = insertUserProgressSchema.safeParse(req.body);
      if (!parsedBody.success) {
        return res.status(400).json({ message: "Invalid progress data", errors: parsedBody.error.errors });
      }
      
      const progress = await storage.createUserProgress(parsedBody.data);
      res.status(201).json(progress);
    } catch (error) {
      res.status(500).json({ message: "Failed to create progress" });
    }
  });

  app.patch("/api/users/:userId/progress/:storyId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const storyId = parseInt(req.params.storyId);
      if (isNaN(userId) || isNaN(storyId)) {
        return res.status(400).json({ message: "Invalid user ID or story ID" });
      }
      
      const updatedProgress = await storage.updateUserProgress(userId, storyId, req.body);
      if (!updatedProgress) {
        return res.status(404).json({ message: "Progress not found" });
      }
      
      res.json(updatedProgress);
    } catch (error) {
      res.status(500).json({ message: "Failed to update progress" });
    }
  });

  // API routes for Achievements
  app.get("/api/achievements", async (req, res) => {
    try {
      const achievements = await storage.getAllAchievements();
      res.json(achievements);
    } catch (error) {
      res.status(500).json({ message: "Failed to retrieve achievements" });
    }
  });

  app.get("/api/achievements/category/:category", async (req, res) => {
    try {
      const { category } = req.params;
      const achievements = await storage.getAchievementsByCategory(category);
      res.json(achievements);
    } catch (error) {
      res.status(500).json({ message: "Failed to retrieve achievements by category" });
    }
  });

  app.get("/api/achievements/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid achievement ID" });
      }
      
      const achievement = await storage.getAchievementById(id);
      if (!achievement) {
        return res.status(404).json({ message: "Achievement not found" });
      }
      
      res.json(achievement);
    } catch (error) {
      res.status(500).json({ message: "Failed to retrieve achievement" });
    }
  });

  app.get("/api/users/:userId/achievements", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      if (isNaN(userId)) {
        return res.status(400).json({ message: "Invalid user ID" });
      }
      
      const achievements = await storage.getUserAchievements(userId);
      res.json(achievements);
    } catch (error) {
      res.status(500).json({ message: "Failed to retrieve user achievements" });
    }
  });

  // API routes for User Points
  app.get("/api/users/:userId/points", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      if (isNaN(userId)) {
        return res.status(400).json({ message: "Invalid user ID" });
      }
      
      const points = await storage.getUserPoints(userId);
      res.json({ userId, points });
    } catch (error) {
      res.status(500).json({ message: "Failed to retrieve user points" });
    }
  });

  app.get("/api/users/:userId/points/:category", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      if (isNaN(userId)) {
        return res.status(400).json({ message: "Invalid user ID" });
      }
      
      const { category } = req.params;
      const points = await storage.getUserPointsByCategory(userId, category);
      res.json({ userId, category, points });
    } catch (error) {
      res.status(500).json({ message: "Failed to retrieve category points" });
    }
  });

  app.post("/api/points", async (req, res) => {
    try {
      const parsedBody = insertUserPointsSchema.safeParse(req.body);
      if (!parsedBody.success) {
        return res.status(400).json({ message: "Invalid points data", errors: parsedBody.error.errors });
      }
      
      const points = await storage.createUserPoints(parsedBody.data);
      res.status(201).json(points);
    } catch (error) {
      res.status(500).json({ message: "Failed to award points" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
