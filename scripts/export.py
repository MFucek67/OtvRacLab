from pathlib import Path
import subprocess

BASE_DIR = Path(__file__).resolve().parent
EXPORT_DIR = BASE_DIR.parent / "exports"

MONGOSH = "mongosh"
MONGODB_URI = "mongodb://localhost:27017"

def main():
    try:
        with open((EXPORT_DIR / "football_clubs.csv"), "w", encoding="utf-8") as file:
            subprocess.run([MONGOSH, MONGODB_URI, "--file", f"{BASE_DIR}/export_csv.js"], stdout=file, check=True)
        with open((EXPORT_DIR / "football_clubs.json"), "w", encoding="utf-8") as file:
            subprocess.run([MONGOSH, MONGODB_URI, "--file", f"{BASE_DIR}/export_json.js"], stdout=file, check=True)

        print("Database converted to JSON and CSV formats!")
    except subprocess.CalledProcessError as err:
        print(f"Database convertion failed! Returncode: {err.returncode}")
    except FileNotFoundError as err:
        print(f"Required file not found: {err}")

if __name__ == "__main__":
    main()
