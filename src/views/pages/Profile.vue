<template>
<div>
  <profile-comp/>
</div>
</template>

<script>
  import ProfileComp from '../../components/ProfileComp.vue'

  export default {
    name: 'PatientView',
    components: {
      ProfileComp,
    },
  }
</script>