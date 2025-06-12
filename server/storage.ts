import { 
  users, type User, type InsertUser,
  stories, type Story, type InsertStory,
  deities, type Deity, type InsertDeity,
  epics, type Epic, type InsertEpic,
  quizzes, type Quiz, type InsertQuiz,
  quizQuestions, type QuizQuestion, type InsertQuizQuestion,
  userPreferences, type UserPreference, type InsertUserPreference,
  storyInteractions, type StoryInteraction, type InsertStoryInteraction,
  relatedStories, type RelatedStory, type InsertRelatedStory,
  bookmarks, type Bookmark, type InsertBookmark,
  glossaryTerms, type GlossaryTerm, type InsertGlossaryTerm,
  characterRelationships, type CharacterRelationship, type InsertCharacterRelationship,
  storyElements, type StoryElement, type InsertStoryElement,
  audioAssets, type AudioAsset, type InsertAudioAsset,
  vrModels, type VRModel, type InsertVRModel,
  vrScenes, type VRScene, type InsertVRScene,
  discussionForums, type DiscussionForum, type InsertDiscussionForum,
  discussionThreads, type DiscussionThread, type InsertDiscussionThread,
  discussionComments, type DiscussionComment, type InsertDiscussionComment,
  userProgress, type UserProgress, type InsertUserProgress,
  achievements, type Achievement, type InsertAchievement,
  userPoints, type UserPoints, type InsertUserPoints
} from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getAllStories(): Promise<Story[]>;
  getFeaturedStories(): Promise<Story[]>;
  getStoryById(id: number): Promise<Story | undefined>;
  getStoriesByCategory(category: string): Promise<Story[]>;
  searchStories(query: string): Promise<Story[]>;
  createStory(story: InsertStory): Promise<Story>;
  
  getAllDeities(): Promise<Deity[]>;
  getDeityById(id: number): Promise<Deity | undefined>;
  createDeity(deity: InsertDeity): Promise<Deity>;
  
  getAllEpics(): Promise<Epic[]>;
  getEpicById(id: number): Promise<Epic | undefined>;
  createEpic(epic: InsertEpic): Promise<Epic>;
  
  // Quiz methods
  getAllQuizzes(): Promise<Quiz[]>;
  getQuizById(id: number): Promise<Quiz | undefined>;
  getQuizzesByCategory(category: string): Promise<Quiz[]>;
  getQuizzesByDifficulty(difficulty: string): Promise<Quiz[]>;
  createQuiz(quiz: InsertQuiz): Promise<Quiz>;
  
  // Quiz Question methods
  getQuestionsByQuizId(quizId: number): Promise<QuizQuestion[]>;
  getQuestionById(id: number): Promise<QuizQuestion | undefined>;
  createQuizQuestion(question: InsertQuizQuestion): Promise<QuizQuestion>;
  
  // User Preferences methods
  getUserPreferences(userId: number): Promise<UserPreference | undefined>;
  createUserPreference(preference: InsertUserPreference): Promise<UserPreference>;
  updateUserPreference(id: number, preference: Partial<InsertUserPreference>): Promise<UserPreference | undefined>;
  
  // Story Interactions methods
  getStoryInteractionsByUser(userId: number): Promise<StoryInteraction[]>;
  getStoryInteractionsByStory(storyId: number): Promise<StoryInteraction[]>;
  createStoryInteraction(interaction: InsertStoryInteraction): Promise<StoryInteraction>;
  
  // Related Stories methods
  getRelatedStories(storyId: number): Promise<RelatedStory[]>;
  createRelatedStory(relation: InsertRelatedStory): Promise<RelatedStory>;
  
  // Recommendation methods
  getRecommendedStories(userId: number, limit?: number): Promise<Story[]>;
  
  // Bookmark methods
  getUserBookmarks(userId: number): Promise<Bookmark[]>;
  createBookmark(bookmark: InsertBookmark): Promise<Bookmark>;
  deleteBookmark(id: number): Promise<boolean>;
  
  // Glossary methods
  getAllGlossaryTerms(): Promise<GlossaryTerm[]>;
  getGlossaryTermsByCategory(category: string): Promise<GlossaryTerm[]>;
  getGlossaryTermByTerm(term: string): Promise<GlossaryTerm | undefined>;
  createGlossaryTerm(term: InsertGlossaryTerm): Promise<GlossaryTerm>;
  
  // Character Relationship methods
  getCharacterRelationships(characterId: number): Promise<CharacterRelationship[]>;
  createCharacterRelationship(relationship: InsertCharacterRelationship): Promise<CharacterRelationship>;
  
  // Story Element methods
  getStoryElements(storyId: number): Promise<StoryElement[]>;
  createStoryElement(element: InsertStoryElement): Promise<StoryElement>;
  
  // Audio Asset methods
  getAudioAssetsByType(type: string): Promise<AudioAsset[]>;
  getAudioAssetsByMood(mood: string): Promise<AudioAsset[]>;
  createAudioAsset(asset: InsertAudioAsset): Promise<AudioAsset>;
  
  // VR Model methods
  getVRModels(entityType: string, entityId?: number): Promise<VRModel[]>;
  getVRModelById(id: number): Promise<VRModel | undefined>;
  createVRModel(model: InsertVRModel): Promise<VRModel>;
  
  // VR Scene methods
  getAllVRScenes(): Promise<VRScene[]>;
  getFeaturedVRScenes(): Promise<VRScene[]>;
  getVRSceneById(id: number): Promise<VRScene | undefined>;
  getVRScenesByDeity(deity: string): Promise<VRScene[]>;
  getVRScenesByCategory(category: string): Promise<VRScene[]>;
  searchVRScenes(query: string): Promise<VRScene[]>;
  createVRScene(scene: InsertVRScene): Promise<VRScene>;
  
  // Discussion Forum methods
  getAllForums(): Promise<DiscussionForum[]>;
  getForumById(id: number): Promise<DiscussionForum | undefined>;
  getForumsByCategory(category: string): Promise<DiscussionForum[]>;
  createForum(forum: InsertDiscussionForum): Promise<DiscussionForum>;
  
  // Discussion Thread methods
  getThreadsByForumId(forumId: number): Promise<DiscussionThread[]>;
  getThreadById(id: number): Promise<DiscussionThread | undefined>;
  getThreadsByUser(userId: number): Promise<DiscussionThread[]>;
  createThread(thread: InsertDiscussionThread): Promise<DiscussionThread>;
  incrementThreadViewCount(threadId: number): Promise<DiscussionThread>;
  
  // Discussion Comment methods
  getCommentsByThreadId(threadId: number): Promise<DiscussionComment[]>;
  getCommentsByUser(userId: number): Promise<DiscussionComment[]>;
  getCommentReplies(commentId: number): Promise<DiscussionComment[]>;
  createComment(comment: InsertDiscussionComment): Promise<DiscussionComment>;
  
  // User Progress methods
  getUserProgressByStory(userId: number, storyId: number): Promise<UserProgress | undefined>;
  getUserProgressOverview(userId: number): Promise<UserProgress[]>;
  createUserProgress(progress: InsertUserProgress): Promise<UserProgress>;
  updateUserProgress(userId: number, storyId: number, progress: Partial<InsertUserProgress>): Promise<UserProgress | undefined>;
  
  // Achievement methods
  getAllAchievements(): Promise<Achievement[]>;
  getAchievementsByCategory(category: string): Promise<Achievement[]>;
  getAchievementById(id: number): Promise<Achievement | undefined>;
  getUserAchievements(userId: number): Promise<Achievement[]>;
  createAchievement(achievement: InsertAchievement): Promise<Achievement>;
  
  // User Points methods
  getUserPoints(userId: number): Promise<number>; // Total points
  getUserPointsByCategory(userId: number, category: string): Promise<number>;
  createUserPoints(points: InsertUserPoints): Promise<UserPoints>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private storiesMap: Map<number, Story>;
  private deitiesMap: Map<number, Deity>;
  private epicsMap: Map<number, Epic>;
  private quizzesMap: Map<number, Quiz>;
  private questionsMap: Map<number, QuizQuestion>;
  private userPreferencesMap: Map<number, UserPreference>;
  private storyInteractionsMap: Map<number, StoryInteraction>;
  private relatedStoriesMap: Map<number, RelatedStory>;
  private bookmarksMap: Map<number, Bookmark>;
  private glossaryTermsMap: Map<number, GlossaryTerm>;
  private characterRelationshipsMap: Map<number, CharacterRelationship>;
  private storyElementsMap: Map<number, StoryElement>;
  private audioAssetsMap: Map<number, AudioAsset>;
  private vrModelsMap: Map<number, VRModel>;
  private vrScenesMap: Map<number, VRScene>;
  private discussionForumsMap: Map<number, DiscussionForum>;
  private discussionThreadsMap: Map<number, DiscussionThread>;
  private discussionCommentsMap: Map<number, DiscussionComment>;
  private userProgressMap: Map<string, UserProgress>; // key: `${userId}-${storyId}`
  private achievementsMap: Map<number, Achievement>;
  private userPointsMap: Map<number, UserPoints>;
  
  private currentUserId: number;
  private currentStoryId: number;
  private currentDeityId: number;
  private currentEpicId: number;
  private currentQuizId: number;
  private currentQuestionId: number;
  private currentPreferenceId: number;
  private currentInteractionId: number;
  private currentRelatedStoryId: number;
  private currentBookmarkId: number;
  private currentGlossaryTermId: number;
  private currentCharacterRelationshipId: number;
  private currentStoryElementId: number;
  private currentAudioAssetId: number;
  private currentVRModelId: number;
  private currentVRSceneId: number;
  private currentForumId: number;
  private currentThreadId: number;
  private currentCommentId: number;
  private currentProgressId: number;
  private currentAchievementId: number;
  private currentUserPointsId: number;

  constructor() {
    this.users = new Map();
    this.storiesMap = new Map();
    this.deitiesMap = new Map();
    this.epicsMap = new Map();
    this.quizzesMap = new Map();
    this.questionsMap = new Map();
    this.userPreferencesMap = new Map();
    this.storyInteractionsMap = new Map();
    this.relatedStoriesMap = new Map();
    this.bookmarksMap = new Map();
    this.glossaryTermsMap = new Map();
    this.characterRelationshipsMap = new Map();
    this.storyElementsMap = new Map();
    this.audioAssetsMap = new Map();
    this.vrModelsMap = new Map();
    this.vrScenesMap = new Map();
    this.discussionForumsMap = new Map();
    this.discussionThreadsMap = new Map();
    this.discussionCommentsMap = new Map();
    this.userProgressMap = new Map();
    this.achievementsMap = new Map();
    this.userPointsMap = new Map();
    
    this.currentUserId = 1;
    this.currentStoryId = 1;
    this.currentDeityId = 1;
    this.currentEpicId = 1;
    this.currentQuizId = 1;
    this.currentQuestionId = 1;
    this.currentPreferenceId = 1;
    this.currentInteractionId = 1;
    this.currentRelatedStoryId = 1;
    this.currentBookmarkId = 1;
    this.currentGlossaryTermId = 1;
    this.currentCharacterRelationshipId = 1;
    this.currentStoryElementId = 1;
    this.currentAudioAssetId = 1;
    this.currentVRModelId = 1;
    this.currentVRSceneId = 1;
    this.currentForumId = 1;
    this.currentThreadId = 1;
    this.currentCommentId = 1;
    this.currentProgressId = 1;
    this.currentAchievementId = 1;
    this.currentUserPointsId = 1;
    
    // Initialize with sample data
    this.initializeData();
  }

  private initializeData() {
    // Initialize sample forums
    const sampleForums: InsertDiscussionForum[] = [
      {
        title: "Ramayana Discussions",
        description: "Discuss the epic tale of Lord Rama, Sita, and their journey",
        category: "Epics",
        imageUrl: "/images/image5.jpg"
      },
      {
        title: "Krishna's Teachings",
        description: "Explore the philosophical teachings of Lord Krishna in the Bhagavad Gita",
        category: "Philosophy",
        imageUrl: "/assets/Sanatan Dharm _ Jai Shree Krishna _ Kashi….jpg"
      },
      {
        title: "Understanding Symbolism",
        description: "Decode the rich symbolism in Hindu mythology",
        category: "Symbolism",
        imageUrl: "/assets/Pc- @indianguru #ganpati #ganpatibappamorya….jpg"
      }
    ];
    
    sampleForums.forEach(forum => this.createForum(forum));
    
    // Initialize sample forum threads
    const sampleThreads: InsertDiscussionThread[] = [
      {
        forumId: 1,
        title: "Symbolism of Hanuman's Leap",
        content: "What do you think Hanuman's leap across the ocean to Lanka symbolizes in our lives?",
        userId: 1,
        isPinned: true
      },
      {
        forumId: 2,
        title: "Krishna's Advice on Duty",
        content: "How do you interpret Krishna's advice to Arjuna about performing one's duty without attachment to results?",
        userId: 1,
        isPinned: false
      },
      {
        forumId: 3,
        title: "The Four Arms of Vishnu",
        content: "Let's discuss what each of Vishnu's four arms and the items they hold represent.",
        userId: 1,
        isPinned: false
      }
    ];
    
    sampleThreads.forEach(thread => this.createThread(thread));
    
    // Initialize sample comments
    const sampleComments: InsertDiscussionComment[] = [
      {
        threadId: 1,
        content: "I think Hanuman's leap represents overcoming self-doubt and limitations. When Jambavan reminded Hanuman of his powers, it symbolizes how we often forget our own potential.",
        userId: 1
      },
      {
        threadId: 2,
        content: "Krishna's teaching of 'Nishkama Karma' (selfless action) is about finding purpose in the work itself rather than being attached to outcomes. It's a powerful mindset for reducing anxiety.",
        userId: 1
      }
    ];
    
    sampleComments.forEach(comment => this.createComment(comment));
    
    // Initialize sample achievements
    const sampleAchievements: InsertAchievement[] = [
      {
        title: "Ramayana Explorer",
        description: "Completed reading all stories related to Ramayana",
        requiredPoints: 100,
        category: "Reading",
        imageUrl: "/assets/7659eb81-a723-47b0-9f29-fdd172282779.jpg"
      },
      {
        title: "Krishna Devotee",
        description: "Finished all stories about Lord Krishna",
        requiredPoints: 100,
        category: "Reading",
        imageUrl: "/assets/3ea42a6c-3c5d-4ccc-9eb0-9ffc23e3f763.jpg"
      },
      {
        title: "Master of Symbolism",
        description: "Successfully answered all questions about Hindu symbolism",
        requiredPoints: 150,
        category: "Quiz",
        imageUrl: "/assets/c8093efb-b239-42b5-9523-ec6a9fd4c2f7.jpg"
      },
      {
        title: "Community Sage",
        description: "Made 10 thoughtful contributions to discussion forums",
        requiredPoints: 75,
        category: "Community",
        imageUrl: "/assets/Pramod Hegde (@indianguru15) • Photos et vidéos….jpg"
      },
      {
        title: "Epic Warrior",
        description: "Completed the Mahabharata challenge quiz with a perfect score",
        requiredPoints: 200,
        category: "Quiz",
        imageUrl: "/assets/59a2a053-8bd3-4925-b255-15e3a16ea3ff.jpg"
      }
    ];
    
    sampleAchievements.forEach(achievement => this.createAchievement(achievement));
    
    // Initialize with sample stories - we're creating 12 stories to match our grid
    const sampleStories: InsertStory[] = [
      {
        title: "The Story of Ganesha",
        summary: "How Lord Ganesha got his elephant head",
        content: "Ganesha, the elephant-headed god, is one of the most beloved deities in Hinduism. According to mythology, he was created by goddess Parvati out of sandalwood paste and breathed life into him. When Ganesha prevented Shiva from entering his abode, as Parvati was bathing, Shiva in his anger severed Ganesha's head. To appease Parvati's grief, Shiva replaced it with the head of the first creature he found - an elephant. Ganesha is worshipped as the remover of obstacles and the god of wisdom and prosperity.",
        imageUrl: "/images/image1.jpg",
        category: "Ganesh",
        featured: true
      },
      {
        title: "The Churning of the Ocean",
        summary: "How the gods and demons churned the cosmic ocean to obtain the nectar of immortality",
        content: "Known as Samudra Manthan, this tale describes how both gods (devas) and demons (asuras) churned the primordial ocean to obtain amrita, the nectar of immortality. Using the serpent Vasuki as a rope and Mount Mandara as a churning rod, they pulled back and forth. Many treasures emerged: the goddess Lakshmi, the divine elephant Airavata, the wish-fulfilling tree Kalpavriksha, and finally, the physician of gods Dhanvantari appeared with the pot of nectar. The demons seized it, but Vishnu took the form of an enchantress, Mohini, to distract them while the gods drank the nectar, gaining immortality.",
        imageUrl: "/images/image2.jpg",
        category: "Vishnu",
        featured: true
      },
      {
        title: "Durga Slays Mahishasura",
        summary: "The goddess Durga's battle against the buffalo demon",
        content: "Durga, meaning 'the invincible' in Sanskrit, is a powerful goddess in Hindu mythology. She was created from the collective energies of all the gods to defeat Mahishasura, a buffalo demon who had become invincible to male gods due to a boon. With her ten arms carrying various weapons donated by different gods, riding a lion, she battled Mahishasura for nine days. Finally, on the tenth day, she slew him, earning the title Mahishasuramardini (slayer of Mahishasura). This victory is celebrated during the Durga Puja festival.",
        imageUrl: "/images/image3.jpg",
        category: "Devi",
        featured: true
      },
      {
        title: "Krishna Lifting Govardhan",
        summary: "When Krishna lifted a mountain to save his people",
        content: "This story showcases Krishna's divine power. When the people of Vrindavan prepared to worship Indra, the god of rain, Krishna convinced them to worship Mount Govardhan instead. Angered, Indra sent torrential rains to flood Vrindavan. To protect the people and animals, Krishna lifted the entire Govardhan mountain on his little finger, providing shelter for seven days and nights until Indra acknowledged Krishna's divinity and stopped the rains.",
        imageUrl: "/images/image4.jpg",
        category: "Krishna",
        featured: true
      },
      {
        title: "Hanuman's Leap to Lanka",
        summary: "Hanuman's extraordinary journey to find Sita",
        content: "When Rama's wife Sita was abducted by Ravana, Hanuman volunteered to search for her in Lanka. Facing the vast ocean, Hanuman revealed his divine powers, expanding his body to an enormous size. With a mighty leap, he crossed the ocean, overcoming numerous obstacles, including a sea-monster and a demoness. Upon reaching Lanka, Hanuman located Sita in Ashoka Vatika, delivered Rama's message, and set fire to the city before returning with news of her whereabouts.",
        imageUrl: "/images/image5.jpg",
        category: "Ramayana",
        featured: false
      },
      {
        title: "The Birth of Kartikeya",
        summary: "The miraculous origin of the six-headed god of war",
        content: "Kartikeya, also known as Murugan, Skanda or Subrahmanya, was born with a divine purpose - to defeat the demon Tarakasura who could only be killed by Shiva's son. His birth story is unique: Shiva's fiery seed was carried by Agni (fire god) who dropped it into the Ganges. The river carried it to a reed forest where six Krittikas (stars of Pleiades) nurtured the child. Each wanted to mother him, so he developed six heads to be nursed by all of them simultaneously. Later, his mother Parvati embraced him, merging his six bodies into one with six heads.",
        imageUrl: "/images/image6.jpg",
        category: "Shiva",
        featured: false
      },
      {
        title: "Savitri and Satyavan",
        summary: "A woman's determination to save her husband from death",
        content: "Savitri, a princess, chose to marry Satyavan despite knowing through sage Narada that he was destined to die in one year. When Yama, the god of death, came to claim Satyavan's soul, Savitri followed him persistently. Impressed by her devotion and wisdom in their conversation, Yama granted her wishes. Carefully phrasing her requests, Savitri eventually asked for Satyavan to live and have children with her. Bound by his word and moved by her intellect and devotion, Yama restored Satyavan to life.",
        imageUrl: "/images/image7.jpg",
        category: "Mahabharata",
        featured: false
      },
      {
        title: "The Story of Ahalya",
        summary: "The woman turned to stone and redeemed by Rama",
        content: "Ahalya, the beautiful wife of sage Gautama, was tricked by Indra who disguised himself as her husband. When Gautama discovered the deception, he cursed Ahalya to become a stone and Indra to bear a thousand marks resembling female genitalia (later changed to eyes). Ahalya remained a stone for thousands of years until Lord Rama's touch restored her to human form, symbolizing divine forgiveness and redemption.",
        imageUrl: "/images/image8.jpg",
        category: "Ramayana",
        featured: false
      },
      {
        title: "Vishnu's Mohini Avatar",
        summary: "When Vishnu became an enchantress to save the nectar of immortality",
        content: "After the churning of the ocean, when the demons seized the pot of amrita (nectar of immortality), Lord Vishnu transformed into Mohini - a woman of incomparable beauty. Captivated by her charm, the demons agreed to her suggestion to distribute the nectar fairly between them and the gods. While distracting the demons with her alluring dance, Mohini gave all the nectar to the gods, ensuring they alone achieved immortality. This avatar demonstrates Vishnu's ability to use illusion (maya) to restore cosmic balance.",
        imageUrl: "/images/image9.jpg",
        category: "Vishnu",
        featured: false
      },
      {
        title: "Shiva's Tandava",
        summary: "The cosmic dance of destruction and creation",
        content: "Tandava is Lord Shiva's powerful dance that symbolizes the cosmic cycles of creation and destruction. When Shiva performs the Rudra Tandava (angry/destructive dance), it signifies the end of a cosmic cycle. After witnessing his beloved wife Sati sacrifice herself in her father's sacrificial fire, Shiva performed the destructive Tandava while carrying her body, threatening to destroy the universe in his grief. The god Vishnu followed him and gradually cut pieces of Sati's body with his discus to end Shiva's dance, creating sacred sites (Shakti Peethas) wherever the pieces fell.",
        imageUrl: "/images/image10.jpg",
        category: "Shiva",
        featured: false
      },
      {
        title: "The Story of Narasimha",
        summary: "Half-man, half-lion avatar who defeated the demon king",
        content: "When the demon king Hiranyakashipu received a boon that he could not be killed by human, animal, indoors, outdoors, day, night, or by any weapon, he became tyrannical and demanded worship. When his son Prahlada continued to worship Vishnu instead, Hiranyakashipu tried to kill him. To save Prahlada and destroy the demon, Vishnu appeared as Narasimha - half-man, half-lion. At dusk (neither day nor night), Narasimha emerged from a pillar (neither indoors nor outdoors) and tore the demon king apart with his claws (not a weapon) while placing him on his lap (neither earth nor sky).",
        imageUrl: "/images/image11.jpg",
        category: "Vishnu",
        featured: false
      },
      {
        title: "The Descent of Ganga",
        summary: "How the holy river came to Earth",
        content: "King Bhagiratha performed severe penances to bring the celestial river Ganga to Earth to purify the ashes of his ancestors. Lord Brahma agreed to send Ganga down, but her powerful descent would have shattered the Earth. Bhagiratha prayed to Lord Shiva, who agreed to receive the river in his matted locks to break her fall. Shiva channeled Ganga gradually through his hair before she flowed across the plains of India. Following Bhagiratha's chariot, Ganga finally reached the ashes of his ancestors, liberating their souls and becoming one of the holiest rivers, believed to cleanse sins and facilitate spiritual salvation.",
        imageUrl: "/images/image12.jpg",
        category: "Shiva",
        featured: false
      }
    ];

    sampleStories.forEach(story => this.createStory(story));

    // Initialize with sample deities
    const sampleDeities: InsertDeity[] = [
      {
        name: "Vishnu",
        title: "The Preserver",
        imageUrl: "https://images.unsplash.com/photo-1570046811544-a616d99c01ab?w=200&h=200&auto=format&fit=crop"
      },
      {
        name: "Shiva",
        title: "The Destroyer",
        imageUrl: "https://images.unsplash.com/photo-1571281843402-31db9191b11e?w=200&h=200&auto=format&fit=crop"
      },
      {
        name: "Brahma",
        title: "The Creator",
        imageUrl: "https://images.unsplash.com/photo-1564045439346-c11a13d983a3?w=200&h=200&auto=format&fit=crop"
      },
      {
        name: "Lakshmi",
        title: "Goddess of Wealth",
        imageUrl: "https://images.unsplash.com/photo-1595783960554-caf9c4557eca?w=200&h=200&auto=format&fit=crop"
      },
      {
        name: "Ganesha",
        title: "Remover of Obstacles",
        imageUrl: "https://images.unsplash.com/photo-1618224081946-8cdcdcfbce08?w=200&h=200&auto=format&fit=crop"
      },
      {
        name: "Hanuman",
        title: "God of Strength",
        imageUrl: "https://images.unsplash.com/photo-1593853961726-e9d8cdc2494e?w=200&h=200&auto=format&fit=crop"
      }
    ];

    sampleDeities.forEach(deity => this.createDeity(deity));

    // Initialize with sample epics
    const sampleEpics: InsertEpic[] = [
      {
        name: "Ramayana",
        description: "The journey of Prince Rama to rescue his wife Sita from the demon king Ravana with the help of an army of monkeys.",
        imageUrl: "https://images.unsplash.com/photo-1624197119642-767a952a0fe8?w=800&auto=format&fit=crop",
        tags: ["Rama", "Sita", "Hanuman", "Ravana"]
      },
      {
        name: "Mahabharata",
        description: "The epic tale of the Kurukshetra War between the Pandavas and the Kauravas, and the moral dilemmas faced by its characters.",
        imageUrl: "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=800&auto=format&fit=crop",
        tags: ["Krishna", "Arjuna", "Bhishma", "Draupadi"]
      }
    ];

    sampleEpics.forEach(epic => this.createEpic(epic));
    
    // Initialize with sample quizzes
    const sampleQuizzes: InsertQuiz[] = [
      {
        title: "Ramayana Quiz",
        description: "Test your knowledge about the epic tale of Lord Rama",
        category: "Ramayana",
        difficulty: "Medium",
        imageUrl: "/images/image5.jpg"
      },
      {
        title: "Hindu Deities",
        description: "How well do you know the Hindu gods and goddesses?",
        category: "Deities",
        difficulty: "Easy",
        imageUrl: "/images/image1.jpg"
      },
      {
        title: "Mahabharata Challenge",
        description: "Advanced questions about the Kurukshetra War and its characters",
        category: "Mahabharata",
        difficulty: "Hard",
        imageUrl: "/images/image7.jpg"
      }
    ];
    
    sampleQuizzes.forEach(quiz => this.createQuiz(quiz));
    
    // Initialize with sample quiz questions
    const sampleQuestions: InsertQuizQuestion[] = [
      // Ramayana Quiz Questions
      {
        quizId: 1,
        question: "Who is the main protagonist of Ramayana?",
        options: ["Krishna", "Rama", "Shiva", "Hanuman"],
        correctAnswer: "Rama",
        explanation: "Rama, an avatar of Lord Vishnu, is the main protagonist of the Ramayana epic."
      },
      {
        quizId: 1,
        question: "Who abducted Sita in the Ramayana?",
        options: ["Ravana", "Kumbhakarna", "Sugriva", "Vali"],
        correctAnswer: "Ravana",
        explanation: "Ravana, the king of Lanka, abducted Sita to avenge his sister Surpanakha's humiliation."
      },
      {
        quizId: 1,
        question: "Which bird tried to save Sita from being abducted?",
        options: ["Garuda", "Jatayu", "Sampati", "Kakabhushundi"],
        correctAnswer: "Jatayu",
        explanation: "Jatayu, the vulture king, tried to rescue Sita but was fatally wounded by Ravana."
      },
      
      // Hindu Deities Quiz Questions
      {
        quizId: 2,
        question: "Which deity is known as the Remover of Obstacles?",
        options: ["Vishnu", "Ganesha", "Brahma", "Indra"],
        correctAnswer: "Ganesha",
        explanation: "Lord Ganesha is revered as Vighnaharta, the remover of obstacles and the god of beginnings."
      },
      {
        quizId: 2,
        question: "Who is known as the goddess of wealth and prosperity?",
        options: ["Saraswati", "Parvati", "Lakshmi", "Durga"],
        correctAnswer: "Lakshmi",
        explanation: "Goddess Lakshmi is the deity of wealth, fortune, power, and prosperity."
      },
      {
        quizId: 2,
        question: "Which god is depicted with a blue throat?",
        options: ["Vishnu", "Shiva", "Krishna", "Brahma"],
        correctAnswer: "Shiva",
        explanation: "Lord Shiva is known as Neelakantha (blue-throated) after he drank the poison that emerged during the churning of the ocean."
      },
      
      // Mahabharata Challenge Questions
      {
        quizId: 3,
        question: "How many chapters (parvas) are there in the Mahabharata?",
        options: ["12", "18", "24", "36"],
        correctAnswer: "18",
        explanation: "The Mahabharata is divided into 18 parvas or books, each focusing on different aspects of the epic."
      },
      {
        quizId: 3,
        question: "Who was the author of the Mahabharata?",
        options: ["Valmiki", "Vyasa", "Tulsidas", "Kalidasa"],
        correctAnswer: "Vyasa",
        explanation: "Sage Vyasa (Krishna Dwaipayana) compiled and authored the Mahabharata."
      },
      {
        quizId: 3,
        question: "Which character in the Mahabharata was born from fire?",
        options: ["Draupadi", "Karna", "Bhishma", "Arjuna"],
        correctAnswer: "Draupadi",
        explanation: "Draupadi emerged from a yajna (sacrificial fire) performed by her father King Drupada."
      }
    ];
    
    sampleQuestions.forEach(question => this.createQuizQuestion(question));
    
    // Initialize with sample VR scenes
    const sampleVRScenes: InsertVRScene[] = [
      {
        name: "Krishna's Divine Dance",
        description: "Experience the divine dance of Lord Krishna in the celestial realm of Vrindavan",
        details: "In this immersive VR experience, you'll witness the divine Raas Leela of Lord Krishna with the gopis in the magical forests of Vrindavan. Feel the spiritual ecstasy as you're transported to this celestial dance that epitomizes divine love and devotion.",
        imageUrl: "/assets/3ea42a6c-3c5d-4ccc-9eb0-9ffc23e3f763.jpg",
        category: "Krishna",
        deity: "Krishna",
        featured: true,
        difficulty: "beginner"
      },
      {
        name: "Shiva's Cosmic Tandav",
        description: "Witness the cosmic dance of destruction and creation as Lord Shiva performs the Tandav",
        details: "Lord Shiva's Tandav is the cosmic dance that symbolizes the cycles of creation and destruction. In this powerful VR experience, you'll witness the primal energy of the universe as Shiva dances with the damaru in hand, surrounded by cosmic flames.",
        imageUrl: "/assets/01db9f1e-426a-4a75-b533-51ba0951ddb5.jpg",
        category: "Shiva",
        deity: "Shiva",
        featured: true,
        difficulty: "intermediate"
      },
      {
        name: "Hanuman's Leap to Lanka",
        description: "Follow Hanuman as he makes his legendary leap across the ocean to find Sita",
        details: "Experience one of the most iconic moments from the Ramayana - when Hanuman, the mighty devotee of Lord Rama, takes a giant leap across the ocean to Lanka in search of Sita. Feel the exhilaration of the flight and the determination of unwavering devotion.",
        imageUrl: "/assets/7659eb81-a723-47b0-9f29-fdd172282779.jpg",
        category: "Ramayana",
        deity: "Hanuman",
        featured: true,
        difficulty: "beginner"
      },
      {
        name: "Battle of Kurukshetra",
        description: "Experience the epic battle of Kurukshetra from the Mahabharata",
        details: "Immerse yourself in the legendary battlefield of Kurukshetra where the epic war from the Mahabharata took place. Witness the armies of the Pandavas and Kauravas facing each other while Lord Krishna delivers the timeless wisdom of the Bhagavad Gita to Arjuna.",
        imageUrl: "/assets/59a2a053-8bd3-4925-b255-15e3a16ea3ff.jpg",
        category: "Mahabharata",
        deity: "Krishna",
        featured: false,
        difficulty: "advanced"
      },
      {
        name: "Ganesha's Temple",
        description: "Visit a virtual temple dedicated to Lord Ganesha, the remover of obstacles",
        details: "Enter a sacred virtual temple dedicated to Lord Ganesha, where you can explore the intricate architecture, participate in puja rituals, and learn about the symbolism behind the elephant-headed deity's various forms and attributes.",
        imageUrl: "/assets/Pc- @indianguru #ganpati #ganpatibappamorya….jpg",
        category: "Ganesh",
        deity: "Ganesh",
        featured: false,
        difficulty: "beginner"
      }
    ];
    
    sampleVRScenes.forEach(scene => this.createVRScene(scene));
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Story methods
  async getAllStories(): Promise<Story[]> {
    return Array.from(this.storiesMap.values());
  }

  async getFeaturedStories(): Promise<Story[]> {
    return Array.from(this.storiesMap.values()).filter(story => story.featured);
  }

  async getStoryById(id: number): Promise<Story | undefined> {
    return this.storiesMap.get(id);
  }

  async getStoriesByCategory(category: string): Promise<Story[]> {
    return Array.from(this.storiesMap.values()).filter(
      story => story.category.toLowerCase() === category.toLowerCase()
    );
  }

  async searchStories(query: string): Promise<Story[]> {
    const lowercaseQuery = query.toLowerCase();
    return Array.from(this.storiesMap.values()).filter(
      story => 
        story.title.toLowerCase().includes(lowercaseQuery) ||
        story.summary.toLowerCase().includes(lowercaseQuery) ||
        story.content.toLowerCase().includes(lowercaseQuery) ||
        story.category.toLowerCase().includes(lowercaseQuery)
    );
  }

  async createStory(insertStory: InsertStory): Promise<Story> {
    const id = this.currentStoryId++;
    const featured = insertStory.featured === undefined ? null : insertStory.featured;
    const story: Story = { ...insertStory, id, featured };
    this.storiesMap.set(id, story);
    return story;
  }

  // Deity methods
  async getAllDeities(): Promise<Deity[]> {
    return Array.from(this.deitiesMap.values());
  }

  async getDeityById(id: number): Promise<Deity | undefined> {
    return this.deitiesMap.get(id);
  }

  async createDeity(insertDeity: InsertDeity): Promise<Deity> {
    const id = this.currentDeityId++;
    const deity: Deity = { ...insertDeity, id };
    this.deitiesMap.set(id, deity);
    return deity;
  }

  // Epic methods
  async getAllEpics(): Promise<Epic[]> {
    return Array.from(this.epicsMap.values());
  }

  async getEpicById(id: number): Promise<Epic | undefined> {
    return this.epicsMap.get(id);
  }

  async createEpic(insertEpic: InsertEpic): Promise<Epic> {
    const id = this.currentEpicId++;
    const tags = insertEpic.tags === undefined ? null : insertEpic.tags;
    const epic: Epic = { ...insertEpic, id, tags };
    this.epicsMap.set(id, epic);
    return epic;
  }
  
  // Quiz methods
  async getAllQuizzes(): Promise<Quiz[]> {
    return Array.from(this.quizzesMap.values());
  }
  
  async getQuizById(id: number): Promise<Quiz | undefined> {
    return this.quizzesMap.get(id);
  }
  
  async getQuizzesByCategory(category: string): Promise<Quiz[]> {
    return Array.from(this.quizzesMap.values()).filter(
      quiz => quiz.category.toLowerCase() === category.toLowerCase()
    );
  }
  
  async getQuizzesByDifficulty(difficulty: string): Promise<Quiz[]> {
    return Array.from(this.quizzesMap.values()).filter(
      quiz => quiz.difficulty.toLowerCase() === difficulty.toLowerCase()
    );
  }
  
  async createQuiz(insertQuiz: InsertQuiz): Promise<Quiz> {
    const id = this.currentQuizId++;
    const quiz: Quiz = { ...insertQuiz, id };
    this.quizzesMap.set(id, quiz);
    return quiz;
  }
  
  // Quiz Question methods
  async getQuestionsByQuizId(quizId: number): Promise<QuizQuestion[]> {
    return Array.from(this.questionsMap.values()).filter(
      question => question.quizId === quizId
    );
  }
  
  async getQuestionById(id: number): Promise<QuizQuestion | undefined> {
    return this.questionsMap.get(id);
  }
  
  async createQuizQuestion(insertQuestion: InsertQuizQuestion): Promise<QuizQuestion> {
    const id = this.currentQuestionId++;
    // Ensure options is never undefined
    const options = insertQuestion.options || null;
    const explanation = insertQuestion.explanation || null;
    const question: QuizQuestion = { 
      ...insertQuestion, 
      id, 
      options,
      explanation
    };
    this.questionsMap.set(id, question);
    return question;
  }

  // User Preferences methods
  async getUserPreferences(userId: number): Promise<UserPreference | undefined> {
    const allPreferences = Array.from(this.userPreferencesMap.values());
    return allPreferences.find(pref => pref.userId === userId);
  }

  async createUserPreference(preference: InsertUserPreference): Promise<UserPreference> {
    const id = this.currentPreferenceId++;
    // Ensure arrays are never undefined
    const preferredCategories = preference.preferredCategories || [];
    const preferenceTags = preference.preferenceTags || [];
    const userPreference: UserPreference = {
      ...preference,
      id,
      preferredCategories,
      preferenceTags,
      lastUpdated: new Date()
    };
    this.userPreferencesMap.set(id, userPreference);
    return userPreference;
  }

  async updateUserPreference(id: number, preference: Partial<InsertUserPreference>): Promise<UserPreference | undefined> {
    const existing = this.userPreferencesMap.get(id);
    if (!existing) return undefined;

    const updated: UserPreference = {
      ...existing,
      ...preference,
      lastUpdated: new Date()
    };
    this.userPreferencesMap.set(id, updated);
    return updated;
  }

  // Story Interactions methods
  async getStoryInteractionsByUser(userId: number): Promise<StoryInteraction[]> {
    const allInteractions = Array.from(this.storyInteractionsMap.values());
    return allInteractions.filter(interaction => interaction.userId === userId);
  }

  async getStoryInteractionsByStory(storyId: number): Promise<StoryInteraction[]> {
    const allInteractions = Array.from(this.storyInteractionsMap.values());
    return allInteractions.filter(interaction => interaction.storyId === storyId);
  }

  async createStoryInteraction(interaction: InsertStoryInteraction): Promise<StoryInteraction> {
    const id = this.currentInteractionId++;
    const storyInteraction: StoryInteraction = {
      ...interaction,
      id,
      timestamp: new Date()
    };
    this.storyInteractionsMap.set(id, storyInteraction);
    return storyInteraction;
  }

  // Related Stories methods
  async getRelatedStories(storyId: number): Promise<RelatedStory[]> {
    const allRelated = Array.from(this.relatedStoriesMap.values());
    return allRelated.filter(relation => relation.storyId === storyId);
  }

  async createRelatedStory(relation: InsertRelatedStory): Promise<RelatedStory> {
    const id = this.currentRelatedStoryId++;
    const relatedStory: RelatedStory = {
      ...relation,
      id
    };
    this.relatedStoriesMap.set(id, relatedStory);
    return relatedStory;
  }

  // Recommendation methods
  async getRecommendedStories(userId: number, limit: number = 5): Promise<Story[]> {
    // 1. Get user preferences
    const userPrefs = await this.getUserPreferences(userId);
    
    // 2. Get user's story interactions
    const interactions = await this.getStoryInteractionsByUser(userId);
    
    // 3. Start with all stories
    let candidates = Array.from(this.storiesMap.values());
    
    // 4. Filter out stories the user has already interacted with
    const interactedStoryIds = new Set(interactions.map(i => i.storyId));
    candidates = candidates.filter(story => !interactedStoryIds.has(story.id));
    
    // 5. If we have user preferences, prioritize by category and tags
    if (userPrefs) {
      // Sort by preferred categories
      candidates.sort((a, b) => {
        const aInPreferred = userPrefs.preferredCategories?.includes(a.category) ? 1 : 0;
        const bInPreferred = userPrefs.preferredCategories?.includes(b.category) ? 1 : 0;
        return bInPreferred - aInPreferred;
      });
    }
    
    // 6. Return the top N stories
    return candidates.slice(0, limit);
  }

  // Bookmark methods
  async getUserBookmarks(userId: number): Promise<Bookmark[]> {
    return Array.from(this.bookmarksMap.values())
      .filter(bookmark => bookmark.userId === userId);
  }

  async createBookmark(bookmark: InsertBookmark): Promise<Bookmark> {
    const id = ++this.currentBookmarkId;
    const newBookmark: Bookmark = { 
      ...bookmark, 
      id,
      createdAt: new Date(),
      notes: bookmark.notes || null
    };
    this.bookmarksMap.set(id, newBookmark);
    return newBookmark;
  }

  async deleteBookmark(id: number): Promise<boolean> {
    return this.bookmarksMap.delete(id);
  }

  // Glossary methods
  async getAllGlossaryTerms(): Promise<GlossaryTerm[]> {
    return Array.from(this.glossaryTermsMap.values());
  }

  async getGlossaryTermsByCategory(category: string): Promise<GlossaryTerm[]> {
    return Array.from(this.glossaryTermsMap.values())
      .filter(term => term.category === category);
  }

  async getGlossaryTermByTerm(term: string): Promise<GlossaryTerm | undefined> {
    return Array.from(this.glossaryTermsMap.values())
      .find(t => t.term.toLowerCase() === term.toLowerCase());
  }

  async createGlossaryTerm(term: InsertGlossaryTerm): Promise<GlossaryTerm> {
    const id = ++this.currentGlossaryTermId;
    const newTerm: GlossaryTerm = { 
      ...term, 
      id, 
      category: term.category || null,
      relatedTerms: term.relatedTerms || null
    };
    this.glossaryTermsMap.set(id, newTerm);
    return newTerm;
  }

  // Character Relationship methods
  async getCharacterRelationships(characterId: number): Promise<CharacterRelationship[]> {
    return Array.from(this.characterRelationshipsMap.values())
      .filter(rel => rel.character1Id === characterId || rel.character2Id === characterId);
  }

  async createCharacterRelationship(relationship: InsertCharacterRelationship): Promise<CharacterRelationship> {
    const id = ++this.currentCharacterRelationshipId;
    const newRelationship: CharacterRelationship = { ...relationship, id };
    this.characterRelationshipsMap.set(id, newRelationship);
    return newRelationship;
  }

  // Story Element methods
  async getStoryElements(storyId: number): Promise<StoryElement[]> {
    return Array.from(this.storyElementsMap.values())
      .filter(element => element.storyId === storyId);
  }

  async createStoryElement(element: InsertStoryElement): Promise<StoryElement> {
    const id = ++this.currentStoryElementId;
    const newElement: StoryElement = { 
      ...element, 
      id,
      imageUrl: element.imageUrl || null,
      position: element.position || {}
    };
    this.storyElementsMap.set(id, newElement);
    return newElement;
  }

  // Audio Asset methods
  async getAudioAssetsByType(type: string): Promise<AudioAsset[]> {
    return Array.from(this.audioAssetsMap.values())
      .filter(asset => asset.type === type);
  }

  async getAudioAssetsByMood(mood: string): Promise<AudioAsset[]> {
    return Array.from(this.audioAssetsMap.values())
      .filter(asset => asset.mood === mood);
  }

  async createAudioAsset(asset: InsertAudioAsset): Promise<AudioAsset> {
    const id = ++this.currentAudioAssetId;
    const newAsset: AudioAsset = { 
      ...asset, 
      id,
      mood: asset.mood || null
    };
    this.audioAssetsMap.set(id, newAsset);
    return newAsset;
  }

  // VR Model methods
  async getVRModels(entityType: string, entityId?: number): Promise<VRModel[]> {
    return Array.from(this.vrModelsMap.values())
      .filter(model => {
        if (entityId) {
          return model.entityType === entityType && model.associatedEntityId === entityId;
        }
        return model.entityType === entityType;
      });
  }

  async getVRModelById(id: number): Promise<VRModel | undefined> {
    return this.vrModelsMap.get(id);
  }

  async createVRModel(model: InsertVRModel): Promise<VRModel> {
    const id = ++this.currentVRModelId;
    const newModel: VRModel = { ...model, id };
    this.vrModelsMap.set(id, newModel);
    return newModel;
  }
  
  // VR Scene methods
  async getAllVRScenes(): Promise<VRScene[]> {
    return Array.from(this.vrScenesMap.values());
  }
  
  async getFeaturedVRScenes(): Promise<VRScene[]> {
    return Array.from(this.vrScenesMap.values())
      .filter(scene => scene.featured);
  }
  
  async getVRSceneById(id: number): Promise<VRScene | undefined> {
    return this.vrScenesMap.get(id);
  }
  
  async getVRScenesByDeity(deity: string): Promise<VRScene[]> {
    return Array.from(this.vrScenesMap.values())
      .filter(scene => scene.deity === deity);
  }
  
  async getVRScenesByCategory(category: string): Promise<VRScene[]> {
    return Array.from(this.vrScenesMap.values())
      .filter(scene => scene.category === category);
  }
  
  async searchVRScenes(query: string): Promise<VRScene[]> {
    const lowerQuery = query.toLowerCase();
    return Array.from(this.vrScenesMap.values())
      .filter(scene => 
        scene.name.toLowerCase().includes(lowerQuery) ||
        scene.description.toLowerCase().includes(lowerQuery) ||
        scene.details.toLowerCase().includes(lowerQuery)
      );
  }
  
  async createVRScene(scene: InsertVRScene): Promise<VRScene> {
    const id = ++this.currentVRSceneId;
    const featured = scene.featured === undefined ? null : scene.featured;
    const difficulty = scene.difficulty || null;
    const relatedStoryId = scene.relatedStoryId || null;
    const duration = scene.duration || null;
    const modelId = scene.modelId || null;
    
    const newScene: VRScene = { 
      ...scene, 
      id,
      featured,
      difficulty,
      relatedStoryId,
      duration,
      modelId
    };
    this.vrScenesMap.set(id, newScene);
    return newScene;
  }
  
  // Discussion Forum methods
  async getAllForums(): Promise<DiscussionForum[]> {
    return Array.from(this.discussionForumsMap.values());
  }
  
  async getForumById(id: number): Promise<DiscussionForum | undefined> {
    return this.discussionForumsMap.get(id);
  }
  
  async getForumsByCategory(category: string): Promise<DiscussionForum[]> {
    return Array.from(this.discussionForumsMap.values())
      .filter(forum => forum.category.toLowerCase() === category.toLowerCase());
  }
  
  async createForum(forum: InsertDiscussionForum): Promise<DiscussionForum> {
    const id = ++this.currentForumId;
    const now = new Date();
    const newForum: DiscussionForum = {
      ...forum,
      id,
      createdAt: now,
      updatedAt: now,
      imageUrl: forum.imageUrl || null,
      isActive: forum.isActive !== undefined ? forum.isActive : true
    };
    this.discussionForumsMap.set(id, newForum);
    return newForum;
  }
  
  // Discussion Thread methods
  async getThreadsByForumId(forumId: number): Promise<DiscussionThread[]> {
    return Array.from(this.discussionThreadsMap.values())
      .filter(thread => thread.forumId === forumId);
  }
  
  async getThreadById(id: number): Promise<DiscussionThread | undefined> {
    return this.discussionThreadsMap.get(id);
  }
  
  async getThreadsByUser(userId: number): Promise<DiscussionThread[]> {
    return Array.from(this.discussionThreadsMap.values())
      .filter(thread => thread.userId === userId);
  }
  
  async createThread(thread: InsertDiscussionThread): Promise<DiscussionThread> {
    const id = ++this.currentThreadId;
    const now = new Date();
    const newThread: DiscussionThread = {
      ...thread,
      id,
      createdAt: now,
      updatedAt: now,
      viewCount: 0,
      lastActivityAt: now,
      isPinned: thread.isPinned || false
    };
    this.discussionThreadsMap.set(id, newThread);
    return newThread;
  }
  
  async incrementThreadViewCount(threadId: number): Promise<DiscussionThread> {
    const thread = await this.getThreadById(threadId);
    if (!thread) {
      throw new Error(`Thread with ID ${threadId} not found`);
    }
    
    const updatedThread = {
      ...thread,
      viewCount: thread.viewCount + 1
    };
    this.discussionThreadsMap.set(threadId, updatedThread);
    return updatedThread;
  }
  
  // Discussion Comment methods
  async getCommentsByThreadId(threadId: number): Promise<DiscussionComment[]> {
    return Array.from(this.discussionCommentsMap.values())
      .filter(comment => comment.threadId === threadId);
  }
  
  async getCommentsByUser(userId: number): Promise<DiscussionComment[]> {
    return Array.from(this.discussionCommentsMap.values())
      .filter(comment => comment.userId === userId);
  }
  
  async getCommentReplies(commentId: number): Promise<DiscussionComment[]> {
    return Array.from(this.discussionCommentsMap.values())
      .filter(comment => comment.parentCommentId === commentId);
  }
  
  async createComment(comment: InsertDiscussionComment): Promise<DiscussionComment> {
    const id = ++this.currentCommentId;
    const now = new Date();
    const newComment: DiscussionComment = {
      ...comment,
      id,
      createdAt: now,
      updatedAt: now,
      isEdited: false,
      parentCommentId: comment.parentCommentId || null
    };
    this.discussionCommentsMap.set(id, newComment);
    
    // Update thread's lastActivityAt
    const thread = await this.getThreadById(comment.threadId);
    if (thread) {
      const updatedThread = {
        ...thread,
        lastActivityAt: now,
        updatedAt: now
      };
      this.discussionThreadsMap.set(thread.id, updatedThread);
    }
    
    return newComment;
  }
  
  // User Progress methods
  async getUserProgressByStory(userId: number, storyId: number): Promise<UserProgress | undefined> {
    const key = `${userId}-${storyId}`;
    return this.userProgressMap.get(key);
  }
  
  async getUserProgressOverview(userId: number): Promise<UserProgress[]> {
    return Array.from(this.userProgressMap.values())
      .filter(progress => progress.userId === userId);
  }
  
  async createUserProgress(progress: InsertUserProgress): Promise<UserProgress> {
    const id = ++this.currentProgressId;
    const now = new Date();
    const key = `${progress.userId}-${progress.storyId}`;
    
    const newProgress: UserProgress = {
      ...progress,
      id,
      lastAccessedAt: now,
      completedAt: null,
      progress: progress.progress || 0,
      currentChapter: progress.currentChapter || 1,
      achievementsUnlocked: progress.achievementsUnlocked || []
    };
    
    this.userProgressMap.set(key, newProgress);
    return newProgress;
  }
  
  async updateUserProgress(
    userId: number, 
    storyId: number, 
    progressUpdate: Partial<InsertUserProgress>
  ): Promise<UserProgress | undefined> {
    const key = `${userId}-${storyId}`;
    const existingProgress = this.userProgressMap.get(key);
    
    if (!existingProgress) {
      return undefined;
    }
    
    const now = new Date();
    let completedAt = existingProgress.completedAt;
    
    // Set completedAt if progress is 100%
    if (progressUpdate.progress === 100 && !completedAt) {
      completedAt = now;
    }
    
    const updatedProgress: UserProgress = {
      ...existingProgress,
      ...progressUpdate,
      lastAccessedAt: now,
      completedAt
    };
    
    this.userProgressMap.set(key, updatedProgress);
    return updatedProgress;
  }
  
  // Achievement methods
  async getAllAchievements(): Promise<Achievement[]> {
    return Array.from(this.achievementsMap.values());
  }
  
  async getAchievementsByCategory(category: string): Promise<Achievement[]> {
    return Array.from(this.achievementsMap.values())
      .filter(achievement => achievement.category.toLowerCase() === category.toLowerCase());
  }
  
  async getAchievementById(id: number): Promise<Achievement | undefined> {
    return this.achievementsMap.get(id);
  }
  
  async getUserAchievements(userId: number): Promise<Achievement[]> {
    // Get all user progress entries
    const userProgressEntries = await this.getUserProgressOverview(userId);
    
    // Extract all achievement IDs from user progress
    const achievementIds: number[] = [];
    userProgressEntries.forEach(progress => {
      if (progress.achievementsUnlocked && progress.achievementsUnlocked.length > 0) {
        progress.achievementsUnlocked.forEach(id => {
          if (!achievementIds.includes(Number(id))) {
            achievementIds.push(Number(id));
          }
        });
      }
    });
    
    // Get achievement details for each ID
    const achievements: Achievement[] = [];
    for (const id of achievementIds) {
      const achievement = await this.getAchievementById(id);
      if (achievement) {
        achievements.push(achievement);
      }
    }
    
    return achievements;
  }
  
  async createAchievement(achievement: InsertAchievement): Promise<Achievement> {
    const id = ++this.currentAchievementId;
    const newAchievement: Achievement = {
      ...achievement,
      id,
      imageUrl: achievement.imageUrl || null,
      relatedStoryId: achievement.relatedStoryId || null,
      isSecret: achievement.isSecret !== undefined ? achievement.isSecret : false
    };
    this.achievementsMap.set(id, newAchievement);
    return newAchievement;
  }
  
  // User Points methods
  async getUserPoints(userId: number): Promise<number> {
    // Calculate total points from all categories
    const userPointsEntries = Array.from(this.userPointsMap.values())
      .filter(entry => entry.userId === userId);
    
    return userPointsEntries.reduce((total, entry) => total + entry.points, 0);
  }
  
  async getUserPointsByCategory(userId: number, category: string): Promise<number> {
    // Calculate points for a specific category
    const userPointsEntries = Array.from(this.userPointsMap.values())
      .filter(entry => 
        entry.userId === userId && 
        entry.category.toLowerCase() === category.toLowerCase()
      );
    
    return userPointsEntries.reduce((total, entry) => total + entry.points, 0);
  }
  
  async createUserPoints(points: InsertUserPoints): Promise<UserPoints> {
    const id = ++this.currentUserPointsId;
    const now = new Date();
    
    const newPoints: UserPoints = {
      ...points,
      id,
      earnedAt: now,
      points: points.points || 0,
      relatedEntityId: points.relatedEntityId || null,
      relatedEntityType: points.relatedEntityType || null
    };
    
    this.userPointsMap.set(id, newPoints);
    return newPoints;
  }
}

export const storage = new MemStorage();
