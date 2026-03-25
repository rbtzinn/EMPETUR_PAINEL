import { useState, useRef, useCallback } from "react";

export function useDraggableButton() {
  // Começa no meio da tela (Y) e encostado na esquerda (X = 0)
  const [botaoPos, setBotaoPos] = useState({ x: 0, y: window.innerHeight / 2 });
  const ignorarCliqueRef = useRef(false);
  const isDragging = useRef(false);
  const startY = useRef(0);

  const iniciarArraste = useCallback((e) => {
    // PointerCapture faz o mouse/dedo não "escapar" do botão se mover rápido demais
    e.currentTarget.setPointerCapture(e.pointerId);
    
    ignorarCliqueRef.current = false;
    isDragging.current = true;
    
    // Guardamos onde o clique começou em relação ao topo do botão
    startY.current = e.clientY - botaoPos.y;
  }, [botaoPos.y]);

  const moverArraste = useCallback((e) => {
    if (!isDragging.current) return;

    // Se moveu mais de 5px, consideramos que é um arraste e não um clique
    if (Math.abs(e.clientY - (startY.current + botaoPos.y)) > 5) {
      ignorarCliqueRef.current = true;
    }

    // Calculamos a nova posição Y
    let novaY = e.clientY - startY.current;

    // LIMITES DA TELA: Não deixa o botão sair por cima nem por baixo
    const margem = 20; // Respiro para não colar no topo/rodapé
    const alturaBotao = 48; // H-12 do Tailwind
    const limiteSuperior = margem;
    const limiteInferior = window.innerHeight - alturaBotao - margem;

    novaY = Math.max(limiteSuperior, Math.min(novaY, limiteInferior));

    // Mantemos X sempre em 0 para ele não sair da borda
    setBotaoPos({ x: 0, y: novaY });
  }, [botaoPos.y]);

  const finalizarArraste = useCallback((e) => {
    isDragging.current = false;
    if (e.currentTarget) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
  }, []);

  return {
    botaoPos,
    ignorarCliqueRef,
    iniciarArraste,
    moverArraste,
    finalizarArraste,
  };
}