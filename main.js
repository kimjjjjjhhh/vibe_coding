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

        // Advanced genre matching
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
