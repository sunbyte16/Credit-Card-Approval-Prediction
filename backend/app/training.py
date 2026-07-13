import pandas as pd
import numpy as np
from sklearn.linear_model import LogisticRegression
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier
from xgboost import XGBClassifier
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, roc_auc_score, confusion_matrix
import joblib
import os
import sys
sys.path.insert(0, os.path.dirname(__file__))
from data_loader import load_data
from preprocessing import preprocess_data


def train_models(X_train, X_test, y_train, y_test):
    """Train and evaluate multiple models"""
    models = {
        'Logistic Regression': LogisticRegression(random_state=42, max_iter=1000),
        'Decision Tree': DecisionTreeClassifier(random_state=42),
        'Random Forest': RandomForestClassifier(random_state=42, n_estimators=100),
        'XGBoost': XGBClassifier(random_state=42, use_label_encoder=False, eval_metric='logloss')
    }
    
    results = []
    
    for name, model in models.items():
        print(f"\nTraining {name}...")
        model.fit(X_train, y_train)
        
        # Predictions
        y_pred = model.predict(X_test)
        y_pred_proba = model.predict_proba(X_test)[:, 1]
        
        # Metrics
        accuracy = accuracy_score(y_test, y_pred)
        precision = precision_score(y_test, y_pred)
        recall = recall_score(y_test, y_pred)
        f1 = f1_score(y_test, y_pred)
        roc_auc = roc_auc_score(y_test, y_pred_proba)
        
        results.append({
            'Model': name,
            'Accuracy': accuracy,
            'Precision': precision,
            'Recall': recall,
            'F1 Score': f1,
            'ROC AUC': roc_auc
        })
        
        print(f"Accuracy: {accuracy:.4f}")
        print(f"Precision: {precision:.4f}")
        print(f"Recall: {recall:.4f}")
        print(f"F1 Score: {f1:.4f}")
        print(f"ROC AUC: {roc_auc:.4f}")
    
    # Create comparison DataFrame
    comparison_df = pd.DataFrame(results)
    print("\n=== Model Comparison ===")
    print(comparison_df)
    
    # Select best model based on F1 Score
    best_model_idx = comparison_df['F1 Score'].idxmax()
    best_model_name = comparison_df.iloc[best_model_idx]['Model']
    best_model = models[best_model_name]
    
    print(f"\nBest model: {best_model_name}")
    
    # Save best model
    model_dir = os.path.join(os.path.dirname(__file__), '../../models')
    os.makedirs(model_dir, exist_ok=True)
    joblib.dump(best_model, os.path.join(model_dir, 'best_model.pkl'))
    print(f"Model saved as {os.path.join(model_dir, 'best_model.pkl')}")
    
    return comparison_df, best_model, best_model_name


if __name__ == "__main__":
    # Load and preprocess data
    df = load_data()
    X_train, X_test, y_train, y_test, scaler = preprocess_data(df)
    
    # Train models
    comparison_df, best_model, best_model_name = train_models(X_train, X_test, y_train, y_test)
