import { formattSeeds } from "@/utils/seedFromatter";
import { NextResponse } from "next/server";

export function GET() {
	formattSeeds();	
	return NextResponse.json({message: "Formatted"});
};
