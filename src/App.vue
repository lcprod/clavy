<template>
  <v-app>
    
    <v-app-bar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>CLAVY </span>
        <span class="font-weight-light"></span>
      </v-toolbar-title>
    </v-app-bar>

    <v-content>
      <v-container>

        <router-view />

      </v-container>
    </v-content>

  </v-app>

  

</template>

<script>
export default {
  name: 'App',
  created () {
    this.$vuetify.theme.dark = true 
  }
};
</script>
