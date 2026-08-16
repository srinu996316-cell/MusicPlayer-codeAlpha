/* =================================================
   MELODIA — Spotify-Inspired Telugu Music Player
   ================================================= */

// ──────────── Album Color Schemes ────────────
const ALBUM_ART = {
  'Pushpa': { gradient: 'linear-gradient(135deg,#e74c3c,#c0392b)', emoji: '🔥' },
  'RRR': { gradient: 'linear-gradient(135deg,#f39c12,#d35400)', emoji: '⚡' },
  'Ala Vaikunthapurramuloo': { gradient: 'linear-gradient(135deg,#3498db,#2c3e50)', emoji: '💫' },
  'Baahubali': { gradient: 'linear-gradient(135deg,#d35400,#b71540)', emoji: '👑' },
  'Baahubali 2': { gradient: 'linear-gradient(135deg,#f39c12,#e74c3c)', emoji: '🗡️' },
  'Salaar': { gradient: 'linear-gradient(135deg,#2c3e50,#111111)', emoji: '⚔️' },
  'Kalki 2898 AD': { gradient: 'linear-gradient(135deg,#8e44ad,#2980b9)', emoji: '🤖' },
  'Saaho': { gradient: 'linear-gradient(135deg,#16a085,#2c3e50)', emoji: '🕶️' },
  'Radhe Shyam': { gradient: 'linear-gradient(135deg,#e84393,#fd79a8)', emoji: '🎻' },
  'Mirchi': { gradient: 'linear-gradient(135deg,#e74c3c,#e67e22)', emoji: '🌶️' },
  'Darling': { gradient: 'linear-gradient(135deg,#fd79a8,#6c5ce7)', emoji: '💖' },
  'Varsham': { gradient: 'linear-gradient(135deg,#0984e3,#74b9ff)', emoji: '🌧️' },
  'Chatrapathi': { gradient: 'linear-gradient(135deg,#d35400,#e17055)', emoji: '⚓' },
};

// ──────────── Track Definitions (17 Telugu & Prabhas Songs) ────────────
const TRACKS = [
  // Mega Hits
  { title: 'Oo Antava Oo Antava', artist: 'Indravathi Chauhan', album: 'Pushpa', duration: 228, url: 'songs/Oo_Antava_Song.mp3', tags: ['dance'] },
  { title: 'Saami Saami', artist: 'Mounika Yadav', album: 'Pushpa', duration: 227, url: 'songs/Saami Saami.mp3', tags: ['dance'] },
  { title: 'Naatu Naatu', artist: 'Rahul Sipligunj & Kaala Bhairava', album: 'RRR', duration: 215, url: 'songs/Nattu Nattu.mp3', tags: ['dance'] },
  { title: 'Komuram Bheemudo', artist: 'Kaala Bhairava', album: 'RRR', duration: 254, url: 'songs/Komuram Bheemudo.mp3', tags: ['melody'] },
  { title: 'Samajavaragamana', artist: 'Sid Sriram', album: 'Ala Vaikunthapurramuloo', duration: 206, url: 'songs/Samajavaragamana.mp3', tags: ['melody', 'sid'] },
  { title: 'Butta Bomma', artist: 'Armaan Malik', album: 'Ala Vaikunthapurramuloo', duration: 198, url: 'songs/Buttabomma.mp3', tags: ['dance', 'melody'] },
  { title: 'Ramuloo Ramulaa', artist: 'Anurag Kulkarni', album: 'Ala Vaikunthapurramuloo', duration: 284, url: 'songs/Ramuloo Ramula.mp3', tags: ['dance'] },

  // Prabhas Telugu Movie Hits
  { title: 'Dhivara', artist: 'Ramya Behara & Deepu', album: 'Baahubali', duration: 325, url: 'songs/Dhivara.mp3', tags: ['melody', 'prabhas'] },
  { title: 'Saahore Baahubali', artist: 'Daler Mehndi & M.M. Keeravaani', album: 'Baahubali 2', duration: 202, url: 'songs/Saahore Baahubali.mp3', tags: ['dance', 'prabhas'] },
  { title: 'Sooreede', artist: 'Harini Ivaturi', album: 'Salaar', duration: 198, url: 'songs/Sooreede.mp3', tags: ['melody', 'prabhas'] },
  { title: 'Bhairava Anthem', artist: 'Diljit Dosanjh & Santhosh Narayanan', album: 'Kalki 2898 AD', duration: 164, url: 'songs/Bhairava Anthem.mp3', tags: ['dance', 'prabhas'] },
  { title: 'Psycho Saiyaan', artist: 'Dhvani Bhanushali & Sachet Tandon', album: 'Saaho', duration: 166, url: 'songs/Psycho Saiyaan.mp3', tags: ['dance', 'prabhas'] },
  { title: 'Ee Raathale', artist: 'Yuvan Shankar Raja', album: 'Radhe Shyam', duration: 220, url: 'songs/Ee Raathale.mp3', tags: ['melody', 'prabhas'] },
  { title: 'Mirchi Title Song', artist: 'Mika Singh', album: 'Mirchi', duration: 230, url: 'songs/Mirchi Title Song.mp3', tags: ['dance', 'prabhas'] },
  { title: 'Inka Edho', artist: 'Suraj Jagan', album: 'Darling', duration: 312, url: 'songs/Inka Edho.mp3', tags: ['melody', 'prabhas'] },
  { title: 'Mellaga Karagani', artist: 'S. P. Balasubrahmanyam & K. S. Chithra', album: 'Varsham', duration: 285, url: 'songs/Mellaga Karagani.mp3', tags: ['melody', 'prabhas'] },
  { title: 'A Vachi B Pai Valli', artist: 'M. M. Keeravaani', album: 'Chatrapathi', duration: 260, url: 'songs/A Vachi B Pai Valli.mp3', tags: ['dance', 'prabhas'] },
];

