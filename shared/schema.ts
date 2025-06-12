import { pgTable, text, serial, integer, boolean, timestamp, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const stories = pgTable("stories", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  summary: text("summary").notNull(),
  content: text("content").notNull(),
  imageUrl: text("image_url").notNull(),
  category: text("category").notNull(),
  featured: boolean("featured").default(false),
});

export const deities = pgTable("deities", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  title: text("title").notNull(),
  imageUrl: text("image_url").notNull(),
});

export const epics = pgTable("epics", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url").notNull(),
  tags: text("tags").array(),
});

export const quizzes = pgTable("quizzes", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(),
  difficulty: text("difficulty").notNull(), // "easy", "medium", "hard"
  imageUrl: text("image_url").notNull(),
});

export const quizQuestions = pgTable("quiz_questions", {
  id: serial("id").primaryKey(),
  quizId: integer("quiz_id").notNull(),
  question: text("question").notNull(),
  correctAnswer: text("correct_answer").notNull(),
  options: text("options").array(),
  explanation: text("explanation"),
});

export const userPreferences = pgTable("user_preferences", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  preferredCategories: text("preferred_categories").array(),
  preferenceTags: text("preference_tags").array(),
  lastUpdated: timestamp("last_updated").defaultNow(),
});

export const storyInteractions = pgTable("story_interactions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  storyId: integer("story_id").notNull(),
  interactionType: text("interaction_type").notNull(), // "view", "like", "bookmark"
  timestamp: timestamp("timestamp").defaultNow(),
});

export const relatedStories = pgTable("related_stories", {
  id: serial("id").primaryKey(),
  storyId: integer("story_id").notNull(),
  relatedStoryId: integer("related_story_id").notNull(),
  relationStrength: integer("relation_strength").notNull(), // 1-10 scale
  relationReason: text("relation_reason").notNull(), // "similar_category", "same_deity", "same_epic", etc.
});

export const bookmarks = pgTable("bookmarks", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  storyId: integer("story_id").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  notes: text("notes"),
});

export const glossaryTerms = pgTable("glossary_terms", {
  id: serial("id").primaryKey(),
  term: text("term").notNull().unique(),
  definition: text("definition").notNull(),
  category: text("category"), // e.g., "deity", "concept", "place"
  relatedTerms: text("related_terms").array(),
});

export const characterRelationships = pgTable("character_relationships", {
  id: serial("id").primaryKey(),
  character1Id: integer("character1_id").notNull(),
  character2Id: integer("character2_id").notNull(),
  relationshipType: text("relationship_type").notNull(), // e.g., "parent", "sibling", "spouse", "enemy"
  description: text("description").notNull(),
});

export const storyElements = pgTable("story_elements", {
  id: serial("id").primaryKey(),
  storyId: integer("story_id").notNull(),
  elementType: text("element_type").notNull(), // e.g., "character", "place", "object"
  elementName: text("element_name").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url"),
  position: json("position"), // For interactive illustration placement {x, y, width, height}
});

export const audioAssets = pgTable("audio_assets", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  url: text("url").notNull(),
  type: text("type").notNull(), // e.g., "background_music", "sound_effect", "narration"
  duration: integer("duration").notNull(), // in seconds
  mood: text("mood"), // e.g., "peaceful", "dramatic", "mysterious"
});

export const vrModels = pgTable("vr_models", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  modelUrl: text("model_url").notNull(),
  thumbnailUrl: text("thumbnail_url").notNull(),
  description: text("description").notNull(),
  associatedEntityId: integer("associated_entity_id").notNull(), // ID of a deity, character, or story
  entityType: text("entity_type").notNull(), // "deity", "character", "story_scene"
});

// New table for VR experiences
export const vrScenes = pgTable("vr_scenes", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  deity: text("deity").notNull(),
  description: text("description").notNull(),
  details: text("details").notNull(), // Longer description with detailed information
  imageUrl: text("image_url").notNull(),
  modelId: integer("model_id").references(() => vrModels.id), // Optional reference to 3D model
  difficulty: text("difficulty").default("beginner"), // "beginner", "intermediate", "advanced"
  duration: integer("duration").default(10), // Duration in minutes
  featured: boolean("featured").default(false),
  category: text("category").notNull(), // e.g., "meditation", "historical", "mythological"
  relatedStoryId: integer("related_story_id").references(() => stories.id),
});

export const discussionForums = pgTable("discussion_forums", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(), // e.g., "Epics", "Deities", "Rituals", "General"
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  imageUrl: text("image_url"),
  isActive: boolean("is_active").default(true).notNull(),
});

