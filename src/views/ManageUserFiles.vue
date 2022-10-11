<template>
  <div class="ManageUserFiles">
    <v-container class="mt-5">
      <v-row>
        <v-col cols="6" md="6">
          <p class="font-weight-bold" style="max-width: 12rem">
            Home/<strong>{{ name }}</strong>
          </p>
        </v-col>
        <v-col cols="6" md="4">
          <v-btn color="primary" class="pa-2 ml-2" @click="addFolder()">{{
            $t("newFolder")
          }}</v-btn>
          <v-btn
            color="primary"
            class="pa-2 ml-2"
            @click.stop="UplodFile = true"
            >{{ $t("uploadFile") }}</v-btn
          >
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-treeview
            v-model="selection"
            :items="items"
            item-key="name"
            selectable
            return-object
            open-all
            hoverable
            :right="isRtl"
          >
            <template v-slot:prepend="{ item, open }">
              <v-icon v-if="item.type === 'folder'">
                {{ open ? "mdi-folder-open" : "mdi-folder" }}</v-icon
              >
              <v-icon v-else>mdi-file</v-icon>
            </template>

            <template v-slot:label="{ item }">
              <v-hover v-slot:default="{ hover }">
                <div>
                  <span>{{ item.name }}</span>
                  <v-row v-if="hover" id="icons" class="appendRight pa-4">
                    <v-icon @click="deleteItem(item)" title="Delete"
                      >mdi-delete</v-icon
                    >
                    <div>
                      <v-icon v-if="item.type === 'file'" title="move"
                        >mdi-folder-move</v-icon
                      >
                      <v-icon v-else title="Move">mdi-file-move</v-icon>
                    </div>
                    <v-icon
                      @click="copyCode(item.id)"
                      @mouseout="reset"
                      title="Copy"
                      >mdi-content-copy</v-icon
                    >
                    <v-icon title="Rename" @click="editItem(item)"
                      >mdi-rename-box</v-icon
                    >

                    <v-icon title="Download">mdi-cloud-download</v-icon>
                    <div>
                      <v-icon
                        v-if="item.type === 'folder'"
                        @click="uplodeFile(item)"
                        title="uplod"
                        >mdi-cloud-upload
                      </v-icon>
                    </div>
                    <div>
                      <v-icon
                        v-if="item.type === 'folder'"
                        @click.stop="showScheduleForm = true"
                        title="Add File"
                        >mdi-folder-plus
                      </v-icon>
                    </div>
                    <div>
                      <v-icon
                        @click.stop="showScheduleFormShare = true"
                        title="Share"
                        >mdi-share-variant-outline
                      </v-icon>
                    </div>
                  </v-row>
                </div>
              </v-hover>
            </template>
          </v-treeview>
        </v-col>
        <v-divider vertical></v-divider>
        <v-col class="pa-6" cols="6">
          <template v-if="!selection.length">{{
            $t("No-nodes-selected.")
          }}</template>

          <template v-else>
            <div v-for="node in selection" :key="node.id">
              {{ node.name }}
            </div>
            <div v-if="selection.length > 1">
              <v-card class="d-flex flex-wrap" color="CardApa" flat tile>
                <v-card
                  btn
                  class="pa-2 ml-1 mt-1"
                  outlined
                  tile
                  @click="ShowDelete = true"
                  title="Delete"
                >
                  Delete All <v-icon>mdi-delete</v-icon>
                </v-card>
                <v-card
                  btn
                  class="pa-2 ml-1 mt-1"
                  outlined
                  tile
                  @click.stop="showScheduleFormShare = true"
                  title="Share"
                >
                  Share All <v-icon>mdi-share-variant-outline</v-icon>
                </v-card>
                <v-card
                  btn
                  class="pa-2 ml-1 mt-1"
                  outlined
                  tile
                  title="Download"
                >
                  Download All <v-icon>mdi-cloud-download</v-icon>
                </v-card>
              </v-card>
            </div>
          </template>
        </v-col>
      </v-row>
    </v-container>
    <SnakBar
      v-model="snackbar"
      :timeout="timeout"
      :text="text"
      :colorSnak="colorbackgroundColor"
    />

    <!-- <v-container class="mt-5" v-if="isOkData === true">
      <shared />
    </v-container> -->
    <v-dialog v-model="UplodFile" max-width="500px">
      <v-card>
        <v-card-title> New document </v-card-title>
        <v-card-text>
          <v-file-input
            type="file"
            v-model="selectedFile"
            color="ivory accent-4"
            counter
            label="Add in your computer"
            multiple
            v-on:change="onFileSelected()"
            placeholder="Select your files"
            prepend-icon="mdi-paperclip"
            outlined
            :show-size="1000"
            requeired
          >
            <template v-slot:fd="{ text }">
              <v-chip
                v-for="file in fd"
                :slot="file.name"
                :key="file.name"
                color="slategray accent-4"
                dark
                label
                small
                id="uploadedFile"
              >
                {{ text }}
              </v-chip>
            </template>
          </v-file-input>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" text @click="UplodFile = false"> Close </v-btn>
          <v-btn color="primary" text @click="addChildFile()"> Save </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <AddNameFile v-model="showScheduleForm" />
    <formShare v-model="showScheduleFormShare" />
    <!-- dialog delete for All items -->
    <DeleteAllFile v-model="ShowDelete" @deleteAll="DeleteAll" />
    <!-- dialog delete for itemes  -->
    <DeleteSingleFile v-model="ShowDeleteSingleFile" @deleteOneFile="deleteOneFile"/>
    <!-- dialog for rename -->
    <v-dialog v-model="dialogRename" max-width="500px">
      <v-card>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="editedItem.name"
                  label="name"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-select
                  v-model="editedItem.type"
                  :items="type"
                  label="type"
                ></v-select>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeRename">
            Cancel
          </v-btn>
          <v-btn color="blue darken-1" text @click="save"> Save </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import "@/assets/Style/ltrStyle.css";
