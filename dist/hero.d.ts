import { ImageObject } from "./image";
export declare const hero: {
    type: "object";
    name: "hero";
} & Omit<import("sanity").ObjectDefinition, "preview"> & {
    preview?: import("sanity").PreviewConfig<{
        image: string;
        content: string;
        type: string;
    }, Record<"image" | "type" | "content", any>> | undefined;
};
export declare const heroQuery: string;
type HeroBase = {
    _type: 'hero';
    _key: string;
    title: string;
    text: string;
    theme: 'light' | 'dark';
    backgroundWidth: 'page' | 'container';
    contentPlacement: 'left' | 'center' | 'right';
};
type HeroWithImage = HeroBase & {
    bgType: 'image';
    image: ImageObject;
};
type HeroWithVideo = HeroBase & {
    bgType: 'video';
    video: {
        _type: 'file';
        _key: string;
        mimeType: `video/${string}`;
        url: string;
    };
};
export type Hero = HeroWithImage | HeroWithVideo;
export {};
