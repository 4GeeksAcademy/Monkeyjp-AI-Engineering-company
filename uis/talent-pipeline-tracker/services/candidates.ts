import type {
  Candidate,
  CandidateCreate,
  CandidateListResponse,
  CandidateNote,
  CandidateNoteCreate,
  CandidateNotesResponse,
  CandidatePatch,
  CandidateStage,
  CandidateStatus,
} from "@/types/candidate";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
  throw new Error("NEXT_PUBLIC_API_URL is not defined");
}

interface GetCandidatesParams {
  status?: CandidateStatus;
  stage?: CandidateStage;
  search?: string;
  page?: number;
  limit?: number;
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    let message = `Request failed with status ${response.status}`;

    try {
      const errorData = await response.json();

      if (typeof errorData?.detail === "string") {
        message = errorData.detail;
      }
    } catch {
      // Keep the default error message.
    }

    throw new Error(message);
  }

  return response.json() as Promise<T>;
}

export async function getCandidates(
  params: GetCandidatesParams = {},
): Promise<CandidateListResponse> {
  const searchParams = new URLSearchParams();

  if (params.status) {
    searchParams.set("status", params.status);
  }

  if (params.stage) {
    searchParams.set("stage", params.stage);
  }

  if (params.search) {
    searchParams.set("search", params.search);
  }

  if (params.page) {
    searchParams.set("page", params.page.toString());
  }

  if (params.limit) {
    searchParams.set("limit", params.limit.toString());
  }

  const query = searchParams.toString();
  const url = query ? `${API_URL}/records?${query}` : `${API_URL}/records`;

  const response = await fetch(url);

  return handleResponse<CandidateListResponse>(response);
}

export async function getCandidate(id: string): Promise<Candidate> {
  const response = await fetch(`${API_URL}/records/${id}`);

  return handleResponse<Candidate>(response);
}

export async function createCandidate(
  candidate: CandidateCreate,
): Promise<Candidate> {
  const response = await fetch(`${API_URL}/records`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(candidate),
  });

  return handleResponse<Candidate>(response);
}

export async function replaceCandidate(
  id: string,
  candidate: CandidateCreate,
): Promise<Candidate> {
  const response = await fetch(`${API_URL}/records/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(candidate),
  });

  return handleResponse<Candidate>(response);
}

export async function patchCandidate(
  id: string,
  patch: CandidatePatch,
): Promise<Candidate> {
  const response = await fetch(`${API_URL}/records/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(patch),
  });

  return handleResponse<Candidate>(response);
}

export async function getCandidateNotes(
  id: string,
): Promise<CandidateNotesResponse> {
  const response = await fetch(`${API_URL}/records/${id}/notes`);

  return handleResponse<CandidateNotesResponse>(response);
}

export async function addCandidateNote(
  id: string,
  note: CandidateNoteCreate,
): Promise<CandidateNote> {
  const response = await fetch(`${API_URL}/records/${id}/notes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(note),
  });

  return handleResponse<CandidateNote>(response);
}

export async function deleteCandidateNote(
  id: string,
  noteId: string,
): Promise<void> {
  const response = await fetch(
    `${API_URL}/records/${id}/notes/${noteId}`,
    {
      method: "DELETE",
    },
  );

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }
}