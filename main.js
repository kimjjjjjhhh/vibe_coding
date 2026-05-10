const songs = [
    { title: "Dumb Dumb", album: "The Red", concept: "Red", desc: "중독성 강한 훅과 파워풀한 댄스가 돋보이는 레드 컨셉의 정석! 에너지를 얻고 싶을 때 추천해요." },
    { title: "Russian Roulette", album: "Russian Roulette", concept: "Red", desc: "상큼발랄한 신스팝 사운드가 특징이에요. 기분 전환이 필요할 때 딱 맞는 곡입니다." },
    { title: "Red Flavor (빨간 맛)", album: "The Red Summer", concept: "Red", desc: "여름 하면 떠오르는 대표곡! 뜨거운 태양 아래 시원한 과일 에이드 같은 청량함을 느껴보세요." },
    { title: "Peek-A-Boo", album: "Perfect Velvet", concept: "Velvet", desc: "벨벳 컨셉에 레드가 살짝 섞인 매혹적인 업템포 팝 곡이에요. 미스테리하고 쿨한 분위기를 원할 때 추천!" },
    { title: "Bad Boy", album: "The Perfect Red Velvet", concept: "Velvet", desc: "그루비한 신스 사운드와 R&B 멜로디가 일품인 곡입니다. 시크하고 힙한 무드에 젖고 싶을 때 들어보세요." },
    { title: "Psycho", album: "The ReVe Festival: Finale", concept: "Velvet", desc: "우아하면서도 드라마틱한 멜로디가 매력적인 곡이에요. 깊은 감성에 빠지고 싶은 밤에 어울립니다." },
    { title: "Queendom", album: "Queendom", concept: "Red", desc: "우리는 모두 퀸이자 킹! 긍정적인 에너지와 화려한 팝 사운드가 돋보이는 축제 같은 노래입니다." },
    { title: "Feel My Rhythm", album: "The ReVe Festival 2022 - Feel My Rhythm", concept: "Red", desc: "바흐의 'G선상의 아리아'를 샘플링한 우아하고 화사한 봄의 노래입니다. 꽃가루를 날리며 즐겨보세요." },
    { title: "Chill Kill", album: "Chill Kill", concept: "Velvet", desc: "밝음과 어둠이 공존하는 서늘하고도 뜨거운 벨벳 컨셉의 진수. 드라마틱한 전개를 느껴보세요." },
    { title: "Cosmic", album: "Cosmic", concept: "Red", desc: "환상적인 우주 여행을 떠나는 듯한 몽환적이고 밝은 사운드! 사랑하는 사람과 함께 듣기 좋아요." },
    { title: "Ice Cream Cake", album: "Ice Cream Cake", concept: "Red", desc: "레드벨벳의 상큼발랄한 매력이 극대화된 곡! 달콤한 아이스크림 같은 에너지를 느껴보세요." },
    { title: "Rookie", album: "Rookie", concept: "Red", desc: "통통 튀는 비트와 반복되는 훅이 매력적인 곡입니다. 기분 전환이 필요할 때 최고!" },
    { title: "Automatic", album: "Ice Cream Cake", concept: "Velvet", desc: "벨벳 컨셉의 시작을 알린 세련된 R&B 곡. 부드럽고 몽환적인 분위기에 취하고 싶을 때 추천합니다." },
    { title: "One Of These Nights (7월 7일)", album: "The Velvet", concept: "Velvet", desc: "한 편의 동화 같은 감성적인 발라드 곡입니다. 차분하게 감상에 젖고 싶을 때 들어보세요." },
    { title: "Umpah Umpah", album: "The ReVe Festival: Day 2", concept: "Red", desc: "시원한 여름 바다가 생각나는 청량한 댄스곡! 숨 가쁜 일상 속 휴식이 필요할 때 딱이에요." },
    { title: "Zimzalabim", album: "The ReVe Festival: Day 1", concept: "Red", desc: "마법 같은 주문! 실험적이고 중독성 강한 사운드로 새로운 자극이 필요할 때 추천합니다." },
    { title: "RBB (Really Bad Boy)", album: "RBB", concept: "Red", desc: "파워풀한 가창력과 화려한 애드리브가 돋보이는 곡입니다. 자신감을 충전하고 싶을 때 감상해보세요." },
    { title: "Sunny Side Up!", album: "The ReVe Festival: Day 1", concept: "Velvet", desc: "그루비하고 힙한 느낌의 벨벳 수록곡 명곡! 느긋한 오후 햇살 아래서 듣기 좋습니다." },
    { title: "In My Dreams", album: "The ReVe Festival 2022 - Feel My Rhythm", concept: "Velvet", desc: "몽환적이고 서정적인 멜로디가 일품인 곡입니다. 잠들기 전 조용히 감상해보세요." },
    { title: "Underwater", album: "Chill Kill", concept: "Velvet", desc: "깊은 바닷속에 있는 듯한 신비롭고 몽환적인 분위기를 자아냅니다. 고혹적인 매력을 느껴보세요." }
];

