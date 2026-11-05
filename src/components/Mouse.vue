<template>

    <div class="zone" :style="{ top: position.top + 'px', left: position.left + 'px' }">
      <div class="mouse" :style="{transform: `perspective(200px) rotateX(${rotation}deg)`}">
            <div id="dragme" @mousedown.prevent="startDrag($event)"></div>
            <div class="btn-gauche btn" id="mouse-left"></div>
            <div class="btn-droit btn" id="mouse-right"></div>
            <div class="ligne"></div>
            <div class="roulette btn" id="mouse-button"></div>
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
        top: this.game.mouse.position ? this.game.mouse.position.top : 200,
        left: this.game.mouse.position ? this.game.mouse.position.left : 200
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
        this.game.mouse.position = position;
        await this.$store.dispatch('saveGame', this.game);
        
    },
    setupButtonEvents() {
      const buttons = document.querySelectorAll('.mouse .btn');
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
      //console.log('Reset Mouse');
      this.position.top = this.game.mouse.position.top;
      this.position.left = this.game.mouse.position.left;
      this.rotation = this.game.rotation;
      const buttons = document.querySelectorAll('.mouse .btn');
      buttons.forEach(button => {
        button.classList.remove("active"); 
      });
    }
  }
};
</script>
<style lang="sass">
  $box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1)
  .mouse
    width: 120px
    height: 180px
    background: #fff
    border-radius: 45px
    margin: 100px auto
    position: relative
    border: 1px solid #ccc
    box-shadow: $box-shadow
    overflow: hidden
    margin-top: 30%
    margin-left: 85%
  /* séparation centrale */
  .ligne
    width: 5px
    height: 90px
    background: #fff
    position: absolute
    top: 0
    left: 50%
    transform: translateX(-50%)

  /* bouton gauche */
  .btn-gauche
    position: absolute
    top: 0
    left: 0
    width: 55px
    height: 80px
    background: #e8e8e8
    border-top-left-radius: 40px
    border-right: 1px solid #424242
    margin: 5px
    transition: background-color 0.2s, transform 0.1s
    &.active
        background-color: #008cffc9
        color: #fff
        &:hover 
          background-color: #008cffc9
    &:hover 
        background-color: #d0d0d0

  /* bouton droit */
  .btn-droit
    position: absolute
    top: 0
    right: 0
    width: 55px
    height: 80px
    background: #e8e8e8
    border-top-right-radius: 40px
    margin: 5px
    transition: background-color 0.2s, transform 0.1s
    &.active
        background-color: #008cffc9
        color: #fff
        &:hover 
          background-color: #008cffc9
    &:hover 
        background-color: #d0d0d0

  /* roulette */
  .roulette
    width: 20px
    height: 40px
    background: #e8e8e8
    border-radius: 6px
    position: absolute
    top: 20px
    left: 50%
    transform: translateX(-50%)
    z-index: 2
    border: 3px solid #fff
    transition: background-color 0.2s, transform 0.1s
    &.active
        background-color: #008cffc9
        color: #fff
        &:hover 
          background-color: #008cffc9
    &:hover 
        background-color: #d0d0d0

  #dragme
    position: absolute
    cursor: move
    bottom: 0
    height: 15px
    width: 100%
    background-color: #008cff
    border-radius: 45px

</style>