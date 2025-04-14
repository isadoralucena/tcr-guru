import 'katex/dist/katex.min.css';
import { BlockMath } from 'react-katex';

type SubStepProps = {
  title: string;
  latex: string;
};

export function SubStep({ title, latex }: SubStepProps) {
  return (
    <div className="my-1">
      <p className="text-4sm font-primary text-primary">{title}</p>
      <BlockMath>{latex}</BlockMath>
    </div>
  );
}