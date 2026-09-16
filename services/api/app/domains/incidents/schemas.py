"""Pydantic response schemas for the incidents domain.

These schemas only reshape data already produced by
`packages.incident_analysis`; no validation or aggregation logic lives here.
"""
from typing import Dict

from pydantic import BaseModel


class AnalysisSummary(BaseModel):
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
