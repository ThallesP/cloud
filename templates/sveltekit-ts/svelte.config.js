import withCloud from '@serverless/cloud/svelte'
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = withCloud({
	preprocess: [
		preprocess({
			preserve: ['ld+json', 'module'],
			typescript: true,
		}),
	],
	kit: {
		prerender: {
			crawl: true,
			enabled: true,
			onError: 'fail',
			entries: ['*'],
		},
		methodOverride: {
            allowed: ['PUT', 'PATCH', 'DELETE']
        },
        vite: {
            server: {
                proxy: {
                    '/api': `http://localhost:${process.env.CLOUD_PORT}`
                }
            },
        }
	},
});

export default config
