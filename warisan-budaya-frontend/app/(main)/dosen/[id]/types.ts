export type TabType = "overview" | "publications" | "profile";
export type SortType = "year-desc" | "year-asc" | "citation-desc";

export interface SubCategory {
  id: string;
  label: string;
  entity: string;
  columns: string[];
  rows: string[][];
  visible: boolean;
}

export interface Category {
  id: string;
  label: string;
  icon: React.ReactNode;
  color: string;
  subCategories: SubCategory[];
}

export interface Publication {
  id: number;
  title: string;
  venue: string;
  year: number;
  authorOrder: string;
  type: string;
  citations: number;
}

export interface ProfileData {
  name: string;
  imageUrl: string;
  university: string;
  program: string;
  SiwadaId: string;
  tags: string[];
  metrics: {
    sintaOverall: string;
    sinta3Yr: string;
    scopusHIndex: string;
    wosHIndex: string;
  };
  activities: { year: string; count: number }[];
  publications: Publication[];
}
