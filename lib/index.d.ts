import * as sanity from 'sanity';

declare const hero: {
    type: "object";
    name: "hero";
} & Omit<sanity.ObjectDefinition, "preview"> & {
    preview?: sanity.PreviewConfig<{
        photo: string;
        content: string;
    }, Record<"photo" | "content", any>> | undefined;
};

export { hero };
