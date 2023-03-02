import React from 'react'

type TProps = {
    text?: string,
    hasError?: boolean,
    className?: string,
}

function Message({ text, hasError = false, className = '' }: TProps) {
    const listClass = hasError ? 'text-error' + (className ? ' ' + className : '') : className
    return (
        <>
            {text && <div className={listClass}>{text}</div>}
        </>
    )
}

export default Message