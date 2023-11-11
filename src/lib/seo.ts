import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';

import type { ComponentProps } from 'react';

export function useSeoProps(
	props: Partial<ComponentProps<typeof NextSeo>> = {},
): Partial<ComponentProps<typeof NextSeo>> {
	const router = useRouter();

	const title = 'clark saben ─ portfolio';
	const description = "Clark Saben Portfolio";

	return {
		title,
		description,
		// canonical: `https://nuro.dev/${router.asPath}`,
		canonical: 'https://portfolio-v2-kappa-dun-71.vercel.app/',
		openGraph: {
			title,
			description,
			site_name: 'Clark Saben Portfolio',
			url: `https://portfolio-v2-kappa-dun-71.vercel.app/`,
			type: 'website',
			images: [
				{
					url: 'https://github.com/csaben/csaben.github.io/blob/master/static/assets/portfoliov2.png',
					alt: description,
					width: 1280,
					height: 720,
				},
			],
		},
		twitter: {
			cardType: 'summary_large_image',
			handle: '@ClarkSaben',
			site: '@ClarkSaben',
		},
		...props,
	};
}
