import { Congruence as CongruenceType } from "../lib/modular-arithmetic/Types";
import { MathJaxContext, MathJax } from "better-react-mathjax";

interface CongruenceProps {
	id: number;
	congruence: CongruenceType;
	onChange: (id: number, field: keyof CongruenceType, value: number) => void;
	onRemove: (id: number) => void;
	disableRemove?: boolean;
	mode?: string;
}
export function Congruence({
	congruence,
	id,
	onChange,
	onRemove,
	disableRemove,
	mode,
}: CongruenceProps) {
	const isFirstEquation = id < 3;
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
			<div className="flex items-center space-x-2 mt-3 text-base sm:text-sm overflow-x-auto">
				<input
					type="text"
					value={congruence.coefficient || ""}
					onChange={(e) => handleOnChange(id, "coefficient", e)}

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
					onChange={(e) => handleOnChange(id, "remainder", e)}
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
					onChange={(e) => handleOnChange(id, "modulus", e)}
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
				<div className="flex items-center space-x-2">
					<MathJax>
						<span className="text-gray-500 text-sm sm:text-xs font-primary flex items-center h-full">{`\\((${id})\\)`}</span>
					</MathJax>
					{canRemove && (
						<button
							onClick={() => onRemove(id)}
							className="cursor-pointer text-red-600 hover:underline text-sm sm:text-xs flex items-center"
						>
							Remover
						</button>
					)}
				</div>
			</div>
		</MathJaxContext>
	);
}