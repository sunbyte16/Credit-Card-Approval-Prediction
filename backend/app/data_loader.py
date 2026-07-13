import pandas as pd
import os


def load_data(file_path: str = os.path.join(os.path.dirname(__file__), '../../creditcard.csv')):
    """Load the dataset from CSV file"""
    if not os.path.exists(file_path):
        raise FileNotFoundError(f"Dataset not found at {file_path}")
    
    df = pd.read_csv(file_path)
    return df


def inspect_data(df: pd.DataFrame):
    """Generate data inspection report"""
    print("=== Dataset Shape ===")
    print(f"Number of rows: {df.shape[0]}")
    print(f"Number of columns: {df.shape[1]}")
    
    print("\n=== First 5 Rows ===")
    print(df.head())
    
    print("\n=== Dataset Info ===")
    print(df.info())
    
    print("\n=== Descriptive Statistics ===")
    print(df.describe())
    
    print("\n=== Missing Values ===")
    print(df.isnull().sum())
    
    return {
        'shape': df.shape,
        'columns': df.columns.tolist(),
        'dtypes': df.dtypes.to_dict(),
        'missing_values': df.isnull().sum().to_dict()
    }


if __name__ == "__main__":
    df = load_data()
    inspect_data(df)
