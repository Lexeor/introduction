const METRIKA_ID = 107673247;

export function initAnalytics() {
  if (import.meta.env.DEV) return;

  const ym: YmFunction = function (...args) {
    ym.a ??= [];
    ym.a.push(args as unknown[]);
  };
  ym.l = +new Date();
  window.ym = ym;

  const script = document.createElement('script');
  script.async = true;
  script.src = 'https://mc.yandex.ru/metrika/tag.js';
  document.head.appendChild(script);

  script.onload = () => {
    window.ym!(METRIKA_ID, 'init', {
      webvisor: true,
      clickmap: true,
      accurateTrackBounce: true,
      trackLinks: true,
    });
  };
}
