// unzip.js - Brew-style unzip animation for work history and studies pages
document.addEventListener("DOMContentLoaded", function() {
    const animationContainer = document.getElementById('terminal-animation');
    const contentContainer = document.getElementById('content-container');
    
    // If elements don't exist, exit early
    if (!animationContainer || !contentContainer) {
        console.log('Unzip animation elements not found, skipping animation');
        return;
    }
    
    // Determine which page we're on
    const pageTitle = document.title;
    const pageURL = window.location.pathname;
    let filename = 'data.tar.gz';
    
    console.log('Page title:', pageTitle);
    console.log('Page URL:', pageURL);
    
    if (pageTitle.includes('Home') || pageURL === '/' || pageURL === '/index') {
        filename = 'system.tar.gz';
    } else if (pageTitle.includes('whoami') || pageURL.includes('/whoami')) {
        filename = 'profile.tar.gz';
    } else if (pageTitle.includes('workhistory') || pageURL.includes('/work')) {
        filename = 'workhistory.tar.gz';
    } else if (pageTitle.includes('studies') || pageURL.includes('/studies')) {
        filename = 'studies.tar.gz';
    } else if (pageTitle.includes('projects') || pageURL.includes('/ls')) {
        filename = 'projects.tar.gz';
    }
    
    console.log('Using filename:', filename);
    
    // Animation sequence
    const animationSteps = [
        { delay: 150, text: '$ ls -la', className: 'command-line' },
        { delay: 100, text: `total 8`, className: 'output-line' },
        { delay: 50, text: `drwxr-xr-x 2 user user 4096 Nov  6 10:30 .`, className: 'output-line' },
        { delay: 50, text: `drwxr-xr-x 8 user user 4096 Nov  6 10:30 ..`, className: 'output-line' },
        { delay: 50, text: `-rw-r--r-- 1 user user 2048 Nov  6 10:30 ${filename}`, className: 'output-line' },
        { delay: 200, text: '', className: 'blank-line' },
        { delay: 50, text: `$ tar -xzf ${filename}`, className: 'command-line' },
        { delay: 50, text: `Extracting archive...`, className: 'output-line' },
    ];
    
    let currentStep = 0;
    
    function displayNextStep() {
        if (currentStep < animationSteps.length) {
            const step = animationSteps[currentStep];
            
            setTimeout(() => {
                const line = document.createElement('div');
                line.className = step.className;
                line.textContent = step.text;
                animationContainer.appendChild(line);
                
                currentStep++;
                displayNextStep();
            }, step.delay);
        } else {
            // Start brew-style loading animation
            startBrewLoading();
        }
    }
    
    function startBrewLoading() {
        const loadingLine = document.createElement('div');
        loadingLine.className = 'loading-line';
        animationContainer.appendChild(loadingLine);
        
        // Brew-style progress bar with # symbols
        let progress = 0;
        const maxProgress = 100;
        
        const loadingInterval = setInterval(() => {
            // Update progress (faster increments for smoother animation)
            progress += Math.random() * 19 + 18; // Random between 4-12% per tick
            if (progress > maxProgress) progress = maxProgress;
            
            // Create progress bar with # symbols
            const barWidth = 40;
            const filledWidth = Math.floor((progress / maxProgress) * barWidth);
            const emptyWidth = barWidth - filledWidth;
            const progressBar = '#'.repeat(filledWidth) + '-'.repeat(emptyWidth);
            
            // Update display
            loadingLine.textContent = `[${progressBar}] ${Math.floor(progress)}%`;
            
            // When complete - show everything at once
            if (progress >= maxProgress) {
                clearInterval(loadingInterval);
                
                setTimeout(() => {
                    // Show completion message
                    const completeLine1 = document.createElement('div');
                    completeLine1.className = 'success-line';
                    completeLine1.textContent = '✓ Extraction complete';
                    animationContainer.appendChild(completeLine1);
                    
                    const blankLine = document.createElement('div');
                    blankLine.className = 'blank-line';
                    animationContainer.appendChild(blankLine);
                    
                    const catCommand = document.createElement('div');
                    catCommand.className = 'command-line';
                    catCommand.textContent = `$ cat ${filename.replace('.tar.gz', '.txt')}`;
                    animationContainer.appendChild(catCommand);
                    
                    const blankLine2 = document.createElement('div');
                    blankLine2.className = 'blank-line';
                    animationContainer.appendChild(blankLine2);
                    
                    // Show ALL content at once (no typing effect)
                    setTimeout(() => {
                        contentContainer.style.display = 'block';
                    }, 200);
                }, 300);
            }
        }, 100); // Update every 100ms
    }
    
    // Start the animation sequence
    displayNextStep();
});