"""In-memory, process-local store for the latest incident analysis result.

Lost on restart and not shared across multiple worker processes.
Persistence is out of scope for this milestone.
"""
from typing import Optional

from packages.incident_analysis.metrics import AnalysisResult

_latest_result: Optional[AnalysisResult] = None


def set_latest_result(result: AnalysisResult) -> None:
    global _latest_result
    _latest_result = result


def get_latest_result() -> Optional[AnalysisResult]:
    return _latest_result