//import shared from "@/components/UserManagementDialog/SharedFiles.vue";
import formShare from "@/components/UserManagementDialog/FormShare.vue";
import AddNameFile from "../components/UserManagementDialog/AddNameFile.vue";
import DeleteAllFile from "@/components/UserManagementDialog/DeleteAllFile.vue";
import SnakBar from "@/components/ApaPage/SnakBar.vue";
import DeleteSingleFile from "@/components/UserManagementDialog/DeleteSingleFile.vue";

export default {
  name: "ManageUserFiles",
  components: {
    //shared,
    formShare,
    AddNameFile,
    DeleteAllFile,
    SnakBar,
    DeleteSingleFile
},
  data: () => ({
    dialogRename: false,
    ShowDeleteSingleFile:false,
    UplodFile: false,
    nameFile: false,
    showScheduleForm: false,
    showScheduleFormShare: false,
    snackbar: false,
    text: "copied",
    timeout: "3000",
    colorbackgroundColor: "green",
    ShowDelete: false,
    oldUser: "",
    owner: "",
    sheres: "",
    selection: [],
    name: "",
    rootok: false,
    items: [],
    editedItem: {
      name: "",
      type: "",
      children: [],
    },
    type: [
      { text: "file", value: "file" },
      { text: "folder", value: "folder" },
    ],
    defaultItem: {
      name: "",
      type: "",
      children: [],
    },
    editedIndex: -1,
    selectedFile: null,
    GroupAction: ["Delete All", "Share All", "Downlod All"],
  }),
  computed: {
    isRtl() {
      return this.$store.getters.isRtl;
    },
    isDefultAdmin() {
      return this.$store.state.nameUser;
    },
    singleUser() {
      return this.$store.state.allUsers;
    },
  },
  watch: {
    UplodFile(val) {
      val || this.close();
    },
    dialogRename(val) {
      val || this.closeRename();
    },
    isDefultAdmin: {
      handler(value) {
        if (value !== "") {
          this.ownerFile();
          this.initialize();
        }
      },
    },
  },
  created() {
    if (this.isDefultAdmin !== "admin") {
      this.ownerFile();
    }
    if (this.selection !== []) {
      this.rootNameSelect();
    }
    this.initialize();
  },
  mounted() {
    if (this.isRtl === true) {
      import("@/assets/Style/rtlStyle.css").then(
        () => document.querySelector("#icons").classList.add("appendLeft"),
        document.querySelector("#icons").classList.remove("appendRight")
      );
    }
  },
  methods: {
    initialize() {
      this.singleUser.forEach((user) => {
        if (user.username === this.owner) {
          this.items = user.file;
          this.name = user.username;
          console.log("name", user.username);
        }
      });
    },
    ownerFile() {
      this.owner = this.isDefultAdmin;
    },
    async copyCode(idCOpy) {
      await navigator.clipboard.writeText(
        this.items.map((item) => {
          if (item.id == idCOpy) {
            return item.name;
          }
        })
      );
      this.copyText = "Copied";
      console.log(this.copyText);
      this.snackbar = true;
    },
    reset() {
      this.copyText = this.text;
    },
    close() {
      this.UplodFile = false;
      this.fd = [];
      this.nomePasta = "";
      this.selectedFile = null;
    },
    uplodeFile(item) {
      this.editedIndex = this.items.indexOf(item);
      this.editedItem = item;
      this.UplodFile = true;
    },
    addChildFile() {
      if (!this.editedItem.children) {
        this.$set(this.editedItem, "children", []);
      }
      const id = this.nextId++;
      const name = this.fd[0].name;
      this.editedItem.children.push({
        id,
        name,
      });
      
      this.UplodFile = false;
    },
    addFile() {
      this.nameFile = true;
    },
    deleteItem(item) {
      this.editedIndex = this.items.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.ShowDeleteSingleFile = true;
    },
    rootNameSelect() {
      this.rootok = true;
    },
    deleteOneFile(){
      this.items.splice(this.editedIndex, 1);
      this.closeDelete();
      this.ShowDeleteSingleFile = false;

    },
    DeleteAll() {
      this.selection.forEach((el) => {
        this.items.splice(this.items.indexOf(el), 1);
      });
      this.ShowDelete = false;
    },
    closeDelete() {
      this.deleteFile = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    editItem(item) {
      this.editedIndex = this.items.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogRename = true;
    },
    addFolder() {
      this.editedItem = {
        file: [],
      };
      this.dialogRename = true;
    },
    closeRename() {
      this.dialogRename = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.items[this.editedIndex], this.editedItem);
        this.closeRename();
      } else {
        this.singleUser.forEach((user) => {
          if (user.username === this.owner) {
            user.file = this.items;
          }
        });
        this.items.push(this.editedItem);
        console.log("hamine baba", this.singleUser);
        this.closeRename();
      }
    },
  },
};
</script>
<style></style>