function formatTime(s) {
  if (!isFinite(s) || s < 0) return '0:00';
  return `${Math.floor(s / 60)}:${Math.floor(s % 60).toString().padStart(2, '0')}`;
}

// ══════════════════════════════════════════════════
//  MusicPlayer Class
// ══════════════════════════════════════════════════
class MusicPlayer {
  constructor() {
    this.idx = 0; // Current index relative to TRACKS
    this.playing = false;
    this.shuffle = false;
    this.repeat = 0; // 0=off,1=all,2=one
    this.muted = false;
    this.prevVol = 100;
    this.dragging = false;
    this.liked = new Set();

    // Playlist logic
    this.currentPlaylistId = 'all';
    this.visibleIndices = TRACKS.map((_, i) => i); // indices of tracks currently shown
    this.shuffleOrder = [];

    // DOM Elements
    this.audio = document.getElementById('audio');
    this.playBtn = document.getElementById('playBtn');
    this.prevBtn = document.getElementById('prevBtn');
    this.nextBtn = document.getElementById('nextBtn');
    this.skipBackBtn = document.getElementById('skipBackBtn');
    this.skipForwardBtn = document.getElementById('skipForwardBtn');
    this.shuffleBtn = document.getElementById('shuffleBtn');
    this.shuffleBtnTop = document.getElementById('shuffleBtnTop');
    this.repeatBtn = document.getElementById('repeatBtn');
    this.progressBar = document.getElementById('progressBar');
    this.progressFill = document.getElementById('progressFill');
    this.currentTimeEl = document.getElementById('currentTime');
    this.totalTimeEl = document.getElementById('totalTime');
    this.iconPlay = document.getElementById('iconPlay');
    this.iconPause = document.getElementById('iconPause');
    this.heroPlayBtn = document.getElementById('heroPlayBtn');
    this.heroPlayIcon = document.getElementById('heroPlayIcon');
    this.heroPauseIcon = document.getElementById('heroPauseIcon');
    this.npTitle = document.getElementById('npTitle');
    this.npArtist = document.getElementById('npArtist');
    this.npArt = document.getElementById('npArt');
    this.npLike = document.getElementById('npLike');
    this.heroGradient = document.getElementById('heroGradient');
    this.songList = document.getElementById('songList');
    this.trackCountEl = document.getElementById('trackCount');
    this.volumeSlider = document.getElementById('volumeSlider');
    this.volumeBtn = document.getElementById('volumeBtn');
    this.searchInput = document.getElementById('searchInput');
    this.shortcutsOverlay = document.getElementById('shortcutsOverlay');
    this.mainContent = document.getElementById('mainContent');
    this.mainHeader = document.getElementById('mainHeader');
    this.sidebar = document.getElementById('sidebar');
    this.sidebarOverlay = document.getElementById('sidebarOverlay');
    this.mobileToggle = document.getElementById('mobileToggle');
    this.heroTitle = document.querySelector('.hero-title');

    this.sidebarPlaylists = document.getElementById('sidebarPlaylists');

    // Remove Visualizer canvas setup (since we use real MP3s now)
    const canvas = document.getElementById('visualizer');
    if (canvas) canvas.remove();

    this.init();
  }

