<template>
  <div class="UserManagement">
    <div>
      <header class="flex-apa" id="flexApa">
        <div class="searchAndBtn">
          <search />
        </div>
      </header>
    </div>
    <div class="body">
      <div>
        <h2 class="body-user-groups">{{ $t("User") }}</h2>
        <v-data-table :headers="headers" :items="UserBase" sort-by="id">
          <template v-slot:top>
            <v-toolbar flat>
              <v-toolbar-title>{{ $t("User") }}</v-toolbar-title>
              <v-divider class="mx-4" inset vertical></v-divider>
              <v-spacer></v-spacer>
              <v-dialog v-model="dialog" max-width="500px">
                <template v-slot:activator="{ attrs }">
                  <v-btn
                    color="primary"
                    dark
                    class="mb-2"
                    v-bind="attrs"
                    @click="newUser()"
                  >
                    {{ $t("Add-User") }}
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
                            v-model="editedItem.username"
                            label="username*"
                            required
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                          <v-text-field
                            v-model="editedItem.firstName"
                            label="firstName"
                            required
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                          <v-text-field
                            v-model="editedItem.lastName"
                            label="lastName"
                            required
                          ></v-text-field>
                        </v-col>

                        <v-col cols="12">
                          <v-select
                            v-model="editedItem.admin"
                            :items="roles"
                            label="Role"
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
                    <v-btn color="blue darken-1" text @click="save">
                      Save
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <v-dialog v-model="dialogDelete" max-width="500px">
                <v-card>
                  <v-card-title class="text-h5">{{
                    $t("Are-you-sure-you-want-to-delete-this-User?")
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

          <template v-slot:[`item.admin`]="{ item }">
            <strong>{{ item.admin === true ? "admin" : "user" }}</strong>
          </template>
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon small class="mr-2" @click="editItem(item)">
              mdi-pencil
            </v-icon>
            <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
          </template>

          <template v-slot:no-data>
            <v-span color="primary" @click="noData"> no data user </v-span>
          </template>
        </v-data-table>
        <SnakBar
          v-model="snackbar"
          :timeout="timeout"
          :text="text"
          :colorSnak="colorbackgroundColor"
        />
      </div>
    </div>
  </div>
</template>

<script>
import search from "@/components/ApaPage/SearchInput.vue";
import SnakBar from "@/components/ApaPage/SnakBar.vue";
import Users from "@/assets/InformationUsersAndGroups/Users.json";

export default {
  name: "UserManagement",
  components: {
    search,
    SnakBar,
  },
  data() {
    return {
      dialog: false,
      dialogDelete: false,
      snackbar: false,
      text: "no data user.Please click the show button ",
      timeout: "3000",
      colorbackgroundColor: "red",
      flatUser: false,
      checkRender: 0,
      userDelete: {},
      UserBase: [],
      headers: [
        { text: "username", value: "username" },
        { text: "firstName", value: "firstName" },
        { text: "lastName", value: "lastName" },
        { text: "role", value: "admin" },
        { text: "creator", value: "creator" },
        { text: "creationTime", value: "creationTime" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      roles: [
        { text: "admin", value: true },
        { text: "user", value: false },
      ],
      desserts: [],
      editedIndex: -1,
      editedItem: {
        username: "",
        firstName: "",
        lastName: "",
        creator: "",
        creationTime: "",
        admin: false,
        file: [],
      },
      defaultItem: {
        username: "",
        firstName: "",
        lastName: "",
        creator: "",
        creationTime: "",
        admin: false,
        file: [],
      },
      check: false,
    };
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New User" : "Edit User";
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
    dateNow() {
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, "0");
      var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
      var yyyy = today.getFullYear();
      return (today = mm + "/" + dd + "/" + yyyy);
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
        }
      },
    },
    isDefultAdmin: {
      handlerAdmin(value) {
        if (value !== []) {
          this.defultData();
        }
      },
    },
    isGetUser: {
      handler(value) {
        if (value.length > 1) {
          this.saveUser();
        }
      },
      desserts: {
        handler(val) {
          console.log("mohammad ali", val);
        },
      },
      deep: true,
    },
  },
  created() {
    if (this.isDefultAdmin !== "") {
      this.defultData();
    }
    if (this.isOkData === true) {
      this.initialize();
    }
    this.saveUser();
  },
  methods: {
    saveUser() {
      this.desserts = this.isGetUser;
      this.UserBase = this.desserts.filter(
        (noAdmin) => noAdmin.username !== "admin"
      );
    },
    Check() {
      this.check = true;
    },
    initialize() {
      this.UserBase = Users;
      this.relseInGetUser();
      this.saveUser();
    },
    defultData() {
      this.editedItem.creator = this.isDefultAdmin;
    },
    noData() {
      this.snackbar = true;
    },

    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    newUser() {
      this.editedItem = {
        username: "",
        firstName: "",
        lastName: "",
        creator: "",
        creationTime: "",
        admin: false,
        file: [],
      };
      this.dialog = true;
    },
    deleteItem(item) {
      console.log("item", item);
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },
    relseInGetUser() {
      for (let i = 0; i <= this.UserBase.length; ++i) {
        this.$store.commit("isGetUserInDom", this.UserBase[i]);
      }
    },
    deleteItemConfirm() {
      if (this.isOkData === true) {
        this.UserBase.splice(--this.editedIndex, 1);
        this.desserts.splice(++this.editedIndex, 1);
      } else {
        this.desserts.splice(this.editedIndex, 1);
        this.saveUser();
      }

      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
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
        this.editedItem.creationTime = this.dateNow;
        this.editedItem.creator = this.$store.state.nameUser;
        Object.assign(this.desserts[this.editedIndex], this.editedItem);
        this.close();
      } else if (!this.editedItem.username) {
        this.snackbar = true;
        this.text = "Please enter your username";
      } else {
        console.log("this.isOkData", this.isOkData);
        this.UserBase.forEach((element) => {
          if (element.username === this.editedItem.username) {
            duplicate = element.username;
          }
        });
        if (this.editedItem.username !== duplicate) {
          this.editedItem.creationTime = this.dateNow;
          this.editedItem.creator = this.$store.state.nameUser;
          if (this.isOkData === true) {
            this.UserBase.push(this.editedItem);
            this.desserts.push(this.editedItem);
            this.close();
          } else {
            this.desserts.push(this.editedItem);
          }
          this.close();
        } else if (this.editedItem.username === duplicate) {
          this.snackbar = true;
          this.text = "The username is duplicate ";
        }
      }
    },
  },
};
</script>
