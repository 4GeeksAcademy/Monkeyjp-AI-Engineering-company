"""Console and CSV-export formatting for incident analysis results."""
from typing import List, Tuple

from .metrics import AnalysisResult
from .validation import RULES


def _pct(part: int, whole: int) -> float:
    return round((part / whole) * 100, 1) if whole else 0.0


def build_console_report(result: AnalysisResult, source_file: str) -> str:
    lines = [
        "=" * 60,
        "  BRASALAND — INCIDENT REPORT ANALYSIS",
        f"  Source file: {source_file}",
        "=" * 60,
        "",
        f"TOTAL RECORDS IN FILE .......... {result.total_records}",
        f"  ├─ Valid records ................ {result.valid_count}",
        f"  └─ Invalid / incomplete .......... {result.invalid_count}",
        "",
        "INVALID RECORDS BREAKDOWN",
    ]

    for index, rule in enumerate(RULES):
        prefix = "  └─" if index == len(RULES) - 1 else "  ├─"
        lines.append(f"{prefix} {rule.label} ... {result.invalid_breakdown[rule.key]}")

    lines += ["", "BREAKDOWN BY CATEGORY (valid records)"]
    categories = list(result.category_counts.items())
    for index, (category, count) in enumerate(categories):
        prefix = "  └─" if index == len(categories) - 1 else "  ├─"
        lines.append(f"{prefix} {category} ... {count}  ({_pct(count, result.valid_count)}%)")

    lines += ["", "BREAKDOWN BY STATUS (valid records)"]
    statuses = list(result.status_counts.items())
    for index, (status, count) in enumerate(statuses):
        prefix = "  └─" if index == len(statuses) - 1 else "  ├─"
        lines.append(f"{prefix} {status} ... {count}  ({_pct(count, result.valid_count)}%)")

    lines += [
        "",
        "SATISFACTION INDEX (closed cases)",
        f"  Scored cases: {result.scored_closed_count} of {result.closed_count}",
        f"  Average score: {result.satisfaction_average:.2f} / 5.00",
    ]
    score_labels = {
        1: "Very dissatisfied",
        2: "Dissatisfied",
        3: "Neutral",
        4: "Satisfied",
        5: "Very satisfied",
    }
    for index, score in enumerate(range(1, 6)):
        prefix = "  └─" if index == 4 else "  ├─"
        count = result.satisfaction_counts[score]
        lines.append(f"{prefix} Score {score} ({score_labels[score]}) ... {count}")

    lines += ["", "=" * 60]
    return "\n".join(lines)


def build_export_rows(result: AnalysisResult) -> List[Tuple[str, object, object]]:
    """Return (metric, value, percentage) rows for CSV export."""
    rows: List[Tuple[str, object, object]] = [
        ("total_records", result.total_records, ""),
        ("valid_records", result.valid_count, ""),
        ("invalid_records", result.invalid_count, ""),
    ]

    for rule in RULES:
        rows.append((f"invalid_{rule.key}", result.invalid_breakdown[rule.key], ""))

    for category, count in result.category_counts.items():
        rows.append((f"category_{category}", count, _pct(count, result.valid_count)))

    for status, count in result.status_counts.items():
        rows.append((f"status_{status}", count, _pct(count, result.valid_count)))

    rows.append(("satisfaction_scored_cases", result.scored_closed_count, ""))
    rows.append(("satisfaction_average", result.satisfaction_average, ""))

    for score, count in result.satisfaction_counts.items():
        rows.append(
            (f"satisfaction_score_{score}", count, _pct(count, result.scored_closed_count))
        )

    return rows
