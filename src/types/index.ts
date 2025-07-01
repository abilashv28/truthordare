export type Category = "normal" | "teenage" | "spicy";
export type GameMode = "truth" | "dare" | null;
export type ViewType = "game" | "blog";

export interface QuestionData {
  truths: string[];
  dares: string[];
}

export interface QuestionsCollection {
  normal: QuestionData;
  teenage: QuestionData;
  spicy: QuestionData;
}

export interface BottleSpinnerProps {
  spinning: boolean;
  onSpin: () => void;
  angle: number;
  player1?: string;
  player2?: string;
  allPlayers?: string[];
}

export type { BlogPost } from './blog';
