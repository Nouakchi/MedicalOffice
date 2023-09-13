<template>
    <v-form
        ref="form"
        v-model="valid"
        lazy-validation
        horizontal
    >
        <div>
            <v-text-field
            v-model="currentPassword"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required, rules.min]"
            :type="show1 ? 'text' : 'password'"
            name="input-10-1"
            label="Current Password"
            hint="At least 8 characters"
            counter
            @click:append="show1 = !show1"
          ></v-text-field>
          <v-text-field
            v-model="newPassword"
            :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required, rules.min]"
            :type="show2 ? 'text' : 'password'"
            name="input-10-2"
            label="New Password"
            hint="At least 8 characters"
            class="input-group--focused"
            @click:append="show2 = !show2"
          ></v-text-field>
          <v-text-field
            v-model="confirmPassword"
            :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required, rules.min]"
            :type="show3 ? 'text' : 'password'"
            name="input-10-2"
            label="Confirm Password"
            hint="At least 8 characters"
            class="input-group--focused"
            @click:append="show3 = !show3"
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
      methods: {
           validate () {
        this.$refs.form.validate()
      },
      reset () {
        this.$refs.form.reset()
      },
      },
    data () {
      return {
        valid: true,
        show1: false,
        show2: false,
        show3: false,
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
        rules: {
          required: value => !!value || 'Required.',
          min: v => v.length >= 8 || 'Min 8 characters',
          emailMatch: () => (`The email and password you entered don't match`),
        },
      }
    },
  }
</script>