import React from "react";

const QuizContext = React.createContext({
    language: "English",mode: "light",
    changeLanguage: () => {},changeMode: () => {},
    selectCategoryType : () => {}, selectCategory : () => {}, selectLevel : () => {},
     categoryType: '', category: '', level: '', selectedAnswers: [],
     scoreBoard: [],addScoreBoardContext: () => {}, updateScoreBoard: () => {},
     addSelectedAnswers : () => {},clearSelectedAnswer: () => {},
    levels: [{levelId: 'EASY',level : 'Easy'}, {levelId: 'MEDIUM',level : 'Medium'},{levelId: 'HARD',level : 'Hard'}],
    categories : [
        {
          categoryTypeId: "GENERAL_KNOWLEDGE",
          categoryType: "General Knowledge",
          subcategories: [
            { categoryId: "HISTORY", category: "History" },
            { categoryId: "GEOGRAPHY", category: "Geography" },
            { categoryId: "SCIENCE", category: "Science" },
            { categoryId: "MATHEMATICS", category: "Mathematics" },
            { categoryId: "TECHNOLOGY", category: "Technology & IT" },
            { categoryId: "CURRENT_AFFAIRS", category: "Current Affairs" },
          ],
        },
        {
          categoryTypeId: "ENTERTAINMENT",
          categoryType: "Entertainment",
          subcategories: [
            { categoryId: "MOVIES_TV", category: "Movies & TV Shows" },
            { categoryId: "MUSIC", category: "Music" },
            { categoryId: "ANIME_MANGA", category: "Anime & Manga" },
            { categoryId: "CARTOONS_COMICS", category: "Cartoons & Comics" },
            { categoryId: "VIDEO_GAMES", category: "Video Games" },
            { categoryId: "CELEBRITIES", category: "Celebrities & Influencers" },
          ],
        },
        {
          categoryTypeId: "SPORTS",
          categoryType: "Sports",
          subcategories: [
            { categoryId: "FOOTBALL", category: "Football (Soccer)" },
            { categoryId: "CRICKET", category: "Cricket" },
            { categoryId: "BASKETBALL", category: "Basketball" },
            { categoryId: "OLYMPICS", category: "Olympics & Sports Trivia" },
          ],
        },
        {
          categoryTypeId: "EDUCATION",
          categoryType: "Education & Learning",
          subcategories: [
            { categoryId: "VOCABULARY", category: "Vocabulary & Spelling" },
            { categoryId: "LOGICAL_REASONING", category: "Logical Reasoning & Puzzles" },
            { categoryId: "PROGRAMMING", category: "Programming & Coding" },
            { categoryId: "PHYSICS_CHEMISTRY", category: "Physics & Chemistry" },
          ],
        },
        {
          categoryTypeId: "FUN_RANDOM",
          categoryType: "Fun & Random",
          subcategories: [
            { categoryId: "FOOD_COOKING", category: "Food & Cooking" },
            { categoryId: "MYTHOLOGY", category: "Mythology" },
            { categoryId: "HORROR", category: "Horror & Paranormal" },
            { categoryId: "DISNEY", category: "Disney & Pixar" },
            { categoryId: "TRAVEL", category: "Travel & World Culture" },
            { categoryId: "SPACE", category: "Space & Astronomy" },
            { categoryId: "CARS", category: "Cars & Automobiles" },
            { categoryId: "BRAIN_TEASERS", category: "Brain Teasers & Riddles" },
          ],
        },
      ],
      quizQuestions : []

});


export default QuizContext;

