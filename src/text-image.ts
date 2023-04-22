import groq from "groq";
import { defineType, PortableTextBlock } from "sanity";
import { image, ImageObject, imageQuery } from "./image";

export const textImage = defineType({
	name: 'text-image',
  title: 'Text Image',
  type: 'object',
  fields: [
		{
			type: 'blockContent',
			name: 'body',
			title: 'Body'
		},
    image,
		{
			name: 'alignment',
			title: 'Alignment (Text)',
			description: 'Where is the text relative to the image',
			type: 'string',
			options: {
				list: [
					{ title: 'Left', value: 'left' },
					{ title: 'Right', value: 'right' },
				],
				layout: 'radio'
			},
			initialValue: 'left'
		},
  ],
  preview: {
    select: {
      body: 'body',
			alignment: 'alignment',
      media: 'image',
    },
    prepare: ({ body, alignment, media }) => ({
			title: body?.[0]?.children?.[0]?.text ?? 'Text Image', 
			subtitle: `Text to the ${alignment}`,
			media
		})
  }
})

export const textImageQuery = groq`
  _type,
  _key,
  body,
  image {
    ${imageQuery}
  },
  alignment
`

export type TextImage = {
	_type: 'text-image'
	_key: string
	body: PortableTextBlock
	image: ImageObject
	alignment: 'left' | 'right'
}