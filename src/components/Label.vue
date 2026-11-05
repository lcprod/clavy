<template>

  <v-card 
    class="cat-element"
     :style="{ top: position.top + 'px', left: position.left + 'px', display: display }">

    <div id="line" class="maligne"
      :style="{ top: linePosition.top + 'px', left: linePosition.left + 'px', width: lineWidth + 'px', transform: `rotate(${lineDeg}deg)` }">
    </div>

    <v-textarea auto-grow v-model="data.name" @input="saveEdit" rows="1"></v-textarea>

    <v-card-actions id="actions">

      <v-btn class="command" color="red" v-model="data" @click="deleteMe">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash2-icon lucide-trash-2"><path d="M10 11v6"/><path d="M14 11v6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
      </v-btn>
      
      <v-btn class="command" @click="makeHidden">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-eye-off-icon lucide-eye-off"><path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49"/><path d="M14.084 14.158a3 3 0 0 1-4.242-4.242"/><path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143"/><path d="m2 2 20 20"/></svg>
      </v-btn>
    </v-card-actions>

    <div id="drag" @mousedown.prevent="startDrag($event)"></div>

  </v-card>

</template>

<script>

export default {
  props: ['data'], 
  data() {
    return {
      isDragging: false,
      position: {
        top: this.data.position ? this.data.position.top : 400,
        left: this.data.position ? this.data.position.left : 400
      },
      linePosition: {
        top: 0,
        left: 0
      },
      lineWidth: 0,
      lineDeg: 0,
      display: this.data.hidden ? 'none' : 'block'
    };
  },
  async created() {
    const button = document.getElementById(this.data.key);
    if (button){
      button.classList.add("active"); 
      this.drawLine();
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
    onDrag(event) {
      if (this.isDragging) {
        this.position.left = event.clientX - this.offsetX;
        this.position.top = event.clientY - this.offsetY;
        this.drawLine();
      }
    },
    stopDrag() {
      this.isDragging = false;
      document.removeEventListener('mousemove', this.onDrag);
      document.removeEventListener('mouseup', this.stopDrag);

      this.handleDragEnd(this.position);
    },
    async handleDragEnd(position) {
      this.data.position = position;
      await this.$store.dispatch('saveKey', this.data);
    },
    drawLine() {
      const key = this.data.key;
      const targetElement = document.getElementById(key);
      if (targetElement) {
        const targetPosition = targetElement.getBoundingClientRect();
      
        var xa = targetPosition.left;
        var xb = this.position.left -14;
        var ya = targetPosition.top;
        var yb = this.position.top;

        var a = ya-yb;
        var b = xb-xa;
        var c = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
        var angle = b/c;
        var alpha = Math.acos(angle);
        var deg = alpha * 180 / Math.PI;

        if (yb < ya) deg = -deg;

        this.lineWidth = c;
        this.lineDeg = deg;
        this.linePosition.top = ya
        this.linePosition.left = xa  
      } else {
        console.log('Target element not found');
      }
    },
    async saveEdit() {
      await this.$store.dispatch('saveKey', this.data);
    },
    async deleteMe(){
      if(confirm("Do you really want to delete?")){
        const button = document.getElementById(this.data.key);
        button.classList.remove("active"); 
        await this.$store.dispatch('deleteKey', this.data);
        this.$store.dispatch('getKeys', this.data.id_game);
      }
    },
    async makeHidden() {
      this.display = "none"
      this.data.hidden = 1
      await this.$store.dispatch('saveKey', this.data);
    },
    async makeShow() {
      this.display = "block"
      this.data.hidden = 0
      await this.$store.dispatch('saveKey', this.data);
    }
  }
};
</script>
<style lang="sass">
  .cat-element
    position: fixed !important
    width: 250px
    min-height: 80px
    padding: 20px 20px 0 20px
    background-color: #00000042
    color: white
    border-top-left-radius: 0px !important
    border-bottom-left-radius: 0px !important
    &::before
      content:""
      display: block
      position: absolute
      background-color: #000
      border-radius: 50px
      width: 6px
      height: 6px
      margin-top: -16px
      margin-left: -27px
      z-index: 1
  #line
    background-color: #00000042
    height: 2px
    position: fixed
    transform-origin: top left
    margin-left: 10px
    margin-top: 8px
    z-index: 10000
    &::before
      content:""
      display: block
      background-color: #000
      border-radius: 50px
      width: 6px
      height: 6px
      margin-top: -2px
      margin-left: 0
  #drag
    cursor: move
    width: 12px
    height: 10px
    position: absolute
    background-color: #008cff
    top: 0px
    left: -10px
    height: 100%
    border-top-left-radius: 4px
    border-bottom-left-radius: 4px
    border-top-right-radius: 0px
    border-bottom-right-radius: 0px
  #actions
    position: absolute
    top: 5px
    right: 0
    .command
      height: 0 !important
      min-width: 0 !important
      padding: 0 !important
      svg
        width: 15px
      &.save
        svg
          color: #008cff
        


</style>