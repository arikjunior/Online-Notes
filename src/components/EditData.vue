<template>
  <div v-if="smoothie" class="edit-data container">
    <h2 class="black-text">Edit Data {{ smoothie.title }}</h2>
    <form @submit.prevent="EditData">
      <div class="field title">
        <label for="title">Nama :</label>
        <input type="text" name="title" v-model="smoothie.title" />
      </div>
      <div
        v-for="(ing, index) in smoothie.ingredients"
        :key="index"
        class="field"
      >
        <label for="data paket">Isi Data</label>
        <input
          type="text"
          name="ingredient"
          v-model="smoothie.ingredients[index]"
        />
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
        <button class="btn blue">Update</button>
      </div>
    </form>
  </div>
</template>

<script>
import db from "@/firebase/init";
import slugify from "slugify";

export default {
  name: "EditData",
  data() {
    return {
      smoothie: null,
      another: null,
      feedback: null,
    };
  },
  methods: {
    EditData() {
      // console.log(this.smoothie.title, this.smoothie.ingredients)
      if (this.smoothie.title) {
        this.feedback = null;
        //create a slug
        this.smoothie.slug = slugify(this.smoothie.title, {
          replacement: "-",
          remove: /[$*_+`.()'"!\-:@]/g,
          lower: true,
        });

        db.collection("learncrud")
          .doc(this.smoothie.id)
          .update({
            title: this.smoothie.title,
            ingredients: this.smoothie.ingredients,
            slug: this.smoothie.slug,
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
        this.smoothie.ingredients.push(this.another);
        console.log(this.ingredients);
        this.another = null;
        this.feedback = null;
      } else {
        this.feedback = "Mohon isi data";
      }
    },
    deleteIng(ing) {
      this.smoothie.ingredients = this.smoothie.ingredients.filter(
        (ingredients) => {
          return ingredients != ing;
        }
      );
    },
  },
  created() {
    let editData = db
      .collection("learncrud")
      .where("slug", "==", this.$route.params.data_slug);
    editData.get().then((snapshot) => {
      snapshot.forEach((doc) => {
        // console.log(doc.data())
        this.smoothie = doc.data();
        this.smoothie.id = doc.id;
      });
    });
  },
};
</script>

<style>
.edit-data {
  margin-top: 60px;
  padding: 20px;
  max-width: 500px;
}
.edit-data h2 {
  font-size: 2em;
  margin: 20px auto;
}
.field {
  margin: 20px auto;
}
.delete {
  position: relative;
  top: -40px;
  right: -223px;
  color: #aaa;
  font-size: 1.4em;
  cursor: pointer;
}
</style>