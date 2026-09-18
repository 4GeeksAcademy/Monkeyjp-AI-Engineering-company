"""HTTP transport layer for the incidents domain."""
import csv
import io

from fastapi import APIRouter, File, HTTPException, UploadFile
from fastapi.responses import StreamingResponse

from models.incidents import AnalysisSummary
from repositories import incidents as repository
from services import incidents as service

router = APIRouter(prefix="/api/incidents", tags=["incidents"])


@router.post("/analyze", response_model=AnalysisSummary)
async def analyze_incidents(file: UploadFile = File(...)) -> AnalysisSummary:
    raw_bytes = await file.read()

    try:
        result = service.analyze_upload(raw_bytes)
    except service.InvalidUploadError as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc

    repository.set_latest_result(result)

    return AnalysisSummary(
        total_records=result.total_records,
        valid_count=result.valid_count,
        invalid_count=result.invalid_count,
        invalid_breakdown=result.invalid_breakdown,
        category_counts=result.category_counts,
        status_counts=result.status_counts,
        satisfaction_counts=result.satisfaction_counts,
        scored_closed_count=result.scored_closed_count,
        closed_count=result.closed_count,
        satisfaction_average=result.satisfaction_average,
    )


@router.get("/results/export")
async def export_latest_result() -> StreamingResponse:
    result = repository.get_latest_result()
    if result is None:
        raise HTTPException(status_code=404, detail="No analysis has been run yet.")

    buffer = io.StringIO()
    writer = csv.writer(buffer)
    writer.writerow(["metric", "value", "percentage"])
    writer.writerows(service.export_rows_for(result))
    buffer.seek(0)

    return StreamingResponse(
        buffer,
        media_type="text/csv",
        headers={"Content-Disposition": "attachment; filename=results.csv"},
    )
