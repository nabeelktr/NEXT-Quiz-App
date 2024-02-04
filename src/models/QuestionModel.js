import mongoose  from "mongoose";

const questionSchema = new mongoose.Schema({
    question: {
      type: String,
      required: true,
    },
    answerOptions: [
      {
        answer: {
          type: String,
          required: true,
        },
        isCorrect: {
          type: Boolean,
          default: false,
        },
      },
    ],
  });

  const Question = mongoose.models.questions || mongoose.model("questions", questionSchema);

export default Question;