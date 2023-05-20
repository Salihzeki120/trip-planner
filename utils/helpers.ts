export const formatArrayToText = (array: string[]) => {
    if (!array || array.length === 0) {
        return '';
    }

    return array.join(', ');
}

export const guessDurationFormat = (duration: string) => {
    const durationNumber = parseInt(duration);
    if (durationNumber > 31) {
        return `${durationNumber / 30} months`;
    }

    return `${durationNumber} days`;
}