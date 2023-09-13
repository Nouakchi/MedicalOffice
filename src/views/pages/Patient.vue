<template>
<div>
  <patient-comp/>
</div>
</template>

<script>
  import PatientComp from '../../components/PatientComp.vue'

  export default {
    name: 'PatientView',
    components: {
      PatientComp,
    },
  }
</script>