export interface InsightsRequestVariables {
  locale: string;
  search: string;
  first: number;
  skip: number;
  in?: string[];
}

export interface InsightsPageContent {
  title: string;
  subtitle: string;
  searchPlaceholder: string;
  searchButtonText: string;
  allTagsButtonText: string;
  emptyPostsText: string;
  timeToReadText: string;
}
