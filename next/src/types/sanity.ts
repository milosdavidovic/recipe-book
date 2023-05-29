export interface ImageModel {
  asset: {
    _ref: string;
    _type: "reference";
  };
  _type: "image";
}

export interface PostModel {
  _id: string;
  title: string;
  mainImage: ImageModel;
  categories: string[];
  body: any;
  authorName: string;
  authorImage: ImageModel;
  authorBio: string;
  ingredients: { amount: string; group: string; text: string }[];
  steps: string[];
  prepTime: string;
  servings: number;
}
