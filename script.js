// Spotify Clone - Interactive Features
// =====================================

// Music Player State
const musicPlayer = {
  isPlaying: false,
  currentTime: 0,
  duration: 213, // 3:33 in seconds
  volume: 100,
};

// DOM Elements
const progressBar = document.querySelector('.progress-bar');
const currentTimeDisplay = document.querySelector('.current.time');
const totalTimeDisplay = document.querySelector('.tot-time');
const playButton = document.querySelector('.player-control-icons[style*="opacity: 1"]');
const musicLibraryBtn = document.querySelector('.lib-option');
const navOptions = document.querySelectorAll('.nav-option');
const cards = document.querySelectorAll('.card');
const badges = document.querySelectorAll('.badge');

// Format time to MM:SS
function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// Update progress bar and time display
function updateProgress() {
  if (musicPlayer.isPlaying) {
    musicPlayer.currentTime += 0.1;
    if (musicPlayer.currentTime >= musicPlayer.duration) {
      musicPlayer.currentTime = 0;
      musicPlayer.isPlaying = false;
    }
  }
  
  if (progressBar) {
    progressBar.value = (musicPlayer.currentTime / musicPlayer.duration) * 100;
  }
  
  if (currentTimeDisplay) {
    currentTimeDisplay.textContent = formatTime(musicPlayer.currentTime);
  }
}

// Progress bar input handler
if (progressBar) {
  progressBar.addEventListener('input', (e) => {
    musicPlayer.currentTime = (e.target.value / 100) * musicPlayer.duration;
    updateProgress();
  });
}

// Update progress every 100ms
setInterval(updateProgress, 100);

// Navigation functionality
navOptions.forEach((option) => {
  option.addEventListener('click', () => {
    navOptions.forEach(opt => opt.style.opacity = '0.7');
    option.style.opacity = '1';
  });
});

// Card hover effects and click handlers
cards.forEach((card) => {
  card.addEventListener('click', () => {
    const title = card.querySelector('.card-title')?.textContent || 'Unknown';
    showNotification(`Playing: ${title}`);
  });
});

// Badge button effects
badges.forEach((badge) => {
  badge.addEventListener('click', (e) => {
    e.stopPropagation();
    const text = badge.textContent.trim();
    if (text === 'Create Playlist') {
      showNotification('Creating new playlist...', 'success');
    } else if (text === 'Browse Podcasts') {
      showNotification('Browsing podcasts...', 'success');
    } else if (text.includes('Explore Premium')) {
      showNotification('Redirecting to Premium...', 'success');
    } else if (text.includes('Install App')) {
      showNotification('App installation information', 'info');
    }
  });
});

// Notification System
function showNotification(message, type = 'info') {
  // Remove existing notification if any
  const existingNotif = document.querySelector('.notification');
  if (existingNotif) {
    existingNotif.remove();
  }
  
  const notification = document.createElement('div');
  notification.classList.add('notification', type);
  notification.textContent = message;
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.classList.add('show');
  }, 10);
  
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// Search functionality simulation
const searchLink = document.querySelector('.nav-option:nth-child(2)');
if (searchLink) {
  searchLink.addEventListener('click', (e) => {
    e.preventDefault();
    showNotification('Search feature - Coming soon!', 'info');
  });
}

// Download/Install app button
const installBtn = document.querySelector('.dark-badge');
if (installBtn) {
  installBtn.addEventListener('click', () => {
    showNotification('Installing Spotify Web Player...', 'success');
  });
}

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
  // Space to play/pause
  if (e.code === 'Space' && e.target === document.body) {
    e.preventDefault();
    togglePlayPause();
  }
  // Right arrow to skip forward
  if (e.code === 'ArrowRight') {
    musicPlayer.currentTime = Math.min(musicPlayer.currentTime + 5, musicPlayer.duration);
  }
  // Left arrow to skip backward
  if (e.code === 'ArrowLeft') {
    musicPlayer.currentTime = Math.max(musicPlayer.currentTime - 5, 0);
  }
});

// Toggle play/pause
function togglePlayPause() {
  musicPlayer.isPlaying = !musicPlayer.isPlaying;
  showNotification(
    musicPlayer.isPlaying ? '▶ Playing...' : '⏸ Paused',
    'info'
  );
  updateProgress();
}

// Player control icon interactions
const playerControls = document.querySelectorAll('.player-control-icons');
playerControls.forEach((control, index) => {
  control.addEventListener('click', () => {
    switch(index) {
      case 0:
        showNotification('Shuffle ON');
        break;
      case 1:
        musicPlayer.currentTime = Math.max(musicPlayer.currentTime - 15, 0);
        showNotification('⏮ Rewinding...');
        break;
      case 2:
        togglePlayPause();
        break;
      case 3:
        musicPlayer.currentTime = Math.min(musicPlayer.currentTime + 15, musicPlayer.duration);
        showNotification('⏭ Skipping...');
        break;
      case 4:
        showNotification('Repeat mode activated');
        break;
    }
  });
});

// Control icons interactions
const controlIcons = document.querySelectorAll('.controp');
controlIcons.forEach((icon, index) => {
  icon.addEventListener('click', () => {
    switch(index) {
      case 0:
        showNotification('Added to Liked Songs ❤');
        break;
      case 1:
        showNotification('Playing next...');
        break;
      case 2:
        showNotification('Lyrics view');
        break;
      case 3:
        showNotification('Queue updated');
        break;
      case 4:
        showNotification('Sharing song...');
        break;
    }
  });
});

// Smooth scroll behavior
document.querySelectorAll('a[href="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    showNotification('Navigation feature - Coming soon!');
  });
});

// Page load animation
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  setTimeout(() => {
    document.body.style.transition = 'opacity 0.5s ease';
    document.body.style.opacity = '1';
  }, 10);
});

// Log initialization
console.log('🎵 Spotify Clone loaded successfully!');
console.log('Keyboard shortcuts: SPACE (play/pause), ← → (seek), ARROW keys (skip)');
