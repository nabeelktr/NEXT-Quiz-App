import { match } from "assert";
import { NextRequest, NextResponse } from "next/server";


export default function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isPrivatePath = path === "/questions";


  const token = request.cookies.get("token")?.value || "";

  // if(path === '/quiz' && !request.cookies.has('isStarted')){
  //   const response = NextResponse.redirect(new URL("/quiz?isStarted=true", request.nextUrl));
  //   response.cookies.set('isStarted','true')
  //   return response
    
  // }

  // if(path === '/' && request.cookies.has('isStarted')){


  //   return NextResponse.redirect(new URL("/quiz?warning=true", request.nextUrl));
  // }

  if (path === "/instructor" && token) {
    return NextResponse.redirect(new URL("/questions", request.nextUrl));
  }


  if (isPrivatePath && !token) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }
}

export const config = {
  match:[
    '/',
    '/quiz',

  ]
}