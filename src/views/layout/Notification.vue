<template>
    <div>
        <v-alert class="not" :type="type" :value="show" transition="slide-x-reverse-transition">{{ message }}</v-alert>
    </div>
</template>
<style scoped>
.not{
  position:fixed;
  bottom:0;
  right:0;
  margin-right: 15px;
  width: 320px;
}
</style>
<script>
export default {
    name: 'NotificationLayout',
    props:['type','message','show']
}
</script>