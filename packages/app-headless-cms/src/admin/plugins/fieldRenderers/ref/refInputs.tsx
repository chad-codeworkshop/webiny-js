import React from "react";
import { CmsEditorFieldRendererPlugin } from "@webiny/app-headless-cms/types";
import { Input } from "@webiny/ui/Input";
import { i18n } from "@webiny/app/i18n";
import { ReactComponent as DeleteIcon } from "@webiny/app-headless-cms/admin/icons/close.svg";
import DynamicListMultipleValues from "../DynamicListMultipleValues";

const t = i18n.ns("app-headless-cms/admin/fields/ref");

const plugin: CmsEditorFieldRendererPlugin = {
    type: "cms-editor-field-renderer",
    name: "cms-editor-field-renderer-ref-inputs",
    renderer: {
        rendererName: "ref-inputs",
        name: t`Reference Inputs`,
        description: t`Renders a simple list of text inputs.`,
        canUse({ field }) {
            return field.type === "ref" && field.multipleValues && !field.predefinedValues;
        },
        render(props) {
            return (
                <DynamicListMultipleValues {...props}>
                    {({ bind, index }) => (
                        <Input
                            {...bind.index}
                            autoFocus
                            onEnter={() => bind.field.appendValue("")}
                            label={t`Value {number}`({ number: index + 1 })}
                            trailingIcon={
                                index > 0 && {
                                    icon: <DeleteIcon />,
                                    onClick: bind.index.removeValue
                                }
                            }
                        />
                    )}
                </DynamicListMultipleValues>
            );
        }
    }
};

export default plugin;
