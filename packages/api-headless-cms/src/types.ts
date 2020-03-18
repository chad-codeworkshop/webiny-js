import { GraphQLSchemaModule } from "apollo-graphql";
import {
    GraphQLContext as APIGraphQLContext,
    GraphQLFieldResolver,
    Plugin
} from "@webiny/api/types";
import { GraphQLContext as I18NContext } from "@webiny/api-i18n/types";
import { GraphQLContext as CommodoContext } from "@webiny/api-plugin-commodo-db-proxy/types";

export type CmsLocalizedModelFieldValue<T> = {
    locale: string;
    value: T;
};

export type GraphQLContext = {
    cms: {
        type: string;
        environment: string;
    };
};

/**
 * This combines all contexts used in the CMS into a single type.
 */
export type CmsGraphQLContext = APIGraphQLContext & I18NContext & CommodoContext & GraphQLContext;

export type CmsModelFieldValue<T> = {
    values: CmsLocalizedModelFieldValue<T>[];
};

export type CmsFieldValidation = {
    name: string;
    message: CmsModelFieldValue<string>;
    settings: { [key: string]: any };
};

export type CmsModelField = {
    _id: string;
    label: CmsModelFieldValue<string>;
    type: string;
    fieldId: string;
    localization: boolean;
    unique: boolean;
    validation: CmsFieldValidation[];
    settings?: { [key: string]: any };
};

export type CmsModelFieldValidatorPlugin = Plugin & {
    type: "cms-model-field-validator";
    validator: {
        name: string;
        validate(params: {
            value: any;
            validator: CmsFieldValidation;
            context: CmsGraphQLContext;
        }): Promise<boolean>;
    };
};

export type CmsModelFieldPatternValidatorPlugin = Plugin & {
    type: "cms-model-field-validator-pattern";
    pattern: {
        name: string;
        regex: string;
        flags: string;
    };
};

export type CmsModel = {
    title: string;
    description: string;
    modelId: string;
    fields: CmsModelField[];
};

export type CmsModelFieldToCommodoFieldPlugin<TContext = CmsGraphQLContext> = Plugin & {
    type: "cms-model-field-to-commodo-field";
    fieldType: string;
    isSortable: boolean;
    dataModel(params: {
        context: TContext;
        model: Function;
        field: CmsModelField;
        validation(value): Promise<boolean>;
    }): void;
    searchModel?(params: {
        context: TContext;
        model: Function;
        field: CmsModelField;
        validation?(value): Promise<boolean>;
    }): void;
};

export type CmsModelFieldToGraphQLPlugin = Plugin & {
    type: "cms-model-field-to-graphql";
    isSortable: boolean;
    fieldType: string;
    read: {
        createGetFilters?(params: { model: CmsModel; field: CmsModelField }): string;
        createListFilters?(params: { model: CmsModel; field: CmsModelField }): string;
        createTypeField(params: { model: CmsModel; field: CmsModelField }): string;
        createResolver(params: {
            models: CmsModel[];
            model: CmsModel;
            field: CmsModelField;
        }): GraphQLFieldResolver;
    };
    manage: {
        createListFilters?(params: { model: CmsModel; field: CmsModelField }): string;
        createSchema?(params: { models: CmsModel[]; model: CmsModel }): GraphQLSchemaModule;
        createTypeField(params: { model: CmsModel; field: CmsModelField }): string;
        createInputField(params: { model: CmsModel; field: CmsModelField }): string;
        createResolver(params: {
            models: CmsModel[];
            model: CmsModel;
            field: CmsModelField;
        }): GraphQLFieldResolver;
    };
};

export type CmsFieldTypePlugins = {
    [key: string]: CmsModelFieldToGraphQLPlugin;
};

export type CmsFindFilterOperator = Plugin & {
    type: "cms-find-filter-operator";
    operator: string;
    createCondition(params: {
        fieldId: string;
        field: CmsModelField;
        value: any;
        context: CmsGraphQLContext;
    }): { [key: string]: any };
};
