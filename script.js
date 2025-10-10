// Screen Navigation
function navigateTo(screenId) {
    // Hide all screens
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => {
        screen.classList.remove('active');
    });

    // Show selected screen
    const targetScreen = document.getElementById(screenId);
    if (targetScreen) {
        targetScreen.classList.add('active');
    }

    // Close screen selector if open
    closeScreenSelector();

    // Update active nav item
    updateActiveNav(screenId);
}

// Update Active Navigation Item
function updateActiveNav(screenId) {
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.classList.remove('active');
    });

    // Map screen IDs to nav labels
    const navMap = {
        'dashboard': 'Home',
        'missions': 'Missions',
        'rewards': 'Rewards',
        'avatar': 'Profile',
        'leaderboard': 'Profile'
    };

    const targetLabel = navMap[screenId];
    if (targetLabel) {
        navItems.forEach(item => {
            const label = item.querySelector('.nav-label');
            if (label && label.textContent === targetLabel) {
                item.classList.add('active');
            }
        });
    }
}

// Screen Selector Modal
function openScreenSelector() {
    const modal = document.getElementById('screen-selector');
    if (modal) {
        modal.classList.add('active');
    }
}

function closeScreenSelector() {
    const modal = document.getElementById('screen-selector');
    if (modal) {
        modal.classList.remove('active');
    }
}

// Close modal on background click
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('screen-selector');
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeScreenSelector();
            }
        });
    }
});

// Tab Switching for Avatar Customization
function switchTab(tabName) {
    // Hide all tab contents
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(content => {
        content.classList.remove('active');
    });

    // Remove active from all tab buttons
    const tabButtons = document.querySelectorAll('.custom-tab-btn');
    tabButtons.forEach(button => {
        button.classList.remove('active');
    });

    // Show selected tab content
    const targetTab = document.getElementById(`${tabName}-tab`);
    if (targetTab) {
        targetTab.classList.add('active');
    }

    // Add active to clicked button
    event.target.closest('.custom-tab-btn').classList.add('active');
}

// Filter Tabs Toggle
document.addEventListener('DOMContentLoaded', () => {
    const filterTabs = document.querySelectorAll('.tab-btn');
    filterTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active from all tabs
            filterTabs.forEach(t => t.classList.remove('active'));
            // Add active to clicked tab
            tab.classList.add('active');
        });
    });
});

// Smooth Animations on Load
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Add click handlers for customization items
document.addEventListener('DOMContentLoaded', () => {
    const customItems = document.querySelectorAll('.custom-item:not(.locked), .island-theme-item:not(.locked)');
    customItems.forEach(item => {
        item.addEventListener('click', () => {
            // Visual feedback
            item.style.transform = 'scale(0.95)';
            setTimeout(() => {
                item.style.transform = '';
            }, 100);
        });
    });
});

// Mission button interactions
document.addEventListener('DOMContentLoaded', () => {
    const missionButtons = document.querySelectorAll('.mission-start-btn');
    missionButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Could add mission start logic here
            console.log('Mission started!');
        });
    });
});

// Reward claim interactions
document.addEventListener('DOMContentLoaded', () => {
    const claimButtons = document.querySelectorAll('.reward-claim-btn, .featured-unlock-btn');
    claimButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Could add reward claim logic here
            console.log('Reward claimed!');
        });
    });
});

// Keyboard Navigation
document.addEventListener('keydown', (e) => {
    // ESC to close modal
    if (e.key === 'Escape') {
        closeScreenSelector();
    }

    // Number keys 1-6 to navigate screens
    const screenMap = {
        '1': 'onboarding',
        '2': 'dashboard',
        '3': 'missions',
        '4': 'rewards',
        '5': 'avatar',
        '6': 'leaderboard'
    };

    if (screenMap[e.key]) {
        navigateTo(screenMap[e.key]);
    }
});

// Add pulse animation to XP progress on dashboard
setInterval(() => {
    const xpFill = document.querySelector('.xp-progress-fill');
    if (xpFill && document.getElementById('dashboard').classList.contains('active')) {
        xpFill.style.transition = 'all 0.3s ease';
    }
}, 1000);

// Console welcome message
console.log('%c🏝️ GenZ Productivity Island', 'color: #00C4FF; font-size: 24px; font-weight: bold;');
console.log('%cWelcome to your tropical productivity paradise!', 'color: #FF8BC2; font-size: 16px;');
console.log('%cKeyboard shortcuts:', 'color: #8EFFA0; font-size: 14px; font-weight: bold;');
console.log('Press 1-6 to navigate between screens');
console.log('Press ESC to close modals');
