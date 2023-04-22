import { PortableTextBlock } from "sanity";
import { ImageObject } from "./image";
export declare const textImage: {
    type: "object";
    name: "text-image";
} & Omit<import("sanity").ObjectDefinition, "preview"> & {
    preview?: import("sanity").PreviewConfig<{
        body: string;
        alignment: string;
        media: string;
    }, Record<"body" | "media" | "alignment", any>> | undefined;
};
export declare const textImageQuery: string;
export type TextImage = {
    _type: 'text-image';
    _key: string;
    body: PortableTextBlock;
    image: ImageObject;
    alignment: 'left' | 'right';
};
