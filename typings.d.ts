type Question = {
    id: string;
    text: string;
    type: "multipleChoice" | "trueFalse" | "shortAnswer" | "scale";
    options?: string[]; // Only for multipleChoice
    points: number;
  }

