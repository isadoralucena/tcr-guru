import { Congruence as CongruenceType } from "../lib/modular-arithmetic/Types";
import { MathJaxContext, MathJax } from "better-react-mathjax";

interface CongruenceProps {
	index: number;
	congruence: CongruenceType;
	onChange: (index: number, field: keyof CongruenceType, value: number) => void;
	onRemove: (index: number) => void;
	disableRemove?: boolean;
	mode?: string;
}
export function Congruence({
	congruence,
	index,
	onChange,
	onRemove,
	disableRemove,
	mode,
}: CongruenceProps) {
	const isFirstEquation = index < 2;
	const canRemove = !isFirstEquation && !disableRemove;

	const handleOnChange = (
		index: number,
		field: keyof CongruenceType,
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		const newValue = Number(e.target.value.replace(/^0+/, '') || '0');

		onChange(index, field, newValue);
	};


	return (
		<MathJaxContext>
			<div className="flex items-center space-x-4 mt-3">
				<input
					type="text"
					value={congruence.coefficient || ""}
					onChange={(e) => handleOnChange(index, "coefficient", e)}

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
				{mode != 'INVERSE' ? (<input
					type="text"
					value={congruence.remainder || ""}
					onChange={(e) => handleOnChange(index, "remainder", e)}
					onKeyDown={(e) => {
						if (e.key === "ArrowUp" || e.key === "ArrowDown") {
							e.preventDefault();
						}
					}}
					className="w-12 no-spinner border-0 border-b-1 focus:outline-none p-1 text-center"
				/>
				): (
					<MathJax>
					  <span>{`\\( 1 \\)`}</span>
					</MathJax>
				  )}
				<MathJax>
					<span>{`\\( (\\text{mod} \\)`}</span>
				</MathJax>
				<input
					type="text"
					value={congruence.modulus || ""}
					onChange={(e) => handleOnChange(index, "modulus", e)}
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