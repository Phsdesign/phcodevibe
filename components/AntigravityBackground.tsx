"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export type ColorPaletteType = "ph-code" | "monochrome" | "cyber" | "custom";

interface AntigravityBackgroundProps {
  theme?: "light" | "dark" | "auto";
  palette?: ColorPaletteType;
  customColors?: { c1: string; c2: string; c3: string };
  particleScale?: number;
  radiusMultiplier?: number;
  className?: string;
  isFixed?: boolean;
  bleedVh?: number;
}

export function AntigravityBackground({
  theme = "auto",
  palette = "ph-code",
  customColors,
  particleScale = 0.85,
  radiusMultiplier = 1.35,
  className = "",
  isFixed = false,
  bleedVh = 0,
}: AntigravityBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [autoTheme, setAutoTheme] = useState<"light" | "dark">("dark");
  // Tema fixo via prop é derivado no render (antes era copiado para o estado
  // dentro de um effect, gerando um render extra em cascata).
  const currentTheme = theme === "auto" ? autoTheme : theme;
  const [extraPx, setExtraPx] = useState(0);
  const bleed = bleedVh > 0 && extraPx > 0;

  useEffect(() => {
    if (bleedVh <= 0) return;
    const update = () => setExtraPx(Math.round((window.innerHeight * bleedVh) / 100));
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [bleedVh]);

  // Detecção automática de dark/light mode
  useEffect(() => {
    if (theme !== "auto") return;

    const checkDarkMode = () => {
      const isDark = document.documentElement.classList.contains("dark");
      setAutoTheme(isDark ? "dark" : "light");
    };

    checkDarkMode();

    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    window.addEventListener("theme-changed", checkDarkMode);

    return () => {
      observer.disconnect();
      window.removeEventListener("theme-changed", checkDarkMode);
    };
  }, [theme]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || currentTheme === "light") return;

    const isDark = currentTheme === "dark";

    // Definição da paleta de cores (SEM CORES DO GOOGLE)
    let c1Hex = "#0a0a0a";
    let c2Hex = "#4338ca";
    let c3Hex = "#0284c7";

    if (customColors) {
      c1Hex = customColors.c1;
      c2Hex = customColors.c2;
      c3Hex = customColors.c3;
    } else if (palette === "monochrome") {
      if (isDark) {
        c1Hex = "#ffffff";
        c2Hex = "#a1a1aa";
        c3Hex = "#52525b";
      } else {
        c1Hex = "#0a0a0a";
        c2Hex = "#3f3f46";
        c3Hex = "#71717a";
      }
    } else if (palette === "cyber") {
      if (isDark) {
        c1Hex = "#0a8cff"; // Azul elétrico
        c2Hex = "#38bdf8"; // Azul céu
        c3Hex = "#00e5ff"; // Ciano neon
      } else {
        c1Hex = "#0a1128"; // Azul noite profundo
        c2Hex = "#0a4dbf"; // Azul royal
        c3Hex = "#0369a1"; // Azul safira
      }
    } else {
      // Default: "ph-code" (Paleta Premium PH Code Labs — Preto Ônix, Índigo e Azul Safira)
      if (isDark) {
        c1Hex = "#ffffff"; // Titânio puro
        c2Hex = "#38bdf8"; // Safira brilhante
        c3Hex = "#38bdf8"; // Ciano elétrico
      } else {
        c1Hex = "#0a0a0a"; // Preto Ônix absoluto
        c2Hex = "#0a4dbf"; // Azul Real escuro
        c3Hex = "#0369a1"; // Azul Safira profundo
      }
    }

    const colors = {
      c1: new THREE.Color(c1Hex),
      c2: new THREE.Color(c2Hex),
      c3: new THREE.Color(c3Hex),
    };

    const width = container.offsetWidth || window.innerWidth;
    const height = container.offsetHeight || window.innerHeight;
    // No celular o canvas cobre a Hero inteira e é redesenhado a cada frame; 1.25x
    // (em vez de 1.5x) reduz ~30% dos pixels por frame sem diferença visível nas
    // partículas, que já têm borda suave. Desktop segue em 1.5x.
    const pixelRatio = Math.min(window.devicePixelRatio || 1, window.innerWidth < 768 ? 1.25 : 1.5);
    const BASE_HALF = Math.tan((40 * Math.PI) / 360) * 3.1;
    const SEAM_Y = -BASE_HALF;
    const extra = bleed ? extraPx : 0;

    // Scene & Camera
    const scene = new THREE.Scene();

    // Escala da hero preservada: o topo do canvas continua em +BASE_HALF e o conteúdo estendido cresce para baixo
    const calcDimensions = (w: number, h: number) => {
      const heroH = Math.max(1, h - extra);
      const halfH = BASE_HALF * (h / heroH);
      const halfW = halfH * (w / h);
      const centerY = BASE_HALF - halfH;
      const fov = (2 * Math.atan(halfH / 3.1) * 180) / Math.PI;
      return { halfW, halfH, centerY, fov };
    };

    const frame0 = calcDimensions(width, height);
    const camera = new THREE.PerspectiveCamera(frame0.fov, width / height, 0.1, 1000);
    camera.position.set(0, frame0.centerY, 3.1);

    let { halfW, halfH, centerY } = frame0;

    // Renderer WebGL
    const renderer = new THREE.WebGLRenderer({
      // As partículas são point sprites com borda recortada no shader (smoothstep),
      // então o MSAA não muda nada na imagem; no mobile ele só custava GPU por frame.
      antialias: window.innerWidth >= 768,
      alpha: true,
      powerPreference: "high-performance",
      preserveDrawingBuffer: false,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(pixelRatio);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Simplex Noise GLSL nativo
    const noiseGLSL = `
      vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
      vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
      float snoise(vec3 v) {
        const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
        const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
        vec3 i  = floor(v + dot(v, C.yyy));
        vec3 x0 = v - i + dot(i, C.xxx);
        vec3 g = step(x0.yzx, x0.xyz);
        vec3 l = 1.0 - g;
        vec3 i1 = min(g.xyz, l.zxy);
        vec3 i2 = max(g.xyz, l.zxy);
        vec3 x1 = x0 - i1 + C.xxx;
        vec3 x2 = x0 - i2 + C.yyy;
        vec3 x3 = x0 - D.yyy;
        i = mod289(i);
        vec4 p = permute(permute(permute(
                  i.z + vec4(0.0, i1.z, i2.z, 1.0))
                + i.y + vec4(0.0, i1.y, i2.y, 1.0))
                + i.x + vec4(0.0, i1.x, i2.x, 1.0));
        float n_ = 0.142857142857;
        vec3  ns = n_ * D.wyz - D.xzx;
        vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
        vec4 x_ = floor(j * ns.z);
        vec4 y_ = floor(j - 7.0 * x_);
        vec4 x = x_ * ns.x + ns.yyyy;
        vec4 y = y_ * ns.x + ns.yyyy;
        vec4 h = 1.0 - abs(x) - abs(y);
        vec4 b0 = vec4(x.xy, y.xy);
        vec4 b1 = vec4(x.zw, y.zw);
        vec4 s0 = floor(b0) * 2.0 + 1.0;
        vec4 s1 = floor(b1) * 2.0 + 1.0;
        vec4 sh = -step(h, vec4(0.0));
        vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
        vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
        vec3 p0 = vec3(a0.xy, h.x);
        vec3 p1 = vec3(a0.zw, h.y);
        vec3 p2 = vec3(a1.xy, h.z);
        vec3 p3 = vec3(a1.zw, h.w);
        vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
        p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
        vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
        m = m * m;
        return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
      }
    `;

    // Distribuição de partículas expandida para pequenos triângulos densos
    const isMobile = window.innerWidth < 768;
    const cols = isMobile ? 70 : 100;
    const rowRatio = height / Math.max(1, height - extra);
    const rows = Math.min(260, Math.round((isMobile ? 70 : 100) * rowRatio));
    const count = cols * rows;

    const positions = new Float32Array(count * 3);
    const seeds = new Float32Array(count * 4);

    const spanX = Math.max(4.5, halfW * 2.8);
    const spanY = Math.max(3.2, halfH * 2.8);

    let idx = 0;
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        const u = (i + Math.random()) / cols;
        const v = (j + Math.random()) / rows;

        positions[idx * 3 + 0] = (u - 0.5) * spanX;
        positions[idx * 3 + 1] = (v - 0.5) * spanY + frame0.centerY;
        positions[idx * 3 + 2] = (Math.random() - 0.5) * 0.2;

        seeds[idx * 4 + 0] = Math.random(); // fase individual
        seeds[idx * 4 + 1] = Math.random(); // variação de cor
        seeds[idx * 4 + 2] = Math.random(); // fase da onda
        seeds[idx * 4 + 3] = Math.random(); // speck probability
        idx++;
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("seeds", new THREE.BufferAttribute(seeds, 4));

    // Raio base calibrado para ser significativamente maior
    const calculatedBaseRadius = (isMobile ? 0.62 : 0.76) * radiusMultiplier;
    const calculatedRingWidth = 0.36 * radiusMultiplier;

    // Shader Material — Pequenos Triângulos Quânticos com Oscilação Orgânica Fluida
    const material = new THREE.ShaderMaterial({
      transparent: true,
      depthTest: false,
      depthWrite: false,
      uniforms: {
        uTime: { value: 0 },
        uColor1: { value: colors.c1 },
        uColor2: { value: colors.c2 },
        uColor3: { value: colors.c3 },
        uRingPos: { value: new THREE.Vector2(0, 0) },
        uRingRadius: { value: calculatedBaseRadius },
        uRingWidth: { value: calculatedRingWidth },
        uVelocity: { value: 0 },
        uParticleScale: { value: particleScale },
        uPixelRatio: { value: pixelRatio },
        uColorScheme: { value: isDark ? 0 : 1 },
        uBleed: { value: bleed ? 1 : 0 },
        uSeamY: { value: SEAM_Y },
      },
      vertexShader: `
        precision highp float;
        attribute vec4 seeds;
        uniform float uTime;
        uniform float uParticleScale;
        uniform float uPixelRatio;
        uniform vec2 uRingPos;
        uniform float uRingRadius;
        uniform float uRingWidth;
        uniform float uVelocity;

        varying vec4 vSeeds;
        varying vec2 vLocalPos;
        varying float vScale;
        varying float vAngle;

        ${noiseGLSL}

        void main() {
          vSeeds = seeds;
          vec3 pos = position;

          // 1. Fluxo turbulento de fluido vivo e acelerado
          float time = uTime * 1.15;
          vec3 nCoords1 = vec3(pos.xy * 2.2 + vec2(seeds.x * 25.0, seeds.y * 25.0), time * 0.35);
          vec3 nCoords2 = vec3(pos.xy * 3.2 + vec2(seeds.z * 32.0, seeds.w * 32.0), time * 0.42 + 7.0);
          float n1 = snoise(nCoords1);
          float n2 = snoise(nCoords2);
          pos.x += n1 * 0.075;
          pos.y += n2 * 0.075;

          // Distância e vetor ao cursor
          vec2 toRing = pos.xy - uRingPos;
          float dist = length(toRing);
          float angle = atan(toRing.y, toRing.x);
          vAngle = angle;

          // 2. Ondulações Orgânicas Múltiplas e Vivas (Expandindo, Retraindo e Ondulando Continuamente)
          float wave1 = sin(angle * 3.0 + time * 1.9) * 0.13;
          float wave2 = cos(angle * 5.0 - time * 1.6 + seeds.z * 4.0) * 0.08;
          float wave3 = sin(angle * 2.0 + time * 0.95) * 0.12;
          float breathing = sin(time * 1.7 + seeds.x * 2.6) * 0.11;
          float organicDeform = snoise(vec3(cos(angle) * 1.9, sin(angle) * 1.9, time * 0.75)) * 0.13;

          // Raio dinâmico com oscilação contínua e reação imediata à velocidade
          float dynamicRadius = uRingRadius + wave1 + wave2 + wave3 + breathing + organicDeform + (uVelocity * 0.32);

          // Anel de repulsão com empuxo radial dinâmico
          float ringDist = abs(dist - dynamicRadius);
          float ringForce = smoothstep(dynamicRadius + uRingWidth, dynamicRadius, dist);
          
          vec2 pushDir = normalize(toRing + vec2(0.0001));
          pos.xy += pushDir * ringForce * (0.12 + uVelocity * 0.16);

          // Leve ondulação suave dos fragmentos que ficam no meio
          float isInside = smoothstep(dynamicRadius, 0.0, dist);
          pos.xy += pushDir * isInside * (sin(dist * 6.0 - time * 2.2) * 0.035) * (1.0 + uVelocity * 1.2);

          // Visibilidade do anel:
          float inBand = smoothstep(uRingWidth, 0.0, ringDist);
          float innerHole = smoothstep(dynamicRadius * 0.38, dynamicRadius * 0.82, dist);
          float outerFalloff = smoothstep(dynamicRadius + uRingWidth * 2.3, dynamicRadius + uRingWidth * 0.45, dist);

          float haloIntensity = inBand * innerHole * outerFalloff;

          // Menos fragmentos no meio: quantidade reduzida para ficar arejado e sutil
          float innerFragments = isInside * step(0.68, seeds.y) * (0.30 + seeds.z * 0.35);

          // Specks cósmicos sutis ao redor
          float microSpeck = step(0.975, seeds.w) * smoothstep(dynamicRadius * 2.8, dynamicRadius * 0.5, dist) * 0.3;

          // Total com anel + fragmentos discretos no meio
          float totalPresence = haloIntensity * 1.45 + innerFragments * 0.50 + microSpeck;

          // Pulsar e brilho orgânico dos pequenos triângulos
          float pulse = 0.82 + 0.35 * sin(time * 2.2 + seeds.y * 6.28);

          vScale = totalPresence * pulse * (0.7 + seeds.x * 0.6);
          vLocalPos = pos.xy;

          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          gl_Position = projectionMatrix * mvPosition;

          // Variação de tamanho: maioria pequenos triângulos, e alguns aumentados em destaque
          float sizeMultiplier = 0.88;
          if (seeds.x > 0.84) {
            sizeMultiplier = 2.4; // Alguns aumentados em destaque!
          } else if (seeds.x > 0.66) {
            sizeMultiplier = 1.45; // Alguns médios
          }

          gl_PointSize = (vScale * 18.0) * (uPixelRatio * 0.5) * uParticleScale * sizeMultiplier;
        }
      `,
      fragmentShader: `
        precision highp float;
        varying vec4 vSeeds;
        varying vec2 vLocalPos;
        varying float vScale;
        varying float vAngle;

        uniform vec3 uColor1; // Cor 1 (Preto Ônix / Titânio)
        uniform vec3 uColor2; // Cor 2 (Índigo Real / Safira)
        uniform vec3 uColor3; // Cor 3 (Azul Safira / Ciano)
        uniform vec2 uRingPos;
        uniform float uTime;
        uniform int uColorScheme;
        uniform float uBleed;
        uniform float uSeamY;

        ${noiseGLSL}

        // Signed Distance Function para Triângulo Equilátero
        float sdEquilateralTriangle(in vec2 p, in float r) {
          const float k = 1.7320508; // sqrt(3.0)
          p.x = abs(p.x) - r;
          p.y = p.y + r / k;
          if (p.x + k * p.y > 0.0) p = vec2(p.x - k * p.y, -k * p.x - p.y) * 0.5;
          p.x -= clamp(p.x, -2.0 * r, 0.0);
          return -length(p) * sign(p.y);
        }

        vec2 rotate(vec2 v, float a) {
          float s = sin(a); float c = cos(a);
          return mat2(c, s, -s, c) * v;
        }

        void main() {
          // Descarte imediato fora do anel e da área de efeito
          if (vScale < 0.04) discard;

          // Rotação dinâmica do pequeno triângulo
          float triAngle = vAngle + 1.5707963 + (vSeeds.x - 0.5) * 1.6 + sin(uTime * 1.7 + vSeeds.z * 6.28) * 0.8;
          vec2 uv = gl_PointCoord.xy - vec2(0.5);
          uv.y *= -1.0;
          uv = rotate(uv, triAngle);

          // Geometria de triângulo com cantos suavemente lapidados
          float d = sdEquilateralTriangle(uv, 0.28) - 0.03;
          float triangleShape = smoothstep(0.025, -0.01, d);

          if (triangleShape < 0.01) discard;

          // Gradiente refinado PH Code Labs (sem cores do Google)
          float normAngle = (vAngle + 3.14159265) / 6.2831853;
          float noiseShift = snoise(vec3(vLocalPos * 1.8, uTime * 0.35)) * 0.14;
          float prog = fract(normAngle + noiseShift + vSeeds.y * 0.2);

          vec3 col;
          if (prog < 0.5) {
            float t = prog / 0.5;
            col = mix(uColor1, uColor2, smoothstep(0.0, 1.0, t));
          } else {
            float t = (prog - 0.5) / 0.5;
            col = mix(uColor2, uColor3, smoothstep(0.0, 1.0, t));
          }

          // Abaixo da divisória (dobra 2): cor negativa
          if (uBleed > 0.5 && vLocalPos.y < uSeamY) {
            float lum = dot(col, vec3(0.299, 0.587, 0.114));
            col = vec3(1.0 - lum);
          }

          // Alpha com acabamento suave e nítido
          float alpha = triangleShape * smoothstep(0.03, 0.22, vScale) * 0.95;
          if (alpha < 0.01) discard;

          gl_FragColor = vec4(col, alpha);
        }
      `,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Movimentação e rastreamento do cursor com inércia líquida adaptativa
    const targetRingPos = new THREE.Vector2(0, 0);
    const lastMousePos = new THREE.Vector2(0, 0);
    let currentVelocity = 0;

    // A detecção mobile era refeita a cada frame e a cada mousemove (matchMedia +
    // innerWidth). Agora é calculada uma vez e atualizada só no resize.
    const coarseQuery =
      typeof window.matchMedia === "function" ? window.matchMedia("(pointer: coarse)") : null;
    const computeIsMobileViewport = () => {
      const isTouch =
        (coarseQuery?.matches ?? false) ||
        "ontouchstart" in window ||
        (typeof navigator !== "undefined" && navigator.maxTouchPoints > 0);
      return window.innerWidth < 768 || (isTouch && window.innerWidth < 1024);
    };
    let mobileViewport = computeIsMobileViewport();

    // O ponteiro só é guardado no evento; o getBoundingClientRect e a conversão
    // para coordenadas da cena rodam uma única vez por frame dentro do loop.
    let pendingPointer: { x: number; y: number } | null = null;

    const applyPointer = (clientX: number, clientY: number) => {
      const rect = container.getBoundingClientRect();
      const ndcX = ((clientX - rect.left) / rect.width) * 2 - 1;
      const ndcY = -((clientY - rect.top) / rect.height) * 2 + 1;

      const targetX = ndcX * halfW;
      const targetY = bleed
        ? Math.max(ndcY * halfH + centerY, SEAM_Y)
        : ndcY * halfH + centerY;

      lastMousePos.set(targetX, targetY);
      targetRingPos.set(targetX, targetY);
    };

    const queuePointer = (clientX: number, clientY: number) => {
      if (mobileViewport) return;
      if (pendingPointer) {
        pendingPointer.x = clientX;
        pendingPointer.y = clientY;
      } else {
        pendingPointer = { x: clientX, y: clientY };
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      queuePointer(e.clientX, e.clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      // No mobile, não interagir com o toque/dedo do usuário
      if (mobileViewport) return;
      if (e.touches.length > 0) {
        queuePointer(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });

    // Resize Handler — agrupado em 1x por frame e ignorado quando o tamanho do
    // container não muda (no mobile a barra de endereço dispara resize ao rolar,
    // e cada renderer.setSize realocava o drawing buffer da GPU sem necessidade).
    let lastW = width;
    let lastH = height;
    let resizeFrame = 0;
    const applyResize = () => {
      resizeFrame = 0;
      mobileViewport = computeIsMobileViewport();
      const w = container.offsetWidth || window.innerWidth;
      const h = container.offsetHeight || window.innerHeight;
      if (w === lastW && h === lastH) return;
      lastW = w;
      lastH = h;
      const dims = calcDimensions(w, h);
      camera.fov = dims.fov;
      camera.aspect = w / h;
      camera.position.y = dims.centerY;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);

      halfW = dims.halfW;
      halfH = dims.halfH;
      centerY = dims.centerY;

      material.uniforms.uParticleScale.value =
        particleScale * (w < 768 ? 0.75 : 1.0);
    };
    const handleResize = () => {
      if (!resizeFrame) resizeFrame = requestAnimationFrame(applyResize);
    };
    window.addEventListener("resize", handleResize, { passive: true });

    // Loop de animação com render ultra-fluido e inércia orgânica
    let animationFrameId = 0;
    // Mesmo relógio do THREE.Clock (performance.now), sem o aviso de depreciação.
    const clockStart = performance.now();

    // No mobile a Hero fica coberta pelo SplashLoader (classe `splash-active` no
    // <html>) e com opacidade 0 até ele sair. Renderizar o WebGL nesse intervalo
    // era trabalho invisível que travava o carregamento; o loop só começa quando
    // o splash termina, antes de o fundo aparecer.
    const root = document.documentElement;
    let waitingSplash = root.classList.contains("splash-active");
    let inView = true;
    const startLoop = () => {
      if (!animationFrameId && inView && !waitingSplash) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };
    const splashObserver = waitingSplash
      ? new MutationObserver(() => {
          if (root.classList.contains("splash-active")) return;
          waitingSplash = false;
          splashObserver?.disconnect();
          startLoop();
        })
      : null;
    splashObserver?.observe(root, { attributes: true, attributeFilter: ["class"] });

    // Fora da viewport o loop é realmente parado (antes seguia agendando um
    // requestAnimationFrame vazio por frame) e retomado ao voltar.
    const observer = new IntersectionObserver(
      (entries) => {
        inView = entries[entries.length - 1].isIntersecting;
        if (inView) {
          startLoop();
        } else {
          cancelAnimationFrame(animationFrameId);
          animationFrameId = 0;
        }
      },
      { threshold: 0.05 }
    );

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (pendingPointer) {
        applyPointer(pendingPointer.x, pendingPointer.y);
        pendingPointer = null;
      }

      const elapsedTime = (performance.now() - clockStart) / 1000;
      const isMobile = mobileViewport;

      // Flutuação orgânica contínua viva a todo instante
      const driftX =
        Math.sin(elapsedTime * 0.85) * 0.35 +
        Math.cos(elapsedTime * 0.42) * 0.15;
      const driftY =
        Math.cos(elapsedTime * 0.95) * 0.25 +
        Math.sin(elapsedTime * 0.55) * 0.12;

      if (isMobile) {
        // No mobile: movimento contínuo natural no centro, sem congelar ao clicar e sem seguir o dedo
        targetRingPos.set(driftX, centerY + driftY);
      } else {
        // No desktop: flutuação orgânica somada ao mouse
        targetRingPos.set(
          lastMousePos.x + driftX * 0.25,
          lastMousePos.y + driftY * 0.25
        );
      }

      // Easing adaptativo ultra-fluido: inércia líquida rápida e suave
      const currentPos = material.uniforms.uRingPos.value;
      const distToTarget = currentPos.distanceTo(targetRingPos);
      const lerpFactor = THREE.MathUtils.clamp(
        0.075 + distToTarget * 0.045,
        0.075,
        0.16
      );
      currentPos.lerp(targetRingPos, lerpFactor);

      if (isMobile) {
        // No mobile: velocidade ambiente contínua viva, nunca trava no clique
        material.uniforms.uVelocity.value = 0.16 + Math.sin(elapsedTime * 1.6) * 0.05;
      } else {
        // Velocidade calculada continuamente a cada frame para fluidez total
        currentVelocity = THREE.MathUtils.lerp(
          currentVelocity,
          Math.min(distToTarget * 2.2, 1.4),
          0.14
        );
        material.uniforms.uVelocity.value = Math.max(currentVelocity, 0.12);
      }

      // Pulsação e respiração orgânica contínua da coroa
      material.uniforms.uRingRadius.value =
        calculatedBaseRadius +
        Math.sin(elapsedTime * 1.8) * 0.07 +
        Math.cos(elapsedTime * 3.4) * 0.035;

      material.uniforms.uTime.value = elapsedTime;

      renderer.render(scene, camera);
    };

    if (!waitingSplash) animate();
    observer.observe(container);

    return () => {
      cancelAnimationFrame(animationFrameId);
      cancelAnimationFrame(resizeFrame);
      observer.disconnect();
      splashObserver?.disconnect();
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("resize", handleResize);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      // Libera o contexto WebGL imediatamente (o navegador limita contextos ativos).
      renderer.forceContextLoss();
      if (renderer.domElement && renderer.domElement.parentElement) {
        renderer.domElement.parentElement.removeChild(renderer.domElement);
      }
    };
  }, [currentTheme, palette, particleScale, radiusMultiplier, customColors, extraPx, bleed]);

  if (currentTheme === "light") {
    return null;
  }

  return (
    <div
      ref={containerRef}
      style={{
        position: isFixed ? "fixed" : "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: bleed ? 1 : 0,
        overflow: "hidden",
        ...(bleed ? { height: `calc(100% + ${extraPx}px)` } : {}),
      }}
      className={`antigravity-bg-canvas ${className}`}
    />
  );
}
