"""Thin adapter around `packages.incident_analysis` for the incidents domain.

This module performs upload parsing (bytes -> CSV rows) and delegates all
record-level/business validation and aggregation to the reusable package.
"""
import csv
import io
from typing import Dict, List, Sequence, Tuple

from packages.incident_analysis import analyze, build_export_rows
from packages.incident_analysis.metrics import AnalysisResult
from packages.incident_analysis.models import REQUIRED_FIELDS


class InvalidUploadError(ValueError):
    """Raised when the uploaded file cannot be read as an incidents CSV."""


def parse_csv_rows(raw_bytes: bytes) -> List[Dict[str, str]]:
    if not raw_bytes:
        raise InvalidUploadError("Uploaded file is empty.")

    try:
        text = raw_bytes.decode("utf-8")
    except UnicodeDecodeError as exc:
        raise InvalidUploadError("Uploaded file must be UTF-8 encoded.") from exc

    reader = csv.DictReader(io.StringIO(text))
    fieldnames = reader.fieldnames or []
    missing_headers = [field for field in REQUIRED_FIELDS if field not in fieldnames]
    if missing_headers:
        raise InvalidUploadError(
            f"CSV is missing required headers: {', '.join(missing_headers)}"
        )

    rows = list(reader)
    if not rows:
        raise InvalidUploadError("CSV contains no data rows.")

    return rows


def analyze_upload(raw_bytes: bytes) -> AnalysisResult:
    rows = parse_csv_rows(raw_bytes)
    return analyze(rows)


def export_rows_for(result: AnalysisResult) -> Sequence[Tuple[str, object, object]]:
    return build_export_rows(result)
