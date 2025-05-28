import { NextResponse } from "next/server";
import { formattSeeds } from "@/utils/seed/seedFormatter";

export function GET() {
	formattSeeds();	
	return NextResponse.json({message: "Formatted"});
};