// Navigation
const navRecommender = document.getElementById('nav-recommender');
const navMembers = document.getElementById('nav-members');
const navAiTest = document.getElementById('nav-aitest');

const recommenderSection = document.getElementById('recommender-section');
const membersSection = document.getElementById('members-section');
const aiTestSection = document.getElementById('aitest-section');
const aboutSection = document.getElementById('about-section');

function hideAllSections() {
    [recommenderSection, membersSection, aiTestSection, aboutSection].forEach(s => s.classList.add('hidden'));
    [navRecommender, navMembers, navAiTest].forEach(n => n.classList.remove('active'));
}

navRecommender.addEventListener('click', () => { hideAllSections(); navRecommender.classList.add('active'); recommenderSection.classList.remove('hidden'); aboutSection.classList.remove('hidden'); });
navMembers.addEventListener('click', () => { hideAllSections(); navMembers.classList.add('active'); membersSection.classList.remove('hidden'); });
navAiTest.addEventListener('click', () => { hideAllSections(); navAiTest.classList.add('active'); aiTestSection.classList.remove('hidden'); if (!model) initAI(); });

// Recommender
const btnRed = document.getElementById('btn-red');
const btnVelvet = document.getElementById('btn-velvet');
const btnRandom = document.getElementById('btn-random');
const btnSimilar = document.getElementById('btn-similar');
const userSongInput = document.getElementById('user-song-input');
const resultArea = document.getElementById('recommendation-result');
const searchSelection = document.getElementById('search-selection');
const searchResultsList = document.getElementById('search-results-list');
const loading = document.getElementById('loading');

const songTitle = document.getElementById('song-title');
const songAlbum = document.getElementById('song-album');
const songVibe = document.getElementById('song-vibe');
const songDesc = document.getElementById('song-desc');
const searchedArt = document.getElementById('searched-art');
const searchedTitle = document.getElementById('searched-title');
const searchedGenre = document.getElementById('searched-genre');

function showRecommendation(song, searchedInfo = null) {
    loading.classList.add('hidden');
    searchSelection.classList.add('hidden');
    resultArea.classList.remove('hidden');
    
    if (searchedInfo) {
        searchedArt.src = searchedInfo.art;
        searchedTitle.textContent = `${searchedInfo.artist} - ${searchedInfo.title}`;
        searchedGenre.textContent = `장르: ${searchedInfo.genre}`;
    }

    songTitle.textContent = song.title;
    songAlbum.textContent = song.album;
    songVibe.textContent = song.concept;
    songDesc.textContent = song.desc;
    
    const color = song.concept === 'Red' ? '#ff1744' : '#4a148c';
    songVibe.style.color = color;
    songTitle.style.color = color;

    // Scroll to result
    resultArea.scrollIntoView({ behavior: 'smooth' });
}

