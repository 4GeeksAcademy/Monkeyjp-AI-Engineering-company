export type CandidateStatus =
  | "received"
  | "in_progress"
  | "selected"
  | "discarded";

export type CandidateStage =
  | "pending"
  | "review"
  | "personal_interview"
  | "technical_interview"
  | "offer_presented";

export const candidateStatusLabels: Record<CandidateStatus, string> = {
  received: "Received",
  in_progress: "In progress",
  selected: "Selected",
  discarded: "Discarded",
};

export const candidateStageLabels: Record<CandidateStage, string> = {
  pending: "Pending review",
  review: "Under review",
  personal_interview: "Personal interview",
  technical_interview: "Technical interview",
  offer_presented: "Offer presented",
};

export const candidateStatuses = Object.keys(
  candidateStatusLabels,
) as CandidateStatus[];

export const candidateStages = Object.keys(
  candidateStageLabels,
) as CandidateStage[];

export function isCandidateStatus(
  value: string,
): value is CandidateStatus {
  return Object.prototype.hasOwnProperty.call(candidateStatusLabels, value);
}

export function isCandidateStage(value: string): value is CandidateStage {
  return Object.prototype.hasOwnProperty.call(candidateStageLabels, value);
}

export interface CandidateNote {
  id: string;
  record_id: string;
  content: string;
  created_at: string;
}

export interface Candidate {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  position: string;
  linkedin_url: string | null;
  cv_url: string | null;
  status: CandidateStatus;
  stage: CandidateStage;
  experience_years: number;
  applied_at: string;
  updated_at: string;
  notes_count: number;
}

export interface CandidateListResponse {
  total: number;
  page: number;
  limit: number;
  data: Candidate[];
}

export interface CandidateNotesResponse {
  data: CandidateNote[];
  meta: {
    total: number;
  };
}

export interface CandidateCreate {
  full_name: string;
  email: string;
  phone: string;
  position: string;
  linkedin_url?: string | null;
  cv_url?: string | null;
  experience_years: number;
}

export interface CandidatePatch {
  status?: CandidateStatus | null;
  stage?: CandidateStage | null;
}

export interface CandidateNoteCreate {
  content: string;
}