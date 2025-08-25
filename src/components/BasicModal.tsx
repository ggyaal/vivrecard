import ReactFocusLock from "react-focus-lock";
import styled, { keyframes } from "styled-components";
import ReactDOM from "react-dom";
import { useEffect } from "react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const FadeIn = keyframes`
  from { opacity: 0 }
  to { opacity: 1 }
`;

const RiseIn = keyframes`
  from { transform: translateY(16px); opacity: 0 }
  to { transform: translateY(0); opacity: 1 }
`;

const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  display: grid;
  animation: ${FadeIn} 0.2s ease-in-out both;
  place-items: center;
  z-index: 2000;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const Dialog = styled.div`
  width: fit-content;
  max-height: 80vh;
  overflow: auto;
  background-color: ${({ theme }) => theme.card.basic.background};
  color: ${({ theme }) => theme.card.basic.text};
  border-radius: 12px;
  animation: ${RiseIn} 0.2s ease-in-out both;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.25);
  padding: 20px;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const BasicModal = ({ open, onClose, children }: ModalProps) => {
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  return ReactDOM.createPortal(
    <Backdrop
      role="dialog"
      aria-modal="true"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <ReactFocusLock returnFocus>
        <Dialog onClick={(e) => e.stopPropagation()}>{children}</Dialog>
      </ReactFocusLock>
    </Backdrop>,
    document.body
  );
};

export default BasicModal;
