"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

import { createCandidate, replaceCandidate } from "@/services/candidates";

import type { CandidateCreate } from "@/types/candidate";

interface CandidateFormProps {
  mode: "create" | "edit";
  candidateId?: string;
  initialValues?: CandidateCreate;
  returnUrl?: string;
}

const emptyForm: CandidateCreate = {
  full_name: "",
  email: "",
  phone: "",
  position: "",
  linkedin_url: "",
  cv_url: "",
  experience_years: 0,
};

export default function CandidateForm({
  mode,
  candidateId,
  initialValues,
  returnUrl,
}: CandidateFormProps) {
  const router = useRouter();

  const [formData, setFormData] = useState<CandidateCreate>(
    initialValues ?? emptyForm,
  );

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function updateField<K extends keyof CandidateCreate>(
    field: K,
    value: CandidateCreate[K],
  ) {
    setFormData((current) => ({
      ...current,
      [field]: value,
    }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      setSaving(true);
      setError(null);

      const payload: CandidateCreate = {
        ...formData,
        linkedin_url: formData.linkedin_url || null,
        cv_url: formData.cv_url || null,
      };

      if (mode === "create") {
        const createdCandidate = await createCandidate(payload);

        router.push(`/candidates/${createdCandidate.id}`);
        return;
      }

      if (!candidateId) {
        throw new Error("Candidate ID is required for editing.");
      }

      const updatedCandidate = await replaceCandidate(candidateId, payload);

      const detailUrl = returnUrl
        ? `/candidates/${updatedCandidate.id}?from=${encodeURIComponent(
            returnUrl,
          )}`
        : `/candidates/${updatedCandidate.id}`;

      router.push(detailUrl);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Unable to save candidate.",
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="full_name">Full name</label>
        <input
          id="full_name"
          type="text"
          value={formData.full_name}
          onChange={(event) => updateField("full_name", event.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={formData.email}
          onChange={(event) => updateField("email", event.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="phone">Phone</label>
        <input
          id="phone"
          type="tel"
          value={formData.phone}
          onChange={(event) => updateField("phone", event.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="position">Position</label>
        <input
          id="position"
          type="text"
          value={formData.position}
          onChange={(event) => updateField("position", event.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="experience_years">Years of experience</label>

        <input
          id="experience_years"
          type="number"
          min="0"
          step="0.5"
          value={formData.experience_years}
          onChange={(event) =>
            updateField("experience_years", Number(event.target.value))
          }
          required
        />
      </div>

      <div>
        <label htmlFor="linkedin_url">LinkedIn URL</label>

        <input
          id="linkedin_url"
          type="url"
          value={formData.linkedin_url ?? ""}
          onChange={(event) => updateField("linkedin_url", event.target.value)}
        />
      </div>

      <div>
        <label htmlFor="cv_url">CV URL</label>

        <input
          id="cv_url"
          type="url"
          value={formData.cv_url ?? ""}
          onChange={(event) => updateField("cv_url", event.target.value)}
        />
      </div>

      {error && (
        <div role="alert">
          <p>{error}</p>
        </div>
      )}

      <button type="submit" disabled={saving}>
        {saving
          ? "Saving..."
          : mode === "create"
            ? "Create candidate"
            : "Save changes"}
      </button>
    </form>
  );
}