  init() {
    this.loadPlaylist('all');
    this.audio.volume = this.volumeSlider.value / 100;
    this.updateVolSliderBg();
    this.bindEvents();

    // Load the first track in the playlist silently
    if (this.visibleIndices.length > 0) {
      this.loadTrack(this.visibleIndices[0], false);
    }
  }

  // ──── Playlist & Rendering ────
  loadPlaylist(id) {
    this.currentPlaylistId = id;

    // Update sidebar UI
    const links = this.sidebarPlaylists.querySelectorAll('.playlist-link');
    let title = "Telugu Mega Hits";
    links.forEach(link => {
      if (link.dataset.id === id) {
        link.classList.add('active');
        title = link.innerText.trim();
      } else {
        link.classList.remove('active');
      }
    });

    this.heroTitle.textContent = title;

    // Filter tracks
    if (id === 'all') {
      this.visibleIndices = TRACKS.map((_, i) => i);
    } else if (id === 'liked') {
      this.visibleIndices = Array.from(this.liked);
    } else {
      this.visibleIndices = [];
      TRACKS.forEach((t, i) => {
        if (t.tags.includes(id)) this.visibleIndices.push(i);
      });
    }

    this.renderSongList(this.visibleIndices);
    this.trackCountEl.textContent = this.visibleIndices.length;
    if (this.shuffle) this.genShuffle();
  }

