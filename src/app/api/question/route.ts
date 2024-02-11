import { connect } from "@/dbConfig/dbConfig";
import Question from "@/models/QuestionModel";
import { NextRequest, NextResponse } from "next/server";
connect();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const total  = Number(searchParams.get('total'));
  const difficulty = searchParams.get('difficulty') as string

let questions;
  if(total){
     questions = await Question.aggregate([
    { $sample: { size: total } }
  ]);
}else{
   questions = await Question.find();

}

  return NextResponse.json({
    questions,
  });
}

export async function POST(request: NextRequest) {
  const reqBody = await request.json();
  const newQuestins = new Question(reqBody);
  const saved = await newQuestins.save();
  return NextResponse.json({
    success: true,
  });
}
