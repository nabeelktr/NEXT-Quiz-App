import { connect } from "@/dbConfig/dbConfig";
import Question from "@/models/QuestionModel";
import { NextRequest, NextResponse } from "next/server";
connect();

export async function GET(request: Request) {
  const questions = await Question.find();
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
