"use client";

import { deletePostAction } from "@/actions/post/delete-post-action";
import { Dialog } from "@/components/Dialog";
import clsx from "clsx";
import { Trash2Icon } from "lucide-react";
import { useEffect, useState, useTransition } from "react";
import { toast } from "react-toastify";

type DeletePostButtonProps = {
  id: string;
  title: string;
};

export function DeletePostButton({ id, title }: DeletePostButtonProps) {
  const [isPending, startTransition] = useTransition();
  const [showDialog, setShowDialog] = useState(false);

  async function handleClick() {
    setShowDialog(true);
  }

  function handleConfirm() {
    startTransition(async () => {
      const result = await deletePostAction(id);
      setShowDialog(false);

      if (result.error) {
        toast.error(result.error);
        return;
      }

      toast.success("Post deletado com sucesso");
    });
  }

  return (
    <>
      <button
        title={`Apagar post: ${title}`}
        aria-label={`Apagar post: ${title}`}
        onClick={handleClick}
        disabled={isPending}
        className={clsx(
          "text-red-500 cursor-pointer transition",
          "[&_svg]:w-4 [&_svg]:h-4",
          "hover:scale-120 hover:text-red-700",
          "disabled: text-slate-600 disabled:cursor-not-allowed"
        )}
      >
        <Trash2Icon size={18} />
      </button>
      {showDialog && (
        <Dialog
          isVisible={showDialog}
          title="Apagar post?"
          content="Tem certeza que deseja excluir?"
          onCancel={() => setShowDialog(false)}
          onConfirm={handleConfirm}
          disabled={isPending}
        />
      )}
    </>
  );
}
