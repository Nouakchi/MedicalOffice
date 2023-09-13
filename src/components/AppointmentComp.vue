<template>
<div>
    <v-card  class="pa-1 ma-2">
          <strong>Appointment</strong>
    </v-card>
<v-row class="fill-height">
    <v-col>
      <v-sheet height="64">
        <v-toolbar
          flat
            >
            <v-dialog
              v-model="dialog"
              width="500"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  v-bind="attrs"
                  v-on="on"
                  color="primary"
                  fab
                  small
                  dark
                  class="mr-4"
                >
                  <v-icon>mdi-calendar-plus</v-icon>
                </v-btn>
              </template>

              <v-card>
                <v-card-title class="text-h5 grey lighten-2">
                  New Event
                </v-card-title>

                <v-card-text class="mt-6">
                    <v-text-field
                      v-model="name"
                      label="Name"
                      outlined
                      clearable
                    ></v-text-field>
                    <v-textarea
                      v-model="details"
                      outlined
                      label="Details"
                    ></v-textarea>
                    <div class="d-flex">
                        <v-menu
                          v-model="addPicker"
                          :close-on-content-click="false"
                          :nudge-right="40"
                          transition="scale-transition"
                          offset-y
                          min-width="auto"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              v-model="date"
                              label="Picker without buttons"
                              prepend-icon="mdi-calendar"
                              readonly
                              v-bind="attrs"
                              v-on="on"
                            ></v-text-field>
                          </template>
                          <v-date-picker
                            v-model="date"
                            @input="addPicker = false"
                          ></v-date-picker>
                        </v-menu>
                      <v-menu
                        ref="menu"
                        v-model="addTimePicker"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        :return-value.sync="time"
                        transition="scale-transition"
                        offset-y
                        max-width="290px"
                        min-width="290px"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="time"
                            label="Picker in menu"
                            prepend-icon="mdi-clock-time-four-outline"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-time-picker
                          v-if="addTimePicker"
                          format="24hr"
                          v-model="time"
                          full-width
                          @click:minute="$refs.menu.save(time)"
                        ></v-time-picker>
                      </v-menu>
                    </div>
                    <div class="d-flex justify-center">
                      Color
                      <v-color-picker
                        v-model="color"
                        hide-canvas
                        hide-inputs
                        hide-mode-switch
                        hide-sliders
                        mode="hexa"
                        show-swatches
                        swatches-max-height="100"
                      ></v-color-picker>
                    </div>
                  
                </v-card-text>

                <v-divider></v-divider>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="primary"
                    text
                    @click="addEvent"
                  >
                    Add new Event
                  </v-btn>
                  <v-btn
                    color="primary"
                    text
                    @click="clearData()"
                  >
                    Cancel
                  </v-btn>
                </v-card-actions>
              </v-card>
          </v-dialog>
          <v-btn
            outlined
            class="mr-4"
            color="primary"
            @click="setFocus('')"
          >
            Today
          </v-btn>
          <v-btn
            fab
            text
            small
            color="grey darken-2"
            @click="prev"
          >
            <v-icon small>
              mdi-chevron-left
            </v-icon>
          </v-btn>
          <v-btn
            fab
            text
            small
            color="grey darken-2"
            @click="next"
          >
            <v-icon small>
              mdi-chevron-right
            </v-icon>
          </v-btn>
          <v-toolbar-title v-if="$refs.calendar">
            {{ $refs.calendar.title }}
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-menu
            v-model="focusPicker"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="date"
                label="Picker without buttons"
                clearable
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="date"
              @input="setFocus(date)"
            ></v-date-picker>
          </v-menu>
          <v-spacer></v-spacer>
          <v-menu
            bottom
            right
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                outlined
                color="grey darken-2"
                v-bind="attrs"
                v-on="on"
              >
                <span>{{ typeToLabel[type] }}</span>
                <v-icon right>
                  mdi-menu-down
                </v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item @click="type = 'day'">
                <v-list-item-title>Day</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = 'week'">
                <v-list-item-title>Week</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = 'month'">
                <v-list-item-title>Month</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = '4day'">
                <v-list-item-title>4 days</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-toolbar>
      </v-sheet>
      <v-sheet height="600">
        <v-calendar
          ref="calendar"
          v-model="focus"
          color="primary"
          first-time="07:00"
          interval-height="240"
          weekdays="1,2,3,4,5,6,0"
          :events="events"
          :event-color="getEventColor"
          :type="type"
          @click:event="showEvent"
          @click:more="viewDay"
          @click:date="viewDay"
          @change="updateRange"
        ></v-calendar>
        <v-menu
          v-model="selectedOpen"
          :close-on-content-click="false"
          :activator="selectedElement"
          offset-x
        >
          <v-card
            color="grey lighten-4"
            min-width="350px"
            flat
          >
            <v-toolbar
              :color="selectedEvent.color"
              dark
            >
              <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn
                color="grey"
                fab
                small
                dark
                class="mr-4"
                @click="showEdit(selectedEvent)"
              >
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <v-btn
                color="error"
                fab
                small
                dark
                @click="inDeleting = true;inEditing = false;"
              >
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </v-toolbar>
            <v-card-text>
              <div v-if="inEditing">
                    <v-textarea
                      v-model="details"
                      auto-grow
                      outlined
                      rows="3"
                      row-height="25"
                      shaped
                      label="Details"
                    ></v-textarea>
                    <div class="d-flex">
                        <v-menu
                          v-model="editPicker"
                          :close-on-content-click="true"
                          :nudge-right="40"
                          transition="scale-transition"
                          offset-y
                          min-width="auto"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              v-model="date"
                              label="Picker without buttons"
                              prepend-icon="mdi-calendar"
                              readonly
                              v-bind="attrs"
                              v-on="on"
                            ></v-text-field>
                          </template>
                          <v-date-picker
                            v-model="date"
                            @input="editPicker = false"
                          ></v-date-picker>
                        </v-menu>
                        <v-menu
                        ref="menu2"
                        v-model="editTimePicker"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        :return-value.sync="time"
                        transition="scale-transition"
                        offset-y
                        max-width="290px"
                        min-width="290px"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="time"
                            label="Picker in menu"
                            prepend-icon="mdi-clock-time-four-outline"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-time-picker
                          v-if="editTimePicker"
                          format="24hr"
                          v-model="time"
                          full-width
                          @click:minute="$refs.menu2.save(time)"
                        ></v-time-picker>
                      </v-menu>
                    </div>
              </div>
              <div v-else-if="inDeleting">
                <span v-html="'please confirm before deleting ...'"></span>
              </div>
              <div v-else>
                <span v-html="selectedEvent.details"></span>
              </div>
            </v-card-text>
            <v-card-actions>
              <v-btn
                color="green"
                fab
                dark
                @click="editEvent(selectedEvent)"
                v-if="inEditing"
              >
                <v-icon>mdi-check-all</v-icon>
              </v-btn>
              <v-btn
                color="error"
                dark
                @click="deleteEvent(selectedEvent)"
                v-if="inDeleting"
              >
              delete
              </v-btn>
              <v-btn
                color="green"
                dark
                v-if="inDeleting"
                @click="inDeleting = false"
              >
              cancel
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-menu>
      </v-sheet>
    </v-col>
  </v-row>
