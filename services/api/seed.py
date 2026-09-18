"""Seed the Brasaland supplier directory."""
from services.suppliers import seed_suppliers


def main() -> None:
    inserted = seed_suppliers()
    print(f"Inserted {inserted} supplier records.")


if __name__ == "__main__":
    main()