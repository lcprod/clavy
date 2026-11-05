<template>

  <div class="zone" :style="{ top: position.top + 'px', left: position.left + 'px' }">
    <div class="keyboard" :style="{transform: `perspective(800px) rotateX(${rotation}deg)`}">
      <div id="dragkb" @mousedown.prevent="startDrag($event)"></div>
        <div class="row">
            <div class="b1">
                <div class="row">
                    <button class="key wide" id="key-esc">Esc</button>
                    <button class="key" id="key-f1">F1</button>
                    <button class="key" id="key-f2">F2</button>
                    <button class="key" id="key-f3">F3</button>
                    <button class="key" id="key-f4">F4</button>
                    <button class="key" id="key-f5">F5</button>
                    <button class="key" id="key-f6">F6</button>
                    <button class="key" id="key-f7">F7</button>
                    <button class="key" id="key-f8">F8</button>
                    <button class="key" id="key-f9">F9</button>
                    <button class="key" id="key-f10">F10</button>
                    <button class="key" id="key-f11">F11</button>
                    <button class="key" id="key-f12">F12</button>
                    <button class="key" id="key-eject">Eject</button>
                </div>

                <!-- Ligne des chiffres et caractères spéciaux -->
                <div class="row">
                    <button class="key" id="key-@">@</button>
                    <button class="key" id="key-1">1</button>
                    <button class="key" id="key-2">2</button>
                    <button class="key" id="key-3">3</button>
                    <button class="key" id="key-4">4</button>
                    <button class="key" id="key-5">5</button>
                    <button class="key" id="key-6">6</button>
                    <button class="key" id="key-7">7</button>
                    <button class="key" id="key-8">8</button>
                    <button class="key" id="key-9">9</button>
                    <button class="key" id="key-0">0</button>
                    <button class="key" id="key-right-parenthese">)</button>
                    <button class="key" id="key-minus">-</button>
                    <button class="key wide" id="key-delete"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-delete-icon lucide-delete"><path d="M10 5a2 2 0 0 0-1.344.519l-6.328 5.74a1 1 0 0 0 0 1.481l6.328 5.741A2 2 0 0 0 10 19h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2z"/><path d="m12 9 6 6"/><path d="m18 9-6 6"/></svg></button>
                </div>

                <!-- Ligne des lettres (A à L) -->
                <div class="row fixed">
                    <button class="key wide" id="key-arrow-right"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-right-to-line-icon lucide-arrow-right-to-line"><path d="M17 12H3"/><path d="m11 18 6-6-6-6"/><path d="M21 5v14"/></svg></button>
                    <button class="key" id="key-a">A</button>
                    <button class="key" id="key-z">Z</button>
                    <button class="key" id="key-e">E</button>
                    <button class="key" id="key-r">R</button>
                    <button class="key" id="key-t">T</button>
                    <button class="key" id="key-y">Y</button>
                    <button class="key" id="key-u">U</button>
                    <button class="key" id="key-i">I</button>
                    <button class="key" id="key-o">O</button>
                    <button class="key" id="key-p">P</button>
                    <button class="key" id="key-caret">^</button>
                    <button class="key" id="key-dollar">$</button>
                    <button class="key" id="key-enter"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-corner-down-left-icon lucide-corner-down-left"><path d="M20 4v7a4 4 0 0 1-4 4H4"/><path d="m9 10-5 5 5 5"/></svg></button>
                </div>

                <!-- Ligne des lettres (Q à M) -->
                <div class="row">
                    <button class="key wide" id="key-arrow-up"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-big-up-dash-icon lucide-arrow-big-up-dash"><path d="M9 19h6"/><path d="M9 15v-3H5l7-7 7 7h-4v6H9z"/></svg></button>
                    <button class="key" id="key-q">Q</button>
                    <button class="key" id="key-s">S</button>
                    <button class="key" id="key-d">D</button>
                    <button class="key" id="key-f">F</button>
                    <button class="key" id="key-g">G</button>
                    <button class="key" id="key-h">H</button>
                    <button class="key" id="key-j">J</button>
                    <button class="key" id="key-k">K</button>
                    <button class="key" id="key-l">L</button>
                    <button class="key" id="key-m">M</button>
                    <button class="key" id="key-accute">ù</button>
                    <button class="key" id="key-backquote">`</button>
                    
                </div>

                <!-- Ligne des touches de contrôle -->
                <div class="row">
                    <button class="key wide" id="key-maj-left"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-big-up-icon lucide-arrow-big-up"><path d="M9 18v-6H5l7-7 7 7h-4v6H9z"/></svg></button>
                    <button class="key" id="key-less-than">&lt;</button>
                    <button class="key" id="key-w">W</button>
                    <button class="key" id="key-x">X</button>
                    <button class="key" id="key-c">C</button>
                    <button class="key" id="key-v">V</button>
                    <button class="key" id="key-b">B</button>
                    <button class="key" id="key-n">N</button>
                    <button class="key" id="key-comma">,</button>
                    <button class="key" id="key-semicolon">;</button>
                    <button class="key" id="key-colon">:</button>
                    <button class="key" id="key-equal">=</button>
                    <button class="key wide3" id="key-maj-right"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-big-up-icon lucide-arrow-big-up"><path d="M9 18v-6H5l7-7 7 7h-4v6H9z"/></svg></button>
                </div>

                <!-- Barre d'espace et touches de navigation -->
                <div class="row">
                    <button class="key wide" id="key-control-left">Ctrl</button>
                    <button class="key wide" id="key-option-left"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-option-icon lucide-option"><path d="M3 3h6l6 18h6"/><path d="M14 3h7"/></svg></button>
                    <button class="key wide" id="key-command-left"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-command-icon lucide-command"><path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3"/></svg></button>
                    <button class="key wide extra-wide" id="key-space">Espace</button>
                    <button class="key wide" id="key-command-right"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-command-icon lucide-command"><path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3"/></svg></button>
                    <button class="key wide"  id="key-option-right"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-option-icon lucide-option"><path d="M3 3h6l6 18h6"/><path d="M14 3h7"/></svg></button>
                    <button class="key wide" id="key-control-right">Ctrl</button>
                </div>

            </div>

            <div class="b2">

                <div class="row">
                  <button class="key" id="key-f13">F13</button>
                  <button class="key" id="key-f14">F14</button>
                  <button class="key" id="key-f15">F15</button>
                </div>
                <div class="row">
                  <button class="key" id="key-fn">fn</button>
                  <button class="key" id="key-dir-up-line"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-up-to-line-icon lucide-arrow-up-to-line"><path d="M5 3h14"/><path d="m18 13-6-6-6 6"/><path d="M12 7v14"/></svg></button>
                  <button class="key" id="key-dir-up-all"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-up-icon lucide-arrow-up"><path d="m5 12 7-7 7 7"/><path d="M12 19V5"/></svg></button>
    
                </div>
                <div class="row">
                  <button class="key" id="key-delete-after">x</button>
                  <button class="key" id="key-dir-bottom-line"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-down-to-line-icon lucide-arrow-down-to-line"><path d="M12 17V3"/><path d="m6 11 6 6 6-6"/><path d="M19 21H5"/></svg></button>
                  <button class="key" id="key-dir-down-all"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-down-icon lucide-arrow-down"><path d="M12 5v14"/><path d="m19 12-7 7-7-7"/></svg></button>
                </div>
                <div class="row">
                    <button class="key hide"></button>
                </div>
                <div class="row">
                    <button class="key hide"></button>
                    <button class="key" id="key-dir-arrow-up"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-up-icon lucide-arrow-up"><path d="m5 12 7-7 7 7"/><path d="M12 19V5"/></svg></button>
                    <button class="key hide"></button>
                </div>
                <div class="row">
                    <button class="key" id="key-dir-arrow-left"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-left-icon lucide-arrow-left"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg></button>
                    <button class="key" id="key-dir-arrow-down"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-down-icon lucide-arrow-down"><path d="M12 5v14"/><path d="m19 12-7 7-7-7"/></svg></button>
                    <button class="key" id="key-dir-arrow-right"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-right-icon lucide-arrow-right"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg></button>
                </div>

            </div>

            <div class="b3">

                <!-- Pavé numérique -->

                <div class="row">
                  <button class="key" id="key-f16">F16</button>
                  <button class="key" id="key-f17">F17</button>
                  <button class="key" id="key-f18">F18</button>
                  <button class="key" id="key-f19">F19</button>
                </div>

                <div class="row numeric">
                  <button class="key" id="key-num-x">x</button>
                  <button class="key" id="key-num-equal">=</button>
                  <button class="key" id="key-num-slash">/</button>
                  <button class="key" id="key-num-asterisk">*</button>
                </div>
                <div class="row numeric">
                  <button class="key" id="key-num-seven">7</button>
                  <button class="key" id="key-num-eight">8</button>
                  <button class="key" id="key-num-nine">9</button>
                  <button class="key" id="key-num-minus">-</button>
                </div>
                <div class="row numeric">
                  <button class="key" id="key-num-four">4</button>
                  <button class="key" id="key-num-five">5</button>
                  <button class="key" id="key-num-six">6</button>
                  <button class="key" id="key-num-plus">+</button>
                </div>
                <div class="row numeric fixed">
                  <button class="key" id="key-num-one">1</button>
                  <button class="key" id="key-num-two">2</button>
                  <button class="key" id="key-num-three">3</button>
                  <button class="key" id="key-num-enter"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-corner-down-left-icon lucide-corner-down-left"><path d="M20 4v7a4 4 0 0 1-4 4H4"/><path d="m9 10-5 5 5 5"/></svg></button>
                </div>
                <div class="row numeric">
                  <button class="key wide3" id="key-num-zero">0</button>
                  <button class="key" id="key-num-period">.</button> 
                </div>

            </div>
        </div>
    </div>
  </div>

</template>

<script>
export default {
  props: ['game'], 
  data() {
    return {
      isDragging: false,
      position: {
        top: this.game.keyboard.position ? this.game.keyboard.position.top : 200,
        left: this.game.keyboard.position ? this.game.keyboard.position.left : 200
      },
      rotation: this.game.rotation ? this.game.rotation : 0
    }
  },
  mounted() {
    this.setupButtonEvents();
  },
  computed: {
    keys() {
      return this.$store.state.keys;
    }
  },
  methods: {
    startDrag(event) {
      this.isDragging = true;
      this.offsetX = event.clientX - this.position.left;
      this.offsetY = event.clientY - this.position.top;

      document.addEventListener('mousemove', this.onDrag);
      document.addEventListener('mouseup', this.stopDrag);
    },
    async onDrag(event) {
      if (this.isDragging) {
        this.position.left = event.clientX - this.offsetX;
        this.position.top = event.clientY - this.offsetY;
        await this.$emit('redraw');
      }
    },
    stopDrag() {
      this.isDragging = false;
      document.removeEventListener('mousemove', this.onDrag);
      document.removeEventListener('mouseup', this.stopDrag);

      this.handleDragEnd(this.position);
    },
    async handleDragEnd(position) {
      this.game.keyboard.position = position;
      await this.$store.dispatch('saveGame', this.game);
    },
    setupButtonEvents() {
      const buttons = document.querySelectorAll('.keyboard .key');
      buttons.forEach(button => {
        button.addEventListener('click', (event) => {
          this.handleButtonClick(event.target);
        });
      });
    },
    async handleButtonClick(target) {
      const id = target.id;
      const existingKey = this.keys.find(key => key.key == id);
      const id_game = this.game.id;

      if (!id_game){alert('vous devez choisir un jeu'); return }

      if (existingKey) {
        existingKey.hidden = !existingKey.hidden;
        await this.$store.dispatch('saveKey', existingKey);
      } else {
        const offsetLeft = target.getBoundingClientRect().left;
        const offsetTop = target.getBoundingClientRect().top;
        const newCat = { 
          name: '', 
          key: id, 
          id_game: id_game, 
          hidden: 0,
          position: {
            top: offsetTop+40,
            left: offsetLeft+10
          } 
        };
        await this.$store.dispatch('saveKey', newCat);
        target.classList.add('active');
      }
      this.$store.dispatch('getKeys', this.game.id);
    },
    async updateRotate(rotation) {
      this.rotation = rotation;
      this.game.rotation = rotation;
      await this.$store.dispatch('saveGame', this.game);
    },
    reset(){
      //console.log('Reset Keyboard');
      this.position.top = this.game.keyboard.position.top;
      this.position.left = this.game.keyboard.position.left;
      this.rotation = this.game.rotation;
      const buttons = document.querySelectorAll('.keyboard .key');
      buttons.forEach(button => {
        button.classList.remove("active"); 
      });
    }
  },
};
</script>

<style lang="sass">
// Variables
$key-color: #000
$key-bg: #e8e8e8
$key-border: #ddd
$key-hover-bg: #d0d0d0
$box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1)

.container 
  //max-width: 1600px

.bulle
  display: block
  position: absolute
  margin-left: 30px
  margin-top: 15px
  background: #ab0202
  border-radius: 5px
  width: 300px
  height: 20px
  div
    background: #eee
    border-radius: 5px
    margin: 16px 0
    padding: 15px
    width: 300px
    position: relative
    margin-top: 20px
    z-index: 10000
.line
  display: block
  position: absolute
  background-color: #00000042
  width: 1px
  height: 1px
  transform-origin: top left
  margin-left: 30px
  margin-top: 30px

#dragkb
  cursor: move
  position: absolute
  height: 20px
  border-bottom-left-radius: 0px
  border-bottom-right-radius: 0px
  border-top-left-radius: 10px
  border-top-right-radius: 10px
  background-color: #008cff
  left: -1px
  right: -1px
  top: -20px

.zone
  position: fixed !important
  width: 100%
  height: 1px


.keyboard 
  display: flex
  flex-direction: column
  width: 100%
  max-width: 1380px
  background-color: #ffffff
  border: 1px solid #ccc
  border-radius: 10px
  padding: 10px 20px
  box-shadow: $box-shadow
  border-top-left-radius: 0px
  border-top-right-radius: 0px
  border-bottom-right-radius: 10px
  border-bottom-left-radius: 10px
  margin-top: 25%
  margin-left: 5%
  zoom: 80%
  // Zoom dynamique en fonction de la taille de la fenêtre
  //@media (max-width: 1500px)
  //  zoom: 80%
  //
  //@media (max-width: 1200px)
  //  zoom: 60%
  //
  //@media (max-width: 800px)
  //  zoom: 40%
  //
  //@media (max-width: 600px)
  //  zoom: 40%
  //
  //@media (max-width: 500px)
  //  zoom: 30%


  .b1
    min-width: 900px !important
    padding-left: 15px
    padding-right: 15px
  .b2
    min-width: 210px !important
    padding-left: 15px
    padding-right: 15px
  .b3
    min-width: 250px !important
    padding-left: 15px
    padding-right: 15px


  .row 
    display: flex
    justify-content: flex-start
    &.fixed
      height : 60px
    

    .key 
      height: 50px
      width: 50px
      border: 1px solid $key-border
      background-color: $key-bg
      color: $key-color
      text-align: center
      line-height: 48px
      cursor: pointer
      margin: 5px
      font-size: 14px
      border-radius: 5px
      transition: background-color 0.2s, transform 0.1s

      &.active
        background-color: #008cffc9
        color: #fff
        &:hover 
          background-color: #008cffc9

      &:hover 
        background-color: $key-hover-bg
        //transform: scale(1.05)

      &.hide
        border: 0px
        background-color: #fff
        &:focus
          outline: 0px

      &.wide 
        width: 80px

      &.wide2 
        width: 100px

      &.wide3 
        width: 110px  

      &.extra-wide 
        width: 320px

      &.function 
        background-color: adjust($key-bg, 10%)
        font-weight: bold

      &.numeric 
        background-color: adjust($key-bg, 5%)

      &#key-enter,
      &#key-num-enter
        height: 110px

  .top-row 
    justify-content: space-between

  .space-row 
    justify-content: center

  .numeric-pad 
    margin-left: auto
    display: flex
    flex-direction: column

    .row 
      justify-content: flex-start
</style>