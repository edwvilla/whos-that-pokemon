<template>
  <div v-if="pokemon">
    <h1>Who's that Pokémon?</h1>
    <PokemonImage :pokemonId="pokemon.id" :showPokemon="showPokemon" />
    <PokemonOptions :pokemons="pokemons" @selection="checkAnswer" />

    <div v-if="showPokemon">
      <h1>{{ message }}</h1>

      <button @click="reset">Play again</button>
    </div>
  </div>

  <div v-else>Loading...</div>
</template>

<script>
import PokemonImage from "../components/PokemonImage.vue";
import PokemonOptions from "../components/PokemonOptions.vue";
import getPokemons from "../helpers/getPokemonOptions.js";

export default {
  components: { PokemonImage, PokemonOptions },
  data() {
    return {
      pokemons: [],
      pokemon: null,
      showPokemon: false,
      message: "",
    };
  },
  methods: {
    async fetchPokemons() {
      this.pokemons = await getPokemons();

      this.pokemon =
        this.pokemons[Math.floor(Math.random() * this.pokemons.length)];
    },
    checkAnswer(pokemon) {
      console.log(pokemon);
      console.log(this.pokemon);
      this.showPokemon = true;

      if (pokemon.id === this.pokemon.id) {
        this.message = "Correct!";
      } else {
        this.message = "Wrong! It's " + this.pokemon.name;
      }
    },
    reset() {
      this.pokemons = [];
      this.pokemon = null;
      this.showPokemon = false;
      this.message = "";
      this.fetchPokemons();
    },
  },
  mounted() {
    this.fetchPokemons();
  },
};
</script>

<style></style>
