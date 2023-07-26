const excludedNotebookAlts = ['png']

export const preprocessImageAlt = (alt: string) => {
    if (excludedNotebookAlts.includes(alt)) {
        return null
    }
    return alt
}
