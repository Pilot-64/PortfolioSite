import type { MetadataRoute } from 'next';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();
const baseUrl = publicRuntimeConfig.baseUrl;

export default function sitemap(): MetadataRoute.Sitemap {
    return [
    {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 1, 
    },
    {
        url: `${baseUrl}/projects`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.5,
    },
    {
        url: `${baseUrl}/skills`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.5,
    },
    {
        url: `${baseUrl}/about`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.5,
        },
    {
        url: `${baseUrl}/contact`,
        lastModified: new Date(),
        changeFrequency: 'yearly',
        priority: 0.5,
    },
    ]
}