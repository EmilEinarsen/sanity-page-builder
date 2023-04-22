import groq from "groq"
import { defineType } from "sanity"

import { image, ImageObject, imageQuery } from "./image"

export const hero = defineType({
  type: 'object',
  name: 'hero',
  title: 'Hero',
  fields: [
		{
			name: 'title',
			title: 'Title',
			type: 'string'
		},
		{
			name: 'text',
			title: 'Text',
			type: 'string',
		},
    {
      title: 'Background Type',
      name: 'bgType',
      type: 'string',
      options: {
        list: [
          { title: 'Image', value: 'image' },
          { title: 'Video', value: 'video' }
        ],
        layout: 'radio',
        direction: 'horizontal'
      },
			initialValue: 'image'
    },
    {
      ...image,
      title: 'Background Image',
      hidden: ({ parent }) => {
        return parent.bgType !== 'image'
      }
    },
    {
			name: 'videoFile',
			title: 'Background Video',
			type: 'file',
			options: {
				accept: 'video/*'
			},
      hidden: ({ parent }) => {
        return parent.bgType !== 'video'
      }
    },
		{
			type: 'string',
			name: 'backgroundWidth',
			title: 'Background size',
			description: 'Background width; What should the background be relative to?',
			options: {
				list: [
					{title: 'Page', value: 'page'},
					{title: 'Container', value: 'container'}
				],
				layout: 'radio'
			},
			initialValue: 'container',
		},
		{
			type: 'string',
			name: 'theme',
			title: 'Theme',
			description: 'Background image theme; Text color will be highest contrast',
			options: {
				list: [
					{title: 'Light', value: 'light'},
					{title: 'Dark', value: 'dark'}
				],
				layout: 'radio'
			},
			initialValue: 'light',
		},
		{
			type: 'string',
			name: 'contentPlacement',
			title: 'Content placement',
			options: {
				list: [
					{title: 'Left', value: 'left'},
					{title: 'Center', value: 'center'},
					{title: 'Right', value: 'right'}
				],
				layout: 'radio'
			},
			initialValue: 'left',
		}
  ],
  preview: {
    select: {
      image: 'image',
      content: 'content.0.children',
      type: 'bgType'
    },
    prepare({ type, image, content }) {
      return type  === 'video' ? {
        title: 'Hero (Video)',
        subtitle: content && content[0]?.text,
      } : {
        title: 'Hero (Image)',
        subtitle: content && content[0]?.text,
        media: image
      }
    }
  }
})

export const heroQuery = groq`
  _type,
  _key,
  title,
  text,
  bgType,
  image {
    ${imageQuery}
  },
  video{
    id,
    title
  },
  backgroundWidth,
  theme,
  contentPlacement
`

type HeroBase = {
	_type: 'hero'
	_key: string
	title: string
	text: string
  theme: 'light' | 'dark'
	backgroundWidth: 'page' | 'container'
	contentPlacement: 'left' | 'center' | 'right'
}

type HeroWithImage = HeroBase & {
  bgType: 'image'
	image: ImageObject
}

type HeroWithVideo = HeroBase & {
  bgType: 'video'
  video: {
    _type: 'file'
    _key: string
    mimeType: `video/${string}`
    url: string
  }
}

export type Hero = HeroWithImage | HeroWithVideo
