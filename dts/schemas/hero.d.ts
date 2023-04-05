export declare const hero: {
    type: "object";
    name: "hero";
} & Omit<import("sanity").ObjectDefinition, "preview"> & {
    preview?: import("sanity").PreviewConfig<{
        photo: string;
        content: string;
    }, Record<"photo" | "content", any>> | undefined;
};
