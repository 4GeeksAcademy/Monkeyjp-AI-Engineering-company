"""Aggregate metrics computed from validated Brasaland incident rows."""
from dataclasses import dataclass, field
from typing import Dict, Iterable, List

from .models import VALID_CATEGORIES, VALID_STATUSES
from .validation import RULES, validate_record


@dataclass
class AnalysisResult:
    total_records: int
    valid_count: int
    invalid_count: int
    invalid_breakdown: Dict[str, int]
    category_counts: Dict[str, int]
    status_counts: Dict[str, int]
    satisfaction_counts: Dict[int, int]
    scored_closed_count: int
    closed_count: int
    satisfaction_average: float
    invalid_rows: List[Dict[str, str]] = field(default_factory=list)


def analyze(rows: Iterable[Dict[str, str]]) -> AnalysisResult:
    """Validate and summarise incident rows.

    Invalid rows are excluded from the category/status/satisfaction
    aggregates but each triggered rule is still counted.
    """
    rows = list(rows)

    invalid_breakdown = {rule.key: 0 for rule in RULES}
    category_counts = {category: 0 for category in VALID_CATEGORIES}
    status_counts = {status: 0 for status in VALID_STATUSES}
    satisfaction_counts = {score: 0 for score in range(1, 6)}

    valid_count = 0
    invalid_count = 0
    invalid_rows: List[Dict[str, str]] = []
    scored_closed_count = 0
    satisfaction_total = 0

    for row in rows:
        triggered_rules = validate_record(row)

        if triggered_rules:
            invalid_count += 1
            invalid_rows.append(row)
            for rule_key in triggered_rules:
                invalid_breakdown[rule_key] += 1
            continue

        valid_count += 1
        category_counts[row["category"].strip()] += 1
        status_counts[row["status"].strip()] += 1

        if row["status"].strip() == "CLOSED":
            score = int(row["satisfaction_score"].strip())
            satisfaction_counts[score] += 1
            scored_closed_count += 1
            satisfaction_total += score

    closed_count = status_counts["CLOSED"]
    satisfaction_average = (
        round(satisfaction_total / scored_closed_count, 2) if scored_closed_count else 0.0
    )

    return AnalysisResult(
        total_records=len(rows),
        valid_count=valid_count,
        invalid_count=invalid_count,
        invalid_breakdown=invalid_breakdown,
        category_counts=category_counts,
        status_counts=status_counts,
        satisfaction_counts=satisfaction_counts,
        scored_closed_count=scored_closed_count,
        closed_count=closed_count,
        satisfaction_average=satisfaction_average,
        invalid_rows=invalid_rows,
    )
