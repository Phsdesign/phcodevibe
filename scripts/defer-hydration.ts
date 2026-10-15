// Pós-build do export estático: os scripts do Next só começam a baixar depois
// do primeiro paint.
//
// O HTML já traz a página inteira pronta. Sem isto, os <script async> do Next
// chegam junto com o CSS e a hidratação do React roda antes do primeiro paint,
// atrasando o FCP/LCP (e o Lighthouse conta o download de todos os scripts
// como parte do LCP). Aqui cada <script src async> vira um item de uma lista
// que um loader inline injeta, na mesma ordem e com os mesmos atributos, assim
// que o navegador registra o first-contentful-paint. Fallbacks: dois frames +
// 300 ms, e 3 s fixos (aba em segundo plano / prerender não pintam).
//
// No desktop com mouse a hidratação espera a primeira interação (mexer o mouse,
// rolar, clicar ou teclar), e os scripts são só pré-baixados depois do load. A
// página já está toda no HTML e as animações de entrada são CSS; o que depende
// de JS (palavra que gira, partículas, Lenis, cursor) começa no primeiro
// movimento (o loader marca <html data-interacted> para quem precisa saber que
// essa interação já aconteceu). Em máquina lenta (como a do PageSpeed) a hidratação da página
// inteira são várias tarefas longas seguidas, que pesavam no TBT do desktop.
// Em tela com toque (celular, tablet, notebook touch) fica no primeiro paint:
// o primeiro toque não pode se perder. (Não dá para usar (hover: hover) aqui: o
// Chrome headless do Lighthouse responde "none" mesmo emulando desktop.)
import { readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const OUT_DIR = join(process.cwd(), "out");

const SCRIPT_TAG = /<script src="([^"]+)"([^>]*)\basync=""([^>]*)><\/script>/g;
const SCRIPT_PRELOAD = /<link rel="preload" as="script"[^>]*\/>/g;

function loader(scripts: Array<[string, string | null]>): string {
  return (
    "<script>(function(){" +
    `var L=${JSON.stringify(scripts)},done=0;` +
    "function go(){if(done)return;done=1;L.forEach(function(s){" +
    'var e=document.createElement("script");e.src=s[0];e.async=true;if(s[1])e.id=s[1];' +
    "document.head.appendChild(e);});}" +
    "if(innerWidth>=768&&!navigator.maxTouchPoints){" +
    'var E=["pointermove","pointerdown","wheel","keydown","touchstart","scroll"],' +
    "o={capture:true,passive:true},f=function(){E.forEach(function(n){removeEventListener(n,f,o);});" +
    'document.documentElement.setAttribute("data-interacted","");go();};' +
    "E.forEach(function(n){addEventListener(n,f,o);});" +
    'addEventListener("load",function(){L.forEach(function(s){' +
    'var k=document.createElement("link");k.rel="prefetch";k.as="script";k.href=s[0];' +
    "document.head.appendChild(k);});});return;}" +
    "try{new PerformanceObserver(function(l){l.getEntries().forEach(function(e){" +
    'if(e.name==="first-contentful-paint")setTimeout(go,0);});})' +
    '.observe({type:"paint",buffered:true});}catch(e){}' +
    "requestAnimationFrame(function(){requestAnimationFrame(function(){setTimeout(go,300);});});" +
    "setTimeout(go,3000);" +
    "})();</script>"
  );
}

function rewrite(html: string): string | null {
  const scripts: Array<[string, string | null]> = [];
  const body = html.replace(SCRIPT_TAG, (_tag, src: string, before: string, after: string) => {
    const id = /\bid="([^"]+)"/.exec(before + after);
    scripts.push([src, id ? id[1] : null]);
    return "";
  });
  if (scripts.length === 0 || !body.includes("</head>")) return null;
  return body.replace(SCRIPT_PRELOAD, "").replace("</head>", `${loader(scripts)}</head>`);
}

function htmlFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) return htmlFiles(path);
    return name.endsWith(".html") ? [path] : [];
  });
}

let changed = 0;
for (const file of htmlFiles(OUT_DIR)) {
  const result = rewrite(readFileSync(file, "utf8"));
  if (result === null) continue;
  writeFileSync(file, result);
  changed++;
}
console.log(`defer-hydration: ${changed} páginas com hidratação após o primeiro paint`);
