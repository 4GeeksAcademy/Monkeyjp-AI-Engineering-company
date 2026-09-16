"""Domain constants for Brasaland incident records.

Values mirror `docs/incidents-analysis/CONTEXT-brasaland.md`.
"""

VALID_LOCATION_IDS = frozenset(
    [f"COL-{i:02d}" for i in range(1, 11)] + [f"FLA-{i:02d}" for i in range(1, 5)]
)

VALID_CATEGORIES = (
    "CUSTOMER_COMPLAINT",
    "EQUIPMENT",
    "SUPPLY",
    "FOOD_QUALITY",
    "STAFF",
)

VALID_STATUSES = ("OPEN", "CLOSED", "DISCARDED")

MIN_DESCRIPTION_LENGTH = 5

REQUIRED_FIELDS = (
    "incident_id",
    "date",
    "location_id",
    "category",
    "description",
    "status",
    "reporter_id",
)
