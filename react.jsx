import React, { useState, useEffect, useRef, useCallback } from 'react';

// Helper function to convert hex to RGB (from original script)
function hexToRgb(hex) {
    hex = hex.replace('#', '');
    const shorthandRegex = /^([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.length === 3 ? hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b) : hex;
    const result = /^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : '255,255,255';
}

// Helper function to extract RGB from RGBA (from original script)
function extractRgbFromRgba(rgbaColor) {
    const match = rgbaColor.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*[\d.]+)?\)/);
    if (match) {
        return `${match[1]}, ${match[2]}, ${match[3]}`;
    }
    if (rgbaColor.startsWith('#')) return hexToRgb(rgbaColor);
    return null;
}

const App = () => {
    // State variables
    const [currentSlide, setCurrentSlide] = useState(0);
    const [previousSlideIndex, setPreviousSlideIndex] = useState(0);
    const [theme, setTheme] = useState('light'); // 'light' or 'dark'
    // const [slideDimensions, setSlideDimensions] = useState({ width: 0, height: 0 }); // Tidak terpakai, bisa dihapus

    // Refs for DOM elements
    const slidesContainerRef = useRef(null);
    const progressBarRef = useRef(null);
    const slideRefs = useRef([]); // To store refs for each slide

    // Slides data (extracted from HTML)
    const slidesData = [
        {
            id: 'slide-1',
            content: (
                <div className="slide-content welcome-text">
                    <h1 className="staggered-item">Repeat Material</h1>
                    <p className="welcome-subtitle staggered-item" style={{ animationDelay: '0.2s' }}>Here are the topics we will discuss below:</p>
                    <ul className="welcome-topics">
                        <li className="staggered-item" style={{ animationDelay: '0.4s' }} data-target-slide="2">Passive Voice</li>
                        <li className="staggered-item" style={{ animationDelay: '0.6s' }} data-target-slide="3">Conditional Tense</li>
                        <li className="staggered-item" style={{ animationDelay: '0.8s' }} data-target-slide="4">Analytical Text</li>
                    </ul>
                    <p className="staggered-item" style={{ animationDelay: '1.0s' }}>
                        Navigate slides using the buttons below or click on a topic to go directly there.
                    </p>
                </div>
            )
        },
        {
            id: 'slide-2',
            content: (
                <div className="slide-content">
                    <h1 className="staggered-item">Our Team</h1>
                    <div className="team-members-container">
                        <div className="team-member staggered-item" style={{ animationDelay: '0.2s' }}>
                            <img src="ningrat.jpeg" alt="Foto Anggota 1" className="member-photo" onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/150x150/EBF2F7/333?text=Image+Not+Found&font=roboto'; }} />
                            <p className="member-name">Bagus Nigrat Fajra Miracle (8)</p>
                        </div>
                        <div className="team-member staggered-item" style={{ animationDelay: '0.4s' }}>
                            <img src="wahyu.jpeg" alt="Foto Anggota 2" className="member-photo" onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/150x150/EBF2F7/333?text=Image+Not+Found&font=roboto'; }} />
                            <p className="member-name">Kadek Wahyu Ari Pratama</p>
                        </div>
                        <div className="team-member staggered-item" style={{ animationDelay: '0.6s' }}>
                           <img src="arista.jpeg" alt="Foto Anggota 3" className="member-photo" onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/150x150/EBF2F7/333?text=Image+Not+Found&font=roboto'; }} />
                            <p className="member-name">I Made Arista Wiguna (13)</p>
                        </div>
                        <div className="team-member staggered-item" style={{ animationDelay: '0.8s' }}>
                            <img src="satya.jpeg" alt="Foto Anggota 4" className="member-photo" onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/150x150/EBF2F7/333?text=Image+Not+Found&font=roboto'; }} />
                            <p className="member-name">I Made Satya Wiguna (15)</p>
                        </div>
                        <div className="team-member staggered-item" style={{ animationDelay: '1.0s' }}>
                            <img src="gilang.jpeg" alt="Foto Anggota 5" className="member-photo" onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/150x150/EBF2F7/333?text=Image+Not+Found&font=roboto'; }} />
                            <p className="member-name">Wahyu Gilang Aditya (35)</p>
                        </div>
                    </div>
                </div>
            )
        },
        {
            id: 'slide-3',
            content: (
                <div className="slide-content">
                    <h1 className="staggered-item">Passive Voice</h1>
                    <p className="staggered-item">The passive voice is used when the focus is on the action, not on who or what is performing the action. It is formed using the verb "to be" + past participle.</p>
                    <h2 className="staggered-item">Structure</h2>
                    <p className="staggered-item">Subject + auxiliary verb (be) + past participle + by + agent (optional)</p>
                    <div className="table-container staggered-item">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Tense</th>
                                    <th>Active Voice</th>
                                    <th>Passive Voice</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Present Simple</td>
                                    <td>They make cars.</td>
                                    <td>Cars <span className="highlight">are made</span> (by them).</td>
                                </tr>
                                <tr>
                                    <td>Past Simple</td>
                                    <td>They built this house.</td>
                                    <td>This house <span className="highlight">was built</span> (by them).</td>
                                </tr>
                                <tr>
                                    <td>Future Simple</td>
                                    <td>They will deliver the package.</td>
                                    <td>The package <span className="highlight">will be delivered</span> (by them).</td>
                                </tr>
                                <tr>
                                    <td>Present Perfect</td>
                                    <td>Someone has stolen my bike.</td>
                                    <td>My bike <span className="highlight">has been stolen</span>.</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <h2 className="staggered-item">When to Use Passive Voice</h2>
                    <ul>
                        <li className="staggered-item">When the performer of the action is unknown or unimportant.</li>
                        <li className="staggered-item">When the emphasis is on the action or the recipient of the action.</li>
                        <li className="staggered-item">In formal and scientific writing.</li>
                        <li className="staggered-item">To create an objective tone in writing.</li>
                    </ul>
                    <h2 className="staggered-item">Examples</h2>
                    <div className="animate-example" id="example1">
                        <p>Active: <span className="highlight">The chef prepares</span> meals every morning.</p>
                        <p>Passive: Meals <span className="highlight">are prepared</span> by the chef every morning.</p>
                    </div>
                    <div className="animate-example" id="example2">
                        <p>Active: <span className="highlight">Scientists discovered</span> a new species last year.</p>
                        <p>Passive: A new species <span className="highlight">was discovered</span> by scientists last year.</p>
                    </div>
                    <div className="animate-example" id="example3">
                        <p>Active: <span className="highlight">Someone has taken</span> my laptop.</p>
                        <p>Passive: My laptop <span className="highlight">has been taken</span>.</p>
                    </div>
                </div>
            )
        },
        {
            id: 'slide-4',
            content: (
                <div className="slide-content">
                    <h1 className="staggered-item">Conditional Tense</h1>
                    <p className="staggered-item">Conditional sentences express hypothetical situations and their consequences. There are four main types of conditional sentences in English.</p>
                    <h2 className="staggered-item">Types of Conditionals</h2>
                    <div className="table-container staggered-item">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Type</th>
                                    <th>Time</th>
                                    <th>If Clause</th>
                                    <th>Main Clause</th>
                                    <th>Example</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Zero</td>
                                    <td>General truth</td>
                                    <td>Present Simple</td>
                                    <td>Present Simple</td>
                                    <td>If you <span className="highlight">heat</span> water, it <span className="highlight">boils</span>.</td>
                                </tr>
                                <tr>
                                    <td>First</td>
                                    <td>Future possibility</td>
                                    <td>Present Simple</td>
                                    <td>will + infinitive</td>
                                    <td>If it <span className="highlight">rains</span>, I <span className="highlight">will stay</span> home.</td>
                                </tr>
                                <tr>
                                    <td>Second</td>
                                    <td>Unlikely/hypothetical</td>
                                    <td>Past Simple</td>
                                    <td>would + infinitive</td>
                                    <td>If I <span className="highlight">had</span> money, I <span className="highlight">would travel</span> the world.</td>
                                </tr>
                                <tr>
                                    <td>Third</td>
                                    <td>Impossible past</td>
                                    <td>Past Perfect</td>
                                    <td>would have + past participle</td>
                                    <td>If I <span className="highlight">had studied</span>, I <span className="highlight">would have passed</span> the exam.</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <h2 className="staggered-item">Detailed Explanation</h2>
                    <div className="staggered-item">
                        <h3>Zero Conditional</h3>
                        <p>Used for scientific facts, general truths, and things that always happen under certain conditions.</p>
                        <div className="example">
                            <p>If you don't water plants, they die.</p>
                            <p>When ice melts, it turns into water.</p>
                        </div>
                    </div>
                    <div className="staggered-item">
                        <h3>First Conditional</h3>
                        <p>Used for real and possible situations in the future.</p>
                        <div className="example">
                            <p>If it snows tomorrow, we'll build a snowman.</p>
                            <p>If you finish your homework, you can watch TV.</p>
                        </div>
                    </div>
                    <div className="staggered-item">
                        <h3>Second Conditional</h3>
                        <p>Used for unreal or unlikely situations in the present or future.</p>
                        <div className="example">
                            <p>If I won the lottery, I would buy a house.</p>
                            <p>If I were you, I would apologize to her.</p>
                        </div>
                    </div>
                    <div className="staggered-item">
                        <h3>Third Conditional</h3>
                        <p>Used for impossible situations in the past; expresses regret or criticism.</p>
                        <div className="example">
                            <p>If I had known about the party, I would have gone.</p>
                            <p>If you had told me earlier, I could have helped you.</p>
                        </div>
                    </div>
                </div>
            )
        },
        {
            id: 'slide-5',
            content: (
                <div className="slide-content">
                    <h1 className="staggered-item">Analytical Text</h1>
                    <p className="staggered-item">Analytical text examines components, structures, or ideas in detail to explain how they work or how they relate to each other. It is commonly used in academic writing, research papers, and literary criticism.</p>
                    <h2 className="staggered-item">Key Features of Analytical Text</h2>
                    <div className="analytical-feature staggered-item">
                        <div className="feature-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-target"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>
                        </div>
                        <div className="feature-content">
                            <h3>Objective Tone</h3>
                            <p>Analytical text aims to be factual and unbiased. It avoids emotional language and focuses on presenting evidence and logical arguments.</p>
                            <div className="example">
                                <p>Not: "The government's bad policy has ruined everything."</p>
                                <p>Write: "Analysis of economic data shows the policy has contributed to a 5% decline in sector growth."</p>
                            </div>
                        </div>
                    </div>
                    <div className="analytical-feature staggered-item">
                         <div className="feature-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-bar-chart-2"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>
                        </div>
                        <div className="feature-content">
                            <h3>Evidence-Based Arguments</h3>
                            <p>Analytical writing relies on factual evidence, data, and examples to support claims.</p>
                            <div className="example">
                                <p>"The recurring water imagery in the novel, appearing in 17 key scenes, symbolizes the character's emotional transformation, as evidenced by the changing descriptions from 'turbulent waves' to 'calm stream' throughout the narrative."</p>
                            </div>
                        </div>
                    </div>
                     <div className="analytical-feature staggered-item">
                        <div className="feature-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-layers"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
                        </div>
                        <div className="feature-content">
                            <h3>Formal Structure</h3>
                            <p>Analytical text typically follows a clear structure: introduction with a thesis, body paragraphs with topic sentences and arguments, and a conclusion. Each component plays a crucial role:</p>
                            <div className="example">
                                <p><strong>1. Thesis Statement:</strong></p>
                                <ul>
                                    <li>Usually located in the introduction.</li>
                                    <li>States the main argument, claim, or central position of the text.</li>
                                    <li>Must be clear, concise, and arguable.</li>
                                    <li>Serves as a guide for the reader regarding the main focus of the text.</li>
                                    <li>Example: "This analysis will demonstrate that the protagonist's downfall is a direct result of his unchecked ambition and moral compromises."</li>
                                </ul>
                                <p style={{marginTop:'1rem'}}><strong>2. Arguments:</strong></p>
                                <ul>
                                    <li>Presented in the body paragraphs.</li>
                                    <li>Each paragraph typically focuses on one main point or aspect of the argument that supports the thesis.</li>
                                    <li>Supported by relevant evidence, such as data, quotes, concrete examples, statistics, or logical reasoning.</li>
                                    <li>A topic sentence at the beginning of each paragraph introduces the main idea of that paragraph.</li>
                                    <li>Analysis explains how the evidence supports the point and the overall thesis.</li>
                                </ul>
                                <p style={{marginTop:'1rem'}}><strong>3. Conclusion:</strong></p>
                                <ul>
                                    <li>Summarizes the main points or arguments presented in the text.</li>
                                    <li>Restates the thesis in different words, reinforcing the main argument.</li>
                                    <li>May offer final thoughts, implications of the analysis, or suggestions for further research/action.</li>
                                    <li>Should not introduce new information or arguments that have not been discussed.</li>
                                    <li>Provides a satisfying sense of closure for the reader.</li>
                               </ul>
                            </div>
                        </div>
                    </div>
                    <div className="analytical-feature staggered-item">
                        <div className="feature-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-book-open"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
                        </div>
                        <div className="feature-content">
                            <h3>Specialized Vocabulary</h3>
                            <p>Uses field-specific terminology appropriate to the subject matter.</p>
                            <div className="example">
                                <p>Literary analysis: "The author uses <span className="highlight">juxtaposition</span> to <span className="highlight">accentuate</span> the contrast between the protagonist's internal thoughts and external actions."</p>
                            </div>
                        </div>
                    </div>
                    <h2 className="staggered-item">Example of Analytical Text</h2>
                    <div className="example staggered-item">
                        <h3>Analysis of Shakespeare's Use of Imagery in Macbeth</h3>
                        <p>Throughout Macbeth, Shakespeare uses the imagery of blood to symbolize guilt and moral decay. Initially, blood represents Macbeth's bravery on the battlefield when the captain describes him as "bathed in blood." However, as the play progresses, the imagery of blood transforms into a manifestation of guilt. After Duncan's murder, Macbeth observes that "Neptune's ocean" cannot wash the blood from his hands, suggesting that his guilt is indelible. Similarly, Lady Macbeth's famous sleepwalking scene, where she compulsively washes her hands claiming "Out, damned spot," shows how the imagery of blood has evolved from symbolizing heroism to a sign of indelible psychological torment. This transformation of blood imagery parallels the main characters' moral decline, effectively conveying Shakespeare's theme that violence and ambition lead to inescapable guilt.</p>
                    </div>
                    <h2 className="staggered-item">Writing Analytical Text: Useful Language</h2>
                    <div className="table-container staggered-item">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Purpose</th>
                                    <th>Useful Phrases</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Introducing analysis</td>
                                    <td>This paper examines...<br/>The data shows...<br/>The evidence indicates...</td>
                                </tr>
                                <tr>
                                    <td>Presenting evidence</td>
                                    <td>According to...<br/>As shown by...<br/>Research shows...</td>
                                </tr>
                                <tr>
                                    <td>Making connections</td>
                                    <td>This correlates with...<br/>This contrasts with...<br/>Similarly,...</td>
                                </tr>
                                <tr>
                                    <td>Drawing conclusions</td>
                                    <td>Therefore, it can be concluded that...<br/>The analysis reveals...<br/>These findings suggest...</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            )
        },
        {
            id: 'slide-6',
            content: (
                <div className="slide-content question-slide">
                    <h1 className="staggered-item question-mark">?</h1>
                    <p className="staggered-item question-text">Any Questions</p>
                </div>
            )
        },
        {
            id: 'slide-7',
            content: (
                <div className="slide-content thank-you-slide">
                    <h1 className="staggered-item thank-you-text">Thank You!</h1>
                    <p className="staggered-item" style={{ animationDelay: '0.5s' }}>We appreciate your time and attention.</p>
                    <div className="thank-you-icon staggered-item" style={{ animationDelay: '0.8s' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="feather feather-heart"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                    </div>
                </div>
            )
        }
    ];
    const totalSlides = slidesData.length;

    // Function to update CSS RGB variables
    const updateColorRGBVariables = useCallback(() => {
        if (typeof window !== 'undefined') {
            const rootStyle = getComputedStyle(document.documentElement);
            const getCssVar = (name) => rootStyle.getPropertyValue(name).trim();
            
            const primaryColorHex = getCssVar('--primary-color');
            const secondaryColorHex = getCssVar('--secondary-color');
            const accentColorHex = getCssVar('--accent-color');
            const textColorHex = getCssVar('--text-color');
            const cardBgHex = getCssVar('--card-bg');
            const shadowColorRaw = getCssVar('--shadow-color');

            document.documentElement.style.setProperty('--primary-color-rgb', hexToRgb(primaryColorHex));
            document.documentElement.style.setProperty('--secondary-color-rgb', hexToRgb(secondaryColorHex));
            document.documentElement.style.setProperty('--accent-color-rgb', hexToRgb(accentColorHex));
            document.documentElement.style.setProperty('--text-color-rgb', hexToRgb(textColorHex));
            document.documentElement.style.setProperty('--card-bg-rgb', hexToRgb(cardBgHex));
            document.documentElement.style.setProperty('--shadow-color-rgb', extractRgbFromRgba(shadowColorRaw) || '0,0,0');
        }
    }, []);


    // Load and save theme
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            setTheme(savedTheme);
        }
        updateColorRGBVariables();
    }, [updateColorRGBVariables]);

    useEffect(() => {
        localStorage.setItem('theme', theme);
        document.body.className = theme === 'dark' ? 'dark-theme' : '';
        updateColorRGBVariables();
    }, [theme, updateColorRGBVariables]);

    const toggleTheme = () => {
        setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
    };
    
    // Reset animations function
    const resetAnimations = useCallback((slideElement) => {
        if (!slideElement) return;
        const slideContent = slideElement.querySelector('.slide-content');
        if (!slideContent) return;

        const staggeredItems = slideContent.querySelectorAll('.staggered-item');
        staggeredItems.forEach(item => {
            item.style.transition = 'none';
            item.style.opacity = '0';
            let initialTransform = 'translateY(60px) scale(0.90) perspective(1000px) rotateX(-15deg) rotateY(5deg)';
            let initialFilter = 'blur(4px)';
            if (slideElement.id === 'slide-1') {
                initialTransform = 'translateY(70px) scale(0.85) perspective(800px) rotateX(-20deg) rotateY(8deg)';
                initialFilter = 'blur(5px)';
            } else if (slideElement.id === 'slide-7' || slideElement.id === 'slide-6') {
                 initialTransform = 'translateY(80px) scale(0.80) perspective(1200px) rotateX(-25deg) rotateY(0deg)';
                 initialFilter = 'blur(6px)';
            }
            item.style.transform = initialTransform;
            item.style.filter = initialFilter;
        });

        const exampleParagraphs = slideContent.querySelectorAll('.animate-example p');
        exampleParagraphs.forEach(p => {
            p.style.animation = 'none';
            p.style.opacity = '0';
            p.style.transform = 'translateX(-40px) skewX(-15deg) rotate(-3deg)';
            p.style.filter = 'blur(5px)';
        });
    }, []);


    // Animate staggered items
    const animateStaggeredItems = useCallback((currentSlideElement) => {
        if (!currentSlideElement) return;
        const slideContent = currentSlideElement.querySelector('.slide-content');
        if (!slideContent) return;

        const staggeredItems = slideContent.querySelectorAll('.staggered-item');
        staggeredItems.forEach((item, index) => {
            item.style.transition = 'none';
            item.style.opacity = '0';

            let initialTransform = 'translateY(60px) scale(0.90) perspective(1000px) rotateX(-15deg) rotateY(5deg)';
            let initialFilter = 'blur(4px)';

            if (currentSlideElement.id === 'slide-1') {
                initialTransform = 'translateY(70px) scale(0.85) perspective(800px) rotateX(-20deg) rotateY(8deg)';
                initialFilter = 'blur(5px)';
            } else if (currentSlideElement.id === 'slide-7' || currentSlideElement.id === 'slide-6') {
                 initialTransform = 'translateY(80px) scale(0.80) perspective(1200px) rotateX(-25deg) rotateY(0deg)';
                 initialFilter = 'blur(6px)';
            }

            item.style.transform = initialTransform;
            item.style.filter = initialFilter;
            
            const baseDelayFromHTML = parseFloat(item.style.animationDelay) || 0;
            const dynamicDelayIncrement = 120;
            const totalDelay = (baseDelayFromHTML * 1000) + (index * dynamicDelayIncrement);

            requestAnimationFrame(() => {
                 setTimeout(() => {
                    const animationDuration = '0.9s';
                    const animationEasing = 'cubic-bezier(0.165, 0.84, 0.44, 1)';

                    item.style.transition = `opacity ${animationDuration} ${animationEasing}, transform ${animationDuration} ${animationEasing}, filter ${animationDuration} ease-out`;
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0) scale(1) perspective(1000px) rotateX(0deg) rotateY(0deg)';
                    item.style.filter = 'blur(0)';
                }, totalDelay);
            });
        });
    }, []);
    
    // Animate examples
    const animateExamples = useCallback((currentSlideElement) => {
        if (!currentSlideElement) return;
        const slideContent = currentSlideElement.querySelector('.slide-content');
        if (!slideContent) return;

        const examples = slideContent.querySelectorAll('.animate-example');
        examples.forEach((example, index) => {
            const paragraphs = example.querySelectorAll('p');
            paragraphs.forEach((p, pIndex) => {
                p.style.animation = 'none';
                p.style.opacity = '0';
                p.style.transform = 'translateX(-40px) skewX(-15deg) rotate(-3deg)';
                p.style.filter = 'blur(5px)';

                const delay = (index * 450) + (pIndex * 150) + 350;

                requestAnimationFrame(() => {
                     setTimeout(() => {
                        p.style.animation = `slideInTextEnhancedV2 1.1s ${delay}ms cubic-bezier(0.165, 0.84, 0.44, 1.01) forwards`;
                    }, 50);
                });
            });
        });
    }, []);


    // Update slide position and animations
    useEffect(() => {
        if (!slidesContainerRef.current || slideRefs.current.length === 0) return;

        // Update progress bar
        if (progressBarRef.current) {
            const progressPercentage = totalSlides > 1 ? ((currentSlide + 1) / totalSlides) * 100 : 100;
            progressBarRef.current.style.width = `${progressPercentage}%`;
        }
        
        // Horizontal slide transition
        slidesContainerRef.current.style.transform = `translateX(-${currentSlide * (100 / totalSlides)}%)`;

        // Handle active states and animations for slides
        slideRefs.current.forEach((slideEl, index) => {
            if (!slideEl) return;
            slideEl.classList.remove('active', 'prepare-flip-right', 'prepare-flip-left');
            if (index !== currentSlide) {
                resetAnimations(slideEl);
                slideEl.setAttribute('aria-hidden', 'true');
                slideEl.removeAttribute('tabindex');
            }
        });
        
        const currentActiveSlideEl = slideRefs.current[currentSlide];
        // const oldActiveSlideEl = slideRefs.current[previousSlideIndex]; // Tidak terpakai secara langsung di blok ini

        if (currentActiveSlideEl) {
            if (previousSlideIndex === currentSlide && !currentActiveSlideEl.classList.contains('active')) {
                // Initial load or same slide re-activation
            } else if (currentSlide > previousSlideIndex) {
                currentActiveSlideEl.classList.add('prepare-flip-right');
            } else if (currentSlide < previousSlideIndex) {
                currentActiveSlideEl.classList.add('prepare-flip-left');
            }
            
            // Force reflow
            void currentActiveSlideEl.offsetWidth;
            currentActiveSlideEl.classList.add('active');
            currentActiveSlideEl.setAttribute('aria-hidden', 'false');
            currentActiveSlideEl.setAttribute('tabindex', '-1');
            currentActiveSlideEl.scrollTop = 0; // Reset scroll

            resetAnimations(currentActiveSlideEl); // Reset before new animation

            const slideTransitionDuration = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--transition-speed-normal').replace('s', '')) * 1000;
            
            setTimeout(() => {
                animateStaggeredItems(currentActiveSlideEl);
                if (currentActiveSlideEl.id === 'slide-3') { // Specific for Passive Voice slide
                    animateExamples(currentActiveSlideEl);
                }
            }, slideTransitionDuration * 0.8); // Start content animation slightly before flip finishes
        }

    }, [currentSlide, previousSlideIndex, totalSlides, slidesData, animateStaggeredItems, animateExamples, resetAnimations]);


    const goToSlide = useCallback((slideIndex) => {
        if (slideIndex >= 0 && slideIndex < totalSlides) {
            if (slideIndex !== currentSlide) {
                setPreviousSlideIndex(currentSlide);
                setCurrentSlide(slideIndex);
            } else { // Re-clicked active dot - replay animation
                const activeSlideElement = slideRefs.current[currentSlide];
                if (activeSlideElement) {
                    activeSlideElement.scrollTop = 0;
                    resetAnimations(activeSlideElement);
                    setTimeout(() => {
                        animateStaggeredItems(activeSlideElement);
                        if (activeSlideElement.id === 'slide-3') {
                            animateExamples(activeSlideElement);
                        }
                    }, 50);
                }
            }
        }
    }, [currentSlide, totalSlides, animateStaggeredItems, animateExamples, resetAnimations]);

    const nextSlide = useCallback(() => {
        if (currentSlide < totalSlides - 1) {
            setPreviousSlideIndex(currentSlide);
            setCurrentSlide(currentSlide + 1);
        }
    }, [currentSlide, totalSlides]);

    const prevSlide = useCallback(() => {
        if (currentSlide > 0) {
            setPreviousSlideIndex(currentSlide);
            setCurrentSlide(currentSlide - 1);
        }
    }, [currentSlide]);


    // Handle topic navigation from welcome slide
    const handleTopicClick = (targetSlideIndexStr) => {
        const targetSlideIndex = parseInt(targetSlideIndexStr, 10);
         if (!isNaN(targetSlideIndex) && targetSlideIndex >= 0 && targetSlideIndex < totalSlides) {
            goToSlide(targetSlideIndex);
        }
    };
    
    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e) => {
            const activeElement = document.activeElement;
            if (activeElement && (activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA' || activeElement.isContentEditable)) {
                return;
            }
            switch (e.key) {
                case 'ArrowRight':
                case 'PageDown':
                    e.preventDefault();
                    nextSlide();
                    break;
                case 'ArrowLeft':
                case 'PageUp':
                    e.preventDefault();
                    prevSlide();
                    break;
                case 'Home':
                    e.preventDefault();
                    goToSlide(0);
                    break;
                case 'End':
                    e.preventDefault();
                    goToSlide(totalSlides - 1);
                    break;
                default:
                    break;
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [nextSlide, prevSlide, goToSlide, totalSlides]);

    // Handle window resize
    useEffect(() => {
        const handleResize = () => {
            if (slidesContainerRef.current && slideRefs.current.length > 0) {
                // Recalculate slide container width and individual slide widths
                // const containerWidth = slidesContainerRef.current.parentElement.offsetWidth; // Tidak terpakai secara langsung
                slidesContainerRef.current.style.width = `${totalSlides * 100}%`;
                
                slideRefs.current.forEach(slideEl => {
                    if (slideEl) {
                        slideEl.style.width = `${100 / totalSlides}%`;
                    }
                });
                
                const originalTransition = slidesContainerRef.current.style.transition;
                slidesContainerRef.current.style.transition = 'none';
                slidesContainerRef.current.style.transform = `translateX(-${currentSlide * (100 / totalSlides)}%)`;
                
                setTimeout(() => {
                    if(slidesContainerRef.current) slidesContainerRef.current.style.transition = originalTransition;
                }, 50);
            }
        };

        let resizeTimeout;
        const debouncedHandleResize = () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(handleResize, 150);
        };

        window.addEventListener('resize', debouncedHandleResize);
        handleResize(); 

        return () => {
            clearTimeout(resizeTimeout);
            window.removeEventListener('resize', debouncedHandleResize);
        };
    }, [totalSlides, currentSlide]);


    // Effect for initial setup
    useEffect(() => {
        const initialActiveSlide = slideRefs.current[0];
        if (initialActiveSlide && !initialActiveSlide.classList.contains('active')) {
            initialActiveSlide.classList.add('active');
            initialActiveSlide.setAttribute('aria-hidden', 'false');
            initialActiveSlide.setAttribute('tabindex', '-1');
            resetAnimations(initialActiveSlide); 
            setTimeout(() => { 
                animateStaggeredItems(initialActiveSlide);
            }, 50);
        }
        updateColorRGBVariables();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); 


    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&family=Roboto:wght@400;500&family=Pacifico&display=swap');

                :root {
                    --primary-color: #4A90E2;
                    --secondary-color: #50E3C2;
                    --accent-color: #F5A623;
                    --text-color: #333;
                    --bg-color: #F7F9FB;
                    --bg-color-light-shade: #EBF2F7;
                    --card-bg: #FFFFFF;
                    --shadow-color: rgba(0, 0, 0, 0.08);
                    --shadow-color-hover: rgba(0, 0, 0, 0.15);
                    --font-heading: 'Poppins', sans-serif;
                    --font-body: 'Roboto', sans-serif;
                    --font-special: 'Pacifico', cursive;
                    --border-radius-sm: 14px;
                    --border-radius-md: 28px;
                    --transition-speed-fast: 0.3s;
                    --transition-speed-normal: 0.6s;
                    --transition-speed-slow: 0.8s;
                    --primary-color-rgb: 74, 144, 226;
                    --secondary-color-rgb: 80, 227, 194;
                    --accent-color-rgb: 245, 166, 35;
                    --text-color-rgb: 51, 51, 51;
                    --card-bg-rgb: 255, 255, 255;
                    --shadow-color-rgb: 0,0,0;
                }

                .dark-theme {
                    --primary-color: #58A6FF;
                    --secondary-color: #39D3BB;
                    --accent-color: #F8C555;
                    --text-color: #E4E6EB;
                    --bg-color: #18191A;
                    --bg-color-light-shade: #202124;
                    --card-bg: #2A2B2F;
                    --shadow-color: rgba(255, 255, 255, 0.05);
                    --shadow-color-hover: rgba(255, 255, 255, 0.1);
                    --primary-color-rgb: 88, 166, 255;
                    --secondary-color-rgb: 57, 211, 187;
                    --accent-color-rgb: 248, 197, 85;
                    --text-color-rgb: 228, 230, 235;
                    --card-bg-rgb: 42, 43, 47;
                    --shadow-color-rgb: 255,255,255;
                }

                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }

                html { /* PERBAIKAN: Hapus overflow: hidden dari html dan body jika ada */
                    height: 100%;
                    width: 100%;
                }
                body { 
                    height: 100%;
                    width: 100%;
                    margin: 0; /* Pastikan margin body adalah 0 */
                    padding: 0; /* Pastikan padding body adalah 0 */
                    /* overflow: hidden; */ /* PERBAIKAN: Baris ini dihapus/dikomentari untuk memungkinkan scroll pada slide */
                    font-family: var(--font-body);
                    background-color: var(--bg-color);
                    background-image: linear-gradient(145deg, var(--bg-color) 0%, var(--bg-color-light-shade) 100%);
                    color: var(--text-color);
                    transition: background-color var(--transition-speed-normal) ease, color var(--transition-speed-normal) ease, background-image var(--transition-speed-normal) ease;
                    -webkit-font-smoothing: antialiased;
                    -moz-osx-font-smoothing: grayscale;
                    font-size: 16px;
                    padding-top: 10px; /* Padding untuk progress bar */
                }
                
                /* Pastikan #root atau container utama React juga memiliki tinggi 100% */
                #root { /* Atau nama ID root div Anda */
                    height: 100%;
                }


                .progress-bar-container {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 10px;
                    background-color: rgba(var(--text-color-rgb), 0.1);
                    z-index: 2000;
                    box-shadow: 0 2px 5px rgba(var(--shadow-color-rgb), 0.1);
                }

                .progress-bar {
                    height: 100%;
                    width: 0%;
                    background: linear-gradient(90deg, var(--primary-color), var(--secondary-color), var(--accent-color));
                    background-size: 200% 100%;
                    border-radius: 0 5px 5px 0;
                    transition: width var(--transition-speed-normal) cubic-bezier(0.65, 0, 0.35, 1), background-position var(--transition-speed-slow) ease;
                    animation: progressBarShine 2s infinite linear;
                }

                @keyframes progressBarShine {
                    0% { background-position: 200% 0; }
                    100% { background-position: -200% 0; }
                }

                .presentation-container {
                    width: 100%;
                    height: calc(100% - 10px); /* Tinggi dikurangi progress bar */
                    position: relative;
                    overflow: hidden; /* Ini penting untuk efek transisi slide horizontal */
                    perspective: 1800px;
                }

                .slides-container {
                    height: 100%;
                    display: flex;
                    transition: transform var(--transition-speed-slow) cubic-bezier(0.86, 0, 0.07, 1);
                    transform-style: preserve-3d;
                }

                .slide {
                    height: 100%; /* Setiap slide mengisi tinggi container */
                    padding: 2rem 1.5rem 9rem 1.5rem; /* Padding bawah untuk ruang tombol navigasi */
                    display: flex;
                    flex-direction: column;
                    justify-content: flex-start;
                    align-items: center;
                    position: relative;
                    overflow-y: auto; /* PERBAIKAN: Ini memungkinkan slide individual untuk scroll jika kontennya panjang */
                    background: transparent;
                    backface-visibility: hidden;
                    transform-origin: center center;
                    transition: transform var(--transition-speed-normal) cubic-bezier(0.680, -0.550, 0.265, 1.550),
                                opacity var(--transition-speed-normal) ease-in-out;
                    opacity: 0;
                    transform: scale(0.95) rotateY(0deg);
                }

                .slide.prepare-flip-right {
                    opacity: 0;
                    transform: translateX(40%) rotateY(80deg) scale(0.9);
                }

                .slide.prepare-flip-left {
                    opacity: 0;
                    transform: translateX(-40%) rotateY(-80deg) scale(0.9);
                }

                .slide.active {
                    opacity: 1;
                    transform: translateX(0) rotateY(0deg) scale(1);
                    z-index: 10;
                }

                .slide-content {
                    max-width: 950px;
                    width: 100%;
                    background: var(--card-bg);
                    border-radius: var(--border-radius-md);
                    padding: 2.5rem 3rem;
                    margin-top: 1rem;
                    margin-bottom: 2.5rem; 
                    box-shadow: 0 20px 50px -10px rgba(var(--shadow-color-rgb), 0.12), 0 0 35px -15px rgba(var(--primary-color-rgb), 0.1);
                    opacity: 0; 
                    transform: translateY(80px) scale(0.9) perspective(1000px) rotateX(-12deg);
                    transform-origin: bottom center;
                    transition: opacity var(--transition-speed-normal) cubic-bezier(0.23, 1, 0.32, 1) 0.1s,
                                transform var(--transition-speed-normal) cubic-bezier(0.23, 1, 0.32, 1),
                                box-shadow var(--transition-speed-normal) ease;
                    border: 1px solid rgba(var(--text-color-rgb), 0.07);
                }

                .slide.active .slide-content { 
                    opacity: 1;
                    transform: translateY(0) scale(1) perspective(1000px) rotateX(0deg);
                    box-shadow: 0 25px 65px -12px rgba(var(--shadow-color-rgb), 0.2), 0 0 40px -20px rgba(var(--primary-color-rgb), 0.15);
                }

                h1 {
                    font-family: var(--font-heading);
                    font-size: clamp(2.2rem, 5vw, 3.2rem);
                    font-weight: 700;
                    color: var(--primary-color);
                    margin-top: 0;
                    margin-bottom: 2.5rem;
                    text-align: center;
                    position: relative;
                    text-shadow: 0 2px 8px rgba(var(--primary-color-rgb), 0.2);
                }

                h1::after {
                    content: '';
                    position: absolute;
                    bottom: -18px;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 0px;
                    height: 6px;
                    background: linear-gradient(90deg, var(--primary-color), var(--accent-color));
                    border-radius: 3px;
                    transition: background var(--transition-speed-fast) ease, width var(--transition-speed-normal) cubic-bezier(0.68, -0.6, 0.265, 1.6) 0.2s;
                }

                .slide.active h1::after {
                    width: clamp(120px, 22vw, 180px);
                }

                h2 {
                    font-family: var(--font-heading);
                    font-size: clamp(1.6rem, 4vw, 2.1rem);
                    font-weight: 600;
                    color: var(--secondary-color);
                    margin: 2.5rem 0 1.5rem;
                    transition: color var(--transition-speed-fast) ease;
                    border-bottom: 4px solid rgba(var(--secondary-color-rgb), 0.25);
                    padding-bottom: 0.8rem;
                }
                
                h3 { 
                    font-family: var(--font-heading);
                    color: var(--accent-color); 
                    margin-top: 1.5rem;
                    margin-bottom: 0.8rem;
                    font-size: clamp(1.2rem, 3.5vw, 1.45rem);
                }


                p, li {
                    margin-bottom: 1.2rem;
                    line-height: 1.75;
                    font-size: clamp(0.95rem, 2.2vw, 1.1rem);
                    color: var(--text-color);
                    opacity: 0.9;
                }

                ul {
                    list-style-position: outside;
                    padding-left: 1.8rem;
                }

                li {
                    padding-left: 0.8rem;
                }

                .example {
                    background: rgba(var(--secondary-color-rgb), 0.08);
                    border-left: 7px solid var(--secondary-color);
                    padding: 1.4rem 1.8rem;
                    margin: 1.8rem 0;
                    border-radius: var(--border-radius-sm);
                    transition: all var(--transition-speed-fast) cubic-bezier(0.25, 0.46, 0.45, 0.94);
                    box-shadow: 0 8px 20px -5px rgba(var(--secondary-color-rgb), 0.1);
                }

                .example:hover {
                    transform: translateY(-5px) scale(1.02);
                    box-shadow: 0 10px 25px -5px rgba(var(--secondary-color-rgb), 0.2);
                    border-left-color: var(--accent-color);
                }

                .highlight {
                    color: var(--accent-color);
                    font-weight: 700;
                    transition: color var(--transition-speed-fast) ease, background-color var(--transition-speed-fast) ease, transform var(--transition-speed-fast) ease;
                    padding: 0.25em 0.5em;
                    background-color: rgba(var(--accent-color-rgb), 0.18);
                    border-radius: 6px;
                    display: inline-block;
                }
                .highlight:hover {
                    background-color: rgba(var(--accent-color-rgb), 0.3);
                    text-shadow: 0 0 12px rgba(var(--accent-color-rgb), 0.4);
                    transform: scale(1.05);
                }

                .navigation {
                    position: fixed;
                    bottom: 2.2rem;
                    left: 50%;
                    transform: translateX(-50%);
                    display: flex;
                    gap: 1.8rem;
                    z-index: 1000;
                }

                .nav-btn {
                    padding: 0.9rem 2.2rem;
                    background: linear-gradient(45deg, var(--primary-color), var(--secondary-color));
                    color: white;
                    border: none;
                    border-radius: 50px;
                    cursor: pointer;
                    font-weight: 600;
                    font-family: var(--font-heading);
                    font-size: clamp(0.9rem, 2.5vw, 1.05rem);
                    transition: all var(--transition-speed-fast) cubic-bezier(0.25, 0.8, 0.25, 1);
                    box-shadow: 0 8px 20px -6px rgba(var(--primary-color-rgb), 0.35);
                    text-transform: uppercase;
                    letter-spacing: 1px;
                }

                .nav-btn:hover:not(:disabled) {
                    background: linear-gradient(45deg, var(--secondary-color), var(--accent-color));
                    transform: translateY(-6px) scale(1.1);
                    box-shadow: 0 12px 28px -8px rgba(var(--secondary-color-rgb), 0.5);
                }

                .nav-btn:active:not(:disabled) {
                    transform: translateY(-3px) scale(1.05);
                    box-shadow: 0 10px 22px -7px rgba(var(--secondary-color-rgb), 0.4);
                }

                .nav-btn:disabled {
                    background: #A0A0A0;
                    cursor: not-allowed;
                    opacity: 0.5;
                    box-shadow: none;
                    transform: none;
                }

                .dots-navigation {
                    position: fixed;
                    bottom: 7rem;
                    left: 50%;
                    transform: translateX(-50%);
                    display: flex;
                    gap: 1.2rem;
                    z-index: 1000;
                }

                .dot {
                    width: 16px;
                    height: 16px;
                    border-radius: 50%;
                    background-color: rgba(var(--text-color-rgb), 0.2);
                    cursor: pointer;
                    transition: all var(--transition-speed-fast) cubic-bezier(0.4, 0, 0.2, 1);
                    position: relative;
                }
                .dot::before {
                    content: '';
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    width: 100%;
                    height: 100%;
                    background-color: var(--primary-color);
                    border-radius: 50%;
                    transform: translate(-50%, -50%) scale(0);
                    transition: transform var(--transition-speed-fast) cubic-bezier(0.34, 1.56, 0.64, 1);
                }


                .dot:hover:not(.active) {
                    background-color: rgba(var(--text-color-rgb), 0.4);
                    transform: scale(1.15);
                }
                .dot:hover:not(.active)::before {
                    transform: translate(-50%, -50%) scale(0.7);
                }

                .dot.active {
                    background-color: rgba(var(--primary-color-rgb), 0.4);
                    transform: scale(1.1);
                }
                .dot.active::before {
                    transform: translate(-50%, -50%) scale(1);
                }

                .table-container {
                    overflow-x: auto;
                    margin: 2.2rem 0;
                    border-radius: var(--border-radius-sm);
                    box-shadow: 0 10px 25px -8px var(--shadow-color);
                    border: 1px solid rgba(var(--text-color-rgb), 0.1);
                    -webkit-overflow-scrolling: touch;
                }

                .table {
                    width: 100%;
                    min-width: 600px;
                    border-collapse: collapse;
                }

                .table th, .table td {
                    padding: 1.1rem 1.3rem;
                    text-align: left;
                    border-bottom: 1px solid rgba(var(--text-color-rgb), 0.1);
                    font-size: clamp(0.85rem, 2vw, 1rem);
                }

                .table th {
                    background: rgba(var(--primary-color-rgb), 0.1);
                    color: var(--primary-color);
                    font-family: var(--font-heading);
                    font-weight: 600;
                    text-transform: uppercase;
                    letter-spacing: 0.8px;
                }

                .table tbody tr {
                    transition: background-color var(--transition-speed-fast) ease, transform 0.2s ease;
                }
                .table tbody tr:nth-child(even) {
                    background-color: rgba(var(--text-color-rgb), 0.025);
                }

                .table tbody tr:hover {
                    background-color: rgba(var(--secondary-color-rgb), 0.18);
                    transform: scale(1.005);
                }

                .staggered-item {
                    opacity: 0; 
                }

                .welcome-text {
                    text-align: center;
                }

                .welcome-text h1 {
                    font-size: clamp(2.8rem, 6vw, 4rem);
                    animation: pulseGlow 2.8s infinite alternate;
                }

                @keyframes pulseGlow {
                    from { text-shadow: 0 0 6px rgba(var(--primary-color-rgb), 0.25), 0 0 12px rgba(var(--primary-color-rgb), 0.15); }
                    to { text-shadow: 0 0 18px rgba(var(--primary-color-rgb), 0.6), 0 0 30px rgba(var(--primary-color-rgb), 0.4); }
                }


                .welcome-subtitle {
                    font-size: clamp(1.1rem, 3vw, 1.5rem);
                    color: var(--text-color);
                    opacity: 0.85;
                    margin-bottom: 2.8rem;
                }

                .welcome-topics {
                    list-style: none;
                    padding-left: 0;
                    text-align: center;
                    margin: 2.8rem 0;
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: center;
                    gap: 1rem;
                }

                .welcome-topics li {
                    margin: 0.6rem 0;
                    padding: 0.9rem 2rem;
                    border-radius: 30px;
                    background: linear-gradient(60deg, rgba(var(--primary-color-rgb), 0.12), rgba(var(--secondary-color-rgb), 0.12));
                    color: var(--primary-color);
                    font-weight: 600;
                    font-size: clamp(0.9rem, 2.5vw, 1.05rem);
                    transition: all var(--transition-speed-fast) cubic-bezier(0.175, 0.885, 0.32, 1.275);
                    cursor: pointer;
                    border: 2px solid transparent;
                    box-shadow: 0 5px 12px -3px rgba(var(--shadow-color-rgb), 0.1);
                }

                .welcome-topics li:hover {
                    background: linear-gradient(60deg, var(--primary-color), var(--secondary-color));
                    color: white;
                    transform: translateY(-8px) scale(1.08) rotate(-2deg);
                    box-shadow: 0 10px 25px -5px rgba(var(--primary-color-rgb), 0.4);
                    border-color: var(--accent-color);
                }

                .animate-example {
                    position: relative;
                    padding: 1.4rem 1.8rem;
                    border-radius: var(--border-radius-sm);
                    background: rgba(var(--primary-color-rgb), 0.07);
                    margin: 1.8rem 0;
                    overflow: hidden;
                    transition: all var(--transition-speed-fast) ease;
                    border-left: 6px solid var(--primary-color);
                }

                .animate-example:hover {
                    background: rgba(var(--primary-color-rgb), 0.12);
                    transform: scale(1.02) skewX(-1deg);
                    box-shadow: 0 6px 15px -3px rgba(var(--primary-color-rgb), 0.15);
                }

                .animate-example p {
                    position: relative;
                    z-index: 1;
                    opacity: 0; 
                }

                .analytical-feature {
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                    text-align: left;
                    margin: 2rem 0;
                    padding: 1.8rem;
                    background: rgba(var(--accent-color-rgb), 0.08);
                    border-left: 7px solid var(--accent-color);
                    border-radius: var(--border-radius-md);
                    transition: all var(--transition-speed-fast) cubic-bezier(0.25, 0.46, 0.45, 0.94);
                }

                .analytical-feature:hover {
                    background: rgba(var(--accent-color-rgb), 0.16);
                    transform: translateX(6px) scale(1.015);
                    box-shadow: 0 10px 20px -5px rgba(var(--accent-color-rgb),0.18);
                }

                .feature-icon {
                    margin-right: 0;
                    margin-bottom: 1.2rem;
                    flex-shrink: 0;
                    color: var(--accent-color);
                    background-color: rgba(var(--accent-color-rgb), 0.22);
                    width: 55px;
                    height: 55px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: transform var(--transition-speed-fast) cubic-bezier(0.34, 1.56, 0.64, 1), background-color var(--transition-speed-fast) ease, box-shadow var(--transition-speed-fast) ease;
                }
                .analytical-feature:hover .feature-icon {
                    transform: rotate(30deg) scale(1.2);
                    background-color: var(--accent-color);
                    color: var(--card-bg);
                    box-shadow: 0 0 15px rgba(var(--accent-color-rgb), 0.5);
                }

                .feature-icon svg {
                    width: 28px;
                    height: 28px;
                    transition: transform 0.2s ease;
                }
                .analytical-feature:hover .feature-icon svg {
                    transform: scale(0.9);
                }


                .feature-content {
                    flex: 1;
                    width: 100%;
                }

                .feature-content h3 { 
                    font-family: var(--font-heading);
                    color: var(--accent-color);
                    margin-top: 0;
                    margin-bottom: 0.8rem;
                    font-size: clamp(1.2rem, 3.5vw, 1.45rem);
                }

                .theme-toggle {
                    position: fixed;
                    top: 22px;
                    right: 22px;
                    background: var(--card-bg);
                    border: 1px solid rgba(var(--text-color-rgb), 0.18);
                    border-radius: 50%;
                    width: 55px;
                    height: 55px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    box-shadow: 0 6px 18px -3px var(--shadow-color);
                    z-index: 2001;
                    transition: all var(--transition-speed-fast) cubic-bezier(0.175, 0.885, 0.32, 1.275);
                    overflow: hidden;
                }

                .theme-toggle:hover {
                    transform: scale(1.15) rotate(30deg);
                    box-shadow: 0 10px 25px -5px rgba(var(--primary-color-rgb), 0.35);
                }
                .theme-toggle:active {
                    transform: scale(1.08) rotate(20deg);
                }

                .theme-toggle .icon {
                    font-size: 1.7rem;
                    transition: opacity var(--transition-speed-normal) ease, transform var(--transition-speed-normal) cubic-bezier(0.68, -0.6, 0.265, 1.6);
                    position: absolute;
                }

                .theme-toggle .icon-moon { opacity: 1; transform: translateY(0) rotate(0deg) scale(1); }
                .theme-toggle .icon-sun { opacity: 0; transform: translateY(130%) rotate(-180deg) scale(0.4); }

                .dark-theme .theme-toggle .icon-moon { opacity: 0; transform: translateY(-130%) rotate(180deg) scale(0.4); }
                .dark-theme .theme-toggle .icon-sun { opacity: 1; transform: translateY(0) rotate(0deg) scale(1); }

                .team-members-container {
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: space-around;
                    align-items: flex-start;
                    gap: 1.8rem;
                    margin-top: 2.2rem;
                }

                .team-member {
                    flex-basis: calc(100% - 2rem);
                    min-width: 180px;
                    text-align: center;
                    padding: 1.8rem;
                    background-color: rgba(var(--card-bg-rgb), 0.95);
                    border-radius: var(--border-radius-md);
                    box-shadow: 0 12px 30px -10px var(--shadow-color);
                    transition: transform var(--transition-speed-fast) cubic-bezier(0.25, 0.46, 0.45, 0.94), box-shadow var(--transition-speed-fast) ease;
                    border: 1px solid rgba(var(--primary-color-rgb), 0.25);
                }

                .team-member:hover {
                    transform: translateY(-10px) scale(1.04) rotate(1deg);
                    box-shadow: 0 15px 35px -10px var(--shadow-color-hover);
                }

                .member-photo {
                    width: clamp(120px, 30vw, 160px);
                    height: clamp(120px, 30vw, 160px);
                    border-radius: 50%;
                    object-fit: cover;
                    margin-bottom: 1.4rem;
                    border: 5px solid var(--primary-color);
                    box-shadow: 0 6px 15px -3px rgba(var(--primary-color-rgb), 0.3);
                    transition: transform var(--transition-speed-fast) cubic-bezier(0.34, 1.56, 0.64, 1), border-color var(--transition-speed-fast) ease;
                }
                .team-member:hover .member-photo {
                    transform: scale(1.08) rotate(5deg);
                    border-color: var(--accent-color);
                }

                .member-name {
                    font-family: var(--font-heading);
                    font-weight: 600;
                    font-size: clamp(1.1rem, 2.8vw, 1.35rem);
                    color: var(--primary-color);
                    margin-top: 0.8rem;
                    margin-bottom: 0;
                }

                .question-slide {
                    text-align: center;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    height: 100%;
                }

                .question-mark {
                    font-size: clamp(6rem, 15vw, 8.5rem) !important;
                    font-family: var(--font-heading);
                    color: var(--accent-color);
                    margin-bottom: 1.2rem !important;
                    line-height: 1;
                    animation: bounceQuestion 2.2s ease-in-out infinite;
                    text-shadow: 0 0 20px rgba(var(--accent-color-rgb), 0.4);
                }

                @keyframes bounceQuestion {
                    0%, 20%, 50%, 80%, 100% { transform: translateY(0) scale(1); }
                    40% { transform: translateY(-30px) scale(1.1); }
                    60% { transform: translateY(-15px) scale(1.05); }
                }

                .question-text {
                    font-size: clamp(1.8rem, 4.5vw, 2.6rem);
                    font-family: var(--font-heading);
                    color: var(--primary-color);
                    opacity: 1 !important;
                }

                .question-slide h1::after {
                    display: none;
                }

                .thank-you-slide {
                    text-align: center;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    height: 100%;
                }

                .thank-you-text {
                    font-family: var(--font-special) !important;
                    font-size: clamp(3.5rem, 10vw, 6rem) !important;
                    color: var(--primary-color) !important;
                    margin-bottom: 1.5rem !important;
                    line-height: 1.2;
                    animation: fadeInScaleUpEnhanced 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.2s forwards,
                               textGradientFlow 5s linear infinite alternate 1.4s;
                    background: linear-gradient(90deg, var(--primary-color), var(--secondary-color), var(--accent-color), var(--primary-color));
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text; 
                    background-size: 400% 100%;
                }

                @keyframes fadeInScaleUpEnhanced {
                    from { opacity: 0; transform: scale(0.4) translateY(50px) rotate(-5deg); filter: blur(5px); }
                    to { opacity: 1; transform: scale(1) translateY(0) rotate(0deg); filter: blur(0); }
                }

                @keyframes textGradientFlow {
                    0% { background-position: 0% 50%; }
                    100% { background-position: 100% 50%; }
                }

                .thank-you-slide p {
                    font-size: clamp(1.1rem, 3vw, 1.55rem);
                    color: var(--text-color);
                    opacity: 0.9 !important;
                    margin-bottom: 2.2rem;
                }

                .thank-you-icon {
                    color: var(--accent-color);
                    animation: heartBeatEnhanced 1.6s ease-in-out infinite 1.2s;
                }

                .thank-you-icon svg {
                    width: clamp(65px, 13vw, 85px);
                    height: clamp(65px, 13vw, 85px);
                    filter: drop-shadow(0 0 15px rgba(var(--accent-color-rgb), 0.6));
                }

                @keyframes heartBeatEnhanced {
                    0% { transform: scale(1) rotate(0deg); }
                    10% { transform: scale(1.2) rotate(-5deg); }
                    20% { transform: scale(1.1) rotate(5deg); }
                    30% { transform: scale(1.25) rotate(-3deg); }
                    40% { transform: scale(1.15) rotate(3deg); }
                    50% { transform: scale(1.2) rotate(0deg); }
                    100% { transform: scale(1) rotate(0deg); }
                }

                .thank-you-slide h1::after {
                    display: none;
                }

                @media (min-width: 768px) {
                    .slide { padding: 2.5rem 2rem 9rem 2rem; }
                    .slide-content { padding: 3rem 3.5rem; }
                    .analytical-feature { flex-direction: row; align-items: center; text-align: left; }
                    .feature-icon { margin-right: 2rem; margin-bottom: 0; }
                    .team-member { flex-basis: calc(48% - 1.8rem); }
                }

                @media (min-width: 992px) {
                    .slide { padding: 3rem 2.5rem 9rem 2.5rem; }
                    .slide-content { padding: 3.5rem 4rem; }
                    .team-member { flex-basis: calc(30% - 1.8rem); }
                }

                @media (max-width: 359px) {
                    body { font-size: 14px; padding-top: 8px; }
                    .progress-bar-container { height: 8px; }
                    .presentation-container { height: calc(100% - 8px); }
                    .slide { padding: 1.5rem 1rem 7rem 1rem; }
                    .slide-content { padding: 1.8rem; border-radius: var(--border-radius-sm); margin-top: 0.5rem; }
                    h1 { margin-bottom: 1.8rem; }
                    h1::after { bottom: -12px; height: 5px; }
                    h2 { margin: 1.8rem 0 1.2rem; }
                    .nav-btn { padding: 0.75rem 1.6rem; }
                    .dots-navigation { bottom: 5.8rem; gap: 0.9rem; }
                    .dot { width: 13px; height: 13px; }
                    .theme-toggle { width: 48px; height: 48px; top: 18px; right: 18px; }
                    .theme-toggle .icon { font-size: 1.5rem; }
                    .welcome-topics li { padding: 0.75rem 1.6rem; }
                    .member-photo { border-width: 4px; }
                }

                @keyframes slideInTextEnhancedV2 {
                    0% { opacity: 0; transform: translateX(-40px) skewX(-15deg) rotate(-3deg); filter: blur(5px); }
                    60% { opacity: 0.95; transform: translateX(12px) skewX(5deg) rotate(1deg); filter: blur(0.5px); }
                    100% { opacity: 1; transform: translateX(0) skewX(0deg) rotate(0deg); filter: blur(0); }
                }
            `}
            </style>

            <button className="theme-toggle" id="themeToggle" aria-label="Change Theme" onClick={toggleTheme}>
                <span className="icon icon-moon">🌙</span>
                <span className="icon icon-sun">☀️</span>
            </button>

            <div className="progress-bar-container" id="progressBarContainer">
                <div className="progress-bar" id="progressBar" ref={progressBarRef}></div>
            </div>

            <div className="presentation-container">
                <div className="slides-container" id="slidesContainer" ref={slidesContainerRef}>
                    {slidesData.map((slide, index) => (
                        <div
                            className={`slide ${index === currentSlide ? 'active' : ''}`}
                            id={slide.id}
                            key={slide.id}
                            ref={el => slideRefs.current[index] = el}
                            aria-hidden={index !== currentSlide}
                            tabIndex={index === currentSlide ? -1 : undefined} // Menggunakan undefined agar atribut tidak dirender jika false
                        >
                            {slide.id === 'slide-1' ? 
                                React.cloneElement(slide.content, {
                                    children: React.Children.map(slide.content.props.children, child => {
                                        if (child && child.type === 'ul' && child.props.className === 'welcome-topics') {
                                            return React.cloneElement(child, {
                                                children: React.Children.map(child.props.children, liChild => {
                                                    if (liChild && liChild.type === 'li') {
                                                        return React.cloneElement(liChild, {
                                                            onClick: () => handleTopicClick(liChild.props['data-target-slide'])
                                                        });
                                                    }
                                                    return liChild;
                                                })
                                            });
                                        }
                                        return child;
                                    })
                                })
                                : slide.content
                            }
                        </div>
                    ))}
                </div>

                <div className="dots-navigation" id="dots">
                    {slidesData.map((_, index) => (
                        <span
                            key={`dot-${index}`}
                            className={`dot ${index === currentSlide ? 'active' : ''}`}
                            data-slide={index}
                            aria-label={`Ke Slide ${index + 1}`}
                            onClick={() => goToSlide(index)}
                        />
                    ))}
                </div>

                <div className="navigation">
                    <button className="nav-btn" id="prevBtn" aria-label="Previous Slide" onClick={prevSlide} disabled={currentSlide === 0}>
                        Previous
                    </button>
                    <button className="nav-btn" id="nextBtn" aria-label="Next Slide" onClick={nextSlide} disabled={currentSlide === totalSlides - 1}>
                        Next
                    </button>
                </div>
            </div>
        </>
    );
};

export default App;

