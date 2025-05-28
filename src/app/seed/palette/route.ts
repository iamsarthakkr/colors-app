import { NextResponse } from "next/server";
import { generatePalettes } from "@/utils/seed/seedPalettes";

export function GET() {
	generatePalettes();
	return NextResponse.json({message: "Formatted"});
};
