/**
 * 1. Render songs => OK
 * 2. Play / Pause / Seek => OK
 * 3. CD rotate => OK
 * 4. Next / Previous => OK
 * 5. Show / Hide Playlist => OK
 * 6. Random => OK
 * 7. Next / Repeat when ended => OK
 * 8. Active song => OK
 * 9. Scroll active song into  => OK
 * 10. Play song when click => OK
 * 11. Volumn => OK
 * 12. Change tooltip => OK
 */

const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)
const heading = $('h4')
const imgThums = $('.img-music')
const audio = $('#audio')
const playBtn = $('.toggle-music')
const player = $('.btn.play-music')
const pauser = $('.btn.pause-music')
const progress = $('#progress')
const backsong = $('.back-music')
const nextsong = $('.next-music')
const radsong = $('.random-music')
const RepeatBtn = $('.replay-music')
const playlist = $('.list-music')

const app = {
    currentIndex: 0,
    isplaying: false,
    israndom: false,
    isRepeat: false,
    songs: [{
            name: 'Little do you know',
            author: 'Alex & Sierra',
            image: './assets/img/Suzy4.jpg',
            path: './assets/music/Little_do_you_know_Alex_&_Sierra.mp3'
        },
        {
            name: 'When night falls',
            author: 'Eddi Kim',
            image: './assets/img/Suzy2.jpg',
            path: './assets/music/When_night_falls_Eddi_Kim.mp3'
        },
        {
            name: 'Too late',
            author: 'Addie Nicole',
            image: './assets/img/TooLate.jfif',
            path: './assets/music/Too_Late_Addie Nicole.mp3'
        },
        {
            name: 'Versace',
            author: 'The Same Persons',
            image: './assets/img/versace.jfif',
            path: './assets/music/Versace_The_Same_Persons.mp3'
        },
        {
            name: 'Set fire to the rain',
            author: 'Rain Adele ft. Vahn Remix',
            image: './assets/img/setFireToTheRain.jfif',
            path: './assets/music/Set_Fire_To_The_Rain_Adele_x_Vahn_Remix.mp3'
        },
        {
            name: 'Kiss Remix',
            author: 'Hung Bobi Remix',
            image: './assets/img/Kiss.jfif',
            path: './assets/music/Kiss_Hung_Bobi_Remix.mp3'
        },
        {
            name: 'Trap Queen Remix',
            author: 'Adriana Gomez',
            image: './assets/img/trapQueen.jfif',
            path: './assets/music/Trap_Queen_Remix_Adriana_Gomez.mp3'
        },
        {
            name: 'Devil From Heaven',
            author: 'TVT Remix',
            image: './assets/img/Devil.jpg',
            path: './assets/music/Ac_ma_den_tu_thien_duong_TVT_Remix.mp3'
        },
        {
            name: 'Cheap Thrills',
            author: 'Sia',
            image: './assets/img/CheapThrill.jfif',
            path: './assets/music/Cheap_Thrills_Sia.mp3'
        },
        {
            name: 'Let\'s marriage',
            author: 'Masew ft. Masiu',
            image: './assets/img/CuoiThoi.jpg',
            path: './assets/music/Cuoi_Thoi_Masew_x_Masiu.mp3'
        },
        {
            name: 'Diamond Ver 2',
            author: 'VQ Remix',
            image: './assets/img/diamond.jfif',
            path: './assets/music/Diamond_Ver2_VQ_Remix.mp3'
        },
        {
            name: 'Everytime we touch',
            author: 'Cascada',
            image: './assets/img/Everytimewetouch.jfif',
            path: './assets/music/Everytime_we_touch.mp3'
        },
        {
            name: 'How to love',
            author: 'Cash Cash ft. Sofia Reyes',
            image: './assets/img/howtolove.jfif',
            path: './assets/music/How_to_love_Cash_Cash_ft_Sofia_Reyes.mp3'
        },
        {
            name: 'I need your love',
            author: 'Madilyn Bailey',
            image: './assets/img/IneedYourLove.jfif',
            path: './assets/music/I_need_your_love_Madilyn_Bailey.mp3'
        },
        {
            name: 'Larg Remix',
            author: 'Elgit Doda',
            image: './assets/img/larg.jfif',
            path: './assets/music/Larg_Elgit_Doda.mp3'
        },
        {
            name: 'Love me like you do',
            author: 'Ellie Goulding',
            image: './assets/img/LoveMeLikeYouDo.jfif',
            path: './assets/music/Love_me_like_you_do_Ellie_Goulding.mp3'
        },
        {
            name: 'Love story',
            author: 'Taylor Swift',
            image: './assets/img/Taylor.jpg',
            path: './assets/music/Love_story_Taylor_Swift.mp3'
        },
        {
            name: 'Love the way you lie',
            author: 'Skylar Grey',
            image: './assets/img/Suzy3.jpg',
            path: './assets/music/Love_the_way_you_like_Skylar_Grey.mp3'
        },
        {
            name: 'Nevada',
            author: 'Vicetone ft. Cozi Zuehlsdorff',
            image: './assets/img/Nevada.jfif',
            path: './assets/music/Nevada_Vicetone_feat_Cozi_Zuehlsdorff.mp3'
        },
        {
            name: 'Payphone',
            author: 'Alex G',
            image: './assets/img/payphone.jfif',
            path: './assets/music/Payphone_Alex_G.mp3'
        }
    ],
    render: function() {
        const htmls = this.songs.map((song, index) => {
            return `
            <div class="item-music ${index === this.currentIndex ? 'active' : ''}" data-index="${index}">
            <div class="img-list-music" style="background-image: url(${song.image}) ;">
            </div>
            <div class="infor-MS">
                <h3 class="name-music">${song.name}</h3>
                <p class="singer-music">${song.author}</p>
            </div>
            <div class="option-music">

            </div>
        </div>
    `
        })
        playlist.innerHTML = htmls.join('')
    },
    defineProperties: function() {
        Object.defineProperty(this, 'currentSong', {
            get: function() {
                return this.songs[this.currentIndex]
            }
        })
    },
    handleEvents: function() {
        const _this = this

        //xử lý click play
        playBtn.onclick = function() {
            if (_this.isplaying) {
                audio.pause()
            } else {
                audio.play()
            }
        }

        //khi được play
        audio.onplay = function() {
            _this.isplaying = true
            player.classList.add('active')
            pauser.classList.remove('active')
            imgThumsAnimate.play()
        }

        //khi được pause
        audio.onpause = function() {
            _this.isplaying = false
            player.classList.remove('active')
            pauser.classList.add('active')
            imgThumsAnimate.pause()
        }

        //time bài hát
        audio.ontimeupdate = function() {
            if (audio.duration) {
                const progresspecent = Math.floor(audio.currentTime / audio.duration * 100)
                progress.value = progresspecent
            }
        }

        //xử lý khi tua
        progress.onchange = function(e) {
                const seekTime = e.target.value * audio.duration / 100
                audio.currentTime = seekTime
            }
            // Xử lý CD quya dừng 
        const imgThumsAnimate = imgThums.animate([
            { transform: 'rotate(360deg)' }
        ], {
            duration: 10000, // 1 vòng 10s
            iterations: Infinity

        })
        imgThumsAnimate.pause()

        //next bài hát
        nextsong.onclick = function() {
            if (_this.israndom) {
                _this.playradomsong()
            } else {
                _this.nextsong
            }
            _this.nextsong()
            audio.play()
            _this.render()
            _this.srollToActiveSong()
        }

        //back bài hát
        backsong.onclick = function() {
            if (_this.israndom) {
                _this.playradomsong()
            } else {
                _this.backsong
            }
            _this.backsong()
            audio.play()
            _this.render()
            _this.srollToActiveSong()
        }

        //radom music
        radsong.onclick = function() {
            _this.israndom = !_this.israndom

            radsong.classList.toggle('red', _this.israndom)
            this.playradomsong()
            audio.play()

        }


        //phát lại bài hát
        RepeatBtn.onclick = function() {
            _this.isRepeat = !_this.isRepeat
            RepeatBtn.classList.toggle('relay', _this.isRepeat)
        }

        //next bài hát
        audio.onended = function() {
                if (_this.isRepeat) {
                    audio.play()
                } else {
                    nextsong.click()
                }
            }
            //lắng nghe click playlist
        playlist.onclick = function(e) {
            const songNote = e.target.closest('.item-music:not(.active)')
            if (songNote || e.target.closest('.option')) {
                //xử lí khi click vào play list
                if (songNote) {
                    _this.currentIndex = Number(songNote.getAttribute('data-index'))
                    _this.loadCurrentSong()
                    _this.render()
                    audio.play()
                }
                //Xử lí khi click vào option
                if (e.target.closest('.option')) {

                }
            }
        }

    },

    srollToActiveSong: function() {
        setTimeout(() => {
            $('.item-music.active').scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
            })
        })
    },

    loadCurrentSong: function() {
        heading.textContent = this.currentSong.name;
        imgThums.style.backgroundImage = `url('${this.currentSong.image}')`
        audio.src = this.currentSong.path

    },
    nextsong: function() {
        this.currentIndex++
            if (this.currentIndex >= this.songs.length) {
                this.currentIndex = 0
            }
        this.loadCurrentSong()
    },
    backsong: function() {
        this.currentIndex--
            if (this.currentIndex < 0) {
                this.currentIndex = this.songs.length - 1
            }
        this.loadCurrentSong()
    },
    //xử lý radom
    playradomsong: function() {
        let newsong
        do {
            newsong = Math.floor(Math.random() * this.songs.length)
        } while (newsong === this.currentIndex)
        this.currentIndex = newsong
        this.loadCurrentSong()
    },

    start: function() {
        //định nghĩa các thuộc tính cho object
        this.defineProperties();

        // Lắng nghe, xử lý các sự kiện (DOM Events)
        this.handleEvents()

        //Tải thông tin bài hát đầu tiên
        this.loadCurrentSong();

        //render list music
        this.render()
    }
}
app.start()