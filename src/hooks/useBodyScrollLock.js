import { useEffect } from "react";

let lockCount = 0;
let savedScrollY = 0;
let previousBodyStyles = null;
let previousHtmlStyles = null;

const getScrollbarWidth = () =>
  typeof window === "undefined" || typeof document === "undefined"
    ? 0
    : window.innerWidth - document.documentElement.clientWidth;

const lockBodyScroll = () => {
  if (typeof window === "undefined" || typeof document === "undefined") return;

  lockCount += 1;
  if (lockCount > 1) return;

  const { body, documentElement } = document;
  const scrollbarWidth = getScrollbarWidth();
  savedScrollY = window.scrollY || documentElement.scrollTop || 0;
  previousHtmlStyles = {
    overflow: documentElement.style.overflow,
    paddingRight: documentElement.style.paddingRight,
    scrollBehavior: documentElement.style.scrollBehavior,
  };
  previousBodyStyles = {
    overflow: body.style.overflow,
    paddingRight: body.style.paddingRight,
    touchAction: body.style.touchAction,
  };

  documentElement.style.overflow = "hidden";
  documentElement.style.scrollBehavior = "auto";
  body.style.overflow = "hidden";
  body.style.touchAction = "none";

  if (scrollbarWidth > 0) {
    documentElement.style.paddingRight = `${scrollbarWidth}px`;
  }
};

const unlockBodyScroll = () => {
  if (typeof window === "undefined" || typeof document === "undefined") return;

  lockCount = Math.max(0, lockCount - 1);
  if (lockCount > 0 || !previousBodyStyles || !previousHtmlStyles) return;

  const { body, documentElement } = document;
  const currentScrollY = window.scrollY || documentElement.scrollTop || 0;

  documentElement.style.overflow = previousHtmlStyles.overflow;
  documentElement.style.paddingRight = previousHtmlStyles.paddingRight;
  documentElement.style.scrollBehavior = previousHtmlStyles.scrollBehavior;
  body.style.overflow = previousBodyStyles.overflow;
  body.style.paddingRight = previousBodyStyles.paddingRight;
  body.style.touchAction = previousBodyStyles.touchAction;

  if (Math.abs(currentScrollY - savedScrollY) > 1) {
    window.scrollTo(0, savedScrollY);
  }

  previousBodyStyles = null;
  previousHtmlStyles = null;
  savedScrollY = 0;
};

export const useBodyScrollLock = (active) => {
  useEffect(() => {
    if (!active) return undefined;

    lockBodyScroll();
    return unlockBodyScroll;
  }, [active]);
};
