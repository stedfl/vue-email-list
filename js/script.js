const {createApp} = Vue;

createApp({
  data() {
    return {
      apiUrl: 'https://flynn.boolean.careers/exercises/api/random/mail',
      MailList: [],
      numberOfItems: 10,
      inputItems: null,
      isLoaded: false,
      errorMsg: ''
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
      this.isLoaded = false;
      for (i = 0; i < number; i++) {
        this.getApi();
      }  
    },

    InputGenerateList() {
      this.errorMsg = '';
      this.MailList = [];
      this.inputItems = parseInt(this.inputItems);

      if (isNaN(this.inputItems)) {
        this.errorMsg = 'Inserire un numero!';
      
      } else if (this.inputItems < 1 || this.inputItems > 100) {
        this.errorMsg = 'Inserire un numero tra 1 e 100!';
        
      } else {
        this.numberOfItems = this.inputItems;
        this.generateList(this.numberOfItems);
      }
      this.inputItems = '';
    }

  },
  mounted() {
    this.generateList(this.numberOfItems);
  }
}).mount('#app');