export const discussionThreads = pgTable("discussion_threads", {
  id: serial("id").primaryKey(),
  forumId: integer("forum_id").references(() => discussionForums.id).notNull(),
  userId: integer("user_id").references(() => users.id).notNull(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  isPinned: boolean("is_pinned").default(false).notNull(),
  viewCount: integer("view_count").default(0).notNull(),
  lastActivityAt: timestamp("last_activity_at").defaultNow().notNull(),
});

export const discussionComments = pgTable("discussion_comments", {
  id: serial("id").primaryKey(),
  threadId: integer("thread_id").references(() => discussionThreads.id).notNull(),
  userId: integer("user_id").references(() => users.id).notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  parentCommentId: integer("parent_comment_id"),
  isEdited: boolean("is_edited").default(false).notNull(),
});

// Gamified story progress feature
export const userProgress = pgTable("user_progress", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  storyId: integer("story_id").references(() => stories.id).notNull(),
  progress: integer("progress").default(0).notNull(), // percentage or chapter number
  completedAt: timestamp("completed_at"),
  lastAccessedAt: timestamp("last_accessed_at").defaultNow().notNull(),
  achievementsUnlocked: text("achievements_unlocked").array(), // list of achievement IDs
  currentChapter: integer("current_chapter").default(1).notNull(),
});

export const achievements = pgTable("achievements", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url"),
  category: text("category").notNull(), // e.g., "Exploration", "Knowledge", "Dedication"
  requiredPoints: integer("required_points").notNull(),
  isSecret: boolean("is_secret").default(false).notNull(),
  relatedStoryId: integer("related_story_id").references(() => stories.id),
});

