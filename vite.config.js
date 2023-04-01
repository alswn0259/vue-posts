import { fileURLToPath, URL } from 'node:url';
import Components from 'unplugin-vue-components/vite';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vue(),
		Components({
		  dirs: ['src/components/app'], // 특정 컴포넌트만 임폴트
			dts: true, // 모든 컴포넌트 임폴트해줌
		})
	],
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url)),
		},
	},
});
