document.getElementById('submit-button').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent the default form submission

    let unanswered = false;
    let answers = {};

    // List of all input names to check
    let inputNames = [
        'technical_skills_a', 'technical_skills_b', 'technical_skills_c', 'technical_skills_d', 'technical_skills_e',
        'industry_knowledge_a', 'industry_knowledge_b', 'industry_knowledge_c',
        'soft_skills_a', 'soft_skills_b', 'soft_skills_c',
        'personality_a', 'personality_b', 'personality_c',
        'career_values_a', 'career_values_b', 'career_values_c'
    ];

    // Check if all inputs have been answered
    inputNames.forEach(name => {
        if (!document.querySelector(`input[name="${name}"]:checked`)) {
            unanswered = true;
        } else {
            answers[name] = document.querySelector(`input[name="${name}"]:checked`).value;
        }
    });

    if (unanswered) {
        alert('Please answer all the questions before submitting.');
    } else {
        let results = processAssessment(answers);
        let recommendedJobs = recommendJobs(results);
        let explanation = generateExplanation(results, recommendedJobs);
        displayRecommendedJobs(recommendedJobs, explanation);
    }
});

function processAssessment(answers) {
    let technicalSkillsScore = 0;
    let industryKnowledgeScore = 0;
    let softSkillsScore = 0;
    let personalityScore = 0;
    let careerValuesScore = 0;

    // Process Technical Skills Assessment
    technicalSkillsScore += { 'A': 10, 'B': 8, 'C': 6, 'D': 4 }[answers['technical_skills_a']] || 0;
    technicalSkillsScore += { 'A': 10, 'B': 8, 'C': 6 }[answers['technical_skills_b']] || 0;
    technicalSkillsScore += { 'A': 10, 'B': 8, 'C': 6 }[answers['technical_skills_c']] || 0;
    technicalSkillsScore += { 'A': 10, 'B': 8, 'C': 6 }[answers['technical_skills_d']] || 0;
    technicalSkillsScore += { 'A': 10, 'B': 8, 'C': 6, 'D': 4 }[answers['technical_skills_e']] || 0;

    // Process Industry Knowledge Assessment
    industryKnowledgeScore += { 'A': 10, 'B': 8, 'C': 6, 'D': 4 }[answers['industry_knowledge_a']] || 0;
    industryKnowledgeScore += { 'A': 10, 'B': 8, 'C': 6, 'D': 4 }[answers['industry_knowledge_b']] || 0;
    industryKnowledgeScore += { 'A': 10, 'B': 8, 'C': 6, 'D': 4 }[answers['industry_knowledge_c']] || 0;

    // Process Soft Skills Assessment
    softSkillsScore += { 'A': 10, 'B': 8, 'C': 6, 'D': 4 }[answers['soft_skills_a']] || 0;
    softSkillsScore += { 'A': 10, 'B': 8, 'C': 6, 'D': 4 }[answers['soft_skills_b']] || 0;
    softSkillsScore += { 'A': 10, 'B': 8, 'C': 6 }[answers['soft_skills_c']] || 0;

    // Process Personality Assessment
    personalityScore += { 'A': 10, 'B': 8, 'C': 6 }[answers['personality_a']] || 0;
    personalityScore += { 'A': 10, 'B': 8, 'C': 6 }[answers['personality_b']] || 0;
    personalityScore += { 'A': 10, 'B': 8, 'C': 6 }[answers['personality_c']] || 0;

    // Process Career Values Assessment
    careerValuesScore += { 'A': 10, 'B': 8, 'C': 6, 'D': 4 }[answers['career_values_a']] || 0;
    careerValuesScore += { 'A': 10, 'B': 8, 'C': 6 }[answers['career_values_b']] || 0;
    careerValuesScore += { 'A': 10, 'B': 8, 'C': 6 }[answers['career_values_c']] || 0;

    // Calculate total scores
    let results = {
        'Technical Skills': technicalSkillsScore,
        'Industry Knowledge': industryKnowledgeScore,
        'Soft Skills': softSkillsScore,
        'Personality': personalityScore,
        'Career Values': careerValuesScore
    };

    return results;
}

function recommendJobs(assessmentResults) {
    let recommendedJobs = [];

    if (assessmentResults['Technical Skills'] >= 40) {
        recommendedJobs.push('Software Developer');
    }
    if (assessmentResults['Industry Knowledge'] >= 30) {
        recommendedJobs.push('Data Scientist');
    }
    if (assessmentResults['Soft Skills'] >= 20) {
        recommendedJobs.push('Project Manager');
    }
    if (assessmentResults['Personality'] >= 18) {
        recommendedJobs.push('Business Analyst');
    }
    if (assessmentResults['Career Values'] >= 20) {
        recommendedJobs.push('IT Consultant');
    }

    return recommendedJobs;
}

function generateExplanation(results, recommendedJobs) {
    let explanation = '';

    explanation += `<h3>Assessment Summary</h3>`;
    explanation += `<p>Your assessment results are as follows:</p>`;
    explanation += `<ul>`;
    for (const [category, score] of Object.entries(results)) {
        explanation += `<li><strong>${category}:</strong> ${score} points</li>`;
    }
    explanation += `</ul>`;

    explanation += `<h3>Career Recommendations</h3>`;
    if (recommendedJobs.length === 0) {
        explanation += `<p>Based on your responses, there are no specific career recommendations at this time. Consider reviewing your answers or exploring different career paths that align with your interests and strengths.</p>`;
    } else {
        explanation += `<p>Based on your results, here are some career options that may suit you:</p>`;
        explanation += `<ul>`;
        recommendedJobs.forEach(job => {
            explanation += `<li>${job}</li>`;
        });
        explanation += `</ul>`;
    }

    explanation += `<h3>Additional Insights</h3>`;
    
    explanation += `<p><strong>Technical Skills:</strong> Your technical skills score suggests you have a strong foundation in relevant programming languages and tools. Careers like Software Developer or Data Scientist may be suitable based on your proficiency.</p>`;
   
    explanation += `<p><strong>Industry Knowledge:</strong> Your interest in emerging technologies indicates a proactive approach to staying updated with industry trends. Roles like Data Scientist or IT Consultant could benefit from your knowledge.</p>`;
    
    explanation += `<p><strong>Soft Skills:</strong> Your soft skills assessment highlights your approach to teamwork and communication. Careers like Project Manager or Business Analyst may be a good fit for your collaborative and problem-solving abilities.</p>`;
    
    explanation += `<p><strong>Personality:</strong> Your personality traits suggest how you handle work environments and stress. Roles such as Business Analyst or IT Consultant could align with your preferences for work settings and stress management.</p>`;
    
    explanation += `<p><strong>Career Values:</strong> Your values indicate what you prioritize in a job. Careers that align with your values, such as IT Consultant or Software Developer, may offer a more fulfilling work experience.</p>`;

    return explanation;
}

function displayRecommendedJobs(jobs, explanation) {
    let recommendedJobsList = document.getElementById('recommended-jobs');
    recommendedJobsList.innerHTML = '';

    jobs.forEach(function(job) {
        let listItem = document.createElement('li');
        listItem.textContent = job;
        recommendedJobsList.appendChild(listItem);
    });

    let explanationDiv = document.getElementById('explanation');
    explanationDiv.innerHTML = explanation;

    document.getElementById('results').style.display = 'block';
}
