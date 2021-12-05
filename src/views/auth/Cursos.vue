<template>
  <div>
    <h4>CURSOS</h4>
    <div class="row">
      <div class="col-md-12 mb-3">
        <button class="btn btn-sm btn-primary" @click="create()">Nuevo curso</button>
      </div>
      <div class="col-md-12">
        <table class="table table-bordered">
          <thead>
            <tr>
              <th>Id</th>
              <th>Nombre</th>
              <th>Resumen</th>
              <th>Imagen</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="curso in cursos" :key="curso.id">
              <td>{{ curso.id }}</td>
              <td>{{ curso.nombre }}</td>
              <td>{{ curso.resumen | str_limit(150) }}</td>
              <td>
                <img width="50" :src="curso.imagen" :alt="curso.nombre">
              </td>
              <td>
                <div class="btn-group">
                  <button class="btn btn-sm btn-warning">
                    <i class="fa fa-edit"></i>
                  </button>
                  <button @click="eliminar(curso.id)" class="btn btn-sm btn-danger">
                    <i class="fa fa-trash"></i>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>


    <b-modal id="modal-nuevo-curso" title="Nuevo curso" hide-footer>
      <form @submit.prevent="store" enctype="multipart/form-data">
        <div class="row">
          <div class="col-md-12 form-group">
            <label>Nombre</label>
            <input type="text" class="form-control" v-model="formNuevo.nombre" required>
          </div>
          <div class="col-md-12 form-group">
            <label>Resumen</label>
            <textarea rows="5" class="form-control" v-model="formNuevo.resumen" required></textarea>
          </div>
          <div class="col-md-12 form-group">
            <label>Autor</label>
             <b-form-select v-model="formNuevo.autor_id" :options="autoresOptions" required></b-form-select>
          </div>
          <div class="col-md-12 form-group">
            <label>Imagen</label>
            <b-form-file
              v-model="formNuevo.imagen"
              placeholder="Choose a file or drop it here..."
              drop-placeholder="Drop file here..."
            ></b-form-file>
          </div>

          <div class="col-md-12 form-group">
            <button class="btn btn-sm btn-primary" type="submit">Guardar</button>
          </div>
        </div>
      </form>
    </b-modal>
  </div>
</template>

<script>

import { serialize } from 'object-to-formdata';

export default {
  created() {
    this.getCursos();
    this.getAutores();
  },
  data() {
    return {
      cursos:[],
      autores:[],
      formNuevo:{
        nombre:'',
        resumen:'',
        autor_id:null,
        imagen:null
      }
    }
  },
  computed: {
    autoresOptions(){
      let vue = this;
      return vue.autores.map(function(x) {
        return { 'value': x.id, 'text': x.nombre }
      });
    }
  },
  methods: {
    create(){
      this.$bvModal.show('modal-nuevo-curso')
    },
    store(){
      let vue = this;
      const formData = serialize(vue.formNuevo);
      vue.axios.post('auth/cursos', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
      })
      .then(res => {
        vue.getCursos();
        this.$bvModal.hide('modal-nuevo-curso')
      })
    },
    eliminar(id){
      let vue = this;
      this.$bvModal.msgBoxConfirm('Estas seguro borrar el registro', {
        title: 'Confirmar',
        size: 'sm',
        buttonSize: 'md',
        okVariant: 'danger',
        okTitle: 'Si, confirmo',
        cancelTitle: 'No, cancelar',
        footerClass: 'p-2',
        hideHeaderClose: false,
        centered: true
      })
      .then(value => {
        if(value){
          vue.axios.post('auth/cursos/'+id,{ '_method':'DELETE' })
          .then(res => {
            vue.getCursos();
          })
          .catch(err => {
            console.error(err); 
          })
        }     
      })
    },

    getCursos(){
      let vue = this;
      vue.axios.get('auth/cursos')
      .then(res => {
        vue.cursos = res.data
      })
      .catch(err => {
        console.error(err); 
      })
    },
    getAutores(){
      let vue = this;
      vue.axios.get('auth/autores')
      .then(res => {
        vue.autores = res.data
      })
      .catch(err => {
        console.error(err); 
      })
    }
  },
}
</script>