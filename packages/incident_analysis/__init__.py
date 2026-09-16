"""Reusable Brasaland incident-report analysis logic.

This package contains no I/O or CLI code so it can be imported both by
``scripts/analyze.py`` and, in a future milestone, by ``services/api``.
"""
from .metrics import AnalysisResult, analyze
from .report import build_console_report, build_export_rows

__all__ = [
    "AnalysisResult",
    "analyze",
    "build_console_report",
    "build_export_rows",
]
