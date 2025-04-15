import { Congruence as CongruenceType } from "../lib/modular-arithmetic/Types";
import { MathJaxContext, MathJax } from "better-react-mathjax";

interface CongruenceProps {
	index: number;
	congruence: CongruenceType;
	onChange: (index: number, field: keyof CongruenceType, value: number) => void;
	onRemove: (index: number) => void;
	disableRemove?: boolean;
}
export function Congruence({
	congruence,
	index,
	onChange,
	onRemove,
	disableRemove,
}: CongruenceProps) {
	const isFirstEquation = index < 2;
	const canRemove = !isFirstEquation && !disableRemove;

	return (
		<MathJaxContext>
			<div className="flex items-center space-x-4 mt-3">
				<input
					type="number"
					value={congruence.coefficient}
					onChange={(e) => onChange(index, "coefficient", Number(e.target.value))}
					onKeyDown={(e) => {
						if (e.key === "ArrowUp" || e.key === "ArrowDown") {
							e.preventDefault();
						}
					}}					
					className="w-12 no-spinner border-0 border-b-1 focus:outline-none p-1 text-center"
				/>
				<MathJax>
					<span>{`\\( x \\equiv \\)`}</span>
				</MathJax>
				<input
					type="number"
					value={congruence.remainder}
					onChange={(e) => onChange(index, "remainder", Number(e.target.value))}
					onKeyDown={(e) => {
						if (e.key === "ArrowUp" || e.key === "ArrowDown") {
							e.preventDefault();
						}
					}}					
					className="w-12 no-spinner border-0 border-b-1 focus:outline-none p-1 text-center"
				/>
				<MathJax>
					<span>{`\\( (\\text{mod} \\)`}</span>
				</MathJax>
				<input
					type="number"
					value={congruence.modulus}
					onChange={(e) => onChange(index, "modulus", Number(e.target.value))}
					className="w-12 no-spinner border-0 border-b-1 focus:outline-none p-1 text-center"
					onKeyDown={(e) => {
						if (e.key === "ArrowUp" || e.key === "ArrowDown") {
							e.preventDefault();
						}
					}}				 
				/>
				<MathJax>
					<span>{`\\()\\)`}</span>
				</MathJax>
				<div className="flex items-center">
					<MathJax>
						<span className="text-gray-500 text-sm font-primary mr-4">{`\\((${index + 1})\\)`}</span>
					</MathJax>
					{canRemove && (
						<button
							onClick={() => onRemove(index)}
							className="cursor-pointer text-red-600 hover:underline text-sm"
						>
							Remover
						</button>
					)}
				</div>
			</div>
		</MathJaxContext>
	);
}