import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ArticleState {
  articles: any[];
  myArticles: any[];
  currentArticle: any | null;
  loading: boolean;
  error: string | null;
}

const initialState: ArticleState = {
  articles: [],
  myArticles: [],
  currentArticle: null,
  loading: false,
  error: null,
};

const articleSlice = createSlice({
  name: "article",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setArticles: (state, action: PayloadAction<any[]>) => {
      state.articles = action.payload;
    },
    setMyArticles: (state, action: PayloadAction<any[]>) => {
      state.myArticles = action.payload;
    },
    setCurrentArticle: (state, action: PayloadAction<any | null>) => {
      state.currentArticle = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  setLoading,
  setArticles,
  setMyArticles,
  setCurrentArticle,
  setError,
} = articleSlice.actions;
export default articleSlice.reducer;
