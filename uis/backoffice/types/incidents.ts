export type IncidentAnalysisResult = {
  total_records: number;
  valid_count: number;
  invalid_count: number;
  invalid_breakdown: Record<string, number>;
  category_counts: Record<string, number>;
  status_counts: Record<string, number>;
  satisfaction_average: number;
  scored_closed_count: number;
  closed_count: number;
  satisfaction_counts: Record<string, number>;
};