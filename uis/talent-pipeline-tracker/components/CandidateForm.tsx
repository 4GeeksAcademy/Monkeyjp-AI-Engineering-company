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

type CandidateFormState = Omit<CandidateCreate, "experience_years"> & {
  experience_years: string;
};

const emptyForm: CandidateFormState = {
  full_name: "",
  email: "",
  phone: "",
  position: "",
  linkedin_url: "",
  cv_url: "",
  experience_years: "",
};

function getInitialFormState(
  initialValues?: CandidateCreate,
): CandidateFormState {
  if (!initialValues) {
    return emptyForm;
  }

  return {
    ...initialValues,
    experience_years: String(initialValues.experience_years),
  };
}

export default function CandidateForm({
  mode,
  candidateId,
  initialValues,
  returnUrl,
}: CandidateFormProps) {
  const router = useRouter();

  const [formData, setFormData] = useState<CandidateFormState>(() =>
    getInitialFormState(initialValues),
  );

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function updateField<K extends keyof CandidateFormState>(
    field: K,
    value: CandidateFormState[K],
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

      const experienceYears = Number(formData.experience_years);

      if (
        formData.experience_years.trim() === "" ||
        !Number.isInteger(experienceYears) ||
        experienceYears < 0
      ) {
        setError("Enter a valid number of years of experience.");
        setSaving(false);
        return;
      }

      const payload: CandidateCreate = {
        ...formData,
        experience_years: experienceYears,
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
    <div className="max-w-[820px] rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[0_8px_24px_rgba(23,43,58,0.04)] max-[680px]:p-[18px]">
      <header className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h2 className="m-0 text-[1.05rem] tracking-[-0.02em] text-[var(--navy)]">
            Candidate information
          </h2>
          <p className="mt-[5px] text-[0.8rem] leading-[1.5] text-[var(--muted)]">
            Required fields are marked with an asterisk.
          </p>
        </div>
      </header>

      <form
        className="grid grid-cols-2 gap-[18px] max-[680px]:flex max-[680px]:flex-col"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-[7px] max-[680px]:basis-full">
          <label
            className="text-[0.75rem] font-bold text-[var(--navy)]"
            htmlFor="full_name"
          >
            Full name <span className="form-required">*</span>
          </label>
          <input
            className="min-h-10 w-full rounded-[7px] border border-[var(--border-strong)] bg-white px-[11px] text-[var(--foreground)] placeholder:text-[#8b96a2]"
            id="full_name"
            type="text"
            value={formData.full_name}
            onChange={(event) => updateField("full_name", event.target.value)}
            required
          />
        </div>

        <div className="flex flex-col gap-[7px]">
          <label
            className="text-[0.75rem] font-bold text-[var(--navy)]"
            htmlFor="email"
          >
            Email <span className="form-required">*</span>
          </label>
          <input
            className="min-h-10 w-full rounded-[7px] border border-[var(--border-strong)] bg-white px-[11px] text-[var(--foreground)] placeholder:text-[#8b96a2]"
            id="email"
            type="email"
            value={formData.email}
            onChange={(event) => updateField("email", event.target.value)}
            required
          />
        </div>

        <div className="flex flex-col gap-[7px]">
          <label
            className="text-[0.75rem] font-bold text-[var(--navy)]"
            htmlFor="phone"
          >
            Phone <span className="form-required">*</span>
          </label>
          <input
            className="min-h-10 w-full rounded-[7px] border border-[var(--border-strong)] bg-white px-[11px] text-[var(--foreground)] placeholder:text-[#8b96a2]"
            id="phone"
            type="tel"
            value={formData.phone}
            onChange={(event) => updateField("phone", event.target.value)}
            required
          />
        </div>

        <div className="flex flex-col gap-[7px] max-[680px]:basis-full">
          <label
            className="text-[0.75rem] font-bold text-[var(--navy)]"
            htmlFor="position"
          >
            Position <span className="form-required">*</span>
          </label>
          <input
            className="min-h-10 w-full rounded-[7px] border border-[var(--border-strong)] bg-white px-[11px] text-[var(--foreground)] placeholder:text-[#8b96a2]"
            id="position"
            type="text"
            value={formData.position}
            onChange={(event) => updateField("position", event.target.value)}
            required
          />
        </div>

        <div className="flex flex-col gap-[7px]">
          <label
            className="text-[0.75rem] font-bold text-[var(--navy)]"
            htmlFor="experience_years"
          >
            Years of experience <span className="form-required">*</span>
          </label>

          <input
            className="min-h-10 w-full rounded-[7px] border border-[var(--border-strong)] bg-white px-[11px] text-[var(--foreground)] placeholder:text-[#8b96a2]"
            id="experience_years"
            type="number"
            min="0"
            step="1"
            value={formData.experience_years}
            onChange={(event) =>
              updateField("experience_years", event.target.value)
            }
            required
          />
        </div>

        <div className="flex flex-col gap-[7px]">
          <label
            className="text-[0.75rem] font-bold text-[var(--navy)]"
            htmlFor="linkedin_url"
          >
            LinkedIn URL
          </label>

          <input
            className="min-h-10 w-full rounded-[7px] border border-[var(--border-strong)] bg-white px-[11px] text-[var(--foreground)] placeholder:text-[#8b96a2]"
            id="linkedin_url"
            type="url"
            value={formData.linkedin_url ?? ""}
            onChange={(event) =>
              updateField("linkedin_url", event.target.value)
            }
          />
        </div>

        <div className="flex flex-col gap-[7px]">
          <label
            className="text-[0.75rem] font-bold text-[var(--navy)]"
            htmlFor="cv_url"
          >
            CV URL
          </label>

          <input
            className="min-h-10 w-full rounded-[7px] border border-[var(--border-strong)] bg-white px-[11px] text-[var(--foreground)] placeholder:text-[#8b96a2]"
            id="cv_url"
            type="url"
            value={formData.cv_url ?? ""}
            onChange={(event) => updateField("cv_url", event.target.value)}
          />
        </div>

        {error && (
          <div
            className="col-span-full mb-0 rounded-[7px] bg-[#fff1f1] px-[13px] py-[11px] text-[0.8rem] text-[var(--danger)]"
            role="alert"
          >
            <p className="m-0">{error}</p>
          </div>
        )}

        <div className="col-span-full mt-1 flex justify-end border-t border-[#edf0f2] pt-5 max-[680px]:justify-stretch">
          <button
            className="inline-flex min-h-10 items-center justify-center rounded-[7px] border border-[var(--brick)] bg-[var(--brick)] px-[15px] text-[0.83rem] font-bold text-white hover:border-[var(--brick-dark)] hover:bg-[var(--brick-dark)] max-[680px]:w-full"
            type="submit"
            disabled={saving}
          >
            {saving
              ? "Saving..."
              : mode === "create"
                ? "Create candidate"
                : "Save changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
