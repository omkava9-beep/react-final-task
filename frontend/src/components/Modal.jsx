import { useRef } from 'react';
import Button from './Button';
import { createPortal } from 'react-dom';

// Plain conditional render for now. In Phase 5, render this through createPortal
// into the #modal-root div (see index.html) instead of in place.
export default function Modal({ isOpen, onClose, title, children }) {
  const modal = useRef();
  return (
    createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" ref={modal} hidden={!isOpen} >
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl" >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </div>

        <div className="text-sm text-gray-600">{children}</div>

        <div className="mt-6 flex justify-end">
          <Button variant="primary" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </div>,
    document.getElementById('modal-root')
    )
  );
}
