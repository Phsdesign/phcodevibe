import { frame, cancelFrame, type FrameData } from "framer-motion";

/**
 * Um relógio só para a página inteira (regra 1 do guia de performance).
 *
 * Em vez de cada componente manter o próprio requestAnimationFrame, todos os
 * loops (Lenis, WebGL, canvas, estrelas...) entram no mesmo frame do
 * framer-motion, que já é o loop das animações. O navegador faz um único
 * callback por frame, e leituras/escritas ficam no mesmo passo.
 *
 * Retorna a função que tira o callback do relógio. Pode ser chamada de dentro
 * do próprio callback.
 */
export type FrameCallback = (time: number, delta: number) => void;

export function onFrame(callback: FrameCallback): () => void {
  const process = ({ timestamp, delta }: FrameData) => callback(timestamp, delta);
  frame.update(process, true);
  return () => cancelFrame(process);
}

/**
 * Liga/desliga um callback no relógio único, sem registrar duas vezes.
 * Útil para loops que param fora da tela e voltam ao reentrar.
 */
export function createFrameLoop(callback: FrameCallback) {
  let stop: (() => void) | null = null;
  return {
    start() {
      if (!stop) stop = onFrame(callback);
    },
    stop() {
      stop?.();
      stop = null;
    },
    get running() {
      return stop !== null;
    },
  };
}
