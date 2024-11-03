interface ContentPreviewProps {
    content: string;
    maxWords?: number;
}

export function ContentPreview({ content, maxWords = 30 }: ContentPreviewProps) {
    const stripHtml = (html: string) => {
        const tmp = document.createElement('DIV');
        tmp.innerHTML = html;
        return tmp.textContent || tmp.innerText || '';
    };

    const truncateToCompleteSentences = (text: string, wordCount: number) => {
        const words = text.split(' ');
        if (words.length <= wordCount) {
            return text;
        }

        let truncated = words.slice(0, wordCount).join(' ');
        const lastPeriodIndex = truncated.lastIndexOf('.');
        const lastExclamationIndex = truncated.lastIndexOf('!');
        const lastQuestionIndex = truncated.lastIndexOf('?');

        const lastSentenceEnd = Math.max(lastPeriodIndex, lastExclamationIndex, lastQuestionIndex);

        if (lastSentenceEnd > 0) {
            return truncated.slice(0, lastSentenceEnd + 1);
        } else {
            // If no sentence-ending punctuation is found, return the full truncated text without ellipsis
            return truncated;
        }
    };

    const previewText = truncateToCompleteSentences(stripHtml(content), maxWords);

    return (
        <div className="text-sm text-muted-foreground">
            {previewText}
        </div>
    );
}