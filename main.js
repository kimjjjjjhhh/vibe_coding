const songs = [
    {
        title: "Dumb Dumb",
        album: "The Red",
        concept: "Red",
        desc: "중독성 강한 훅과 파워풀한 댄스가 돋보이는 레드 컨셉의 정석! 에너지를 얻고 싶을 때 추천해요."
    },
    {
        title: "Russian Roulette",
        album: "Russian Roulette",
        concept: "Red",
        desc: "상큼발랄한 신스팝 사운드가 특징이에요. 기분 전환이 필요할 때 딱 맞는 곡입니다."
    },
    {
        title: "Red Flavor (빨간 맛)",
        album: "The Red Summer",
        concept: "Red",
        desc: "여름 하면 떠오르는 대표곡! 뜨거운 태양 아래 시원한 과일 에이드 같은 청량함을 느껴보세요."
    },
    {
        title: "Peek-A-Boo",
        album: "Perfect Velvet",
        concept: "Velvet",
        desc: "벨벳 컨셉에 레드가 살짝 섞인 매혹적인 업템포 팝 곡이에요. 미스테리하고 쿨한 분위기를 원할 때 추천!"
    },
    {
        title: "Bad Boy",
        album: "The Perfect Red Velvet",
        concept: "Velvet",
        desc: "그루비한 신스 사운드와 R&B 멜로디가 일품인 곡입니다. 시크하고 힙한 무드에 젖고 싶을 때 들어보세요."
    },
    {
        title: "Psycho",
        album: "The ReVe Festival: Finale",
        concept: "Velvet",
        desc: "우아하면서도 드라마틱한 멜로디가 매력적인 곡이에요. 깊은 감성에 빠지고 싶은 밤에 어울립니다."
    },
    {
        title: "Queendom",
        album: "Queendom",
        concept: "Red",
        desc: "우리는 모두 퀸이자 킹! 긍정적인 에너지와 화려한 팝 사운드가 돋보이는 축제 같은 노래입니다."
    },
    {
        title: "Feel My Rhythm",
        album: "The ReVe Festival 2022 - Feel My Rhythm",
        concept: "Red",
        desc: "바흐의 'G선상의 아리아'를 샘플링한 우아하고 화사한 봄의 노래입니다. 꽃가루를 날리며 즐겨보세요."
    },
    {
        title: "Chill Kill",
        album: "Chill Kill",
        concept: "Velvet",
        desc: "밝음과 어둠이 공존하는 서늘하고도 뜨거운 벨벳 컨셉의 진수. 드라마틱한 전개를 느껴보세요."
    },
    {
        title: "Cosmic",
        album: "Cosmic",
        concept: "Red",
        desc: "환상적인 우주 여행을 떠나는 듯한 몽환적이고 밝은 사운드! 사랑하는 사람과 함께 듣기 좋아요."
    }
];

// --- Navigation Toggle Logic ---
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

navRecommender.addEventListener('click', () => {
    hideAllSections();
    navRecommender.classList.add('active');
    recommenderSection.classList.remove('hidden');
    aboutSection.classList.remove('hidden');
});

navMembers.addEventListener('click', () => {
    hideAllSections();
    navMembers.classList.add('active');
    membersSection.classList.remove('hidden');
});

navAiTest.addEventListener('click', () => {
    hideAllSections();
    navAiTest.classList.add('active');
    aiTestSection.classList.remove('hidden');
    if (!model) initAI();
});

// --- Recommender Elements ---
const btnRed = document.getElementById('btn-red');
const btnVelvet = document.getElementById('btn-velvet');
const btnRandom = document.getElementById('btn-random');
const btnSimilar = document.getElementById('btn-similar');
const userSongInput = document.getElementById('user-song-input');
const resultArea = document.getElementById('recommendation-result');
const loading = document.getElementById('loading');
const searchSummary = document.getElementById('search-summary');

