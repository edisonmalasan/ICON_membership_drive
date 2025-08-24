import requests
import pandas as pd
import json
from typing import Dict, Any

def push_member_to_api(member_data: Dict[str, Any], api_url: str, headers: Dict[str, str] = None) -> bool:
    """
    Push a single member's data to the API endpoint.
    
    Args:
        member_data: Dictionary containing member information
        api_url: API endpoint URL for member creation
        headers: Optional headers for authentication
    
    Returns:
        bool: True if successful, False otherwise
    """
    try:
        response = requests.post(api_url, json=member_data, headers=headers)
        response.raise_for_status()
        print(f"✅ Successfully added: {member_data.get('name', 'Unknown')} (ID: {member_data.get('id', 'N/A')})")
        return True
    except requests.exceptions.RequestException as e:
        error_msg = str(e)
        if hasattr(e, 'response') and e.response is not None:
            try:
                error_detail = e.response.json()
                error_msg = error_detail.get('error', error_msg)
            except:
                error_msg = e.response.text or error_msg
        print(f"❌ Failed to add {member_data.get('name', 'Unknown')} (ID: {member_data.get('id', 'N/A')}): {error_msg}")
        return False

def transform_member_data(row: pd.Series) -> Dict[str, Any]:
    """
    Transform CSV row data to match API schema.
    
    Args:
        row: Pandas Series containing member data from CSV
    
    Returns:
        dict: Transformed member data for API
    """
    # Merge first name and last name
    first_name = str(row.get('FIRST NAME', '')).strip()
    last_name = str(row.get('LAST NAME', '')).strip()
    full_name = f"{first_name} {last_name}".strip()
    
    # Map CSV columns to API schema
    member_data = {
        "id": str(row.get('ID NUMBER', '')).strip(),
        "name": full_name,
        "year": int(row.get('YEAR', 1)),  # Convert to number
        "course": str(row.get('COURSE', '')).strip(),
        "emailRequired": False  # Since we don't have emails in CSV, bypass email requirement
    }
    
    # Remove empty values
    member_data = {k: v for k, v in member_data.items() if v != '' and pd.notna(v)}
    
    return member_data

def ingest_members_from_csv(csv_file_path: str, api_url: str, headers: Dict[str, str] = None):
    """
    Read cleaned member data from CSV and push to API.
    
    Args:
        csv_file_path: Path to the cleaned CSV file
        api_url: API endpoint URL for member creation
        headers: Optional headers for authentication
    """
    try:
        # Read the CSV file
        df = pd.read_csv(csv_file_path)
        
        print(f"Found {len(df)} members in CSV file")
        print("Sample data structure:")
        print(df.head(2))
        print(f"Columns: {list(df.columns)}")
        print()
        
        successful_count = 0
        failed_count = 0
        
        # Iterate through each row and push to API
        for index, row in df.iterrows():
            try:
                # Transform the data to match API schema
                member_data = transform_member_data(row)
                
                print(f"Processing member {index + 1}/{len(df)}: {member_data.get('name', 'Unknown')}")
                
                if push_member_to_api(member_data, api_url, headers):
                    successful_count += 1
                else:
                    failed_count += 1
                    
            except Exception as e:
                print(f"Error processing row {index + 1}: {e}")
                failed_count += 1
        
        print(f"\nIngestion complete:")
        print(f"Successful: {successful_count}")
        print(f"Failed: {failed_count}")
        
    except FileNotFoundError:
        print(f"Error: CSV file not found at {csv_file_path}")
    except Exception as e:
        print(f"Error reading CSV file: {e}")

if __name__ == "__main__":
    # Configuration
    CSV_FILE_PATH = "./cleaned_data.csv"  
    API_URL = "http://localhost:3000/api/v2/members"  
    
    headers = {
        "Content-Type": "application/json",
        "secret_key": ""  # For superuser access
        # "Authorization": "Bearer your_token_here"  # Uncomment if using JWT auth
    }
    
    print("Starting member ingestion from CSV...")
    print(f"CSV File: {CSV_FILE_PATH}")
    print(f"API URL: {API_URL}")
    print()
    
    # Run the ingestion
    ingest_members_from_csv(CSV_FILE_PATH, API_URL, headers)