import { defineField } from "sanity";
export declare const customImage: ({ hasDisplayOptions, ...props }?: Partial<{
    type: string;
    name: string;
} & import("sanity").TypeAliasDefinition<string, "string" | "number" | "boolean" | "object" | "array" | "block" | "date" | "datetime" | "document" | "file" | "geopoint" | "image" | "reference" | "crossDatasetReference" | "slug" | "text" | "url" | "email" | undefined> & {
    preview?: import("sanity").PreviewConfig<Record<string, string>, Record<never, any>> | undefined;
} & import("sanity").FieldDefinitionBase> & {
    hasDisplayOptions?: boolean | undefined;
}) => {
    type: "image";
    name: "image";
} & Omit<import("sanity").ImageDefinition, "preview"> & {
    preview?: import("sanity").PreviewConfig<{
        asset: string;
        alt: string;
        customAlt: string;
        customRatio: string;
    }, Record<"customRatio" | "alt" | "asset" | "customAlt", any>> | undefined;
} & import("sanity").FieldDefinitionBase & import("sanity").WidenValidation & import("sanity").WidenInitialValue;