const songTitle = document.getElementById('song-title');
const songAlbum = document.getElementById('song-album');
const songVibe = document.getElementById('song-vibe');
const songDesc = document.getElementById('song-desc');

const searchedArt = document.getElementById('searched-art');
const searchedTitle = document.getElementById('searched-title');
const searchedGenre = document.getElementById('searched-genre');

function showRecommendation(song, searchedInfo = null) {
    loading.classList.add('hidden');
    resultArea.classList.remove('hidden');
    
    if (searchedInfo) {
        searchSummary.classList.remove('hidden');
        searchedArt.src = searchedInfo.art;
        searchedTitle.textContent = `${searchedInfo.artist} - ${searchedInfo.title}`;
        searchedGenre.textContent = `장르: ${searchedInfo.genre}`;
    } else {
        searchSummary.classList.add('hidden');
    }

    resultArea.style.opacity = '0';
    setTimeout(() => {
        songTitle.textContent = song.title;
        songAlbum.textContent = song.album;
        songVibe.textContent = song.concept;
        songDesc.textContent = song.desc;
        
        if (song.concept === 'Red') {
            songVibe.style.color = '#ff1744';
            songTitle.style.color = '#c4001d';
        } else {
            songVibe.style.color = '#4a148c';
            songTitle.style.color = '#4a148c';
        }
        
        resultArea.style.opacity = '1';
    }, 50);
}

