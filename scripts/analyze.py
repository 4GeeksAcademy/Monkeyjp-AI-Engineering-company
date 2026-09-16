#!/usr/bin/env python3
"""CLI adapter for Brasaland incident-report analysis.

Reusable analysis logic lives in `packages/incident_analysis` so it can later
be imported by the FastAPI backend without duplication. This script only
handles argument parsing, I/O and the export prompt.
"""
import argparse
import csv
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from packages.incident_analysis import analyze, build_console_report, build_export_rows

DEFAULT_EXPORT_FILENAME = "results.csv"


def parse_args(argv=None) -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Validate and summarise a Brasaland incident-report CSV."
    )
    parser.add_argument("csv_path", help="Path to the incidents CSV file")
    return parser.parse_args(argv)


def read_rows(csv_path: Path):
    with csv_path.open(newline="", encoding="utf-8") as csv_file:
        return list(csv.DictReader(csv_file))


def export_results(result, export_path: Path) -> None:
    with export_path.open("w", newline="", encoding="utf-8") as csv_file:
        writer = csv.writer(csv_file)
        writer.writerow(["metric", "value", "percentage"])
        writer.writerows(build_export_rows(result))


def main(argv=None) -> int:
    args = parse_args(argv)
    csv_path = Path(args.csv_path)

    if not csv_path.is_file():
        print(f"Error: file not found: {csv_path}", file=sys.stderr)
        return 1

    rows = read_rows(csv_path)
    result = analyze(rows)

    print(build_console_report(result, csv_path.name))

    answer = input("Export results to CSV? [y / n]: ").strip().lower()
    if answer == "y":
        export_path = csv_path.parent / DEFAULT_EXPORT_FILENAME
        export_results(result, export_path)
        print(f"Results exported to {export_path}")

    return 0


if __name__ == "__main__":
    sys.exit(main())
