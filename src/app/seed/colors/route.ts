import { NextResponse } from "next/server";
import { generateSeedColors } from "@/utils/seed";

export function GET() {
	generateSeedColors();	
	return NextResponse.json({message: "generated colors"});
};
