<template>
  <div>
    <b-card no-body class="overflow-hidden" style="width: 100%;">
      <template #footer>
        
        <template  v-if="curso.avg_calificacion.length==1">
          <em>Puntaje promedio {{ parseInt(curso.avg_calificacion[0]['promedio']) }} </em>
        </template>
        <template v-else>
          Aun no tiene calificación
        </template>
      </template>
      <b-row no-gutters>
        <b-col md="6">
          <b-card-img :src="curso.imagen" alt="Image" class="rounded-0"></b-card-img>
        </b-col>
        <b-col md="6">
          <b-card-body :title="curso.nombre">
            <p>
              {{curso.resumen | str_limit(150)}}
            </p>
            <curso-calificar :curso="curso" />
          </b-card-body>
        </b-col>
      </b-row>
    </b-card>
  </div>
</template>

<script>
import CursoCalificar from '@/components/CursoCalificar'
export default {
  components:{
    CursoCalificar
  },
  props:['curso'],
  methods: {
    
  },
}
</script>