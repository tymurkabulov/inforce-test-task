interface Size {
    width: number;
    height: number;
}

interface Reviews {
    rating: number;
    comment: string;
    date: string;
    reviewerName: string;
    reviewerEmail: string;
}

export interface IProduct {
    id: number;
    images: string[];
    title: string;
    stock: number;
    dimensions: Size;
    weight: number;
    reviews: Reviews[];
}