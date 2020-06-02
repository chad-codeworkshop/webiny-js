import { CmsEditorFieldTypePlugin } from "@webiny/app-headless-cms/types";
import text from "./text";
import longText from "./longText";
import number from "./number";
import boolean from "./boolean";
import dateTime from "./dateTime";
import richText from "./richText";
import ref from "./ref";

const plugins: CmsEditorFieldTypePlugin[] = [text, number, boolean, dateTime, richText, longText, ref];

export default plugins;
