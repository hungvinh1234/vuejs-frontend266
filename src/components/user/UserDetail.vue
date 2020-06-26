<template>
  <div v-if="response">
    <button @click="refList" class="btn btn-primary" v-if="response">Reference User List</button>
    <button @click="userList" class="btn btn-primary" v-if="response.data.is_admin">Account List</button>
    <div class="panel panel-default" style="margin-top: 10px;">
      <div class="panel-heading" style="background-color: white;">
        <h4>Your Account</h4>
      </div>

      <div v-if="response" class="panel-body">
        <p>Username: {{ response.data.username }}</p>
        <p>Email: {{ response.data.email }}</p>
        <p>Fullname: {{ response.data.name}}</p>
        <p>Birthday: {{ response.data.birthday}}</p>
        <p>Gender: {{ response.data.gender }}</p>
        <p>Address: {{ response.data.address }}</p>
        <p>City: {{ response.data.hometown }}</p>
        <p>Graduated University: {{ response.data.university}}</p>
        <p>Starting Date: {{ response.data.start_date }}</p>
        <p>Reference User: {{response.data.ref_user }}</p>
        <p>Is Admin: {{ response.data.is_admin }}</p>
      </div>
    </div>

    <div>
      <div>
        <ul class="nav nav-pills">
          <button class="btn btn-primary" @click.prevent="submitted">Edit</button>
        </ul>
      </div>
    </div>

    <!-- <div id="app">
    <form method="post">
      <avatar/>
    </form>
    </div> -->

  </div>
</template>

<script>
import moment from "moment";
import Avatar from './Avatar.vue'

export default {
  data() {
    return {
      modalShow: false,

      storedToken: "",
      response: "",
      link: {
        name: "userEdit",
        params: {
          id: this.$route.params.id
        },
        query: {
          locale: "en",
          q: 100
        },
        hash: "#data"
      }
    };
  },

  components: {

    Avatar
  },

  beforeRouteEnter(to, from, next) {
    if (true) {
      next();
    } else {
      next(false);
    }
  },

  mounted() {
    this.LoadData();
  },

  methods: {
    userList() {
      this.$router.push({ name: "list" });
    },

    refList() {
      this.$router.push({ name: "reflist" });
    },

    LoadData() {
      this.storedToken = localStorage.getItem("token");

      axios({
        method: "post",
        url: `http://localhost:3000/account/${this.$route.params.id}`,
        headers: {
          Authorization: `Bearer ${this.storedToken}`
        }
      })
        .then(res => {
          this.response = res;

          this.response.data.birthday = this.format_date(
            this.response.data.birthday
          );

          this.response.data.start_date = this.format_date(
            this.response.data.start_date
          );

          console.log(this.response);
        })
        .catch(error => {
          console.log(error.response);
          this.$alert(error.response);
        });
    },

    format_date(value) {
      if (value) {
        return moment(String(value)).format("YYYY-MM-DD");
      }
    },

    submitted() {
      this.$router.push("/user/" + this.response.data.id + "/edit");
    }
  }
};
</script>
<style>
  #app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>