async function recommendSimilar() {
    const query = userSongInput.value.trim();
    if (!query) {
        alert('노래 제목을 입력해 주세요!');
        return;
    }

    loading.classList.remove('hidden');
    resultArea.classList.add('hidden');

    try {
        const response = await fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(query)}&entity=song&limit=1`);
        const data = await response.json();

        if (data.results.length === 0) {
            alert('노래 정보를 찾을 수 없습니다. 랜덤으로 추천해 드릴게요!');
            showRecommendation(songs[Math.floor(Math.random() * songs.length)]);
            return;
        }

        const track = data.results[0];
        const genre = track.primaryGenreName.toLowerCase();
        
        const searchedInfo = {
            title: track.trackName,
            artist: track.artistName,
            genre: track.primaryGenreName,
            art: track.artworkUrl100.replace('100x100bb', '300x300bb')
        };

        const redGenres = ['k-pop', 'pop', 'dance', 'electronic', 'teen pop', 'j-pop'];
        const velvetGenres = ['r&b/soul', 'r&b', 'soul', 'jazz', 'ballad', 'blues', 'vocal'];

        let recommendedSong;
        if (redGenres.some(g => genre.includes(g))) {
            const redSongs = songs.filter(s => s.concept === 'Red');
            recommendedSong = redSongs[Math.floor(Math.random() * redSongs.length)];
        } else if (velvetGenres.some(g => genre.includes(g))) {
            const velvetSongs = songs.filter(s => s.concept === 'Velvet');
            recommendedSong = velvetSongs[Math.floor(Math.random() * velvetSongs.length)];
        } else {
            recommendedSong = songs[Math.floor(Math.random() * songs.length)];
        }

        showRecommendation(recommendedSong, searchedInfo);

    } catch (error) {
        console.error('API Error:', error);
        alert('정보를 가져오는 중 오류가 발생했습니다. 랜덤 추천으로 전환합니다.');
        showRecommendation(songs[Math.floor(Math.random() * songs.length)]);
    }
}

btnRed.addEventListener('click', () => {
    const redSongs = songs.filter(s => s.concept === 'Red');
    showRecommendation(redSongs[Math.floor(Math.random() * redSongs.length)]);
});

btnVelvet.addEventListener('click', () => {
    const velvetSongs = songs.filter(s => s.concept === 'Velvet');
    showRecommendation(velvetSongs[Math.floor(Math.random() * velvetSongs.length)]);
});

btnRandom.addEventListener('click', () => {
    showRecommendation(songs[Math.floor(Math.random() * songs.length)]);
});

btnSimilar.addEventListener('click', recommendSimilar);

userSongInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') recommendSimilar();
});

// --- Formspree Logic ---
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');
const submitBtn = document.getElementById('submit-btn');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData.entries());
        submitBtn.disabled = true;
        submitBtn.textContent = '전송 중...';
        formStatus.classList.add('hidden');
        try {
            const response = await fetch('https://formspree.io/f/mkoypqpq', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }
            });
            if (response.ok) {
                formStatus.textContent = '✅ 문의가 성공적으로 전송되었습니다!';
                formStatus.style.color = '#27ae60';
                formStatus.classList.remove('hidden');
                contactForm.reset();
            } else {
                formStatus.textContent = '❌ 전송 실패. 다시 시도해 주세요.';
                formStatus.style.color = '#e74c3c';
                formStatus.classList.remove('hidden');
            }
        } catch (error) {
            formStatus.textContent = '❌ 네트워크 오류 발생.';
            formStatus.classList.remove('hidden');
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = '보내기';
        }
    });
}

// --- AI Animal Face Test Logic ---
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
    const modelURL = MODEL_URL + "model.json";
    const metadataURL = MODEL_URL + "metadata.json";
    try {
        model = await tmImage.load(modelURL, metadataURL);
        maxPredictions = model.getTotalClasses();
    } catch (error) {
        console.error("AI Model Load Error:", error);
    }
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
            if (!model) {
                aiLoading.classList.remove('hidden');
                await initAI();
                aiLoading.classList.add('hidden');
            }
            if (model) predictAI();
            else alert("AI 모델을 불러오지 못했습니다.");
        };
        reader.readAsDataURL(file);
    });
}

async function predictAI() {
    aiLoading.classList.remove('hidden');
    setTimeout(async () => {
        const prediction = await model.predict(imagePreview);
        aiLoading.classList.add('hidden');
        let highestProb = 0;
        let bestClass = "";
        labelContainer.innerHTML = '';
        for (let i = 0; i < maxPredictions; i++) {
            const prob = prediction[i].probability;
            const className = prediction[i].className;
            const div = document.createElement('div');
            div.innerHTML = `${className}: ${(prob * 100).toFixed(0)}%`;
            labelContainer.appendChild(div);
            if (prob > highestProb) { highestProb = prob; bestClass = className; }
        }
        if (highestProb > 0.4) {
            aiResultMatch.classList.remove('hidden');
            const lowerClass = bestClass.toLowerCase();
            if (lowerClass.includes('dog') || lowerClass.includes('강아지')) {
                matchText.innerHTML = `당신은 귀여운 <strong>강아지상</strong>! <br> 레드벨벳의 <strong>웬디/슬기</strong>와 닮았네요! 🐶`;
            } else if (lowerClass.includes('cat') || lowerClass.includes('고양이')) {
                matchText.innerHTML = `당신은 매혹적인 <strong>고양이상</strong>! <br> 레드벨벳의 <strong>아이린/조이</strong>와 닮았네요! 🐱`;
            } else {
                matchText.innerHTML = `당신은 매력적인 <strong>${bestClass}상</strong>! <br> 레드벨벳 멤버들과 환상적인 조화! ✨`;
            }
        }
    }, 200);
}

// --- Privacy Modal Logic ---
const openPrivacy = document.getElementById('open-privacy');
const privacyModal = document.getElementById('privacy-modal');
const closeModal = document.querySelector('.close-modal');

if (openPrivacy) {
    openPrivacy.addEventListener('click', (e) => {
        e.preventDefault();
        privacyModal.classList.remove('hidden');
    });
}

if (closeModal) {
    closeModal.addEventListener('click', () => {
        privacyModal.classList.add('hidden');
    });
}

window.addEventListener('click', (e) => {
    if (e.target === privacyModal) privacyModal.classList.add('hidden');
});
