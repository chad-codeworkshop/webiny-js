import { validation } from "@webiny/validation";
import { FbFormFieldValidatorPlugin } from "@webiny/api-form-builder/types";

export default {
    type: "form-field-validator",
    name: "form-field-validator-min-length",
    validator: {
        name: "minLength",
        validate: (value, validator) => {
            const minLengthValue = validator.settings.value;
            if (typeof minLengthValue !== "undefined") {
                return validation.validate(value, `minLength:${minLengthValue}`);
            }
        }
    }
} as FbFormFieldValidatorPlugin;
