import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(request : NextRequest){
    try{
        let reqBody = await request.json()
        let {username, password} = reqBody;

        if(username !== "nabeel" || password !== '111'){
            return NextResponse.json({error: 'user does not exist'})
        }
        const tokenData = {
            username,
        }
        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: "1d" })

        const response = NextResponse.json({
            message: "Login successful",
            success: true,
        })

        response.cookies.set("token", token, {
            httpOnly: true, 
            
        })
        return response;

    }catch(error: any){ 

        return NextResponse.json({error: error.message}, {status: 500})
    }
}