export const userPoints = pgTable("user_points", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  points: integer("points").default(0).notNull(),
  category: text("category").notNull(), // e.g., "Knowledge", "Participation", "Exploration"
  source: text("source").notNull(), // e.g., "quiz_completion", "story_reading", "discussion"
  earnedAt: timestamp("earned_at").defaultNow().notNull(),
  relatedEntityId: integer("related_entity_id"), // ID of quiz, story, discussion, etc.
  relatedEntityType: text("related_entity_type"), // "quiz", "story", "discussion", etc.
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertStorySchema = createInsertSchema(stories).pick({
  title: true,
  summary: true,
  content: true,
  imageUrl: true,
  category: true,
  featured: true,
});

export const insertDeitySchema = createInsertSchema(deities).pick({
  name: true,
  title: true,
  imageUrl: true,
});

export const insertEpicSchema = createInsertSchema(epics).pick({
  name: true,
  description: true,
  imageUrl: true,
  tags: true,
});

export const insertQuizSchema = createInsertSchema(quizzes).pick({
  title: true,
  description: true,
  category: true,
  difficulty: true,
  imageUrl: true,
});

export const insertQuizQuestionSchema = createInsertSchema(quizQuestions).pick({
  quizId: true,
  question: true,
  correctAnswer: true,
  options: true,
  explanation: true,
});

export const insertUserPreferencesSchema = createInsertSchema(userPreferences).pick({
  userId: true,
  preferredCategories: true,
  preferenceTags: true,
});

export const insertStoryInteractionSchema = createInsertSchema(storyInteractions).pick({
  userId: true,
  storyId: true,
  interactionType: true,
});

export const insertRelatedStorySchema = createInsertSchema(relatedStories).pick({
  storyId: true,
  relatedStoryId: true,
  relationStrength: true,
  relationReason: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertStory = z.infer<typeof insertStorySchema>;
export type Story = typeof stories.$inferSelect;

export type InsertDeity = z.infer<typeof insertDeitySchema>;
export type Deity = typeof deities.$inferSelect;

export type InsertEpic = z.infer<typeof insertEpicSchema>;
export type Epic = typeof epics.$inferSelect;

export type InsertQuiz = z.infer<typeof insertQuizSchema>;
export type Quiz = typeof quizzes.$inferSelect;

export type InsertQuizQuestion = z.infer<typeof insertQuizQuestionSchema>;
export type QuizQuestion = typeof quizQuestions.$inferSelect;

export type InsertUserPreference = z.infer<typeof insertUserPreferencesSchema>;
export type UserPreference = typeof userPreferences.$inferSelect;

export type InsertStoryInteraction = z.infer<typeof insertStoryInteractionSchema>;
export type StoryInteraction = typeof storyInteractions.$inferSelect;

export type InsertRelatedStory = z.infer<typeof insertRelatedStorySchema>;
export type RelatedStory = typeof relatedStories.$inferSelect;

export const insertBookmarkSchema = createInsertSchema(bookmarks).pick({
  userId: true,
  storyId: true,
  notes: true,
});
export type InsertBookmark = z.infer<typeof insertBookmarkSchema>;
export type Bookmark = typeof bookmarks.$inferSelect;

export const insertGlossaryTermSchema = createInsertSchema(glossaryTerms).pick({
  term: true,
  definition: true,
  category: true,
  relatedTerms: true,
});
export type InsertGlossaryTerm = z.infer<typeof insertGlossaryTermSchema>;
export type GlossaryTerm = typeof glossaryTerms.$inferSelect;

export const insertCharacterRelationshipSchema = createInsertSchema(characterRelationships).pick({
  character1Id: true,
  character2Id: true,
  relationshipType: true,
  description: true,
});
export type InsertCharacterRelationship = z.infer<typeof insertCharacterRelationshipSchema>;
export type CharacterRelationship = typeof characterRelationships.$inferSelect;

export const insertStoryElementSchema = createInsertSchema(storyElements).pick({
  storyId: true,
  elementType: true,
  elementName: true,
  description: true,
  imageUrl: true,
  position: true,
});
export type InsertStoryElement = z.infer<typeof insertStoryElementSchema>;
export type StoryElement = typeof storyElements.$inferSelect;

export const insertAudioAssetSchema = createInsertSchema(audioAssets).pick({
  title: true,
  url: true,
  type: true,
  duration: true,
  mood: true,
});
export type InsertAudioAsset = z.infer<typeof insertAudioAssetSchema>;
export type AudioAsset = typeof audioAssets.$inferSelect;

export const insertVRModelSchema = createInsertSchema(vrModels).pick({
  title: true,
  modelUrl: true,
  thumbnailUrl: true,
  description: true,
  associatedEntityId: true,
  entityType: true,
});
export type InsertVRModel = z.infer<typeof insertVRModelSchema>;
export type VRModel = typeof vrModels.$inferSelect;

export const insertVRSceneSchema = createInsertSchema(vrScenes).pick({
  name: true,
  deity: true,
  description: true,
  details: true,
  imageUrl: true,
  modelId: true,
  difficulty: true,
  duration: true,
  featured: true,
  category: true,
  relatedStoryId: true,
});
export type InsertVRScene = z.infer<typeof insertVRSceneSchema>;
export type VRScene = typeof vrScenes.$inferSelect;

export const insertDiscussionForumSchema = createInsertSchema(discussionForums).pick({
  title: true,
  description: true,
  category: true,
  imageUrl: true,
  isActive: true,
});
export type InsertDiscussionForum = z.infer<typeof insertDiscussionForumSchema>;
export type DiscussionForum = typeof discussionForums.$inferSelect;

export const insertDiscussionThreadSchema = createInsertSchema(discussionThreads).pick({
  forumId: true,
  userId: true,
  title: true,
  content: true,
  isPinned: true,
});
export type InsertDiscussionThread = z.infer<typeof insertDiscussionThreadSchema>;
export type DiscussionThread = typeof discussionThreads.$inferSelect;

export const insertDiscussionCommentSchema = createInsertSchema(discussionComments).pick({
  threadId: true,
  userId: true,
  content: true,
  parentCommentId: true,
});
export type InsertDiscussionComment = z.infer<typeof insertDiscussionCommentSchema>;
export type DiscussionComment = typeof discussionComments.$inferSelect;

export const insertUserProgressSchema = createInsertSchema(userProgress).pick({
  userId: true,
  storyId: true,
  progress: true,
  achievementsUnlocked: true,
  currentChapter: true,
});
export type InsertUserProgress = z.infer<typeof insertUserProgressSchema>;
export type UserProgress = typeof userProgress.$inferSelect;

export const insertAchievementSchema = createInsertSchema(achievements).pick({
  title: true,
  description: true,
  imageUrl: true,
  category: true,
  requiredPoints: true,
  isSecret: true,
  relatedStoryId: true,
});
export type InsertAchievement = z.infer<typeof insertAchievementSchema>;
export type Achievement = typeof achievements.$inferSelect;

export const insertUserPointsSchema = createInsertSchema(userPoints).pick({
  userId: true,
  points: true,
  category: true,
  source: true,
  relatedEntityId: true,
  relatedEntityType: true,
});
export type InsertUserPoints = z.infer<typeof insertUserPointsSchema>;
export type UserPoints = typeof userPoints.$inferSelect;
