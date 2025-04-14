import { ReactNode } from "react";

type StepProps = {
  title: string;
  children: ReactNode;
};

export function Step({ title, children }: StepProps) {
  return (
    <div className="p-4 border-l-4 border-purple-400 my-2">
      <h2 className="text-5sm font-primary text-primary px-3 py-3 inline-block">{title}</h2>
      <div className="ml-4">{children}</div>
    </div>
  );
}