import { Link } from "react-router-dom";

interface ButtonLinkProps {
    to?: string;
    children: React.ReactNode;
    bgColor?: string;
    hoverColor?: string;
    textColor?: string;
    className?: string;
    onClick?: () => void;
}

export function ButtonLink({
    to,
    children,
    bgColor = "bg-neutral-300",
    hoverColor = "hover:bg-neutral-400",
    textColor = "text-black",
    className = "",
    onClick,
}: ButtonLinkProps) {
    const classes = `
		${bgColor}
		${textColor}
		font-primary text-base sm:text-base md:text-sm lg:text-sm
		rounded-full px-5 py-1 md:px-6 md:py-2 lg:px-6 lg:py-2
		${hoverColor}
		${className}
		transition-all duration-800 ease-in-out
		cursor-pointer
		shadow-sm
	`;

	if (onClick || !to || to === "#") {
		return (
			<button onClick={onClick} className={classes}>
				{children}
			</button>
		);
	}

	return (
		<Link to={to} className={classes}>
			{children}
		</Link>
	);
}