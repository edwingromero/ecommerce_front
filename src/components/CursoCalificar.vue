<template>
  <div>
    <h6><em>Puntuar curso</em></h6>
    <span class="estrella" v-for="(n,index) in 5 " :key="index" @mouseover="hoverStar(n)" @mouseleave="numero=0" @click="votar()">
     
      <i class="far fa-star fa-2x" :class="{'fas fa-star':numero > index, 'far fa-star':numero == index}"></i>
    </span>
     <VueLoading :active="isLoading" :is-full-page="false" loader='bars' :height="80" :width="80" color="#0075de"/>
  </div>
</template>

<script>
import VueLoading from 'vue-loading-overlay';
import EventBus from '@/event-bus';
export default {
  props:['curso'],
  components:{
    VueLoading
  },
  data() {
    return {
      numero: 0,
      isLoading:false
    }
  },
  methods: {
    hoverStar(num){
      this.numero = num
    },
    votar(){
      let vue = this;
      const form = {};
      form.puntaje = vue.numero;
      form.curso_id = vue.curso.id;

      vue.isLoading = true;
      axios.post('home-votar',form)
      .then(res => {
        EventBus.$emit('updateCurso',res.data);
        vue.isLoading = false;
        vue.$bvToast.toast("Calificaste con "+form.puntaje+ " estrellas el curso: "+vue.curso.nombre, {
          title: 'Alerta',
          autoHideDelay: 5000,
          variant: 'primary',
          solid: true
        })
      })
      .catch(err => {
        console.error(err); 
      })
    }
  },
}
</script>

<style lang="scss">
  .estrella{
    cursor:pointer;
  }
</style>