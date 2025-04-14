interface ErrorProps {
    type: string
    message: string
}

export default function Error({ type, message }: ErrorProps) {
    const className = type == 'type-error' ?
        'font-primary my-6 bg-warning text-warning-contrast border-1 border-warning-contrast px-6 py-3 rounded-xl inline-block'
        : 'font-primary my-6 bg-error text-error-contrast border-1 border-error-contrast px-6 py-3 rounded-xl inline-block'
    return (
        <div className={`text-center w-auto ${className}`}>
            {message}
        </div>
    )
}