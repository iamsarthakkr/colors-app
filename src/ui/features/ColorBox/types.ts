import { MenuItem } from "@/ui/components/ContextMenu";
import { IBaseColor } from "@/types/palette";

export type ColorBoxContextItemsProvider = (color?: IBaseColor) => MenuItem[];
