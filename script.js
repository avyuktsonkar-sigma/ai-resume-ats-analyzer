// Pre-defined role skill sets for Cosine Vectorization
const ROLE_TAXONOMY = {
    "ai-ml": ["python", "machine learning", "deep learning", "pytorch", "tensorflow", "nlp", "pandas", "numpy", "scikit-learn", "sql", "git"],
    "fullstack": ["javascript", "react", "node.js", "html", "css", "mongodb", "postgresql", "express", "rest api", "git", "docker"],
    "data-analyst": ["python", "sql", "tableau", "power bi", "excel", "pandas", "data visualization", "statistics", "business intelligence"],
    "cybersecurity": ["network security", "penetration testing", "linux", "firewalls", "cryptography", "wireshark", "python", "siem", "owasp"]
};

function analyzeResume() {
    const role = document.getElementById("jobRole").value;
    const text = document.getElementById("resumeText").value.toLowerCase();

    if (!text.trim()) {
        alert("Please paste your resume text or click 'Load Sample Resume'!");
        return;
    }

    const targetSkills = ROLE_TAXONOMY[role];
    let matched = [];
    let missing = [];

    // Keyword vector matching (Simulating TF-IDF matching)
    targetSkills.forEach(skill => {
        if (text.includes(skill)) {
            matched.push(skill);
        } else {
            missing.push(skill);
        }
    });

    // Score Calculation Formula
    const matchRatio = matched.length / targetSkills.length;
    let atsScore = Math.round(matchRatio * 100);

    // Render Progress Ring with Animation
    const progressRing = document.getElementById("progressRing");
    const scoreText = document.getElementById("scoreText");
    const ratingTitle = document.getElementById("ratingTitle");
    const ratingSubtitle = document.getElementById("ratingSubtitle");

    scoreText.textContent = `${atsScore}%`;

    let color = "#EF4444"; // Red
    let title = "High Risk of Rejection";
    let sub = "Your resume misses most core technical keywords for this role.";

    if (atsScore >= 75) {
        color = "#10B981"; // Green
        title = "Strong Match (Interview Ready)";
        sub = "Your profile matches the ATS criteria accurately!";
    } else if (atsScore >= 45) {
        color = "#F59E0B"; // Yellow
        title = "Moderate Match";
        sub = "Decent profile, but critical keywords are still missing.";
    }

    progressRing.style.background = `conic-gradient(${color} ${atsScore * 3.6}deg, #1F2937 0deg)`;
    ratingTitle.textContent = title;
    ratingTitle.style.color = color;
    ratingSubtitle.textContent = sub;

    // Render Badges
    const matchedWrapper = document.getElementById("matchedSkills");
    const missingWrapper = document.getElementById("missingSkills");

    matchedWrapper.innerHTML = matched.length 
        ? matched.map(s => `<span class="badge badge-match">✓ ${s.toUpperCase()}</span>`).join("")
        : `<span class="empty-hint">None</span>`;

    missingWrapper.innerHTML = missing.length 
        ? missing.map(s => `<span class="badge badge-missing">✕ ${s.toUpperCase()}</span>`).join("")
        : `<span class="empty-hint">None! All target skills matched.</span>`;

    // Dynamic AI Feedback
    const feedbackList = document.getElementById("feedbackList");
    let tips = [];
    if (missing.length > 0) {
        tips.push(`Add projects demonstrating experience with <strong>${missing.slice(0, 3).join(", ").toUpperCase()}</strong>.`);
    }
    if (!text.includes("achieved") && !text.includes("improved") && !text.includes("%")) {
        tips.push("Include quantified achievements (e.g. 'Improved model latency by 20%').");
    }
    tips.push("Keep resume format clean without tables or graphics to pass standard ATS filters.");

    feedbackList.innerHTML = tips.map(t => `<li>${t}</li>`).join("");
}

// 1-Click Sample Resume Loader
function loadSampleData() {
    document.getElementById("jobRole").value = "ai-ml";
    document.getElementById("resumeText").value = 
`John Doe - Aspiring AI Engineer
Email: john@example.com | GitHub: github.com/johndoe

Summary:
Computer Science student passionate about Machine Learning and Data Science. Experience in developing predictive pipelines.

Technical Skills:
- Languages: Python, SQL, C++
- Libraries: Pandas, NumPy, Scikit-Learn
- Tools: Git, Jupyter Notebook

Academic Projects:
1. Customer Churn Prediction:
Built classification model using Scikit-Learn and Pandas. Achieved 86% accuracy.
2. Sentiment Analyzer:
Applied basic NLP tokenization to classify user feedback on social media.`;

    analyzeResume();
}