</div>
</template>
<script>

  export default {
    data:() =>({
      time:'',
      focusPicker:false,
      addPicker:false,
      editPicker: false,
      addTimePicker:false,
      editTimePicker:false,
      today: new Date().toISOString().substr(0,10),
      focus: new Date().toISOString().substr(0,10),
      date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      type:"month",
      typeToLabel: {
        month: 'Month',
        week: 'Week',
        day: 'Day',
        '4day': '4 Days',
      },
        name: null,
        details:null,
        start: null,
        end: null,
        color: '#1976D2',
        currentlyEditing:null,
        selectedEvent:{},
        inEditing: false,
        inDeleting:false,
        selectedElement:null,
        selectedOpen:false,
        events:[],
        dialog:false, 
    }),
    mounted () {
      this.getEvents();
    },
    methods: {
      clearData(){
        this.name = '';
        this.details = '';
        this.color = '';
        this.date = '';
        this.time = '';
        this.dialog = false;
      },
      deleteEvent(event){
        this.events.splice(this.events.findIndex(ev => ev.id == event.id),1);
        this.inDeleting = false;
        this.selectedOpen = false;
      },
      editEvent(event){
        this.events.find(ev => ev.id == event.id).details = this.details;
        this.events.find(ev => ev.id == event.id).start = this.date+'T'+this.time;
        this.events.find(ev => ev.id == event.id).end = this.date+'T'+this.time;
        this.inEditing = false;
        this.selectedOpen = false;
        this.clearData();
      },
      showEdit(event){
        this.details = event.details;
        this.date = event.start.substr(0,10);
        this.time = event.start.substr(11,event.start.length);
        this.inEditing = true;
        this.inDeleting = false;
      },
      addEvent(){
        this.events.push(
          {
            name:this.name,
            details:this.details,
            start:this.date+'T'+this.time,
            end:this.date+'T'+this.time,
            color:this.color,
            id:this.events.length
          }
        )
        this.clearData();
      },
      getEvents(){
        this.events.push({
          name: 'Nouakchi Othmane',
          details:'Rendez vous ' + new Date().toISOString().substr(0,10),
          start: new Date().toISOString().substr(0,10)+'T12:45',
          end: new Date().toISOString().substr(0,10)+'T12:45',
          color: '#1976D2',
          id:0
        })
        this.events.push({
          name: 'Akram Mohammed',
          details:'Rendez vous pour ' + new Date().toISOString().substr(0,10),
          start: new Date().toISOString().substr(0,10)+'T15:59',
          end: new Date().toISOString().substr(0,10)+'T15:59',
          color: 'black',
          id:1
        })
      },
      viewDay ({ date }) {
        this.focus = date
        this.type = 'day'
      },
      getEventColor (event) {
        return event.color
      },
      setFocus (date) {
        this.focus = date
        this.focusPicker = false
      },
      prev () {
        this.$refs.calendar.prev()
      },
      next () {
        this.$refs.calendar.next()
      },
      showEvent ({ nativeEvent, event }) {
        const open = () => {
          this.selectedEvent = event
          this.selectedElement = nativeEvent.target
          requestAnimationFrame(() => requestAnimationFrame(() => this.selectedOpen = true))
        }

        if (this.selectedOpen) {
          this.selectedOpen = false
          requestAnimationFrame(() => requestAnimationFrame(() => open()))
        } else {
          open()
        }

        nativeEvent.stopPropagation()
      },
      updateRange ({ start, end }) {
        this.start = start;
        this.end = end;
      /* 
        const min = new Date(`${start.date}T00:00:00`)
        const max = new Date(`${end.date}T23:59:59`)
        const days = (max.getTime() - min.getTime()) / 86400000
        const eventCount = this.rnd(days, days + 20)

        for (let i = 0; i < eventCount; i++) {
          const allDay = this.rnd(0, 3) === 0
          const firstTimestamp = this.rnd(min.getTime(), max.getTime())
          const first = new Date(firstTimestamp - (firstTimestamp % 900000))
          const secondTimestamp = this.rnd(2, allDay ? 288 : 8) * 900000
          const second = new Date(first.getTime() + secondTimestamp)

          events.push({
            name: this.names[this.rnd(0, this.names.length - 1)],
            start: first,
            end: second,
            color: this.colors[this.rnd(0, this.colors.length - 1)],
            timed: !allDay,
          })
        }
      */
      },
    }
  };
</script>