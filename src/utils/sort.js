export const sortWords = (words) => {
    return words.sort((a, b) => {
        const wordA = a.word.toLowerCase();
        const wordB = b.word.toLowerCase();

        if (wordA < wordB) {
            return -1;
        }
        if (wordA > wordB) {
            return 1;
        }
        return 0;
    });
};

export const sortOws = (ows) => {
    return ows.sort((a, b) => {
        const owsA = a.ows[0].word.toLowerCase();
        const owsB = b.ows[0].word.toLowerCase();
        if (owsA < owsB) {
            return -1;
        }
        if (owsA > owsB) {
            return 1;
        }
        return 0;
    });
};

export const sortPhrasal = (phrasal) => {
    return phrasal.sort((a, b) => {
        const phrasalA = a.phrasal.toLowerCase();
        const phrasalB = b.phrasal.toLowerCase();

        if (phrasalA < phrasalB) {
            return -1;
        }
        if (phrasalA > phrasalB) {
            return 1;
        }
        return 0;
    });
};

export const sortIdioms = (idioms) => {
    return idioms.sort((a, b) => {
        const idiomA = a.idiom.toLowerCase();
        const idiomB = b.idiom.toLowerCase();

        if (idiomA < idiomB) {
            return -1;
        }
        if (idiomA > idiomB) {
            return 1;
        }
        return 0;
    });
};

export const sortSpellings = (spellings) => {
    return spellings.sort((a, b) => {
        const spellingA = a.spelling.toLowerCase();
        const spellingB = b.spelling.toLowerCase();

        if (spellingA < spellingB) {
            return -1;
        }
        if (spellingA > spellingB) {
            return 1;
        }
        return 0;
    });
};

export const sortCommon = (common) => {
    return common.sort((a, b) => {
        const labelA = a.label;
        const labelB = b.label;
        if (labelA < labelB) {
            return -1;
        }
        if (labelA > labelB) {
            return 1;
        }
        return 0;
    });
};

export const sortCommonTerms = (terms) => {
    return terms.sort((a, b) => {
        const termA = a.word ? a.word.toLowerCase() : a.description;
        const termB = b.word ? b.word.toLowerCase() : b.description;
        if (termA < termB) {
            return -1;
        }
        if (termA > termB) {
            return 1;
        }
        return 0;
    });
};
