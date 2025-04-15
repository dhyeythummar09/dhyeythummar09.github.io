// Q2: Event tracking solution
document.addEventListener('DOMContentLoaded', function() {
    // Track page view when the page loads
    trackEvent('pageview', 'page', 'page load');
    
    // Track all click events
    document.addEventListener('click', function(event) {
        const target = event.target;
        let elementType = target.tagName.toLowerCase();
        
        // For more specific element types
        if (target.classList.length > 0) {
            elementType = `${elementType}.${target.classList[0]}`;
        } else if (target.id) {
            elementType = `${elementType}#${target.id}`;
        }
        
        trackEvent('click', elementType, target.textContent.trim().substring(0, 30));
    });
    
    function trackEvent(eventType, elementType, elementContent) {
        const timestamp = new Date().toISOString();
        console.log(`${timestamp}, ${eventType}, ${elementType}, ${elementContent || 'N/A'}`);
    }

    // Q3: Text analysis solution
    const textAnalysisSection = document.createElement('section');
    textAnalysisSection.id = 'text-analysis';
    textAnalysisSection.className = 'section';
    textAnalysisSection.innerHTML = `
        <div class="container">
            <h2 class="section-title">Text Analysis</h2>
            <textarea id="text-input" placeholder="Enter your text here (more than 10,000 words)..." rows="10"></textarea>
            <button id="analyze-btn" class="btn">Analyze Text</button>
            <div id="analysis-results">
                <div class="result-section">
                    <h3>Basic Text Statistics</h3>
                    <div id="basic-stats"></div>
                </div>
                <div class="result-section">
                    <h3>Pronouns Count</h3>
                    <div id="pronouns-count"></div>
                </div>
                <div class="result-section">
                    <h3>Prepositions Count</h3>
                    <div id="prepositions-count"></div>
                </div>
                <div class="result-section">
                    <h3>Articles Count</h3>
                    <div id="articles-count"></div>
                </div>
            </div>
        </div>
    `;
    
    // Insert the text analysis section before the footer
    document.querySelector('main').appendChild(textAnalysisSection);
    
    // Add styles for the new elements
    const style = document.createElement('style');
    style.textContent = `
        #text-input {
            width: 100%;
            padding: 10px;
            margin-bottom: 20px;
            font-family: 'Poppins', sans-serif;
            background:rgb(184, 184, 184);
        }
        #analyze-btn {
            margin-bottom: 30px;
        }
        #analysis-results {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
        }
        .result-section {
            background: #cedff8;
            padding: 15px;
            border-radius: 5px;
        }
        .result-section h3 {
            margin-top: 0;
            color: #333;
        }
        @media (max-width: 768px) {
            #analysis-results {
                grid-template-columns: 1fr;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Text analysis functionality
    document.getElementById('analyze-btn').addEventListener('click', function() {
        const text = document.getElementById('text-input').value;
        if (text.trim().length === 0) {
            alert('Please enter some text to analyze');
            return;
        }
        
        // Basic statistics
        const letters = text.replace(/[^a-zA-Z]/g, '').length;
        const words = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
        const spaces = text.split(' ').length - 1;
        const newlines = (text.match(/\n/g) || []).length;
        const specialSymbols = text.replace(/[a-zA-Z0-9\s]/g, '').length;
        
        document.getElementById('basic-stats').innerHTML = `
            <p>Letters: ${letters}</p>
            <p>Words: ${words}</p>
            <p>Spaces: ${spaces}</p>
            <p>Newlines: ${newlines}</p>
            <p>Special Symbols: ${specialSymbols}</p>
        `;
        
        // Pronouns count
        const pronouns = ['i', 'me', 'my', 'mine', 'myself', 'you', 'your', 'yours', 'yourself', 
                         'he', 'him', 'his', 'himself', 'she', 'her', 'hers', 'herself', 
                         'it', 'its', 'itself', 'we', 'us', 'our', 'ours', 'ourselves', 
                         'they', 'them', 'their', 'theirs', 'themselves'];
        const pronounCounts = {};
        
        pronouns.forEach(pronoun => {
            const regex = new RegExp(`\\b${pronoun}\\b`, 'gi');
            const matches = text.match(regex);
            pronounCounts[pronoun] = matches ? matches.length : 0;
        });
        
        displayCountResults(pronounCounts, 'pronouns-count');
        
        // Prepositions count
        const prepositions = ['about', 'above', 'across', 'after', 'against', 'along', 'among', 'around', 
                             'at', 'before', 'behind', 'below', 'beneath', 'beside', 'between', 'beyond', 
                             'by', 'down', 'during', 'for', 'from', 'in', 'inside', 'into', 'near', 'of', 
                             'off', 'on', 'out', 'over', 'through', 'to', 'toward', 'under', 'up', 'with'];
        const prepositionCounts = {};
        
        prepositions.forEach(preposition => {
            const regex = new RegExp(`\\b${preposition}\\b`, 'gi');
            const matches = text.match(regex);
            prepositionCounts[preposition] = matches ? matches.length : 0;
        });
        
        displayCountResults(prepositionCounts, 'prepositions-count');
        
        // Articles count
        const articles = ['a', 'an', 'the'];
        const articleCounts = {};
        
        articles.forEach(article => {
            const regex = new RegExp(`\\b${article}\\b`, 'gi');
            const matches = text.match(regex);
            articleCounts[article] = matches ? matches.length : 0;
        });
        
        displayCountResults(articleCounts, 'articles-count');
    });
    
    function displayCountResults(counts, elementId) {
        let html = '<ul>';
        for (const [word, count] of Object.entries(counts)) {
            if (count > 0) {
                html += `<li>${word}: ${count}</li>`;
            }
        }
        html += '</ul>';
        document.getElementById(elementId).innerHTML = html;
    }
});