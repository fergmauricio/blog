"use client";

import clsx from "clsx";
import { Button } from "../Button";

type DialogProps = {
  isVisible?: boolean;
  title: string;
  content: React.ReactNode;
  onConfirm: () => void;
  onCancel: () => void;
  disabled: boolean;
};

export function Dialog({
  isVisible = false,
  title,
  content,
  onConfirm,
  onCancel,
  disabled,
}: DialogProps) {
  if (!isVisible) return null;

  function handleCancel() {
    if (disabled) return;

    onCancel();
  }

  return (
    <div
      onClick={handleCancel}
      className={clsx(
        "fixed z-50 inset-0 bg-black/50 backdrop-blur-xs transition",
        "flex items-center justify-center"
      )}
    >
      <div
        className={clsx(
          "bg-slate-100 rounded-lg p-6 max-w-2xl mx-6 transition",
          "flex flex-col gap-6",
          "shadow-lg shadow-black/20 text-center"
        )}
        role="dialog"
        aria-modal={true}
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 id="dialog-title" className="text-xl font-extrabold">
          {title}
        </h3>
        <div id="dialog-description">{content}</div>
        <div className="flex items-center justify-around">
          <Button
            autoFocus
            variant="ghost"
            onClick={handleCancel}
            disabled={disabled}
          >
            Cancelar
          </Button>
          <Button variant="default" onClick={onConfirm} disabled={disabled}>
            Ok
          </Button>
        </div>
      </div>
    </div>
  );
}
