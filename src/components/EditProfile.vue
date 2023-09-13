<template>
        <v-form
    ref="form"
    v-model="valid"
    lazy-validation
    horizontal
  >
    <div>
    <v-text-field
      v-model="name"
      :counter="30"
      :rules="nameRules"
      label="Name"
      required
      outlined
      prepend-inner-icon="mdi-human-edit"
    ></v-text-field>

    <v-text-field
      v-model="email"
      :rules="emailRules"
      label="E-mail"
      required
      outlined
      prepend-inner-icon="mdi-gmail"
    ></v-text-field>

    <v-btn
      :disabled="!valid"
      color="success"
      class="mr-4"
      @click="validate"
    >
      Validate
    </v-btn>

    <v-btn
      color="error"
      class="mr-4"
      @click="reset"
    >
      Reset Form
    </v-btn>
    </div>
  </v-form>
</template>

<script>
  export default {
      components:{
      },
    data: () => ({
      valid: true,
      name: '',
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 30) || 'Name must be less than 10 characters',
      ],
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ]
    }),

    methods: {
      validate () {
        this.$refs.form.validate()
      },
      reset () {
        this.$refs.form.reset()
      },
    },
  }
</script>