async function recommendSimilar() {
    const query = userSongInput.value.trim();
    if (!query) return alert('곡 제목을 입력해 주세요!');

    loading.classList.remove('hidden');
    resultArea.classList.add('hidden');
    searchSelection.classList.add('hidden');

    try {
        const response = await fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(query)}&entity=song&limit=5`);
        const data = await response.json();
        loading.classList.add('hidden');

        if (data.results.length === 0) {
            alert('곡을 찾을 수 없습니다. 랜덤 추천으로 대신할게요!');
            return showRecommendation(songs[Math.floor(Math.random() * songs.length)]);
        }

        if (data.results.length === 1) {
            return processTrack(data.results[0]);
        }

        // Show candidates
        searchResultsList.innerHTML = '';
        data.results.forEach(track => {
            const item = document.createElement('div');
            item.className = 'result-item';
            item.innerHTML = `
                <img src="${track.artworkUrl60}" alt="art">
                <div class="info">
                    <div class="t">${track.trackName}</div>
                    <div class="a">${track.artistName} • ${track.collectionName}</div>
                </div>
            `;
            item.onclick = () => processTrack(track);
            searchResultsList.appendChild(item);
        });
        searchSelection.classList.remove('hidden');
        searchSelection.scrollIntoView({ behavior: 'smooth' });

    } catch (e) {
        console.error(e);
        loading.classList.add('hidden');
        showRecommendation(songs[Math.floor(Math.random() * songs.length)]);
    }
}

function processTrack(track) {
    const genre = track.primaryGenreName.toLowerCase();
    const searchedInfo = {
        title: track.trackName,
        artist: track.artistName,
        genre: track.primaryGenreName,
        art: track.artworkUrl100.replace('100x100bb', '300x300bb')
    };

    const redGenres = ['k-pop', 'pop', 'dance', 'electronic', 'teen pop', 'j-pop'];
    const velvetGenres = ['r&b/soul', 'r&b', 'soul', 'jazz', 'ballad', 'blues', 'vocal'];

    let recommended;
    if (redGenres.some(g => genre.includes(g))) {
        const redSongs = songs.filter(s => s.concept === 'Red');
        recommended = redSongs[Math.floor(Math.random() * redSongs.length)];
    } else if (velvetGenres.some(g => genre.includes(g))) {
        const velvetSongs = songs.filter(s => s.concept === 'Velvet');
        recommended = velvetSongs[Math.floor(Math.random() * velvetSongs.length)];
    } else {
        recommended = songs[Math.floor(Math.random() * songs.length)];
    }
    showRecommendation(recommended, searchedInfo);
}

btnRed.addEventListener('click', () => showRecommendation(songs.filter(s => s.concept === 'Red')[Math.floor(Math.random() * 10)]));
btnVelvet.addEventListener('click', () => showRecommendation(songs.filter(s => s.concept === 'Velvet')[Math.floor(Math.random() * 10)]));
btnRandom.addEventListener('click', () => showRecommendation(songs[Math.floor(Math.random() * songs.length)]));
btnSimilar.addEventListener('click', recommendSimilar);
userSongInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') recommendSimilar(); });

// Formspree
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');
const submitBtn = document.getElementById('submit-btn');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        submitBtn.disabled = true;
        submitBtn.textContent = '전송 중...';
        try {
            const res = await fetch('https://formspree.io/f/mkoypqpq', {
                method: 'POST',
                body: JSON.stringify(Object.fromEntries(new FormData(contactForm))),
                headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }
            });
            if (res.ok) {
                formStatus.textContent = '✅ 성공적으로 전송되었습니다!';
                formStatus.classList.remove('hidden');
                contactForm.reset();
            }
        } catch (e) {}
        submitBtn.disabled = false;
        submitBtn.textContent = '전송하기';
    });
}

// AI Test
const MODEL_URL = "./my_model/";
let model, maxPredictions;
const imageInput = document.getElementById('image-input');
const imagePreview = document.getElementById('image-preview');
const imagePreviewContainer = document.getElementById('image-preview-container');
const aiLoading = document.getElementById('ai-loading');
const labelContainer = document.getElementById('label-container');
const aiResultMatch = document.getElementById('ai-result-match');
const matchText = document.getElementById('match-text');

async function initAI() {
    try {
        model = await tmImage.load(MODEL_URL + "model.json", MODEL_URL + "metadata.json");
        maxPredictions = model.getTotalClasses();
    } catch (e) { console.error(e); }
}

if (imageInput) {
    imageInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = async (event) => {
            imagePreview.src = event.target.result;
            imagePreviewContainer.classList.remove('hidden');
            aiResultMatch.classList.add('hidden');
            labelContainer.innerHTML = '';
            if (!model) { aiLoading.classList.remove('hidden'); await initAI(); aiLoading.classList.add('hidden'); }
            if (model) predictAI();
        };
        reader.readAsDataURL(file);
    });
}

async function predictAI() {
    aiLoading.classList.remove('hidden');
    setTimeout(async () => {
        const prediction = await model.predict(imagePreview);
        aiLoading.classList.add('hidden');
        let highestProb = 0, bestClass = "";
        labelContainer.innerHTML = '';
        prediction.forEach(p => {
            const div = document.createElement('div');
            div.innerHTML = `${p.className}: ${(p.probability * 100).toFixed(0)}%`;
            labelContainer.appendChild(div);
            if (p.probability > highestProb) { highestProb = p.probability; bestClass = p.className; }
        });
        if (highestProb > 0.4) {
            aiResultMatch.classList.remove('hidden');
            const lower = bestClass.toLowerCase();
            if (lower.includes('dog') || lower.includes('강아지')) matchText.innerHTML = `귀여운 <strong>강아지상</strong>! 웬디/슬기와 닮았네요! 🐶`;
            else if (lower.includes('cat') || lower.includes('고양이')) matchText.innerHTML = `매혹적인 <strong>고양이상</strong>! 아이린/조이와 닮았네요! 🐱`;
            else matchText.innerHTML = `매력적인 <strong>${bestClass}상</strong>! 멤버들과 환상 조화! ✨`;
        }
    }, 200);
}

// Privacy Modal
const openPrivacy = document.getElementById('open-privacy'), privacyModal = document.getElementById('privacy-modal'), closeModal = document.querySelector('.close-modal');
if (openPrivacy) openPrivacy.onclick = (e) => { e.preventDefault(); privacyModal.classList.remove('hidden'); };
if (closeModal) closeModal.onclick = () => privacyModal.classList.add('hidden');
window.onclick = (e) => { if (e.target === privacyModal) privacyModal.classList.add('hidden'); };
