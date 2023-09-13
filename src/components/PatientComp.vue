<template>
<div>
    <v-data-table
    :headers="headers"
    :items="patients"
    :search="search"
    sort-by="calories"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>Patients</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
        <v-spacer></v-spacer>
        <v-dialog
          v-model="dialog"
          max-width="500px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              class="mb-2"
              v-bind="attrs"
              v-on="on"
            >
              New Item
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.name"
                      label="Dessert name"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.calories"
                      label="Calories"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.fat"
                      label="Fat (g)"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.carbs"
                      label="Carbs (g)"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.protein"
                      label="Protein (g)"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="close"
              >
                Cancel
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="save"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
        <!-- eslint-disable  -->
    <template v-slot:item.actions="{ item }">
      <v-icon
        v-for="(val,key) in actions"
        :color="val.color"
        :key="key"
        small
        class="mr-2"
        @click="actionHandler(item,val.action)"
      >
        {{val.icon}}
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn
        color="primary"
        @click="initialize"
      >
        Reset
      </v-btn>
    </template>
  </v-data-table>
</div>
  
</template>
<script>
const axios = require("axios").default;
import crypto from '../plugins/crypto'
  export default {
    data: () => ({
      search: '',
      dialog: false,
      dialogDelete: false,
      headers: [
        { text: 'CIN', value: 'cin' },
        { text: 'Full Name', value: 'nomcomplet' },
        { text: 'Phone', value: 'telephone' },
        { text: 'BirthDay', value: 'datenaissance' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      patients: [],
      editedIndex: -1,
      editedItem: {
        id: 0,
        cin: '',
        nomcomplet: '',
        datenaissance: '',
        sexe: '',
        adresse: '',
        telephone: '',
        email: '',
        situation: '',
        libmutuelle: '',
        fk_mutuelle_id: -1,
        fk_users_id: -1,
        libusers: '',
        create_at: '',
        update_at: ''
      },
      defaultItem: {
        id: 0,
        cin: '',
        nomcomplet: '',
        datenaissance: '',
        sexe: '',
        adresse: '',
        telephone: '',
        email: '',
        situation: '',
        libmutuelle: '',
        fk_mutuelle_id: -1,
        fk_users_id: -1,
        libusers: '',
        create_at: '',
        update_at: ''
      },
      actions:[
          {action:'viewItem', icon:'mdi-eye' ,color:'black'},
          {action:'editItem', icon:'mdi-pencil' ,color:'green'},
          {action:'deleteItem', icon:'mdi-delete' ,color:'red'},
      ]
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },

    created () {
      this.initialize()
    },

    methods: {
      initialize () {
        let data = {
                "token": crypto.decrypt(localStorage.getItem('token'))
            };
        let config = { headers: { "content-type": "application/json" } };
        axios.post('http://192.168.1.68:4000/patient/All',data,config)
        .then(async res => {
          this.patients = await res.data;
        })
        .catch(error => {
          alert(error)
        })
      },

      viewItem() {

      },

      editItem (item) {
        this.editedIndex = this.patients.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = this.patients.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        this.patients.splice(this.editedIndex, 1)
        this.closeDelete()
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.patients[this.editedIndex], this.editedItem)
        } else {
          this.patients.push(this.editedItem)
        }
        this.close()
      },

      actionHandler(item, action) {
          switch (action) {
              case 'viewItem':
                    this.viewItem(item)
                  break;
              case 'editItem':
                    this.editItem(item);
                  break;
              case 'deleteItem':
                    this.deleteItem(item)
                  break;
              default:
                  break;
          }
      }
    },
  }
</script>