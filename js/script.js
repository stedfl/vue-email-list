// **Descrizione:**
// Attraverso l’apposita API di Boolean
// https://flynn.boolean.careers/exercises/api/random/mail
// generare 10 indirizzi email e stamparli in pagina all’interno di una lista.
// **Bonus**
// Creare un loading e far comparire gli indirizzi email solamente quando sono stati TUTTI generati.

const {createApp} = Vue;

createApp({
  data() {
    return {
      apiUrl: 'https://flynn.boolean.careers/exercises/api/random/mail',
      MailList: [],
      numberOfItems: 10,
      inputItems: '',
      isLoaded: false,
    }
  },
  methods: {
    getApi() {
      axios.get(`${this.apiUrl}`)
        .then ( risultato => {
          this.MailList.push(risultato.data.response);
          if (this.MailList.length === this.numberOfItems) {
            this.isLoaded = true;
          }
        });
    },

    generateList(number) {
      this.MailList = [];
      this.isLoaded = false;
      for (i = 0; i < number; i++) {
        this.getApi();
      }  
    },

    InputGenerateList() {
      this.numberOfItems = this.inputItems;
      this.inputItems = '';
      this.generateList(this.numberOfItems);
    }

  },
  mounted() {
    this.generateList(this.numberOfItems);
  }
}).mount('#app');