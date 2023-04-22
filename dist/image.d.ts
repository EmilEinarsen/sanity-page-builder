import { SanityImageObject } from "@sanity/image-url/lib/types/types";
export declare const image: {
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
export declare const imageQuery: string;
export type ImageObject = SanityImageObject & {
    id: string;
    alt: string;
    src: string;
    type: 'image/svg+xml' | 'image/jpeg';
    aspectRatio: number;
    lqip: string;
};
