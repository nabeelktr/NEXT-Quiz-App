
import { connect } from "@/dbConfig/dbConfig";
import Question from "@/models/QuestionModel";

connect();

export async function DELETE(request : Request, {params}: {
    params : {
        id: string
    }
}){

    // const newQuestins = new Question({
    //     "question": "In the context of databases, what does 'SQL' stand for?",
    //     "answerOptions": [
    //       { "answer": "Structured Language", "isCorrect": false },
    //       { "answer": "Sequential Query Language","isCorrect": false  },
    //       { "answer": "Standard Query Language", "isCorrect": true },
    //       { "answer": "System Question Language","isCorrect": false  }
    //     ]
    //   })
    // const saved = await newQuestins.save()
    return Response.json("deleted") 


}