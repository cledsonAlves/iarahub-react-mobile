export const calculatePassingProbability = (score: number, questionCount: number) => {
    const baseScore = score * 0.6;
    const consistencyBonus = questionCount >= 10 ? 10 : 0;
    const difficultyAdjustment = 5;
   
    return Math.min(Math.max(
      baseScore + consistencyBonus + difficultyAdjustment, 
      0
    ), 100).toFixed(2);
   };