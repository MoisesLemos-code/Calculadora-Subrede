<template>
  <main>
    <v-container fluid>
      <v-row class="v-row" align="center" justify="center">
        <v-col cols="12" sm="8" md="4">
          <h2>Calculadora Sub-rede</h2>
          <v-card class="elevation-12">
            <v-toolbar color="primary" dark flat>
              <v-toolbar-title class="v-toolbar-text">Divisão por quantidade de Subredes</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-form>
                <v-text-field v-model="valor.ip" label="IP" name="IP" type="text" dense outlined />
                <v-text-field
                  v-model="valor.qtd"
                  label="Quantidade de sub-redes"
                  name="qtd"
                  type="text"
                  dense
                  outlined
                />
              </v-form>
              <v-card-actions>
                <Resultado :valor="valor" />
              </v-card-actions>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </main>
</template>
<script>
import Resultado from "../components/Resultado";

export default {
  data() {
    return {
      valor: {
        tipo: "DivisaoPorQtdSubrede",
        ip: null,
        qtd: null
      }
    };
  },
  components: {
    Resultado
  },
  methods: {}
};
</script>

<style scoped>
main {
  background-image: linear-gradient(
    to right,
    #a313b1,
    #8e31b6,
    #7a41b8,
    #654cb7,
    #5353b3
  );
  height: 100%;
}
.v-card {
  width: 500px;
  margin-top: 30px;
  animation-name: moveYBack;
  animation-duration: 600ms;
}
h2 {
  font-size: 40px;
  color: white;
  text-align: center;
  animation-name: fade;
  animation-duration: 500ms;
}
.v-toolbar-text {
  margin: 0 auto;
}
.v-row {
  padding-top: 50px;
}
</style>