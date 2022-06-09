<template>
  <div class="container">
    <div class="searchData">
      <input
        type="text"
        v-model="searchTerm"
        placeholder="Search Here..."
        class="blue lighten-5"
        style="border-radius: 18px"
      />

      <div class="hello">
        <div class="card" v-for="smoothie in filteredData" :key="smoothie.id">
          <div class="card-content">
            <router-link
              :to="{ name: 'EditData', params: { data_slug: smoothie.slug } }"
            >
              <!-- <span class="btn-float btn-large helfway-dab orange tomboledit"> -->
              <i class="material-icons iconedit">edit</i>
              <div class="hideEdit">edit</div>
              <!-- </span> -->
            </router-link>
            <i
              class="material-icons icondelete"
              @click="deleteSmoothie(smoothie.id)"
              >delete</i
            >
            <div class="hideDelete">delete</div>
            <h2 class="blue-text">{{ smoothie.title }}</h2>
            <ul class="ingredients">
              <li v-for="(ing, index) in smoothie.ingredients" :key="index">
                <span class="chip">{{ ing }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import db from "@/firebase/init";

export default {
  name: "Index",
  data() {
    return {
      smoothies: [
        // { title: 'Learn React', slug: 'learn-react', ingredients:['React', 'Laravel','VueJs'], id: '1'},
        // { title: 'Learn Laravel', slug: 'learn-laravel', ingredients:['Laravel', 'VueJs','React'], id: '2'},
      ],
      searchTerm: "",
    };
  },
  methods: {
    deleteSmoothie(id) {
      // console.log(id)
      db.collection("learncrud")
        .doc(id)
        .delete()
        .then(() => {
          this.smoothies = this.smoothies.filter((smoothie) => {
            return smoothie.id != id;
          });
        });
    },
  },
  computed: {
    filteredData() {
      return this.smoothies.filter((smoothie) => {
        return smoothie.title.match(this.searchTerm);
      });
    },
  },
  created() {
    db.collection("learncrud")
      .get()
      .then((snapsot) => {
        snapsot.forEach((doc) => {
          // console.log(doc.data(), doc.id)
          let smoothie = doc.data();
          smoothie.id = doc.id;
          this.smoothies.push(smoothie);
        });
      });
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.container {
  margin-bottom: 50px;
}
.searchData {
  margin-top: 50px;
}
input {
  text-indent: 20px;
}
::placeholder {
  color: rgb(0, 63, 130);
}
.hello {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 30px;
  margin-top: 60px;
}
.hello h2 {
  font-size: 1.8em;
  text-align: center;
  margin-top: 0;
}
.hello .ingredients {
  margin: 30px auto;
}

.hello .ingredients li {
  display: inline-block;
}
.icondelete {
  position: absolute;
  top: 4px;
  right: 14px;
  cursor: pointer;
  color: rgb(243, 6, 6);
  font-size: 20px;
}
.hideDelete {
  display: none;
}
.icondelete:hover + .hideDelete {
  display: block;
  position: absolute;
  top: 18px;
  right: 4px;
  color: rgb(243, 6, 6);
  font-size: 15px;
}
.iconedit {
  position: absolute;
  top: 40px;
  right: 14px;
  cursor: pointer;
  color: rgb(230, 161, 23);
  font-size: 20px;
}
.hideEdit {
  display: none;
}
.iconedit:hover + .hideEdit {
  display: block;
  position: absolute;
  top: 55px;
  right: 14px;
  color: rgb(230, 161, 23);
  font-size: 15px;
}
</style>
