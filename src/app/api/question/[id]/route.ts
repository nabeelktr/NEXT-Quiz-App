
import { connect } from "@/dbConfig/dbConfig";
import Question from "@/models/QuestionModel";

connect();

export async function DELETE(request : Request, {params}: {
    params : {
        id: string
    }
}){

    const deleted = await Question.findByIdAndDelete(params.id)
    return Response.json("deleted") 


}