  renderSongList(indices) {
    this.songList.innerHTML = '';

    if (indices.length === 0) {
      this.songList.innerHTML = '<div class="no-results" style="padding: 2rem; text-align: center; color: var(--text-muted);"><span>🔍</span> No songs found</div>';
      return;
    }

    indices.forEach((i, displayIndex) => {
      const t = TRACKS[i];
      const art = ALBUM_ART[t.album] || { gradient: 'linear-gradient(135deg,#333,#555)', emoji: '🎵' };
      const row = document.createElement('div');

      const isCurrent = (i === this.idx);
      row.className = 'song-row' + (isCurrent && this.playing ? ' playing' : '') + (isCurrent ? ' current' : '');
      row.dataset.index = i;
      row.innerHTML = `
        <div class="song-num">
          <span class="song-num-text">${displayIndex + 1}</span>
          <span class="song-play-icon"><svg viewBox="0 0 24 24"><polygon points="8,5 20,12 8,19"/></svg></span>
          <div class="song-eq"><div class="song-eq-bar"></div><div class="song-eq-bar"></div><div class="song-eq-bar"></div><div class="song-eq-bar"></div></div>
        </div>
        <div class="song-info-cell">
          <div class="song-art" style="background:${art.gradient}">${art.emoji}</div>
          <div class="song-text">
            <div class="song-title">${t.title}</div>
            <div class="song-artist-name">${t.artist}</div>
          </div>
        </div>
        <span class="song-album">${t.album}</span>
        <span class="song-duration">${formatTime(t.duration)}</span>
        <button class="song-like ${this.liked.has(i) ? 'liked' : ''}" data-idx="${i}" title="Like">
          <svg viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
        </button>
      `;
      row.addEventListener('click', (e) => {
        if (e.target.closest('.song-like')) return;
        this.loadTrack(i, true);
      });
      const likeBtn = row.querySelector('.song-like');
      likeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.toggleLike(i);
      });
      this.songList.appendChild(row);
    });
  }

  updateSongListUI() {
    this.songList.querySelectorAll('.song-row').forEach(row => {
      const i = parseInt(row.dataset.index);
      row.classList.toggle('playing', i === this.idx && this.playing);
      row.classList.toggle('current', i === this.idx);
    });
  }

  // ──── Track Loading ────
  loadTrack(index, autoPlay = false) {
    if (index === -1 || !TRACKS[index]) return;
    this.idx = index;
    const t = TRACKS[index];
    const art = ALBUM_ART[t.album] || { gradient: 'linear-gradient(135deg,#333,#555)', emoji: '🎵' };

    // Set src to encoded URI for space and special character safety
    this.audio.src = encodeURI(t.url);
    this.audio.load();

    // Now-playing bar
    this.npTitle.textContent = t.title;
    this.npArtist.textContent = t.artist;
    this.npArt.style.background = art.gradient;
    this.npArt.textContent = art.emoji;

    // Hero gradient
    const colors = art.gradient.match(/#[0-9a-fA-F]{6}/g) || ['#282828'];
    this.heroGradient.style.background = `linear-gradient(180deg, ${colors[0]}88 0%, var(--bg-base) 100%)`;

    // Progress reset
    this.progressFill.style.width = '0%';
    this.currentTimeEl.textContent = '0:00';
    this.totalTimeEl.textContent = formatTime(t.duration);

    // Like state
    this.npLike.classList.toggle('active', this.liked.has(index));

    this.updateSongListUI();

    if (autoPlay) {
      this.play();
    }
  }

  // ──── Playback ────
  async play() {
    if (this.visibleIndices.length === 0) return;

    try {
      await this.audio.play();
      this.playing = true;
    } catch (e) {
      if (e.name !== 'AbortError') {
        console.warn('Playback error:', e);
      }
      this.playing = !this.audio.paused;
    }
    this.updatePlayUI();
    this.updateSongListUI();
  }

  pause() {
    this.audio.pause();
    this.playing = false;
    this.updatePlayUI();
    this.updateSongListUI();
  }

  toggle() { this.playing ? this.pause() : this.play(); }

  // ──── Navigation ────
  next() {
    if (this.visibleIndices.length === 0) return;
    let nIndex;
    if (this.shuffle) {
      nIndex = this.shuffleNext();
    } else {
      let vIndex = this.visibleIndices.indexOf(this.idx);
      if (vIndex === -1) vIndex = 0; // If current track is not in current playlist
      let nextVIndex = (vIndex + 1) % this.visibleIndices.length;
      nIndex = this.visibleIndices[nextVIndex];
    }
    this.loadTrack(nIndex, true);
  }

  prev() {
    if (this.visibleIndices.length === 0) return;
    if (this.audio.currentTime > 3) { this.audio.currentTime = 0; return; }

    let pIndex;
    if (this.shuffle) {
      pIndex = this.shufflePrev();
    } else {
      let vIndex = this.visibleIndices.indexOf(this.idx);
      if (vIndex === -1) vIndex = 0;
      let prevVIndex = (vIndex - 1 + this.visibleIndices.length) % this.visibleIndices.length;
      pIndex = this.visibleIndices[prevVIndex];
    }
    this.loadTrack(pIndex, true);
  }

  // ──── Shuffle ────
  genShuffle() {
    this.shuffleOrder = [...this.visibleIndices];
    for (let i = this.shuffleOrder.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.shuffleOrder[i], this.shuffleOrder[j]] = [this.shuffleOrder[j], this.shuffleOrder[i]];
    }
  }
  shuffleNext() {
    if (!this.shuffleOrder.length) this.genShuffle();
    const ci = this.shuffleOrder.indexOf(this.idx);
    const ni = (ci + 1) % this.shuffleOrder.length;
    if (ni === 0) this.genShuffle(); // reshuffle when we hit the end
    return this.shuffleOrder[ni];
  }
  shufflePrev() {
    if (!this.shuffleOrder.length) this.genShuffle();
    const ci = this.shuffleOrder.indexOf(this.idx);
    return this.shuffleOrder[(ci - 1 + this.shuffleOrder.length) % this.shuffleOrder.length];
  }
  toggleShuffle() {
    this.shuffle = !this.shuffle;
    this.shuffleBtn.classList.toggle('active', this.shuffle);
    this.shuffleBtnTop.classList.toggle('active', this.shuffle);
    if (this.shuffle) this.genShuffle();
  }

  // ──── Repeat ────
  toggleRepeat() {
    this.repeat = (this.repeat + 1) % 3;
    this.repeatBtn.classList.toggle('active', this.repeat > 0);
    const svg = document.getElementById('repeatIcon');
    if (this.repeat === 2) {
      svg.innerHTML = '<path d="M17 1l4 4-4 4"/><path d="M3 11V9a4 4 0 014-4h14"/><path d="M7 23l-4-4 4-4"/><path d="M21 13v2a4 4 0 01-4 4H3"/><text x="12" y="15" text-anchor="middle" font-size="8" font-weight="bold" fill="currentColor">1</text>';
    } else {
      svg.innerHTML = '<path d="M17 1l4 4-4 4"/><path d="M3 11V9a4 4 0 014-4h14"/><path d="M7 23l-4-4 4-4"/><path d="M21 13v2a4 4 0 01-4 4H3"/>';
    }
  }

  // ──── Track End (Autoplay) ────
  onEnd() {
    if (this.repeat === 2) { this.audio.currentTime = 0; this.play(); }
    else if (this.repeat === 1) { this.next(); }
    else if (this.shuffle || this.visibleIndices.indexOf(this.idx) < this.visibleIndices.length - 1) { this.next(); }
    else { this.pause(); }
  }

  // ──── Like ────
  toggleLike(idx) {
    if (this.liked.has(idx)) {
      this.liked.delete(idx);
    } else {
      this.liked.add(idx);
    }

    // Update song list like buttons
    this.songList.querySelectorAll('.song-like').forEach(btn => {
      const i = parseInt(btn.dataset.idx);
      btn.classList.toggle('liked', this.liked.has(i));
    });

    // Update now-playing like if it's the current track
    if (this.idx === idx) {
      this.npLike.classList.toggle('active', this.liked.has(this.idx));
    }

    // Refresh playlist if we are on the "Liked Songs" tab
    if (this.currentPlaylistId === 'liked') {
      this.loadPlaylist('liked');
    }
  }

  // ──── Volume ────
  setVol(val) {
    val = Math.max(0, Math.min(100, val));
    this.audio.volume = val / 100;
    this.volumeSlider.value = val;
    this.updateVolSliderBg();
    this.updateVolIcon();
    if (val > 0) { this.muted = false; this.prevVol = val; }
  }
  toggleMute() {
    if (this.muted) { this.setVol(this.prevVol); this.muted = false; }
    else { this.prevVol = parseInt(this.volumeSlider.value); this.setVol(0); this.muted = true; }
  }
  updateVolSliderBg() {
    const v = this.volumeSlider.value;
    this.volumeSlider.style.background = `linear-gradient(to right,var(--green) 0%,var(--green) ${v}%,hsla(0,0%,100%,.1) ${v}%)`;
  }
  updateVolIcon() {
    const vol = this.audio.volume;
    const svg = document.getElementById('volIcon');
    if (vol === 0) {
      svg.innerHTML = '<polygon points="11,5 6,9 2,9 2,15 6,15 11,19"/><line x1="23" y1="9" x2="17" y2="15" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><line x1="17" y1="9" x2="23" y2="15" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>';
    } else if (vol < 0.5) {
      svg.innerHTML = '<polygon points="11,5 6,9 2,9 2,15 6,15 11,19"/><path d="M15.54 8.46a5 5 0 010 7.07" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>';
    } else {
      svg.innerHTML = '<polygon points="11,5 6,9 2,9 2,15 6,15 11,19"/><path d="M15.54 8.46a5 5 0 010 7.07" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M19.07 4.93a10 10 0 010 14.14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>';
    }
  }

  // ──── Progress ────
  updateProgress() {
    if (this.dragging) return;
    const { currentTime: ct, duration: d } = this.audio;
    if (!isFinite(d) || d === 0) {
      // If we don't have real audio loaded (because the mp3s don't exist yet),
      // we could simulate progress, but for now we just fallback to 0.
      return;
    }
    this.progressFill.style.width = `${(ct / d) * 100}%`;
    this.currentTimeEl.textContent = formatTime(ct);
    this.totalTimeEl.textContent = formatTime(d);
  }
  seekTo(clientX) {
    const r = this.progressBar.getBoundingClientRect();
    let pct = Math.max(0, Math.min(1, (clientX - r.left) / r.width));
    this.progressFill.style.width = `${pct * 100}%`;
    if (isFinite(this.audio.duration)) this.audio.currentTime = pct * this.audio.duration;
    this.currentTimeEl.textContent = formatTime(this.audio.currentTime);
  }

  // ──── Play/Pause UI ────
  updatePlayUI() {
    const p = this.playing;
    this.iconPlay.style.display = p ? 'none' : 'block';
    this.iconPause.style.display = p ? 'block' : 'none';
    this.heroPlayIcon.style.display = p ? 'none' : 'block';
    this.heroPauseIcon.style.display = p ? 'block' : 'none';
  }

  // ──── Search ────
  handleSearch() {
    const q = this.searchInput.value.trim().toLowerCase();

    // Change to "All Songs" playlist conceptually for search
    this.sidebarPlaylists.querySelectorAll('.playlist-link').forEach(link => link.classList.remove('active'));
    this.heroTitle.textContent = q ? `Search results for "${q}"` : "Telugu Mega Hits";

    if (!q) {
      this.loadPlaylist('all');
      return;
    }

    const matches = [];
    TRACKS.forEach((t, i) => {
      if (t.title.toLowerCase().includes(q) ||
        t.artist.toLowerCase().includes(q) ||
        t.album.toLowerCase().includes(q)) {
        matches.push(i);
      }
    });

    this.visibleIndices = matches;
    this.renderSongList(matches);
  }

  // ──── Sidebar ────
  openSidebar() { this.sidebar.classList.add('open'); this.sidebarOverlay.classList.add('visible'); }
  closeSidebar() { this.sidebar.classList.remove('open'); this.sidebarOverlay.classList.remove('visible'); }

  // ──── Keyboard ────
  onKey(e) {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
    switch (e.key) {
      case ' ': e.preventDefault(); this.toggle(); break;
      case 'ArrowRight': e.preventDefault(); if (isFinite(this.audio.duration)) this.audio.currentTime = Math.min(this.audio.duration, this.audio.currentTime + 5); break;
      case 'ArrowLeft': e.preventDefault(); this.audio.currentTime = Math.max(0, this.audio.currentTime - 5); break;
      case 'ArrowUp': e.preventDefault(); this.setVol(parseInt(this.volumeSlider.value) + 5); break;
      case 'ArrowDown': e.preventDefault(); this.setVol(parseInt(this.volumeSlider.value) - 5); break;
      case 'n': case 'N': this.next(); break;
      case 'p': case 'P': this.prev(); break;
      case 'm': case 'M': this.toggleMute(); break;
      case 's': case 'S': this.toggleShuffle(); break;
      case 'r': case 'R': this.toggleRepeat(); break;
      case '?': this.shortcutsOverlay.classList.toggle('open'); break;
      case 'Escape': this.shortcutsOverlay.classList.remove('open'); this.closeSidebar(); break;
    }
  }

  // ──── Events ────
  bindEvents() {
    this.playBtn.addEventListener('click', () => this.toggle());
    this.heroPlayBtn.addEventListener('click', () => this.toggle());
    this.nextBtn.addEventListener('click', () => this.next());
    this.prevBtn.addEventListener('click', () => this.prev());
    this.skipBackBtn.addEventListener('click', () => {
      this.audio.currentTime = Math.max(0, this.audio.currentTime - 10);
    });
    this.skipForwardBtn.addEventListener('click', () => {
      if (isFinite(this.audio.duration)) {
        this.audio.currentTime = Math.min(this.audio.duration, this.audio.currentTime + 10);
      }
    });
    this.shuffleBtn.addEventListener('click', () => this.toggleShuffle());
    this.shuffleBtnTop.addEventListener('click', () => this.toggleShuffle());
    this.repeatBtn.addEventListener('click', () => this.toggleRepeat());

    // Progress
    this.progressBar.addEventListener('mousedown', (e) => { this.dragging = true; this.progressBar.classList.add('dragging'); this.seekTo(e.clientX); });
    document.addEventListener('mousemove', (e) => { if (this.dragging) this.seekTo(e.clientX); });
    document.addEventListener('mouseup', () => { if (this.dragging) { this.dragging = false; this.progressBar.classList.remove('dragging'); } });
    this.progressBar.addEventListener('touchstart', (e) => { this.dragging = true; this.seekTo(e.touches[0].clientX); }, { passive: true });
    document.addEventListener('touchmove', (e) => { if (this.dragging) this.seekTo(e.touches[0].clientX); }, { passive: true });
    document.addEventListener('touchend', () => { if (this.dragging) { this.dragging = false; } });

    this.audio.addEventListener('timeupdate', () => this.updateProgress());
    this.audio.addEventListener('ended', () => this.onEnd());
    this.audio.addEventListener('loadedmetadata', () => {
      if (isFinite(this.audio.duration) && this.audio.duration > 0) {
        this.totalTimeEl.textContent = formatTime(this.audio.duration);
      }
    });

    // Volume
    this.volumeSlider.addEventListener('input', () => this.setVol(parseInt(this.volumeSlider.value)));
    this.volumeBtn.addEventListener('click', () => this.toggleMute());

    // Like (now playing bar)
    this.npLike.addEventListener('click', () => this.toggleLike(this.idx));

    // Search
    this.searchInput.addEventListener('input', () => this.handleSearch());

    // Sidebar Playlists
    this.sidebarPlaylists.addEventListener('click', (e) => {
      const link = e.target.closest('.playlist-link');
      if (link) {
        this.loadPlaylist(link.dataset.id);
        if (window.innerWidth <= 768) this.closeSidebar();
      }
    });

    // Keyboard
    document.addEventListener('keydown', (e) => this.onKey(e));

    // Shortcuts dialog
    document.getElementById('shortcutsClose').addEventListener('click', () => this.shortcutsOverlay.classList.remove('open'));
    this.shortcutsOverlay.addEventListener('click', (e) => { if (e.target === this.shortcutsOverlay) this.shortcutsOverlay.classList.remove('open'); });

    // Sidebar (mobile)
    this.mobileToggle.addEventListener('click', () => this.openSidebar());
    this.sidebarOverlay.addEventListener('click', () => this.closeSidebar());

    // Sticky header scroll effect
    this.mainContent.addEventListener('scroll', () => {
      this.mainHeader.classList.toggle('scrolled', this.mainContent.scrollTop > 80);
    });
  }
}

// ──── Launch ────
document.addEventListener('DOMContentLoaded', () => new MusicPlayer());
