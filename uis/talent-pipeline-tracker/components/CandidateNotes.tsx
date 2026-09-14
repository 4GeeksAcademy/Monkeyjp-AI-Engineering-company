"use client";

import { FormEvent, useEffect, useState } from "react";

import {
  addCandidateNote,
  deleteCandidateNote,
  getCandidateNotes,
} from "@/services/candidates";

import type { CandidateNote } from "@/types/candidate";

interface CandidateNotesProps {
  candidateId: string;
  onNotesCountChange?: (count: number) => void;
}

export default function CandidateNotes({
  candidateId,
  onNotesCountChange,
}: CandidateNotesProps) {
  const [notes, setNotes] = useState<CandidateNote[]>([]);
  const [content, setContent] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    async function loadNotes() {
      try {
        setLoading(true);
        setError(null);

        const response = await getCandidateNotes(candidateId);

        setNotes(response.data);
        onNotesCountChange?.(response.meta.total);
      } catch (error) {
        setError(
          error instanceof Error ? error.message : "Unable to load notes.",
        );
      } finally {
        setLoading(false);
      }
    }

    loadNotes();
  }, [candidateId, onNotesCountChange]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedContent = content.trim();

    if (!trimmedContent) return;

    try {
      setSaving(true);
      setError(null);
      setSuccessMessage(null);

      const newNote = await addCandidateNote(candidateId, {
        content: trimmedContent,
      });

      const updatedNotes = [newNote, ...notes];

      setNotes(updatedNotes);
      onNotesCountChange?.(updatedNotes.length);

      setContent("");
      setSuccessMessage("Note added successfully.");
    } catch (error) {
      setError(error instanceof Error ? error.message : "Unable to add note.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(noteId: string) {
    try {
      setDeletingId(noteId);
      setError(null);
      setSuccessMessage(null);

      await deleteCandidateNote(candidateId, noteId);

      const updatedNotes = notes.filter((note) => note.id !== noteId);

      setNotes(updatedNotes);
      onNotesCountChange?.(updatedNotes.length);

      setSuccessMessage("Note deleted successfully.");
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Unable to delete note.",
      );
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <section className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[0_8px_24px_rgba(23,43,58,0.04)] max-[680px]:p-[18px]">
      <header className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h2 className="m-0 text-[1.05rem] tracking-[-0.02em] text-[var(--navy)]">
            Internal notes
          </h2>
          <p className="mt-[5px] text-[0.8rem] leading-[1.5] text-[var(--muted)]">
            Keep interview context and hiring decisions close to the record.
          </p>
        </div>
      </header>

      <form className="flex flex-col gap-2.5" onSubmit={handleSubmit}>
        <label
          className="text-[0.75rem] font-bold text-[var(--navy)]"
          htmlFor="candidate-note"
        >
          Add a note
        </label>

        <textarea
          className="min-h-[105px] w-full resize-y rounded-[7px] border border-[var(--border-strong)] bg-white p-[11px] text-[var(--foreground)] placeholder:text-[#8b96a2]"
          id="candidate-note"
          value={content}
          onChange={(event) => setContent(event.target.value)}
          placeholder="Write an internal note..."
          rows={4}
          required
        />

        <button
          className="inline-flex min-h-10 self-start items-center justify-center rounded-[7px] border border-[var(--brick)] bg-[var(--brick)] px-[15px] text-[0.83rem] font-bold text-white hover:border-[var(--brick-dark)] hover:bg-[var(--brick-dark)]"
          type="submit"
          disabled={saving}
        >
          {saving ? "Adding note..." : "Add note"}
        </button>
      </form>

      {error && (
        <div
          className="mb-4 rounded-[7px] bg-[#fff1f1] px-[13px] py-[11px] text-[0.8rem] text-[var(--danger)]"
          role="alert"
        >
          <p className="m-0">{error}</p>
        </div>
      )}

      {successMessage && (
        <div
          className="mb-4 rounded-[7px] bg-[#e7f5ed] px-[13px] py-[11px] text-[0.8rem] text-[var(--success)]"
          role="status"
        >
          <p className="m-0">{successMessage}</p>
        </div>
      )}

      {loading && (
        <div
          className="mt-6 flex min-h-[120px] flex-col items-center justify-center gap-[7px] rounded-xl border border-dashed border-[var(--border-strong)] bg-[var(--surface)] p-6 text-center text-[var(--muted)]"
          role="status"
        >
          <strong className="text-[0.95rem] text-[var(--navy)]">
            Loading notes
          </strong>
        </div>
      )}

      {!loading && notes.length === 0 && (
        <div className="mt-6 flex min-h-[120px] flex-col items-center justify-center gap-[7px] rounded-xl border border-dashed border-[var(--border-strong)] bg-[var(--surface)] p-6 text-center text-[var(--muted)]">
          <strong className="text-[0.95rem] text-[var(--navy)]">
            No internal notes yet
          </strong>
          <p className="m-0">Add the first note for this candidate.</p>
        </div>
      )}

      {!loading && notes.length > 0 && (
        <div className="mt-6 flex flex-col gap-2.5">
          {notes.map((note) => (
            <article
              className="rounded-lg border border-[var(--border)] bg-[#fafbfc] p-[13px]"
              key={note.id}
            >
              <p className="m-0 whitespace-pre-wrap text-[0.82rem] leading-[1.55] text-[var(--navy)]">
                {note.content}
              </p>

              <div className="mt-3 flex items-center justify-between">
                <p className="m-0 text-[0.7rem] text-[var(--muted)]">
                  {new Date(note.created_at).toLocaleString()}
                </p>

                <button
                  className="inline-flex min-h-8 items-center justify-center rounded-[7px] border border-transparent bg-transparent px-2 text-[0.75rem] font-bold text-[var(--muted)] hover:border-[#aeb8c2] hover:bg-[var(--surface-muted)]"
                  type="button"
                  disabled={deletingId === note.id}
                  onClick={() => handleDelete(note.id)}
                >
                  {deletingId === note.id ? "Deleting..." : "Delete note"}
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
