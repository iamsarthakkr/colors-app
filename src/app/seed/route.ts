import { formattSeeds } from "@/utils/seedFormatter";
import { NextResponse } from "next/server";

export function GET() {
	formattSeeds();	
	return NextResponse.json({message: "Formatted"});
};
