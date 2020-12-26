<template>
  <div class="row mb-2 mt-1">
    <div class="col-12">
      <label for="editdescription">
        Description à afficher :
      </label>
      <textarea
        id="editdescription"
        ref="editdescription"
        class="form-control"
        placeholder="Résumé"
        rows="4"
        :value="info.getDescription()"
        v-on:blur="updateValues"
      />
    </div>
    <div class="col-12">
      <button v-b-modal.showpicker v-on:click="showpicker = true" ref="editmarker" class="btn btn-outline-dark selectbox pt-2">
        {{ info.getMarker() }}
      </button>
      <img class="infoicon m-2" :src="info.getMarkerURL()" />
      <b-modal hide-footer hide-header ref="showpicker" id="showpicker">
        <markerpicker :info="info" :done="toggleModal" />
      </b-modal>
    </div>
    <div class="col-12">
      <label for="editsource">
        Source :
      </label>
      <input
        type="text"
        ref="editsource"
        id="editsource"
        class="form-control"
        placeholder="Source URL"
        :value="info.getSourceURL()"
        v-on:blur="updateValues"
      />
    </div>
    <div class="col-12">
      <label for="editimage">
        Lien vers une image :
      </label>
      <input
        type="text"
        ref="editimage"
        id="editimage"
        class="form-control"
        placeholder="Image URL"
        :value="info.getImageURL()"
        v-on:blur="updateValues"
      />
    </div>
    <div class="col-12 mt-2">
      <button v-on:click="store" v-if="create" class="btn btn-primary m-2">Envoyer</button>
      <button v-on:click="modify" v-if="edit" class="btn btn-primary m-2">Modifier</button>
      <button v-on:click="remove" v-if="del" class="btn btn-outline-danger m-2">Supprimer</button>
    </div>
    <p v-if="backendfeedback" class="alert">{{ backendfeedback }}</p>
  </div>
</template>

<script>
import Markerpicker from '@/components/markerpicker.vue'
export default {
  name: 'infoeditor',
  // eslint-disable-next-line
  props: ['info', 'edit', 'create', 'del'],
  data: () => ({
    showpicker: false,
    backendfeedback: '',
  }),
  computed: {},
  methods: {
    updateValues() {
      let form = {}
      form['description'] = this.$refs.editdescription.value.trim()
      form['source'] = this.$refs.editsource.value.trim()
      form['image'] = this.$refs.editimage.value.trim()
      this.info.updateValues(form)
    },
    async store() {
      this.updateValues()
      this.backendfeedback = await this.info.storeToDB(this.$http)
      this.$store.dispatch('retrieveInfos')
    },
    async modify() {
      this.updateValues()
      this.backendfeedback = await this.info.editToDB(this.$http)
      this.$store.dispatch('retrieveInfos')
    },
    async remove() {
      this.backendfeedback = await this.info.supprFromDB(this.$http)
      this.$store.dispatch('retrieveInfos')
    },
    toggleModal() {
        this.$refs.showpicker.hide()
    },
  },
  components: {
    Markerpicker,
  },
}
</script>

<style scoped>
.imginfo {
  max-height: 75vh;
}
.infodate {
  color: maroon;
  text-align: right;
  font-size: medium;
}
.infodesc {
  text-align: justify;
  font-size: large;
}
</style>
