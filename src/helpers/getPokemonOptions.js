import pokemonApi from "../api/pokemonApi";

const getPokemons = () => {
  const pokemonsArr = Array.from(Array(650));

  return pokemonsArr.map((_, index) => index + 1);
};

const getPokemonNames = async ([a, b, c, d] = []) => {
  const promises = [
    pokemonApi.get(`${a}`),
    pokemonApi.get(`${b}`),
    pokemonApi.get(`${c}`),
    pokemonApi.get(`${d}`),
  ];
  const responses = await Promise.all(promises).then((res) => {
    return res.map(({ data }) => {
      return { name: data.name, id: data.id };
    });
  });

  return responses;
};

export default () => {
  const mixedPokemons = getPokemons().sort(() => Math.random() - 0.5);

  return getPokemonNames(mixedPokemons.splice(0, 4));
};
