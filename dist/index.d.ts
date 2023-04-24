import * as sanity from 'sanity';
import { PortableTextBlock } from 'sanity';
import { SanityImageObject } from '@sanity/image-url/lib/types/types';

declare const image: {
    type: "image";
    name: "image";
} & Omit<sanity.ImageDefinition, "preview"> & {
    preview?: sanity.PreviewConfig<{
        asset: string;
        alt: string;
        customAlt: string;
        customRatio: string;
    }, Record<"customRatio" | "alt" | "asset" | "customAlt", any>> | undefined;
} & sanity.FieldDefinitionBase & sanity.WidenValidation & sanity.WidenInitialValue;
declare const imageQuery: string;
type ImageObject = SanityImageObject & {
    id: string;
    alt: string;
    src: string;
    type: 'image/svg+xml' | 'image/jpeg';
    aspectRatio: number;
    lqip: string;
};

declare const hero: {
    type: "object";
    name: "hero";
} & Omit<sanity.ObjectDefinition, "preview"> & {
    preview?: sanity.PreviewConfig<{
        image: string;
        content: string;
        type: string;
    }, Record<"image" | "type" | "content", any>> | undefined;
};
declare const heroQuery: string;
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
type Hero = HeroWithImage | HeroWithVideo;

declare const textImage: {
    type: "object";
    name: "text-image";
} & Omit<sanity.ObjectDefinition, "preview"> & {
    preview?: sanity.PreviewConfig<{
        body: string;
        alignment: string;
        media: string;
    }, Record<"body" | "media" | "alignment", any>> | undefined;
};
declare const textImageQuery: string;
type TextImage = {
    _type: 'text-image';
    _key: string;
    body: PortableTextBlock;
    image: ImageObject;
    alignment: 'left' | 'right';
};

declare const hej = "hej";

export { Hero, ImageObject, TextImage, hej, hero, heroQuery, image, imageQuery, textImage, textImageQuery };
