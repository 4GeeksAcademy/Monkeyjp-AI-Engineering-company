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
    <section>
      <h2>Internal notes</h2>

      <form onSubmit={handleSubmit}>
        <label htmlFor="candidate-note">Add note</label>

        <textarea
          id="candidate-note"
          value={content}
          onChange={(event) => setContent(event.target.value)}
          placeholder="Write an internal note..."
          rows={4}
          required
        />

        <button type="submit" disabled={saving}>
          {saving ? "Adding note..." : "Add note"}
        </button>
      </form>

      {error && (
        <div role="alert">
          <p>{error}</p>
        </div>
      )}

      {successMessage && <p role="status">{successMessage}</p>}

      {loading && <p>Loading notes...</p>}

      {!loading && notes.length === 0 && <p>No internal notes yet.</p>}

      {!loading && notes.length > 0 && (
        <div>
          {notes.map((note) => (
            <article key={note.id}>
              <p>{note.content}</p>

              <p>{new Date(note.created_at).toLocaleString()}</p>

              <button
                type="button"
                disabled={deletingId === note.id}
                onClick={() => handleDelete(note.id)}
              >
                {deletingId === note.id ? "Deleting..." : "Delete note"}
              </button>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
