<template>
  <div class="container add-formdata">
    <h2 class="center-align black-text">Masukkan Data</h2>
    <form @submit.prevent="AddData">
      <div class="field title">
        <label for="title">Nama :</label>
        <input type="text" name="title" v-model="title" />
      </div>
      <div v-for="(ing, index) in ingredients" :key="index" class="field">
        <label for="data paket">Isi Data</label>
        <input type="text" name="ingredient" v-model="ingredients[index]" />
        <i class="material-icons delete" @click="deleteIng(ing)">delete</i>
      </div>
      <div class="field title">
        <label for="another">Tambah Data:</label>
        <input
          type="text"
          name="another"
          @keydown.tab.prevent="addIng"
          v-model="another"
        />
      </div>
      <div class="field center-align">
        <p v-if="feedback" class="red-text">{{ feedback }}</p>
        <button class="btn blue">Simpan</button>
      </div>
    </form>
  </div>
</template>

<script>
import db from "@/firebase/init";
import slugify from "slugify";

export default {
  name: "AddData",
  data() {
    return {
      title: null,
      another: null,
      ingredients: [],
      feedback: null,
      slug: null,
    };
  },
  methods: {
    AddData() {
      if (this.title) {
        this.feedback = null;
        //create a slug
        this.slug = slugify(this.title, {
          replacement: "-",
          remove: /[$*_+`.()'"!\-:@]/g,
          lower: true,
        });

        db.collection("learncrud")
          .add({
            title: this.title,
            ingredients: this.ingredients,
            slug: this.slug,
          })
          .then(() => {
            this.$router.push({ name: "Index" });
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        this.feedback = "Title harap diisi";
      }
    },
    addIng() {
      if (this.another) {
        this.ingredients.push(this.another);
        console.log(this.ingredients);
        this.another = null;
        this.feedback = null;
      } else {
        this.feedback = "Mohon isi data";
      }
    },
    deleteIng(ing) {
      this.ingredients = this.ingredients.filter((ingredients) => {
        return ingredients != ing;
      });
    },
  },
};
</script>

<style>
.add-formdata {
  margin-top: 60px;
  padding: 20px;
  max-width: 500px;
}
.add-formdata h2 {
  font-size: 2em;
  margin: 20px auto;
}
.field {
  margin: 20px auto;
}
</style>