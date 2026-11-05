<template>
  <div>

    <v-form>
      <v-container>
        <v-row>
          <v-col>
            <v-text-field v-model="game.name" label="Projet" required />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-btn color="green" @click="save">Save</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-form>

  </div>
</template>

<script>

export default {
  data() {
    return {
      game:null
    }
  },
  created() {
    if(this.$route.params.game) {
      this.game = this.$route.params.game;
    } else {
      this.game = { 
        name:'', 
        rotation:0,
        keyboard:{
          position:{
            top:0, 
            left:0
          }
        }, 
        mouse:{
          position:{
            top:0, 
            left:0
          }
        } 
      };
    }
  },
  methods: {
    async save() {
      await this.$store.dispatch('saveGame', this.game);
      this.$router.push('/');
    }
  }
};
</script>