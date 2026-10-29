"""
Project: AI Resume ATS Analyzer
Algorithm: TF-IDF Vectorizer with Cosine Similarity Matrix
Domain: NLP (Natural Language Processing) & Information Retrieval
"""

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

# 1. Target Job Description (Requirements)
job_description = """
Looking for an AI Machine Learning Engineer skilled in Python, Scikit-learn, 
TensorFlow, PyTorch, Pandas, and NLP. Experience with SQL and Git is required.
"""

# 2. Candidate Resume Text
resume_candidate = """
John Doe - Passionate Computer Science graduate with strong hands-on skills in Python, 
Pandas, NumPy, and Scikit-learn. Developed Machine Learning and NLP classification projects. 
Proficient with Git version control and SQL databases.
"""

documents = [job_description, resume_candidate]

# 3. Vectorization using TF-IDF (Term Frequency-Inverse Document Frequency)
vectorizer = TfidfVectorizer(stop_words='english')
tfidf_matrix = vectorizer.fit_transform(documents)

# 4. Compute Mathematical Match Score using Cosine Similarity
similarity_matrix = cosine_similarity(tfidf_matrix[0:1], tfidf_matrix[1:2])
match_percentage = round(similarity_matrix[0][0] * 100, 2)

print("="*45)
print(f" ATS Match Score: {match_percentage}%")
print("="*45)

if match_percentage >= 70:
    print("Verdict: Shortlist for Interview")
else:
    print("Verdict: Needs Keyword Optimization")
