"""Row-level validation for Brasaland incident records.

Each rule below corresponds to a row of the "Rules for Invalid Records" table
in `docs/incidents-analysis/CONTEXT-brasaland.md`, plus the required-field and
status checks confirmed for this milestone. A record can trigger more than one
rule; each triggered rule is reported individually, but the record itself only
counts once toward the total invalid-record count.
"""
from typing import Dict, List, NamedTuple

from .models import (
    MIN_DESCRIPTION_LENGTH,
    VALID_CATEGORIES,
    VALID_LOCATION_IDS,
    VALID_STATUSES,
)


class ValidationRule(NamedTuple):
    key: str
    label: str


RULES = (
    ValidationRule("missing_incident_id", "Missing incident_id"),
    ValidationRule("missing_date", "Missing date"),
    ValidationRule("missing_location_id", "Missing location_id"),
    ValidationRule("invalid_category", "Invalid or missing category"),
    ValidationRule("invalid_status", "Invalid or missing status"),
    ValidationRule("empty_description", "Empty description"),
    ValidationRule("missing_reporter_id", "Missing reporter_id"),
    ValidationRule("closed_without_score", "Closed case, no score"),
    ValidationRule("score_out_of_range", "Satisfaction score out of range"),
)

RULE_LABELS = {rule.key: rule.label for rule in RULES}


def _is_blank(value: str) -> bool:
    return not value or not value.strip()


def _parse_score(raw_score: str):
    """Return the parsed integer score, or None if blank/unparseable."""
    if _is_blank(raw_score):
        return None
    try:
        return int(raw_score.strip())
    except ValueError:
        return None


def validate_record(row: Dict[str, str]) -> List[str]:
    """Return the list of rule keys triggered by this raw CSV row."""
    triggered: List[str] = []

    incident_id = row.get("incident_id", "")
    date = row.get("date", "")
    location_id = row.get("location_id", "")
    category = row.get("category", "")
    description = row.get("description", "")
    status = row.get("status", "")
    reporter_id = row.get("reporter_id", "")
    raw_score = row.get("satisfaction_score", "")

    if _is_blank(incident_id):
        triggered.append("missing_incident_id")

    if _is_blank(date):
        triggered.append("missing_date")

    if _is_blank(location_id) or location_id.strip() not in VALID_LOCATION_IDS:
        triggered.append("missing_location_id")

    if _is_blank(category) or category.strip() not in VALID_CATEGORIES:
        triggered.append("invalid_category")

    if _is_blank(status) or status.strip() not in VALID_STATUSES:
        triggered.append("invalid_status")

    if _is_blank(description) or len(description.strip()) < MIN_DESCRIPTION_LENGTH:
        triggered.append("empty_description")

    if _is_blank(reporter_id):
        triggered.append("missing_reporter_id")

    score = _parse_score(raw_score)

    if status.strip() == "CLOSED" and _is_blank(raw_score):
        triggered.append("closed_without_score")

    if not _is_blank(raw_score) and (score is None or not 1 <= score <= 5):
        triggered.append("score_out_of_range")

    return triggered
