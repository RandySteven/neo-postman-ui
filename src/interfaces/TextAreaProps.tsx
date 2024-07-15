interface TextAreaProps {
    rows: string
    class: string
}

interface JsonTextAreaProps {
    name: string,
    className: string,
    rows: number,
    value: any,
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void
}