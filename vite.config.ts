import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, type IndexHtmlTransformContext } from 'vite';

const yandexMetrikaPlugin = () => ({
  name: 'yandex-metrika',
  transformIndexHtml: {
    order: 'post' as const,
    handler(_html: string, ctx: IndexHtmlTransformContext) {
      if (ctx.server) return [];
      return [
        {
          tag: 'script',
          attrs: { type: 'text/javascript' },
          children: `(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};m[i].l=1*new Date();for(var j=0;j<document.scripts.length;j++){if(document.scripts[j].src===r){return;}}k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})(window,document,'script','https://mc.yandex.ru/metrika/tag.js?id=107673247','ym');ym(107673247,'init',{ssr:true,webvisor:true,clickmap:true,ecommerce:"dataLayer",referrer:document.referrer,url:location.href,accurateTrackBounce:true,trackLinks:true});`,
          injectTo: 'head' as const,
        },
        {
          tag: 'noscript',
          children: '<div><img src="https://mc.yandex.ru/watch/107673247" style="position:absolute; left:-9999px;" alt="" /></div>',
          injectTo: 'body' as const,
        },
      ];
    },
  },
});

export default defineConfig({
  plugins: [react(), tailwindcss(), yandexMetrikaPlugin()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  base: '/introduction/',
});
