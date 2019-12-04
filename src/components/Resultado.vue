<template>
  <v-container fluid>
    <v-row class="v-row" align="center" justify="center">
      <v-dialog v-model="dialog" persistent max-width="400">
        <template v-slot:activator="{ on }">
          <v-btn @click="calculo()" color="primary" dark v-on="on" block outlined>Calcular</v-btn>
        </template>
        <v-card>
          <v-toolbar color="primary" dark flat>
            <v-card-title class="headline">Resultado</v-card-title>
          </v-toolbar>
          <v-card-subtitle id="classeIP">{{ classeIP }}</v-card-subtitle>
          <v-card-text>IP: {{ valor.ip }}</v-card-text>
          <v-card-text>Máscara: {{ mascara }}</v-card-text>
          <v-card-text>Quantidade de Subredes: {{ qtdSubrede }}</v-card-text>
          <v-card-text>Quantidade de HOST: {{ host }}</v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn outlined color="blue darken-1" @click="dialog = false" to="/">Voltar ao menu</v-btn>
            <v-btn color="primary" @click="dialog = false">Fechar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      dialog: false,
      classeIP: "?",
      mascara: 0,
      qtdSubrede: 0,
      host: 0
    };
  },
  props: {
    valor: {
      tipo: String,
      ip: 0,
      qtd: 0
    }
  },
  methods: {
    calculo: function() {
      this.classe();
      if (this.valor.tipo == "DivisaoPorQtdSubrede") {
        this.divisaoPorQtdSubrede();
      }
      if (this.valor.tipo == "DivisaoPorQtdHost") {
        this.divisaoPorQtdHost();
      }
    },
    divisaoPorQtdSubrede: function() {
      var tabela = [0, 128, 64, 32, 16, 8, 4, 2, 1];

      var resultado = 0,
        i = 0,
        ultimaRede = 0,
        indice = 0;
      //Quantidade subrede
      for (i = 1; resultado < this.valor.qtd; i++) resultado = Math.pow(2, i);

      //Mascara
      for (indice = 1; indice < i; indice++)
        ultimaRede = parseInt(ultimaRede) + tabela[indice];

      this.mascara = "255.255.255." + ultimaRede;
      this.host = tabela[--indice] - 2;
      this.qtdSubrede = resultado;
    },
    divisaoPorQtdHost: function() {
      var tabela = [0, 128, 64, 32, 16, 8, 4, 2, 1];

      var qtd = this.valor.qtd;
      var qtdsubrede = 1,
        indice = 0,
        i = 0,
        ii = 0,
        mascara = 0;
      for (i = 1; qtd < 254; i++) {
        //Descobrir a quantidade de subrede
        qtd = parseInt(qtd) + parseInt(this.valor.qtd) + parseInt(2);
        qtdsubrede++;
      }
      //Identificar quantos bits foram utilizado para obter a subrede
      for (indice = 1; mascara < qtdsubrede; indice++) {
        mascara = Math.pow(2, indice);
      }
      mascara = 0;
      //Somando os valores dos bits para obter a máscara
      for (ii = 1; ii < indice; ii++) {
        mascara = parseInt(mascara) + parseInt(tabela[ii]);
      }
      this.mascara = "255.255.255." + parseInt(mascara);
      this.qtdSubrede = qtdsubrede;
      this.host = this.valor.qtd;
    },
    classe: function() {
      var octeto = this.valor.ip.split(".");
      if (octeto[0] > 255) {
        this.classeIP = "IP inválido!";
      } else if (octeto[0] > 1 && octeto[0] <= 126) {
        this.classeIP = "Classe A";
      } else if (octeto[0] == 127) {
        this.classeIP = "Loopback";
      } else if (octeto[0] >= 128 && octeto[0] <= 191) {
        this.classeIP = "Classe B";
      } else if (octeto[0] >= 192 && octeto[0] <= 223) {
        this.classeIP = "Classe C";
      } else if (octeto[0] >= 224 && octeto[0] <= 239) {
        this.classeIP = "Classe D";
      } else if (octeto[0] >= 240 && octeto[0] <= 255) {
        this.classeIP = "Classe E";
      }
    }
  }
};
</script>

<style scoped>
#classeIP {
  color: #00b39f;
  margin-left: 10px;
}
</style>