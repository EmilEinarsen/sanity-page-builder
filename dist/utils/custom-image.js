"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.customImage = void 0;
const sanity_1 = require("sanity");
const customImage = (_a = {}) => {
    var { hasDisplayOptions = false } = _a, props = __rest(_a, ["hasDisplayOptions"]);
    const crops = [
        { title: 'Original', value: 0 },
        { title: '1 : 1 (square)', value: 1 },
        { title: '5 : 7', value: 0.7142857143 },
        { title: '4 : 6', value: 0.6666666667 },
        { title: '16 : 9', value: 1.7777777778 }
    ];
    return (0, sanity_1.defineField)(Object.assign({ type: 'image', name: 'image', title: 'Image', options: {
            hotspot: true
        }, fields: [
            (0, sanity_1.defineField)({
                title: 'Display Size (aspect ratio)',
                name: 'customRatio',
                type: 'number',
                options: {
                    list: crops,
                },
                /* validation: Rule =>
                    Rule.custom((field, context: any) =>
                        'asset' in context.parent && field === undefined
                            ? 'Required!'
                            : true
                    ), */
                hidden: true
            }),
            {
                title: 'Alternative text',
                name: 'alt',
                type: 'string',
                description: 'Important for SEO and accessiblity.'
            }
        ], preview: {
            select: {
                asset: 'asset',
                alt: 'asset.alt',
                customAlt: 'alt',
                customRatio: 'customRatio'
            },
            prepare: ({ alt, customAlt, customRatio, asset }) => {
                var _a, _b;
                return ({
                    title: (_a = customAlt !== null && customAlt !== void 0 ? customAlt : alt) !== null && _a !== void 0 ? _a : '(alt text missing)',
                    subtitle: (_b = crops.find(crop => crop.value === customRatio)) === null || _b === void 0 ? void 0 : _b.title,
                    media: asset
                });
            }
        } }, props));
};
exports.customImage = customImage;
