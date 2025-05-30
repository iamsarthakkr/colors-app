import { NextResponse } from "next/server";
import { generateFamily } from "@/utils/seed";

export function GET() {
	generateFamily();	
	return NextResponse.json({message: "generated colors"});
};
