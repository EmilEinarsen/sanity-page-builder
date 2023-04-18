export declare const textImage: {
    type: "object";
    name: "text-image";
} & Omit<import("sanity").ObjectDefinition, "preview"> & {
    preview?: import("sanity").PreviewConfig<{
        body: string;
        alignment: string;
        media: string;
    }, Record<"body" | "alignment" | "media", any>> | undefined;
};
