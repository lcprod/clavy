<template>

  <v-container>

    <v-row class="controls">
      <v-col cols="2">
        <v-select
          :items="this.games"
          label="Machine"
          item-text="name"
          item-value="id"
          return-object
          v-model="game" 
          @change="changeGame"
          >
        </v-select>
      </v-col>
      <v-col cols="3">
        <v-btn color="primary" @click="addGame">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plus-icon lucide-plus"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
        </v-btn>
     
        <v-btn color="secondary" @click="deleteGame">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-minus-icon lucide-minus"><path d="M5 12h14"/></svg>
        </v-btn>

        <v-btn color="secondary" @click="saveGames">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-download-icon lucide-download"><path d="M12 15V3"/><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5"/></svg>
        </v-btn>

        <v-btn color="secondary" @click="handleFileImport">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-upload-icon lucide-upload"><path d="M12 3v12"/><path d="m17 8-5-5-5 5"/><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/></svg>
        </v-btn>

        <input 
            ref="uploader" 
            class="d-none" 
            type="file" 
            @change="onFileChanged"
        >

      </v-col>
      <v-col cols="2">
        <v-btn color="primary" @click="showAll">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-eye-icon lucide-eye"><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/><circle cx="12" cy="12" r="3"/></svg>
        </v-btn>
     
        <v-btn color="primary" @click="hideAll">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-eye-off-icon lucide-eye-off"><path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49"/><path d="M14.084 14.158a3 3 0 0 1-4.242-4.242"/><path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143"/><path d="m2 2 20 20"/></svg>
        </v-btn>
      </v-col>
      <v-col cols="3">
      </v-col>
      <v-col cols="2">
       
          <v-slider
            v-model="sliderValue"
            class="rotation"
            min="0"
            max="25"
            @input="updateRotation">
          </v-slider>
       
      </v-col>
    </v-row>

    <template v-if="game.id">

      <v-col>
        <Keyboard ref="keyboard" :game="game" @redraw="redraw"/>
      </v-col>
      <v-col>
        <Mouse ref="mouse" :game="game" @redraw="redraw"/>
      </v-col>
      <v-col cols="4" v-for="(key,idx) in keys" :key="idx">
        <Label :data="key" ref="keyElement"/>
      </v-col>

    </template>

  </v-container>

</template>

<script>
import Label from '@/components/Label';
import Keyboard from '@/components/Keyboard';
import Mouse from '@/components/Mouse';
import idbService from '@/api/idb';
//import Cookies from 'js-cookie';

export default {
  components: {
    Label,
    Keyboard,
    Mouse
  },
  data() {
    return {
      game: [],
      sliderValue: 0
    };
  },
  computed: {
    keys() {
      return this.$store.state.keys;
    },
    games() {
      return this.$store.state.games;
    }
  },
  created() {
    this.$store.dispatch('getGames');
  },
  methods: {
    addGame() {
      this.$router.push({ name: 'edit' });
    },
    changeGame(game){
      this.sliderValue = game.rotation
      //Cookies.set('clavy-game', game.id);
      this.$store.dispatch('getKeys', this.game.id);
      if (this.$refs.keyboard) {
        setTimeout(() => { 
          this.$refs.keyboard.reset(); 
          this.$refs.mouse.reset(); 
        }, 5);
      }
    },
    async deleteGame() {
      const selectedGame = this.game;
      if(selectedGame && confirm("Do you really want to delete?")){
        if (selectedGame) {
          await this.$store.dispatch('deleteGame', selectedGame);
        } else {
          console.log("No game selected");
        }
        if (this.$refs.keyboard) {
          this.$refs.keyboard.reset();
          this.$refs.mouse.reset();
          this.$store.dispatch('getKeys', this.game.id);
          this.$store.dispatch('getGames');
        }
      }

    },
    updateRotation(value) {
      if (this.$refs.keyboard) {
        this.$refs.keyboard.updateRotate(value);
        this.$refs.mouse.updateRotate(value);
      }
    },
    async showAll() {
      if(this.game){
        const keys = this.$refs.keyElement ? this.$refs.keyElement : "";
        for (let key of keys) {
          await key.makeShow();
        }
      }
    },
    async hideAll() {
      if(this.game){
        const keys = this.$refs.keyElement ? this.$refs.keyElement : "";
        for (let key of keys) {
          await key.makeHidden();
        }
      }
    },
    async redraw() {
      if(this.game){
        const keys = this.$refs.keyElement ? this.$refs.keyElement : "";
        for (let key of keys) {
          await key.drawLine();
        }
      }
    },
    async saveGames() {
      await idbService.exportToJson();
    },
    handleFileImport() {
      this.isSelecting = true;
      window.addEventListener('focus', () => {
          this.isSelecting = false
      }, { once: true });
                
      this.$refs.uploader.click();
    },
    async onFileChanged(e) {
      const file = e.target.files[0];
      if (file) {
        console.log(file.name);
        await idbService.loadFromJson(file);
        this.$store.dispatch('getGames');
      }
    }
  }
};
</script>

<style lang="sass">
body
  display: block
.container 
  max-width: 100% !important
  position: relative !important
.v-application--wrap
  background-color: #282828 !important
.controls
  align-items: center
  height: 60px
  position: fixed
  width: 100%
  top: -10px
  z-index: 100
  padding-left: 250px
  button
    margin-right: 10px
    zoom: 70%
.rotation
  margin-top: 15px
  padding-right: 20px
</style>