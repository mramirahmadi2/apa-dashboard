<template>
  <v-container fluid>
    <v-row justify="center">
      <v-title>{{ $t("Shared") }}</v-title>
      <v-expansion-panels popout>
        <v-expansion-panel
          v-for="(messag, i) in messages"
          :key="i"
          hide-actions
        >
          <v-expansion-panel-header>
            <v-row align="center" class="spacer" no-gutters>
              <v-col sm="5" md="3">
                <strong>{{ messag.sharedBy }}</strong>
              </v-col>
            </v-row>
          </v-expansion-panel-header>

          <v-expansion-panel-content>
            <v-divider></v-divider>
            <v-card-text>
              <v-container class="mt-5">
                <v-row>
                  <v-col>
                    <v-treeview
                      v-model="selection"
                      :items="messag.items"
                      key="id"
                      item-key="name"
                      selectable
                      return-object
                      open-all
                      hoverable
                      :right="isRtl"
                    >
                      <template v-slot:prepend="{ item, open }">
                        <v-icon v-if="item.children">
                          {{ open ? "mdi-folder-open" : "mdi-folder" }}</v-icon
                        >
                        <v-icon v-else>mdi-file</v-icon>
                      </template>

                      <template v-slot:label="{ item }">
                        <v-hover v-slot:default="{ hover }">
                          <div>
                            <span>{{ item.name }}</span>

                            <div
                              v-for="(press, i) in messag.permissions"
                              :key="i"
                              class="appendRight"
                            >
                              <v-icon
                                v-if="hover && press.DELETE === 1"
                                @click="deleteItem(item)"
                                >mdi-delete</v-icon
                              >

                              <v-icon v-if="hover && press.SHARE === 1"
                                      @click.stop="formShare = true"
                                >mdi-share-variant-outline</v-icon
                              >

                              <v-icon v-if="hover && press.EDIT === 1"
                                >mdi-rename-box</v-icon
                              >
                            </div>
                          </div>
                        </v-hover>
                      </template>
                    </v-treeview>
                  </v-col>
                  <v-divider vertical></v-divider>
                  <v-col class="pa-6" cols="6">
                    <template v-if="!selection.length">
                      {{ $t("No-nodes-selected.") }}
                    </template>
                    <template v-else>
                      <div v-for="node in selection" :key="node.id">
                        {{ node.name }}
                      </div>
                    </template>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-row>
    <v-dialog v-model="deleteFileShared" max-width="500px">
      <v-card>
        <v-card-title class="text-h5">
          Are you sure you want to delete this File?
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click.stop="deleteFileShared = false"
            >Cancel</v-btn
          >
          <v-btn color="blue darken-1" text @click="Delete">OK</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- dialog for shared -->
    <FormShare v-model="formShare" />
  </v-container>
</template>
<script>
import Data from "@/assets/InformationUsersAndGroups/ShereFiles.json";
import FormShare from "./FormShare.vue";
export default {
    el: "#app",
    components: { FormShare },
    data: () => ({
        deleteFileShared: false,
        messages: [],
        selection: [],
        editedItem: {
            id: "",
            name: "",
            type: "",
            children: [],
        },
        defaultItem: {
            id: "",
            name: "",
            type: "",
            children: [],
        },
        editedIndex: -1,
        formShare: false
    }),
    computed: {
        isOkData() {
            return this.$store.state.dataTable;
        },
    },
    created() {
        if (this.isOkData === true) {
            this.initialize();
        }
    },
    watch: {
        isOkData: {
            handler(value) {
                if (value === true) {
                    this.initialize();
                }
            },
        },
    },
    methods: {
        initialize() {
            this.messages = Data;
        },
        deleteItem(item) {
            this.editedIndex = this.messages.items.indexOf(item);
            this.editedItem = Object.assign({}, item);
            this.deleteFileShared = true;
            console.log("hi");
        },
        Delete() {
            this.messages.items.splice(this.editedIndex, 1);
            this.closeDelete();
        },
        closeDelete() {
            this.deleteFileShared = false;
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem);
                this.editedIndex = -1;
            });
        },
    },
};
</script>
