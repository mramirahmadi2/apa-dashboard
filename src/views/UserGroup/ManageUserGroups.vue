<template>
  <div class="ManageUserGroups">
    <div>
      <header class="flex-apa" id="flexApa">
        <div class="searchAndBtn">
          <search />
        </div>
      </header>
    </div>
    <div class="body">
      <h2>{{ $t("Groups") }}</h2>

      <v-data-table
        :headers="headers"
        :items="desserts"
        sort-by="name"
        class="elevation-1"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>{{ $t("Groups") }}</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="500px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="primary"
                  dark
                  class="mb-2"
                  v-bind="attrs"
                  v-on="on"
                >
                  {{ $t("Add-Group") }}
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="text-h5">{{ formTitle }}</span>
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12">
                        <v-text-field
                          v-model="editedItem.name"
                          label="Group Name"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-select
                          v-model="users"
                          :items="myUsers"
                          item-text="username"
                          label="new Users"
                          multiple
                          chips
                        ></v-select>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="close">
                    Cancel
                  </v-btn>
                  <v-btn color="blue darken-1" text @click="save"> Save </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-dialog v-model="dialogDelete" max-width="500px">
              <v-card>
                <v-card-title class="text-h5">{{
                  $t("Are-you-sure-you-want-to-delete-this-Group?")
                }}</v-card-title>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="closeDelete"
                    >Cancel</v-btn
                  >
                  <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                    >OK</v-btn
                  >
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>

        <template v-slot:[`item.actions`]="{ item }">
          <v-btn @click="editItem(item)" icon>
            <v-icon small class="mr-2"> mdi-pencil </v-icon></v-btn
          >
          <v-btn icon @click="deleteItem(item)">
            <v-icon small> mdi-delete </v-icon></v-btn
          >
        </template>
        <template v-slot:[`item.Details`]="{ item }">
          <v-icon @click="details(item)">mdi-details</v-icon>
        </template>

        <template v-slot:no-data>
          <v-span color="primary" @click="noData" v-if="isOkData === false">
            no data
          </v-span>
        </template>
      </v-data-table>
    </div>
    <SnakBar
      v-model="snackbar"
      :timeout="timeout"
      :text="text"
      :colorSnak="colorbackgroundColor"
    />
    <DetailGroup :name.sync="name" :users.sync="users" v-model="detailsGroup" />
  </div>
</template>
<script>
import search from "../../components/ApaPage/SearchInput";
import "@/assets/Style/ltrStyle.css";
import DetailGroup from "@/components/ManageGroup/DetailGroup.vue";
import SnakBar from "@/components/ApaPage/SnakBar.vue";
import Groups from "@/assets/InformationUsersAndGroups/GroupName.json";

export default {
  name: "ManageUserGroups",
  components: {
    search,
    DetailGroup,
    SnakBar,
  },
  data() {
    return {
      dialog: false,
      dialogDelete: false,
      detailsGroup: false,
      snackbar: false,
      text: "no data Group. Please click the show button",
      timeout: "3000",
      okAdd: false,
      colorbackgroundColor: "red",
      myUsers: [],
      headers: [
        { text: "name", value: "name" },
        { text: "creator", value: "creator" },
        { text: "creationTime", value: "creationTime" },
        { text: "Actions", value: "actions", sortable: false },
        { text: "Details", value: "Details", sortable: false },
      ],
      desserts: [],
      editedIndex: -1,
      editedItem: {
        name: "",
        users: [],
        creator: "",
        creationTime: "",
      },
      defaultItem: {
        name: "",
        users: [ ],
        creator: "",
        creationTime: "",
      },
      name: "",
      users: "",
    };
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Group" : "Edit Group";
    },
    isOkData() {
      return this.$store.state.dataTable;
    },
    isDefultAdmin() {
      return this.$store.state.nameUser;
    },
    isGetUser() {
      return this.$store.state.allUsers;
    },
    isGetGroup() {
      return this.$store.state.allGroup;
    },
    isnameGroup() {
      return this.$store.state.nameGroup;
    },
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
    isOkData: {
      handler(value) {
        if (value === true) {
          this.initialize();
        }else{
          this.noDataBase();
        }
      },
    },
    isGetUser: {
      handler(value) {
        if (value !== []) {
          this.noDataBase();
        }
      },
    },
  },
  created() {
    if (this.isOkData === true) {
      this.initialize();
    } else {
      this.noDataBase();
      this.savaDataGroup();
    }
    
  },
  methods: {
    savaDataGroup(){
      this.desserts = this.isGetGroup  ;
    },
    initialize() {
      this.desserts = Groups;
      this.myUsers = this.isGetUser;
      for (let i = 0; i <= this.desserts.length; ++i) {
        this.$store.commit("isGetGroup", this.desserts[i]);
      }
    },
    noDataBase() {
      this.myUsers = this.isGetUser;
      this.isGetGroup = this.desserts ;
    },
    noData() {
      this.snackbar = true;
    },
    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    dateNow() {
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, "0");
      var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
      var yyyy = today.getFullYear();
      return (today = mm + "/" + dd + "/" + yyyy);
    },
    deleteItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },
    details(item) {
      this.name = item.name;
      this.users = item.users;
      console.log('ok users',this.users)
      this.detailsGroup = true;
    },
    deleteItemConfirm() {
      this.desserts.splice(this.editedIndex, 1);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      let duplicate;
      if (this.editedIndex > -1) {
        this.editedItem.creator = this.$store.state.nameUser;
        this.editedItem.creationTime = this.dateNow();
        Object.assign(this.desserts[this.editedIndex], this.editedItem);
        this.close();
      } else if (!this.editedItem.name) {
        this.snackbar = true;
        this.text = "Please enter your groupname";
      } else {
        this.desserts.forEach((element) => {
          if (element.name === this.editedItem.name) {
            duplicate = element.name;
          }
        });
        if (this.editedItem.name !== duplicate) {
          this.editedItem.creationTime = this.dateNow();
          this.editedItem.creator = this.isDefultAdmin;
          this.desserts.push(this.editedItem);
          this.close();
        } else {
          this.snackbar = true;
          this.text = "The groupname is duplicate ";
        }
      }
    },
  },
};
</script>
