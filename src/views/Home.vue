<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <h2>CURSOS</h2>
      </div>
    </div>
    <div class="row">
      <div class="col-md-6 p-2" v-for="curso in cursos" :key="curso.id">
        <curso-card :curso="curso" />
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import EventBus from '@/event-bus';
import CursoCard from '@/components/CursoCard'

export default {
  name: 'Home',
  components: {
    CursoCard
  },
  mounted(){
    this.getCursos();
  },
  created() {
    let vue = this;
    EventBus.$on('updateCurso', (curso)=> {
      var index = _.findIndex(vue.cursos, {id: curso.id});
      vue.cursos.splice(index, 1, curso);
    });   
  },
  data() {
    return {
      cursos:[],
    }
  },
  methods: {
    getCursos(){
      let vue = this;
      axios.get('cursos')
      .then(res => {
        vue.cursos = res.data
      })
      .catch(err => {
        console.error(err); 
      })
    },
    
  },
}
</script>
