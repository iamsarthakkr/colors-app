import { CreateSvgFromPath } from "./SvgIcon";

const HamburgerIconPath = "M5 17h14M5 12h14M5 7h14";
export const HamburgerIcon = CreateSvgFromPath(HamburgerIconPath);

const DeleteIconPath = "M20 7h-2M4 7h2m0 0h12M6 7v11a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7m-9-.5v0A2.5 2.5 0 0 1 11.5 4h1A2.5 2.5 0 0 1 15 6.5v0"
export const DeleteIcon = CreateSvgFromPath(DeleteIconPath);
