export const sortAlphabeticallyAToZ = (p1, p2) => {
    const p1Title = p1.title.toLowerCase();
    const p2Title = p2.title.toLowerCase();
    if (p1Title > p2Title) {
        return 1;
    } else if (p1Title < p2Title) {
        return -1;
    } else {
        return 0;
    }
}

export const sortAlphabeticallyZToA = (p1, p2) => {
    const p1Title = p1.title.toLowerCase();
    const p2Title = p2.title.toLowerCase();
    if (p1Title < p2Title) {
        return 1;
    } else if (p1Title > p2Title) {
        return -1;
    } else {
        return 0;
    }
}

export const sortByPriceLowToHigh = (p1, p2) => {
    const p1Title = p1.price;
    const p2Title = p2.price;
    if (p1Title > p2Title) {
        return 1;
    } else if (p1Title < p2Title) {
        return -1;
    } else {
        return 0;
    }
}

export const sortByPriceHighToLow = (p1, p2) => {
    const p1Title = p1.price;
    const p2Title = p2.price;
    if (p1Title < p2Title) {
        return 1;
    } else if (p1Title > p2Title) {
        return -1;
    } else {
        return 0;
    }
}

export const sortByRating = (p1, p2) => {
    const p1Title = p1.rating;
    const p2Title = p2.rating;
    if (p1Title > p2Title) {
        return 1;
    } else if (p1Title < p2Title) {
        return -1;
    } else {
        return 0;
    }
}