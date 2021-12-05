<template>
  <div>
    <h4>AUTORES</h4>
    <div class="row">
      <div class="col-md-12">
        <table class="table table-bordered">
          <thead>
            <tr>
              <th>Id</th>
              <th>Nombre</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="autor in autores" :key="autor.id">
              <td>{{ autor.id }}</td>
              <td>{{ autor.nombre }}</td>
              <td>
                <div class="btn-group">
                  <button class="btn btn-sm btn-warning">
                    <i class="fa fa-edit"></i>
                  </button>
                  <button class="btn btn-sm btn-danger">
                    <i class="fa fa-trash"></i>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    this.getAutores();
  },
  data() {
    return {
      autores:[]
    }
  },
  methods: {
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