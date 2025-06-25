import { Button } from "@/components/Button";
import { InputText } from "@/components/InputText";
import { BugIcon, CheckIcon } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function adminNewPostPage() {
  return (
    <>
      <div className="py-16 flex gap-4 items-center">
        <Button variant="default" size="sm">
          <BugIcon /> Confirma
        </Button>
        <Button variant="ghost" size="md">
          <BugIcon /> Confirma
        </Button>
        <Button variant="danger" size="lg">
          <BugIcon />
          Confirma
        </Button>
      </div>
      <div className="py-16 flex gap-4 items-center">
        <Button variant="default" size="sm" disabled>
          <BugIcon /> Confirma
        </Button>
        <Button variant="ghost" size="md" disabled>
          <BugIcon /> Confirma
        </Button>
        <Button variant="default" size="lg" className="w-full p-20">
          <CheckIcon />
          OK
        </Button>
      </div>
      <div className="flex flex-col gap-6">
        <InputText
          disabled
          placeholder="Digite seu nome"
          labelText="Nome"
          defaultValue="Olá mundo"
        />
        <InputText
          placeholder="Digite seu sobrenome"
          labelText="Sobrenome"
          readOnly
        />{" "}
      </div>
    </>
  );
}
